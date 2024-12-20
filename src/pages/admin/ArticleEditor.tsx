import { useState } from "react";
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
  const { data: existingArticle } = useArticle(id || "");
  const { handleImageUpload, isUploading } = useImageUpload();
  const [imageUrl, setImageUrl] = useState<string>(
    existingArticle?.featured_image_url || ""
  );

  const form = useForm<Article>({
    defaultValues: {
      title: existingArticle?.title || "",
      meta_description: existingArticle?.meta_description || "",
      content: existingArticle?.content || "",
      category: existingArticle?.category || "",
      tags: existingArticle?.tags || [],
      featured_image_url: existingArticle?.featured_image_url || null,
      image_alt: existingArticle?.image_alt || null,
      status: existingArticle?.status || "draft",
    },
  });

  const onSubmit = async (data: Article) => {
    try {
      const { error } = id
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
        description: `Article ${id ? "updated" : "created"} successfully`,
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

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">
        {id ? "Edit Article" : "Create New Article"}
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
              {id ? "Update" : "Create"} Article
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