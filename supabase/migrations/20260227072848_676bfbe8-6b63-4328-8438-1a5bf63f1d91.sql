
-- TABLA 1: site_templates
CREATE TABLE public.site_templates (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  keywords TEXT[],
  pdf_url TEXT,
  preview_image_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  download_count INTEGER DEFAULT 0,
  cta_text TEXT DEFAULT 'Descargar gratis',
  cta_url TEXT,
  inwout_pitch TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_templates ENABLE ROW LEVEL SECURITY;

-- Lectura pública solo de plantillas publicadas
CREATE POLICY "Public can read published templates"
  ON public.site_templates FOR SELECT
  USING (status = 'published');

-- TABLA 2: plantilla_leads
CREATE TABLE public.plantilla_leads (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  nombre TEXT,
  empresa TEXT,
  plantilla_slug TEXT NOT NULL REFERENCES public.site_templates(slug),
  source TEXT DEFAULT 'fichajeempresas.es',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_plantilla_leads_email ON public.plantilla_leads(email);
CREATE INDEX idx_plantilla_leads_slug ON public.plantilla_leads(plantilla_slug);

ALTER TABLE public.plantilla_leads ENABLE ROW LEVEL SECURITY;

-- Anon puede insertar leads (formulario público)
CREATE POLICY "Anyone can submit lead"
  ON public.plantilla_leads FOR INSERT
  WITH CHECK (true);

-- Trigger para updated_at en site_templates
CREATE TRIGGER update_site_templates_updated_at
  BEFORE UPDATE ON public.site_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
