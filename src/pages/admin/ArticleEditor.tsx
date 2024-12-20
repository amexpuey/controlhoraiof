import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useArticle } from "@/hooks/useArticles";
import { useImageUpload } from "@/hooks/useImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import type { Article } from "@/types/blog";
import ArticleMetaFields from "@/components/admin/blog/ArticleMetaFields";
import ArticleContentFields from "@/components/admin/blog/ArticleContentFields";
import ArticleImageFields from "@/components/admin/blog/ArticleImageFields";
import ArticleStatusField from "@/components/admin/blog/ArticleStatusField";

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: existingArticle, isLoading } = useArticle(id || "");
  const { handleImageUpload, isUploading } = useImageUpload();
  const [imageUrl, setImageUrl] = useState<string>("");

  const form = useForm<Article>({
    defaultValues: {
      title: "",
      meta_description: "",
      content: "",
      category: "",
      tags: [],
      featured_image_url: null,
      image_alt: null,
      status: "draft",
    },
  });

  // Update form when existing article data is loaded
  useEffect(() => {
    if (existingArticle) {
      form.reset({
        title: existingArticle.title || "",
        meta_description: existingArticle.meta_description || "",
        content: existingArticle.content || "",
        category: existingArticle.category || "",
        tags: existingArticle.tags || [],
        featured_image_url: existingArticle.featured_image_url,
        image_alt: existingArticle.image_alt,
        status: existingArticle.status || "draft",
      });
      setImageUrl(existingArticle.featured_image_url || "");
    }
  }, [existingArticle, form]);

  const onSubmit = async (data: Article) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please log in to save articles",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      const { error } = id && id !== "new"
        ? await supabase
            .from("articles")
            .update({
              ...data,
              featured_image_url: imageUrl || null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", id)
        : await supabase.from("articles").insert([
            {
              ...data,
              featured_image_url: imageUrl || null,
            },
          ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Article ${id && id !== "new" ? "updated" : "created"} successfully`,
      });
      navigate("/admin/blog");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleImageSelect = async (file: File) => {
    try {
      const url = await handleImageUpload(
        file,
        "background",
        id || crypto.randomUUID()
      );
      setImageUrl(url);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">
        {id && id !== "new" ? "Edit Article" : "Create New Article"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ArticleMetaFields form={form} />
          <ArticleContentFields form={form} />
          <ArticleImageFields
            form={form}
            imageUrl={imageUrl}
            handleImageSelect={handleImageSelect}
          />
          <ArticleStatusField form={form} />

          <div className="flex gap-4">
            <Button type="submit" disabled={isUploading}>
              {id && id !== "new" ? "Update" : "Create"} Article
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/blog")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}