INSERT INTO public.user_roles (user_id, role)
VALUES ('a21b48e7-7429-428b-b349-31265ac565f1', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;