
import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight } from "lucide-react";

export type { BlogPost } from "@/types/blog";
import type { BlogPost } from "@/types/blog";

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const formattedDate = new Date(post.published_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border"
      style={{ background: "var(--white)", borderColor: "var(--border)" }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={post.featured_image}
            alt={post.featured_image_alt || post.title}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="inline-flex items-center gap-1 text-sm font-semibold px-2.5 py-0.5 rounded-full"
                style={{ background: "var(--green-bg)", color: "var(--green-dark)" }}
              >
                {post.category}
              </span>
              {post.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "var(--surface-alt)", color: "var(--text-muted)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>{post.title}</h2>
            <p className="mb-4" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
          </div>
          <div className="mt-auto">
            <div className="flex items-center mb-4" style={{ color: "var(--text-muted)" }}>
              <CalendarDays className="w-4 h-4 mr-1" />
              <span className="text-sm">{formattedDate}</span>
              <span className="mx-2">•</span>
              <span className="text-sm">{post.reading_time} min de lectura</span>
            </div>
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-colors hover:opacity-90"
              style={{ background: "var(--green)", color: "var(--white)" }}
            >
              Leer artículo <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
