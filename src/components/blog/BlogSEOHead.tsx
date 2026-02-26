
import { useEffect } from "react";
import type { BlogPost } from "@/types/blog";

interface BlogSEOHeadProps {
  post: BlogPost;
}

export default function BlogSEOHead({ post }: BlogSEOHeadProps) {
  useEffect(() => {
    const title = post.meta_title || post.title;
    const description = post.meta_description || post.excerpt;
    const image = post.og_image_url || post.featured_image;
    const canonical = post.canonical_url || `https://fichajeempresas.es/blog/${post.slug}`;

    document.title = `${title} | FichajesEmpresas.es`;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "article");
    setMeta("property", "og:url", canonical);
    if (image) setMeta("property", "og:image", image);
    setMeta("property", "article:published_time", post.published_at);
    setMeta("property", "article:author", post.author || "FichajesEmpresas.es");

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (image) setMeta("name", "twitter:image", image);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

    // JSON-LD
    const existingScript = document.querySelector("script[data-blog-jsonld]");
    if (existingScript) existingScript.remove();

    const jsonLd = post.schema_json || {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: description,
      image: image,
      datePublished: post.published_at,
      author: { "@type": "Organization", name: post.author || "FichajesEmpresas.es" },
      publisher: { "@type": "Organization", name: "FichajesEmpresas.es" },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-blog-jsonld", "true");
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const s = document.querySelector("script[data-blog-jsonld]");
      if (s) s.remove();
    };
  }, [post]);

  return null;
}
