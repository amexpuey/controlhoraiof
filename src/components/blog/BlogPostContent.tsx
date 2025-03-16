
import { CalendarDays, Share2, Tag, ThumbsUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "./FeaturedPost";

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Tag className="w-4 h-4 mr-1 text-yellow-600" />
        <span className="text-sm text-yellow-700">{post.category}</span>
      </div>
      
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
      
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <CalendarDays className="w-4 h-4 mr-1" />
        <span>{new Date(post.published_at).toLocaleDateString('es-ES')}</span>
        <span className="mx-2">•</span>
        <Users className="w-4 h-4 mr-1" />
        <span>{post.author}</span>
        <span className="mx-2">•</span>
        <span>{post.reading_time} min de lectura</span>
      </div>
      
      <img 
        src={post.featured_image} 
        alt={post.title} 
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      
      {/* Social sharing */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" size="sm" className="text-gray-600">
          <ThumbsUp className="w-4 h-4 mr-2" /> Me gusta
        </Button>
        <Button variant="outline" size="sm" className="text-gray-600">
          <Share2 className="w-4 h-4 mr-2" /> Compartir
        </Button>
      </div>
      
      {/* Blog content */}
      <div className="prose max-w-none">
        {post.content.split('\n').map((paragraph, index) => {
          if (paragraph.startsWith('##')) {
            return <h2 key={index} className="text-2xl font-bold mt-6 mb-4">{paragraph.replace('##', '').trim()}</h2>;
          } else if (paragraph.startsWith('###')) {
            return <h3 key={index} className="text-xl font-bold mt-5 mb-3">{paragraph.replace('###', '').trim()}</h3>;
          } else if (paragraph.startsWith('-')) {
            return <li key={index} className="ml-6">{paragraph.replace('-', '').trim()}</li>;
          } else if (paragraph.trim() === '') {
            return <br key={index} />;
          } else {
            return <p key={index} className="mb-4">{paragraph}</p>;
          }
        })}
      </div>
      
      {/* Author bio */}
      <div className="mt-10 pt-6 border-t">
        <h3 className="text-lg font-bold mb-2">Sobre el autor</h3>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <p className="font-medium">{post.author}</p>
            <p className="text-sm text-gray-600">Especialista en software de control horario y cumplimiento normativo</p>
          </div>
        </div>
      </div>
    </article>
  );
}
