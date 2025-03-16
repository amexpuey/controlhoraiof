
import BlogPostCard from "./BlogPostCard";
import type { BlogPost } from "./FeaturedPost";

interface BlogPostsGridProps {
  posts: BlogPost[];
}

export default function BlogPostsGrid({ posts }: BlogPostsGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
