
-- Expand blog_posts with new columns for CMS
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS content_html TEXT,
  ADD COLUMN IF NOT EXISTS content_markdown TEXT,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS canonical_url TEXT,
  ADD COLUMN IF NOT EXISTS schema_json JSONB,
  ADD COLUMN IF NOT EXISTS focus_keyword TEXT,
  ADD COLUMN IF NOT EXISTS secondary_keywords TEXT[],
  ADD COLUMN IF NOT EXISTS featured_image_alt TEXT,
  ADD COLUMN IF NOT EXISTS og_image_url TEXT,
  ADD COLUMN IF NOT EXISTS tags TEXT[],
  ADD COLUMN IF NOT EXISTS pillar TEXT,
  ADD COLUMN IF NOT EXISTS related_solution_slugs TEXT[],
  ADD COLUMN IF NOT EXISTS comparison_type TEXT,
  ADD COLUMN IF NOT EXISTS author_avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS primary_cta_text TEXT DEFAULT 'Prueba INWOUT gratis',
  ADD COLUMN IF NOT EXISTS primary_cta_url TEXT DEFAULT 'https://app.inwout.com/register',
  ADD COLUMN IF NOT EXISTS show_comparison_cta BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS related_post_slugs TEXT[];

-- Set existing posts to published (they already have published_at)
UPDATE public.blog_posts SET status = 'published' WHERE published_at IS NOT NULL;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_focus_keyword ON public.blog_posts(focus_keyword);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_status ON public.blog_posts(category, status);

-- Drop existing RLS policies and create new ones
DROP POLICY IF EXISTS "Allow public read access to blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.blog_posts;

CREATE POLICY "Public read published posts" ON public.blog_posts
  FOR SELECT USING (status = 'published' AND published_at <= now());

-- Service role / authenticated admin full access
DROP POLICY IF EXISTS "Admin full access blog posts" ON public.blog_posts;
CREATE POLICY "Admin full access blog posts" ON public.blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: public read
CREATE POLICY "Public read blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

-- Storage policy: authenticated upload
CREATE POLICY "Auth upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
