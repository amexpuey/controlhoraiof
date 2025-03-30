
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Book } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdBanner from "@/components/ads/AdBanner";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostSidebar from "@/components/blog/BlogPostSidebar";
import BlogLayout from "@/components/blog/BlogLayout";
import LearningModules from "@/components/learning/LearningModules";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@/components/blog/FeaturedPost";
import { mockBlogPosts } from "@/data/mockBlogPosts";
import { toast } from "react-hot-toast";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLearningModules, setShowLearningModules] = useState(false);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        console.info("Fetching blog posts from Supabase...");
        
        // Updated to only fetch published posts (published_at is not NULL)
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .not('published_at', 'is', null)
          .single();
          
        if (!error && data) {
          console.info("Found post in Supabase");
          setPost(data as BlogPost);
        } else {
          console.info("Supabase query response:", { data, error });
          console.error("Error or no data from Supabase:", error);
          // If not found in Supabase, check mock data
          console.info("Falling back to mock data");
          const mockPost = mockBlogPosts.find(p => p.slug === slug);
          if (mockPost) {
            setPost(mockPost);
          } else {
            toast.error("Artículo no encontrado");
          }
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        toast.error("Error al cargar el artículo");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
    // Scroll to top when navigating to a new blog post
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (loading) {
    return (
      <BlogLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      </BlogLayout>
    );
  }
  
  if (!post) {
    return (
      <BlogLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Artículo no encontrado</h2>
          <p className="text-gray-600 mb-6">El artículo que buscas no existe o ha sido eliminado.</p>
          <Link to="/blog">
            <Button>Volver al blog</Button>
          </Link>
        </div>
      </BlogLayout>
    );
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
            
            {/* Learning Modules Section */}
            <Card className="my-8 border border-blue-100 bg-blue-50/40 shadow-sm hover:shadow transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Book className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-blue-800">Módulos de aprendizaje</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Aprende todo sobre el control horario, su normativa y cómo implementarlo correctamente
                </p>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  size="lg"
                  onClick={() => setShowLearningModules(prev => !prev)}
                >
                  {showLearningModules ? 'Ocultar módulos' : 'Empezar a aprender'}
                </Button>
              </CardContent>
            </Card>

            {showLearningModules && (
              <div className="mb-8 animate-fadeIn">
                <LearningModules />
              </div>
            )}
            
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
