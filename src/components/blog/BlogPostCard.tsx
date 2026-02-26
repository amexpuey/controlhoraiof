
import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import type { BlogPost } from "@/types/blog";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden h-full flex flex-col transition-all border hover:shadow-lg"
      style={{
        background: "var(--white)",
        borderColor: "var(--border)",
      }}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={post.featured_image}
          alt={post.featured_image_alt || post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "var(--green-bg)", color: "var(--green-dark)" }}
          >
            {post.category}
          </span>
          {post.tags?.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: "var(--surface-alt)", color: "var(--text-muted)" }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold line-clamp-2 mb-1" style={{ color: "var(--text)" }}>
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-xs line-clamp-2 mt-1" style={{ color: "var(--text-secondary)" }}>
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center text-xs mt-2 gap-3" style={{ color: "var(--text-muted)" }}>
          <span className="flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            {new Date(post.published_at).toLocaleDateString('es-ES')}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.reading_time} min
          </span>
        </div>
        <div className="mt-auto pt-4">
          <Link
            to={`/blog/${post.slug}`}
            className="text-sm font-semibold flex items-center transition-colors hover:opacity-80"
            style={{ color: "var(--green)" }}
          >
            Leer más <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
