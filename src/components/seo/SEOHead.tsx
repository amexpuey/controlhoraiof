import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown>;
}

export function SEOHead({ title, description, canonical, ogImage, jsonLd }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', 'website', 'property');
    if (ogImage) setMeta('og:image', ogImage, 'property');
    if (canonical) {
      setMeta('og:url', canonical, 'property');
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // JSON-LD
    if (jsonLd) {
      const existingScript = document.querySelector('script[data-seo-jsonld]');
      if (existingScript) existingScript.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.querySelector('script[data-seo-jsonld]');
      if (script) script.remove();
    };
  }, [title, description, canonical, ogImage, jsonLd]);

  return null;
}
