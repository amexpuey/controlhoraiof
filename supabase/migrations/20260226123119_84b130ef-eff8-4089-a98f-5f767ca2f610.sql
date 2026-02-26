
-- Create site_articles table for fichajesempresas.es own content
CREATE TABLE public.site_articles (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  content_html TEXT,
  content_markdown TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  featured_image TEXT,
  featured_image_alt TEXT,
  author TEXT DEFAULT 'FichajesEmpresas',
  author_avatar_url TEXT,
  reading_time INTEGER DEFAULT 5,
  published_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'draft',
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  secondary_keywords TEXT[],
  tags TEXT[],
  related_post_slugs TEXT[],
  canonical_url TEXT,
  og_image_url TEXT,
  schema_json JSONB,
  primary_cta_text TEXT,
  primary_cta_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_articles ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
CREATE POLICY "Public read published site_articles"
  ON public.site_articles FOR SELECT
  USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());

-- Authenticated users have full access (admin)
CREATE POLICY "Authenticated full access site_articles"
  ON public.site_articles FOR ALL
  USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_site_articles_slug ON public.site_articles(slug);
CREATE INDEX idx_site_articles_category_status ON public.site_articles(category, status);
CREATE INDEX idx_site_articles_published_at ON public.site_articles(published_at DESC);

-- Updated_at trigger
CREATE TRIGGER update_site_articles_updated_at
  BEFORE UPDATE ON public.site_articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
