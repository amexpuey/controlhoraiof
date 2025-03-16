import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import AdBanner from "@/components/ads/AdBanner";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import FeaturedPost, { BlogPost } from "@/components/blog/FeaturedPost";
import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import InteractiveToolsSection from "@/components/blog/InteractiveToolsSection";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false });
          
        if (error) throw error;
        if (data && data.length > 0) {
          setPosts(data as BlogPost[]);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
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
          
          <TabsContent value="all" className="space-y-4">
            {/* Featured Post */}
            {filteredPosts.length > 0 && (
              <FeaturedPost post={filteredPosts[0]} />
            )}
            
            {/* Blog Posts Grid */}
            {filteredPosts.length > 1 && (
              <BlogPostsGrid posts={filteredPosts.slice(1)} />
            )}
          </TabsContent>
          
          {/* Same content for other tabs, will be filtered by the state */}
          <TabsContent value="Time Tracking" className="space-y-4">
            {/* Content is filtered by the activeCategory state */}
          </TabsContent>
          <TabsContent value="HR Compliance" className="space-y-4">
            {/* Content is filtered by the activeCategory state */}
          </TabsContent>
          <TabsContent value="Productivity" className="space-y-4">
            {/* Content is filtered by the activeCategory state */}
          </TabsContent>
          <TabsContent value="Remote Work" className="space-y-4">
            {/* Content is filtered by the activeCategory state */}
          </TabsContent>
        </Tabs>
        
        {/* In-content Ad */}
        <div className="flex justify-center my-10">
          <AdBanner position="in-content" adSize="300x250" />
        </div>
        
        {/* Interactive Tools Section */}
        <InteractiveToolsSection />
        
        {/* Bottom Ad */}
        <div className="flex justify-center mt-10">
          <AdBanner position="bottom" adSize="728x90" />
        </div>
      </main>
    </BlogLayout>
  );
}
