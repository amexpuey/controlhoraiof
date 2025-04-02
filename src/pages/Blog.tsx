
import { useState } from "react";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogCategoryTabs from "@/components/blog/BlogCategoryTabs";
import BlogPostsContent from "@/components/blog/BlogPostsContent";
import BlogAdBanners from "@/components/blog/BlogAdBanners";
import InteractiveToolsSection from "@/components/blog/InteractiveToolsSection";
import { useBlogPosts } from "@/hooks/useBlogPosts";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { posts, loading, loadingMore, hasMore, lastPostElementRef } = useBlogPosts(activeCategory);

  return (
    <BlogLayout>
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-8">
        <BlogAdBanners />
        
        <BlogCategoryTabs
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        >
          <BlogPostsContent
            posts={posts}
            loading={loading}
            loadingMore={loadingMore}
            hasMore={hasMore}
            lastPostElementRef={lastPostElementRef}
          />
        </BlogCategoryTabs>
        
        <InteractiveToolsSection />
      </main>
    </BlogLayout>
  );
}
