
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdBanner from "@/components/ads/AdBanner";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostSidebar from "@/components/blog/BlogPostSidebar";
import BlogLayout from "@/components/blog/BlogLayout";
import type { BlogPost } from "@/components/blog/FeaturedPost";
import { mockBlogPosts } from "@/data/mockBlogPosts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // First try to get from Supabase
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (!error && data) {
          setPost(data as BlogPost);
        } else {
          // If not found in Supabase, check mock data
          const mockPost = mockBlogPosts.find(p => p.slug === slug);
          if (mockPost) {
            setPost(mockPost);
          }
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);
  
  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Cargando...</div>;
  }
  
  if (!post) {
    return <div className="container mx-auto px-4 py-12 text-center">Artículo no encontrado</div>;
  }
  
  return (
    <BlogLayout>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/blog" className="text-yellow-600 hover:text-yellow-700 flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" /> Volver al blog
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <BlogPostContent post={post} />
            
            {/* Bottom Ad */}
            <div className="flex justify-center my-8">
              <AdBanner position="in-content" adSize="728x90" />
            </div>
          </div>
          
          <BlogPostSidebar relatedApps={post.related_apps} />
        </div>
      </main>
    </BlogLayout>
  );
}
