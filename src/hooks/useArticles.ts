import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/types/blog";

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data as Article[];
    },
  });
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      // Return empty article for new posts
      if (id === "new") {
        return {
          title: "",
          meta_description: "",
          content: "",
          category: "",
          tags: [],
          featured_image_url: null,
          image_alt: null,
          status: "draft",
        } as Article;
      }
      
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("Article not found");
      }

      return data as Article;
    },
    enabled: Boolean(id),
  });
};