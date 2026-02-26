
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogArticleRenderer from "@/components/blog/BlogArticleRenderer";
import BlogPostSidebar from "@/components/blog/BlogPostSidebar";
import BlogSEOHead from "@/components/blog/BlogSEOHead";
import TableOfContents from "@/components/blog/TableOfContents";
import InwoutBlogCTA from "@/components/blog/InwoutBlogCTA";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { BreadcrumbNav } from "@/components/seo/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import type { BlogPost } from "@/types/blog";
import { mockBlogPosts } from "@/data/mockBlogPosts";
import { toast } from "react-hot-toast";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .single();

        if (!error && data) {
          setPost({ ...data, id: data.id.toString(), related_apps: data.related_apps || [] } as BlogPost);
        } else {
          const mockPost = mockBlogPosts.find((p) => p.slug === slug);
          if (mockPost) {
            setPost(mockPost as BlogPost);
          } else {
            toast.error("Artículo no encontrado");
          }
        }
      } catch {
        toast.error("Error al cargar el artículo");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <BlogLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 rounded w-1/3 mb-4" style={{ background: "var(--surface-alt)" }} />
            <div className="h-64 rounded mb-4" style={{ background: "var(--surface-alt)" }} />
            <div className="h-4 rounded w-1/2 mb-2" style={{ background: "var(--surface-alt)" }} />
          </div>
        </div>
      </BlogLayout>
    );
  }

  if (!post) {
    return (
      <BlogLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
          <Link to="/blog"><Button>Volver al blog</Button></Link>
        </div>
      </BlogLayout>
    );
  }

  const hasHtmlContent = !!post.content_html;

  return (
    <BlogLayout>
      <BlogSEOHead post={post} />
      <main className="container mx-auto px-4 py-8">
        <BreadcrumbNav
          items={[
            { label: "Inicio", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.category, href: `/blog/categoria/${post.category}` },
            { label: post.title },
          ]}
        />

        <div className="mb-4 mt-2">
          <Link to="/blog" className="flex items-center text-sm font-medium transition-colors hover:opacity-80" style={{ color: "var(--green)" }}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Volver al blog
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Mobile TOC */}
            {isMobile && hasHtmlContent && <TableOfContents contentHtml={post.content_html!} />}

            {hasHtmlContent ? (
              <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                {post.featured_image && (
                  <div className="w-full h-64 md:h-96 overflow-hidden">
                    <img src={post.featured_image} alt={post.featured_image_alt || post.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>
                  <div className="flex items-center text-sm text-gray-500 mb-6 gap-3">
                    <span>{new Date(post.published_at).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</span>
                    <span>•</span>
                    <span>{post.reading_time} min de lectura</span>
                    {post.author && <><span>•</span><span>{post.author}</span></>}
                  </div>
                  <BlogArticleRenderer contentHtml={post.content_html!} />
                </div>
              </article>
            ) : (
              <BlogPostContent post={post} />
            )}

            {/* CTA footer */}
            <InwoutBlogCTA
              variant="footer"
              ctaText={post.primary_cta_text || undefined}
              ctaUrl={post.primary_cta_url || undefined}
            />

            {/* Related Posts */}
            <RelatedPosts currentPost={post} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {!isMobile && hasHtmlContent && <TableOfContents contentHtml={post.content_html!} />}
            <InwoutBlogCTA variant="sidebar" ctaText={post.primary_cta_text || undefined} ctaUrl={post.primary_cta_url || undefined} />
            <BlogPostSidebar relatedApps={post.related_apps} />
          </div>
        </div>
      </main>
    </BlogLayout>
  );
}
