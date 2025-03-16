
import React from "react";
import type { BlogPost } from "@/components/blog/FeaturedPost";
import { CalendarDays, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  // Calculate formatted date if created_at exists
  const formattedDate = post.published_at ? new Date(post.published_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';
  
  // Calculate reading time (assumes average reading speed of 200 words per minute)
  const contentText = post.content || '';
  const wordCount = contentText.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Featured Image */}
      {post.featured_image && (
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img 
            src={post.featured_image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6 md:p-8">
        {/* Post Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{readingTime} min de lectura</span>
          </div>
        </div>
        
        {/* Post Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        {/* Post Content */}
        <div className="prose prose-lg max-w-none mb-6">
          {post.content && post.slug === "como-cumplir-normativa-registro-horario" ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : post.content ? (
            <ReactMarkdown>{post.content}</ReactMarkdown>
          ) : null}
        </div>
        
        {/* Share Buttons */}
        <div className="border-t border-gray-100 pt-6 mt-8">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">Compartir artículo</h4>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="rounded-full w-9 h-9 p-0">
                <Share2 className="w-4 h-4" />
                <span className="sr-only">Compartir</span>
              </Button>
              {/* Add more share buttons as needed */}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
