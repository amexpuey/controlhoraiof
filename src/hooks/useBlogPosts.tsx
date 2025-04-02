
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/components/blog/FeaturedPost";
import { mockBlogPosts } from "@/data/mockBlogPosts";

// Number of posts to load each time
const POSTS_PER_PAGE = 9;

export function useBlogPosts(activeCategory: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const [lastFetchedPostDate, setLastFetchedPostDate] = useState<string | null>(null);
  
  // Initial fetch of posts
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        setLoading(true);
        setPosts([]);
        setLastFetchedPostDate(null);
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
          const postsToShow = transformedPosts.slice(0, POSTS_PER_PAGE);
          setPosts(postsToShow);
          
          if (postsToShow.length > 0) {
            setLastFetchedPostDate(postsToShow[postsToShow.length - 1].published_at);
          }
        } else {
          console.error('Error or no filtered data from Supabase:', error);
          console.log('Falling back to filtered mock data');
          const filteredMockPosts = activeCategory === "all" 
            ? mockBlogPosts 
            : mockBlogPosts.filter(post => post.category === activeCategory);
          
          setPosts(filteredMockPosts.slice(0, POSTS_PER_PAGE));
          setHasMore(filteredMockPosts.length > POSTS_PER_PAGE);
          
          if (filteredMockPosts.length > 0) {
            setLastFetchedPostDate(filteredMockPosts[POSTS_PER_PAGE - 1].published_at);
          }
        }
      } catch (error) {
        console.error('Exception fetching filtered blog posts:', error);
        console.log('Falling back to filtered mock data due to exception');
        const filteredMockPosts = activeCategory === "all" 
          ? mockBlogPosts 
          : mockBlogPosts.filter(post => post.category === activeCategory);
        
        setPosts(filteredMockPosts.slice(0, POSTS_PER_PAGE));
        setHasMore(filteredMockPosts.length > POSTS_PER_PAGE);
        
        if (filteredMockPosts.length > 0) {
          setLastFetchedPostDate(filteredMockPosts[POSTS_PER_PAGE - 1].published_at);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchFilteredPosts();
  }, [activeCategory]);

  // Function to load more posts
  const loadMorePosts = useCallback(async () => {
    if (!hasMore || loadingMore || !lastFetchedPostDate) return;
    
    try {
      setLoadingMore(true);
      console.log("Loading more posts...");
      console.log("Last fetched post date:", lastFetchedPostDate);
      
      let query = supabase
        .from('blog_posts')
        .select('*')
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false })
        .lt('published_at', lastFetchedPostDate) // Use less than instead of greater than
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
        const postsToAdd = newPosts.slice(0, POSTS_PER_PAGE);
        
        // Check for duplicates before adding new posts
        const existingIds = new Set(posts.map(post => post.id));
        const uniqueNewPosts = postsToAdd.filter(post => !existingIds.has(post.id));
        
        if (uniqueNewPosts.length > 0) {
          setPosts(prevPosts => [...prevPosts, ...uniqueNewPosts]);
          setLastFetchedPostDate(uniqueNewPosts[uniqueNewPosts.length - 1].published_at);
        } else {
          console.log("No new unique posts found");
          setHasMore(false);
        }
      } else {
        console.error('Error or no more data from Supabase:', error);
        console.log('No more posts to load or falling back to mock data');
        setHasMore(false);
      }
    } catch (error) {
      console.error('Exception loading more posts:', error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [posts, activeCategory, hasMore, loadingMore, lastFetchedPostDate]);
  
  // Last post element ref for infinite scrolling
  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || loadingMore) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    }, { rootMargin: '100px' });
    
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, loadingMore, hasMore, loadMorePosts]);

  // Filter posts based on active category
  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);
    
  return {
    posts: filteredPosts,
    loading,
    loadingMore,
    hasMore,
    lastPostElementRef
  };
}
