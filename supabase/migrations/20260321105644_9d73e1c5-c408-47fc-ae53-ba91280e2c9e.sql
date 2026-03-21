INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('8bcec206-075d-4408-9d12-245712b89471', 'admin'),
  ('52c4e08a-973d-48cf-9a98-c7ec83b9bc7d', 'admin'),
  ('4fff6b89-232f-4ed4-b9ef-6748a52199a2', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;