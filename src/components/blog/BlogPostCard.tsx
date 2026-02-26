
import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight, Tag, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost } from "@/types/blog";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={post.featured_image} 
          alt={post.featured_image_alt || post.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2 flex-grow">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs text-yellow-700">
            <Tag className="w-3 h-3 text-yellow-600" />
            {post.category}
          </span>
          {post.tags?.slice(0, 1).map((tag) => (
            <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded-full text-gray-500">{tag}</span>
          ))}
        </div>
        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
        {post.excerpt && (
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{post.excerpt}</p>
        )}
        <div className="flex items-center text-xs text-gray-500 mt-1 gap-3">
          <span className="flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            {new Date(post.published_at).toLocaleDateString('es-ES')}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.reading_time} min
          </span>
        </div>
      </CardHeader>
      <CardFooter>
        <Link to={`/blog/${post.slug}`} className="text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center">
          Leer más <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
