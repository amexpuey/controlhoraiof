
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/types/blog";

interface RelatedPostsProps {
  currentPost: BlogPost;
}

export default function RelatedPosts({ currentPost }: RelatedPostsProps) {
  const [related, setRelated] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetch = async () => {
      // Try related_post_slugs first
      if (currentPost.related_post_slugs?.length) {
        const { data } = await (supabase
          .from("site_articles" as any)
          .select("*") as any)
          .in("slug", currentPost.related_post_slugs)
          .limit(4);
        if (data?.length) {
          setRelated(data.map((p: any) => ({ ...p, id: p.id.toString(), related_apps: p.related_apps || [] })));
          return;
        }
      }
      // Fallback: same category
      const { data } = await (supabase
        .from("site_articles" as any)
        .select("*") as any)
        .eq("category", currentPost.category)
        .neq("slug", currentPost.slug)
        .order("published_at", { ascending: false })
        .limit(4);
      if (data?.length) {
        setRelated(data.map((p: any) => ({ ...p, id: p.id.toString(), related_apps: p.related_apps || [] })));
      }
    };
    fetch();
  }, [currentPost.slug, currentPost.category, currentPost.related_post_slugs]);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h3 className="text-xl font-bold mb-6">Artículos relacionados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group flex gap-4 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--green)] transition-all bg-white"
          >
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.featured_image_alt || post.title}
                className="w-20 h-20 rounded-lg object-cover shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-[var(--green)] transition-colors">
                {post.title}
              </h4>
              <div className="flex items-center text-xs text-[var(--text-muted)] mt-2 gap-1">
                <CalendarDays className="w-3 h-3" />
                {new Date(post.published_at).toLocaleDateString("es-ES")}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)] self-center shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
