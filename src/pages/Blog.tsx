
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import AdBanner from "@/components/ads/AdBanner";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import FeaturedPost, { BlogPost } from "@/components/blog/FeaturedPost";
import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import { mockBlogPosts } from "@/data/mockBlogPosts";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Try to fetch from Supabase first
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false });
          
        if (!error && data && data.length > 0) {
          setPosts(data as BlogPost[]);
        } else {
          // If no posts or error, use mock data
          setPosts(mockBlogPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Fallback to mock data
        setPosts(mockBlogPosts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);
    
  if (loading) {
    return (
      <BlogLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Cargando artículos...</p>
        </div>
      </BlogLayout>
    );
  }
  
  return (
    <BlogLayout>
      {/* Blog Header */}
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Top Ad */}
        <div className="flex justify-center mb-8">
          <AdBanner position="top" adSize="728x90" />
        </div>
        
        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
              Todos
            </TabsTrigger>
            <TabsTrigger value="Time Tracking" onClick={() => setActiveCategory("Time Tracking")}>
              Control Horario
            </TabsTrigger>
            <TabsTrigger value="HR Compliance" onClick={() => setActiveCategory("HR Compliance")}>
              Normativa
            </TabsTrigger>
            <TabsTrigger value="Productivity" onClick={() => setActiveCategory("Productivity")}>
              Productividad
            </TabsTrigger>
            <TabsTrigger value="Remote Work" onClick={() => setActiveCategory("Remote Work")}>
              Trabajo Remoto
            </TabsTrigger>
          </TabsList>
          
          {/* All tabs content */}
          {["all", "Time Tracking", "HR Compliance", "Productivity", "Remote Work"].map((category) => (
            <TabsContent key={category} value={category} className="space-y-8">
              {filteredPosts.length > 0 && (
                <>
                  {/* Featured Post - only show the first post as featured */}
                  <FeaturedPost post={filteredPosts[0]} />
                  
                  {/* Blog Posts Grid - show the remaining posts */}
                  {filteredPosts.length > 1 && (
                    <BlogPostsGrid posts={filteredPosts.slice(1)} />
                  )}
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        {/* In-content Ad */}
        <div className="flex justify-center my-10">
          <AdBanner position="in-content" adSize="300x250" />
        </div>
        
        {/* Bottom Ad */}
        <div className="flex justify-center mt-10">
          <AdBanner position="bottom" adSize="728x90" />
        </div>
      </main>
    </BlogLayout>
  );
}
