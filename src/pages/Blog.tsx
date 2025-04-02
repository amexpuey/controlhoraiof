
import { useState, useEffect, useRef, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import AdBanner from "@/components/ads/AdBanner";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import FeaturedPost, { BlogPost } from "@/components/blog/FeaturedPost";
import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import InteractiveToolsSection from "@/components/blog/InteractiveToolsSection";
import { mockBlogPosts } from "@/data/mockBlogPosts";
import { useIsMobile } from "@/hooks/use-mobile";
import { Loader2 } from "lucide-react";

// Number of posts to load each time
const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isMobile = useIsMobile();
  const observer = useRef<IntersectionObserver | null>(null);
  
  // Fetch initial posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log("Fetching blog posts from Supabase...");
        
        // Updated query to only fetch published posts (published_at is not NULL)
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .not('published_at', 'is', null)
          .order('published_at', { ascending: false })
          .limit(POSTS_PER_PAGE + 1); // +1 to check if there are more posts
        
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
          
          // Check if there are more posts
          setHasMore(transformedPosts.length > POSTS_PER_PAGE);
          
          // Store only the posts we want to display now
          setPosts(transformedPosts.slice(0, POSTS_PER_PAGE));
        } else {
          console.error('Error or no data from Supabase:', error);
          console.log('Falling back to mock data');
          setPosts(mockBlogPosts.slice(0, POSTS_PER_PAGE));
          setHasMore(mockBlogPosts.length > POSTS_PER_PAGE);
        }
      } catch (error) {
        console.error('Exception fetching blog posts:', error);
        console.log('Falling back to mock data due to exception');
        setPosts(mockBlogPosts.slice(0, POSTS_PER_PAGE));
        setHasMore(mockBlogPosts.length > POSTS_PER_PAGE);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // Reset when category changes
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        setLoading(true);
        console.log(`Fetching ${activeCategory} posts from Supabase...`);
        
        let query = supabase
          .from('blog_posts')
          .select('*')
          .not('published_at', 'is', null)
          .order('published_at', { ascending: false })
          .limit(POSTS_PER_PAGE + 1);
        
        if (activeCategory !== "all") {
          query = query.eq('category', activeCategory);
        }
        
        const { data, error } = await query;
        
        console.log("Filtered Supabase query response:", { data, error });
          
        if (!error && data && data.length > 0) {
          console.log(`Fetched ${data.length} filtered blog posts from Supabase`);
          
          const transformedPosts = data.map(post => {
            let relatedApps = post.related_apps;
            if (!Array.isArray(relatedApps)) {
              relatedApps = relatedApps ? [relatedApps] : [];
            }
            
            return {
              ...post,
              id: post.id.toString(),
              related_apps: relatedApps
            } as BlogPost;
          });
          
          setHasMore(transformedPosts.length > POSTS_PER_PAGE);
          setPosts(transformedPosts.slice(0, POSTS_PER_PAGE));
        } else {
          console.error('Error or no filtered data from Supabase:', error);
          console.log('Falling back to filtered mock data');
          const filteredMockPosts = activeCategory === "all" 
            ? mockBlogPosts 
            : mockBlogPosts.filter(post => post.category === activeCategory);
          
          setPosts(filteredMockPosts.slice(0, POSTS_PER_PAGE));
          setHasMore(filteredMockPosts.length > POSTS_PER_PAGE);
        }
      } catch (error) {
        console.error('Exception fetching filtered blog posts:', error);
        console.log('Falling back to filtered mock data due to exception');
        const filteredMockPosts = activeCategory === "all" 
          ? mockBlogPosts 
          : mockBlogPosts.filter(post => post.category === activeCategory);
        
        setPosts(filteredMockPosts.slice(0, POSTS_PER_PAGE));
        setHasMore(filteredMockPosts.length > POSTS_PER_PAGE);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFilteredPosts();
  }, [activeCategory]);

  // Function to load more posts
  const loadMorePosts = useCallback(async () => {
    if (!hasMore || loadingMore) return;
    
    try {
      setLoadingMore(true);
      console.log("Loading more posts...");
      
      let query = supabase
        .from('blog_posts')
        .select('*')
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false })
        .gt('published_at', posts[posts.length - 1].published_at) // Load posts older than the last one
        .limit(POSTS_PER_PAGE + 1);
      
      if (activeCategory !== "all") {
        query = query.eq('category', activeCategory);
      }
      
      const { data, error } = await query;
      
      if (!error && data && data.length > 0) {
        console.log(`Loaded ${data.length} more posts`);
        
        const newPosts = data.map(post => {
          let relatedApps = post.related_apps;
          if (!Array.isArray(relatedApps)) {
            relatedApps = relatedApps ? [relatedApps] : [];
          }
          
          return {
            ...post,
            id: post.id.toString(),
            related_apps: relatedApps
          } as BlogPost;
        });
        
        setHasMore(newPosts.length > POSTS_PER_PAGE);
        setPosts(prevPosts => [...prevPosts, ...newPosts.slice(0, POSTS_PER_PAGE)]);
      } else {
        console.error('Error or no more data from Supabase:', error);
        console.log('No more posts to load or falling back to mock data');
        
        // If using mock data or no more posts
        setHasMore(false);
      }
    } catch (error) {
      console.error('Exception loading more posts:', error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [posts, activeCategory, hasMore, loadingMore]);
  
  // Setup the intersection observer for infinite scroll
  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || loadingMore) return;
    
    // Disconnect previous observer
    if (observer.current) {
      observer.current.disconnect();
    }
    
    // Create new observer
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    }, { rootMargin: '100px' });
    
    // Observe the last post element
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, loadingMore, hasMore, loadMorePosts]);

  // Create filtered posts based on active category
  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);
    
  if (loading && posts.length === 0) {
    return (
      <BlogLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Cargando artículos...</p>
        </div>
      </BlogLayout>
    );
  }
  
  // Map of category values to display names
  const categoryLabels = {
    "all": "Todos",
    "Normativa": "Normativa",
    "Registro Horario": "Registro Horario",
    "Productividad": "Productividad",
    "Trabajo Remoto": "Trabajo Remoto"
  };
  
  // Available categories for filtering
  const availableCategories = [
    "all", 
    "Normativa", 
    "Registro Horario", 
    "Productividad", 
    "Trabajo Remoto"
  ];
  
  return (
    <BlogLayout>
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <AdBanner position="top" adSize="728x90" />
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className={`${isMobile ? 'flex flex-wrap overflow-x-auto gap-1 bg-transparent p-0 h-auto' : 'grid grid-cols-5'} mb-8`}>
            {availableCategories.map((category) => (
              <TabsTrigger 
                key={category}
                value={category} 
                onClick={() => setActiveCategory(category)}
                className={isMobile ? 
                  `flex-1 min-w-[${category === 'all' ? '90' : category === 'Normativa' ? '110' : category === 'Productividad' ? '130' : category === 'Trabajo Remoto' ? '140' : '120'}px] bg-white shadow-sm` 
                  : ""}
              >
                {categoryLabels[category as keyof typeof categoryLabels]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {availableCategories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-8">
              {filteredPosts.length > 0 && (
                <>
                  {/* Featured post (first post) */}
                  <FeaturedPost post={filteredPosts[0]} />
                  
                  {/* Remaining posts grid */}
                  {filteredPosts.length > 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {filteredPosts.slice(1).map((post, index) => {
                        // Check if this is the last post in the array
                        const isLastElement = index === filteredPosts.slice(1).length - 1;
                        
                        // If it's the last element, add the ref for intersection observer
                        return isLastElement ? (
                          <div key={post.id} ref={lastPostElementRef}>
                            <BlogPostCard post={post} />
                          </div>
                        ) : (
                          <BlogPostCard key={post.id} post={post} />
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Loading indicator for infinite scroll */}
                  {loadingMore && (
                    <div className="flex justify-center py-6">
                      <Loader2 className="w-8 h-8 text-yellow-600 animate-spin" />
                    </div>
                  )}
                  
                  {/* End of posts message */}
                  {!hasMore && filteredPosts.length > 0 && (
                    <div className="text-center py-6 text-gray-500">
                      No hay más artículos para mostrar
                    </div>
                  )}
                </>
              )}
              
              {filteredPosts.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">No hay artículos en esta categoría</p>
                </div>
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
