
-- Assign rank to the 3 companies missing it so they show in directory
UPDATE companies SET rank = 101 WHERE slug = 'TalentionTime' AND rank IS NULL;
UPDATE companies SET rank = 102 WHERE slug = 'factorial' AND rank IS NULL;
UPDATE companies SET rank = 103 WHERE slug = 'TramitApp' AND rank IS NULL;
