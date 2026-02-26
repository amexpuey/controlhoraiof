
import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight, Tag } from "lucide-react";

// Re-export BlogPost from centralized types
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
    <div className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
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
              <span className="inline-flex items-center gap-1 text-sm text-yellow-700">
                <Tag className="w-4 h-4 text-yellow-600" />
                {post.category}
              </span>
              {post.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">{tag}</span>
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.excerpt}</p>
          </div>
          <div className="mt-auto">
            <div className="flex items-center text-gray-500 mb-4">
              <CalendarDays className="w-4 h-4 mr-1" />
              <span className="text-sm">{formattedDate}</span>
              <span className="mx-2">•</span>
              <span className="text-sm">{post.reading_time} min de lectura</span>
            </div>
            <Link to={`/blog/${post.slug}`} className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors">
              Leer artículo <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
