
import { Loader2 } from "lucide-react";
import FeaturedPost from "./FeaturedPost";
import BlogPostsGrid from "./BlogPostsGrid";
import type { BlogPost } from "./FeaturedPost";

interface BlogPostsContentProps {
  posts: BlogPost[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  lastPostElementRef: (node: HTMLDivElement | null) => void;
}

export default function BlogPostsContent({
  posts,
  loading,
  loadingMore,
  hasMore,
  lastPostElementRef
}: BlogPostsContentProps) {
  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-yellow-600 animate-spin mr-2" />
        <p className="text-lg">Cargando artículos...</p>
      </div>
    );
  }

  if (posts.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">No hay artículos en esta categoría</p>
      </div>
    );
  }

  return (
    <>
      {posts.length > 0 && (
        <>
          <FeaturedPost post={posts[0]} />
          
          {posts.length > 1 && (
            <div className="mt-8">
              <BlogPostsGrid 
                posts={posts.slice(1)} 
                lastPostRef={lastPostElementRef} 
              />
            </div>
          )}
          
          {loadingMore && (
            <div className="flex justify-center py-6">
              <Loader2 className="w-8 h-8 text-yellow-600 animate-spin" />
            </div>
          )}
          
          {!hasMore && posts.length > 0 && (
            <div className="text-center py-6 text-gray-500">
              No hay más artículos para mostrar
            </div>
          )}
        </>
      )}
    </>
  );
}
