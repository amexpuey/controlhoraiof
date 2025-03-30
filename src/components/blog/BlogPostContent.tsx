
import React from "react";
import type { BlogPost } from "@/components/blog/FeaturedPost";
import ArticleMeta from "./content/ArticleMeta";
import ArticleFormatter from "./content/ArticleFormatter";
import ShareButtons from "./content/ShareButtons";

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  // Calculate formatted date if published_at exists
  const formattedDate = post.published_at 
    ? new Date(post.published_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) 
    : '';
  
  // Calculate reading time (assumes average reading speed of 200 words per minute)
  const contentText = post.content || '';
  const wordCount = contentText.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  
  // Check if content starts with HTML tags that include the title
  const startsWithTitle = post.content && 
    (/<h1>.*<\/h1>/i.test(post.content.substring(0, 200)) || 
     /^#\s.*\n/m.test(post.content.substring(0, 200)));
  
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
        <ArticleMeta 
          publishedDate={formattedDate} 
          readingTime={readingTime} 
        />
        
        {/* Post Title - Only show if not displayed in ArticleFormatter */}
        {!startsWithTitle && 
         !['como-cumplir-normativa-registro-horario', 'sistemas-modernos-control-acceso', 
           'analisis-datos-tiempo-real', 'estrategias-gestion-tiempo-empresas'].includes(post.slug) && (
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
        )}
        
        {/* Post Content */}
        <div className="article-container mb-6">
          <ArticleFormatter 
            slug={post.slug} 
            content={post.content || ''} 
          />
        </div>
        
        {/* Share Buttons */}
        <ShareButtons />
      </div>
    </article>
  );
}
