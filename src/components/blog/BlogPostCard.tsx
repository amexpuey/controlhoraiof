
import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight, Tag } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost } from "./FeaturedPost";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={post.featured_image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2 flex-grow">
        <div className="flex items-center mb-1">
          <Tag className="w-3 h-3 mr-1 text-yellow-600" />
          <span className="text-xs text-yellow-700">{post.category}</span>
        </div>
        <CardTitle className="text-lg">{post.title}</CardTitle>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <CalendarDays className="w-3 h-3 mr-1" />
          <span>{new Date(post.published_at).toLocaleDateString('es-ES')}</span>
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
