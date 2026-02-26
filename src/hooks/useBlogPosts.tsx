
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/types/blog";
import { mockBlogPosts } from "@/data/mockBlogPosts";

const POSTS_PER_PAGE = 9;

export function useBlogPosts(activeCategory: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const [lastFetchedPostDate, setLastFetchedPostDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        setLoading(true);
        setPosts([]);
        setLastFetchedPostDate(null);

        let query = (supabase
          .from('site_articles' as any)
          .select('*')
          .eq('status', 'published') as any)
          .not('published_at', 'is', null)
          .order('published_at', { ascending: false })
          .limit(POSTS_PER_PAGE + 1);

        if (activeCategory !== "all") {
          query = query.eq('category', activeCategory);
        }

        const { data, error } = await query;

        // Combine DB posts with mock posts
        const dbPosts = (!error && data && data.length > 0)
          ? data.map(post => ({
              ...post,
              id: post.id.toString(),
              related_apps: Array.isArray(post.related_apps) ? post.related_apps : post.related_apps ? [post.related_apps] : []
            })) as BlogPost[]
          : [];

        const filteredMockPosts = activeCategory === "all"
          ? mockBlogPosts
          : mockBlogPosts.filter(post => post.category === activeCategory);

        // Merge: DB posts first, then mock posts not already in DB (by slug)
        const dbSlugs = new Set(dbPosts.map(p => p.slug));
        const uniqueMockPosts = (filteredMockPosts as BlogPost[]).filter(p => !dbSlugs.has(p.slug));
        const allPosts = [...dbPosts, ...uniqueMockPosts];

        setHasMore(allPosts.length > POSTS_PER_PAGE);
        const postsToShow = allPosts.slice(0, POSTS_PER_PAGE);
        setPosts(postsToShow);

        if (postsToShow.length > 0) {
          setLastFetchedPostDate(postsToShow[postsToShow.length - 1].published_at);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        const filteredMockPosts = activeCategory === "all"
          ? mockBlogPosts
          : mockBlogPosts.filter(post => post.category === activeCategory);
        setPosts(filteredMockPosts.slice(0, POSTS_PER_PAGE) as BlogPost[]);
        setHasMore(filteredMockPosts.length > POSTS_PER_PAGE);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredPosts();
  }, [activeCategory]);

  const loadMorePosts = useCallback(async () => {
    if (!hasMore || loadingMore || !lastFetchedPostDate) return;

    try {
      setLoadingMore(true);

      let query = (supabase
        .from('site_articles' as any)
        .select('*')
        .eq('status', 'published') as any)
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false })
        .lt('published_at', lastFetchedPostDate)
        .limit(POSTS_PER_PAGE + 1);

      if (activeCategory !== "all") {
        query = query.eq('category', activeCategory);
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        const newPosts = data.map(post => ({
          ...post,
          id: post.id.toString(),
          related_apps: Array.isArray(post.related_apps) ? post.related_apps : post.related_apps ? [post.related_apps] : []
        })) as BlogPost[];

        setHasMore(newPosts.length > POSTS_PER_PAGE);
        const postsToAdd = newPosts.slice(0, POSTS_PER_PAGE);

        const existingIds = new Set(posts.map(post => post.id));
        const uniqueNewPosts = postsToAdd.filter(post => !existingIds.has(post.id));

        if (uniqueNewPosts.length > 0) {
          setPosts(prev => [...prev, ...uniqueNewPosts]);
          setLastFetchedPostDate(uniqueNewPosts[uniqueNewPosts.length - 1].published_at);
        } else {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [posts, activeCategory, hasMore, loadingMore, lastFetchedPostDate]);

  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || loadingMore) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) loadMorePosts();
    }, { rootMargin: '100px' });

    if (node) observer.current.observe(node);
  }, [loading, loadingMore, hasMore, loadMorePosts]);

  return { posts, loading, loadingMore, hasMore, lastPostElementRef };
}
