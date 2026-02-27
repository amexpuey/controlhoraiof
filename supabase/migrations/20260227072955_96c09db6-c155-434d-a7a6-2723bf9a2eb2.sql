
CREATE OR REPLACE FUNCTION public.increment_download_count(template_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.site_templates SET download_count = download_count + 1, updated_at = NOW()
  WHERE slug = template_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
