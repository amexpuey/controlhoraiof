
-- Add new columns for scraped data
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS screenshot_url TEXT;
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS social JSONB DEFAULT '{}';
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS scrape_status TEXT;
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS scrape_date DATE;
