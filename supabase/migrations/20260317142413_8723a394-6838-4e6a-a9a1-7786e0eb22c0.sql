-- Remove duplicate leads keeping the most recent per email+slug
DELETE FROM plantilla_leads
WHERE id IN (5, 6, 7);

-- Now create unique constraint
CREATE UNIQUE INDEX plantilla_leads_email_slug_unique ON plantilla_leads (email, plantilla_slug);