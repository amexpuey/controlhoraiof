
-- =============================================
-- PHASE 1: Expand companies table + create auxiliary tables
-- =============================================

-- 1.1 Add new columns to companies table
ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS long_description TEXT,
  ADD COLUMN IF NOT EXISTS redirect_url TEXT,
  ADD COLUMN IF NOT EXISTS rank INTEGER,
  ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS pricing_model TEXT DEFAULT 'custom',
  ADD COLUMN IF NOT EXISTS price_per_user_month NUMERIC,
  ADD COLUMN IF NOT EXISTS min_price NUMERIC,
  ADD COLUMN IF NOT EXISTS has_free_trial_bool BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS free_trial_days INTEGER,
  ADD COLUMN IF NOT EXISTS has_time_tracking BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_mobile_app BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_geolocation BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_biometric BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_absence_management BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_shift_management BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_reports BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_api BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_remote_work BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_ai BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_employee_portal BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_payroll BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_geofence BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_project_management BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_document_management BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_performance_eval BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_recruitment BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_training BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_whistleblower BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS founded_year INTEGER,
  ADD COLUMN IF NOT EXISTS hq_country TEXT DEFAULT 'España',
  ADD COLUMN IF NOT EXISTS company_size_target TEXT DEFAULT 'all',
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS positioning_message TEXT,
  ADD COLUMN IF NOT EXISTS target_audience TEXT,
  ADD COLUMN IF NOT EXISTS key_differentiator TEXT,
  ADD COLUMN IF NOT EXISTS is_promoted BOOLEAN DEFAULT false;

-- 1.2 Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 1.3 Create solution_categories junction table
CREATE TABLE IF NOT EXISTS public.solution_categories (
  solution_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (solution_id, category_id)
);

-- 1.4 Create sectors table
CREATE TABLE IF NOT EXISTS public.sectors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  relevant_regulations TEXT,
  hero_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 1.5 Create solution_sectors junction table
CREATE TABLE IF NOT EXISTS public.solution_sectors (
  solution_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  sector_id UUID NOT NULL REFERENCES public.sectors(id) ON DELETE CASCADE,
  relevance_score INTEGER DEFAULT 50,
  PRIMARY KEY (solution_id, sector_id)
);

-- 1.6 Enable RLS on new tables (public read, no public write)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solution_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solution_sectors ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Categories are publicly readable" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Solution categories are publicly readable" ON public.solution_categories FOR SELECT USING (true);
CREATE POLICY "Sectors are publicly readable" ON public.sectors FOR SELECT USING (true);
CREATE POLICY "Solution sectors are publicly readable" ON public.solution_sectors FOR SELECT USING (true);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_companies_slug ON public.companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_rank ON public.companies(rank);
CREATE INDEX IF NOT EXISTS idx_companies_is_promoted ON public.companies(is_promoted);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_sectors_slug ON public.sectors(slug);
