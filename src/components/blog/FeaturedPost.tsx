
import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight, Tag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featured_image: string;
  published_at: string;
  author: string;
  reading_time: number;
  related_apps?: string[];
};

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="mb-10">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img 
            src={post.featured_image} 
            alt={post.title}
            className="w-full h-72 object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center mb-2">
            <Tag className="w-4 h-4 mr-1 text-yellow-600" />
            <span className="text-sm text-yellow-700">{post.category}</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <CalendarDays className="w-4 h-4 mr-1" />
            <span>{new Date(post.published_at).toLocaleDateString('es-ES')}</span>
            <span className="mx-2">•</span>
            <Users className="w-4 h-4 mr-1" />
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.reading_time} min de lectura</span>
          </div>
          <Link to={`/blog/${post.slug}`}>
            <Button className="bg-yellow-500 hover:bg-yellow-600">
              Leer artículo completo <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
