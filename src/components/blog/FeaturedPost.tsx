
import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight, Tag } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featured_image: string;
  published_at: string;
  author: string;
  reading_time: number;
  content: string;
  related_apps: string[];
}

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  // Format the date in Spanish
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
            alt={post.title} 
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Tag className="w-4 h-4 mr-1 text-yellow-600" />
              <span className="text-sm text-yellow-700">{post.category}</span>
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
