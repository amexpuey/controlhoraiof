-- Insert the calculadora-sanciones template into site_templates
INSERT INTO public.site_templates (slug, title, category, description, status)
VALUES (
  'calculadora-sanciones',
  'Calculadora de Sanciones Laborales 2026',
  'herramientas',
  'Calcula el rango estimado de sanciones por incumplimientos laborales según la LISOS.',
  'published'
) ON CONFLICT (slug) DO NOTHING;