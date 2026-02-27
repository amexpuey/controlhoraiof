import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminHeader from "@/components/admin/AdminHeader";
import ArticlesTable from "@/components/admin/ArticlesTable";
import ArticleEditor from "@/components/admin/ArticleEditor";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

export interface SiteArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  content_html: string | null;
  content_markdown: string | null;
  category: string;
  featured_image: string;
  featured_image_alt: string | null;
  author: string;
  author_avatar_url: string | null;
  reading_time: number;
  published_at: string;
  status: string;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  secondary_keywords: string[] | null;
  tags: string[] | null;
  related_post_slugs: string[] | null;
  canonical_url: string | null;
  og_image_url: string | null;
  schema_json: any;
  primary_cta_text: string | null;
  primary_cta_url: string | null;
  created_at: string;
  updated_at: string;
}

export default function Articles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingArticle, setEditingArticle] = useState<SiteArticle | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("site_articles")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as SiteArticle[];
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, newStatus }: { id: number; newStatus: string }) => {
      const { error } = await (supabase as any)
        .from("site_articles")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      toast({ title: "Estado actualizado" });
    },
  });

  const categories = useMemo(() => {
    const cats = new Set(articles.map((a) => a.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [articles]);

  const filtered = useMemo(() => {
    let result = articles;
    if (statusFilter !== "all") result = result.filter((a) => a.status === statusFilter);
    if (categoryFilter !== "all") result = result.filter((a) => a.category === categoryFilter);
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (a) => a.title?.toLowerCase().includes(term) || a.slug?.toLowerCase().includes(term)
      );
    }
    return result;
  }, [articles, statusFilter, categoryFilter, searchTerm]);

  return (
    <div>
      <AdminHeader />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Artículos del Blog</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título o slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="published">Publicado</SelectItem>
              <SelectItem value="draft">Borrador</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground self-center">{filtered.length} artículos</span>
        </div>

        <ArticlesTable
          articles={filtered}
          isLoading={isLoading}
          onEdit={setEditingArticle}
          onToggleStatus={(article) =>
            toggleStatusMutation.mutate({
              id: article.id,
              newStatus: article.status === "published" ? "draft" : "published",
            })
          }
        />

        {editingArticle && (
          <ArticleEditor
            article={editingArticle}
            open={!!editingArticle}
            onClose={() => setEditingArticle(null)}
            onSaved={() => {
              queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
              setEditingArticle(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
