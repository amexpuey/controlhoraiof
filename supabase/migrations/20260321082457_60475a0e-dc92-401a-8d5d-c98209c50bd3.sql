-- Ensure ranking apps are always first in relevance order
-- 1) Move conflicting low-rank legacy rows out of top 10
UPDATE public.companies
SET rank = rank + 100
WHERE rank <= 10
  AND slug NOT IN ('inwout','factorial','sesamehr','clockify','kenjo','hubstaff','binzneo','jorn-ada','ficha-work','skello');

-- 2) Set exact top-10 ranking order
UPDATE public.companies SET rank = 1  WHERE slug = 'inwout';
UPDATE public.companies SET rank = 2  WHERE slug = 'factorial';
UPDATE public.companies SET rank = 3  WHERE slug = 'sesamehr';
UPDATE public.companies SET rank = 4  WHERE slug = 'clockify';
UPDATE public.companies SET rank = 5  WHERE slug = 'kenjo';
UPDATE public.companies SET rank = 6  WHERE slug = 'hubstaff';
UPDATE public.companies SET rank = 7  WHERE slug = 'binzneo';
UPDATE public.companies SET rank = 8  WHERE slug = 'jorn-ada';
UPDATE public.companies SET rank = 9  WHERE slug = 'ficha-work';
UPDATE public.companies SET rank = 10 WHERE slug = 'skello';