
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import AdBanner from "@/components/ads/AdBanner";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import FeaturedPost, { BlogPost } from "@/components/blog/FeaturedPost";
import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import InteractiveToolsSection from "@/components/blog/InteractiveToolsSection";
import { mockBlogPosts } from "@/data/mockBlogPosts";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// Number of posts to show per page (excluding the featured post)
const POSTS_PER_PAGE = 9; // Changed from 6 to 9 to show 10 articles total (1 featured + 9 grid)

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log("Fetching blog posts from Supabase...");
        
        // The issue might be with this query - let's log more details
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false });
        
        console.log("Supabase query response:", { data, error });
          
        if (!error && data && data.length > 0) {
          console.log(`Fetched ${data.length} blog posts from Supabase`);
          
          // Transform the data to match BlogPost structure if needed
          const transformedPosts = data.map(post => {
            // Make sure related_apps is always an array
            let relatedApps = post.related_apps;
            if (!Array.isArray(relatedApps)) {
              relatedApps = relatedApps ? [relatedApps] : [];
            }
            
            return {
              ...post,
              id: post.id.toString(), // Ensure id is a string
              related_apps: relatedApps
            } as BlogPost;
          });
          
          setPosts(transformedPosts);
        } else {
          console.error('Error or no data from Supabase:', error);
          console.log('Falling back to mock data');
          setPosts(mockBlogPosts);
        }
      } catch (error) {
        console.error('Exception fetching blog posts:', error);
        console.log('Falling back to mock data due to exception');
        setPosts(mockBlogPosts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);
  
  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);
    
  // Calculate pagination
  const totalPages = Math.ceil((filteredPosts.length - 1) / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE + 1; // +1 because first post is featured
  const endIndex = Math.min(startIndex + POSTS_PER_PAGE - 1, filteredPosts.length);
  
  const currentPosts = filteredPosts.length > 0 
    ? (currentPage === 1 
        ? [filteredPosts[0], ...filteredPosts.slice(1, POSTS_PER_PAGE + 1)] 
        : filteredPosts.slice(startIndex, endIndex + 1))
    : [];
    
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
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <AdBanner position="top" adSize="728x90" />
        </div>
        
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
          
          {["all", "Time Tracking", "HR Compliance", "Productivity", "Remote Work"].map((category) => (
            <TabsContent key={category} value={category} className="space-y-8">
              {filteredPosts.length > 0 && currentPage === 1 && (
                <FeaturedPost post={filteredPosts[0]} />
              )}
              
              {currentPosts.length > (currentPage === 1 ? 1 : 0) && (
                <BlogPostsGrid posts={currentPage === 1 ? currentPosts.slice(1) : currentPosts} />
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(current => Math.max(current - 1, 1))} 
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className="cursor-pointer"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(current => Math.min(current + 1, totalPages))}
                          className="cursor-pointer" 
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-center my-10">
          <AdBanner position="in-content" adSize="300x250" />
        </div>
        
        <InteractiveToolsSection />
        
        <div className="flex justify-center mt-10">
          <AdBanner position="bottom" adSize="728x90" />
        </div>
      </main>
    </BlogLayout>
  );
}
