
import BlogPostCard from "./BlogPostCard";
import type { BlogPost } from "./FeaturedPost";

interface BlogPostsGridProps {
  posts: BlogPost[];
  lastPostRef?: (node: HTMLDivElement | null) => void;
}

export default function BlogPostsGrid({ posts, lastPostRef }: BlogPostsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {posts.map((post, index) => {
        // Check if this is the last post in the array and we have a ref function
        const isLastElement = index === posts.length - 1 && lastPostRef;
        
        // If it's the last element, add the ref for intersection observer
        return isLastElement ? (
          <div key={post.id} ref={lastPostRef}>
            <BlogPostCard post={post} />
          </div>
        ) : (
          <div key={post.id}>
            <BlogPostCard post={post} />
          </div>
        );
      })}
    </div>
  );
}
