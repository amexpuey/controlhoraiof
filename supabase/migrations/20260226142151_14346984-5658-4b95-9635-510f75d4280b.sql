
UPDATE site_articles 
SET 
  title = REPLACE(title, '2024', '2026'),
  content_html = REPLACE(content_html, '2024', '2026'),
  content = REPLACE(content, '2024', '2026'),
  updated_at = now()
WHERE content_html LIKE '%2024%' OR content LIKE '%2024%' OR title LIKE '%2024%';
