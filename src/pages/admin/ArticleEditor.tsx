import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useArticle } from "@/hooks/useArticles";
import { useImageUpload } from "@/hooks/useImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "@/components/ui/use-toast";
import type { Article } from "@/types/blog";

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
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description (150-160 characters)</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={160} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (comma-separated)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value?.join(", ") || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ImageUpload
            currentImage={imageUrl || "/placeholder.svg"}
            onImageSelect={handleImageSelect}
            label="Featured Image"
            inputId="featured-image"
          />

          <FormField
            control={form.control}
            name="image_alt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Alt Text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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