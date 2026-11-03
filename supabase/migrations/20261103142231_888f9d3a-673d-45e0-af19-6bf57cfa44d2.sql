-- Embeddings: staff only (edge functions use service role)
DROP POLICY IF EXISTS "allow_all_read" ON public.inwout_embeddings;
CREATE POLICY "Staff can read inwout embeddings" ON public.inwout_embeddings FOR SELECT TO authenticated USING (public.is_staff());
DROP POLICY IF EXISTS "allow_all_read" ON public.estatuto_embeddings;
CREATE POLICY "Staff can read estatuto embeddings" ON public.estatuto_embeddings FOR SELECT TO authenticated USING (public.is_staff());

-- Audit log: signed-in users can only log their own actions
DROP POLICY IF EXISTS "System can insert audit logs" ON public.security_audit_log;
CREATE POLICY "Users can insert own audit logs" ON public.security_audit_log FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Companies: only admins add (via existing ALL policy)
DROP POLICY IF EXISTS "Allow insert for all users" ON public.companies;

-- URL tracking: staff only
DROP POLICY IF EXISTS "Public can insert url tracking" ON public.url_tracking;
CREATE POLICY "Staff can insert url tracking" ON public.url_tracking FOR INSERT TO authenticated WITH CHECK (public.is_staff());

-- Public forms: validated inserts
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.alba_conversations;
CREATE POLICY "Anyone can create valid conversations" ON public.alba_conversations FOR INSERT TO anon, authenticated
WITH CHECK (length(session_id) BETWEEN 1 AND 200
  AND (user_email IS NULL OR (length(user_email) <= 255 AND user_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
  AND (user_name IS NULL OR length(user_name) <= 200));

DROP POLICY IF EXISTS "Anyone can create demo bookings" ON public.alba_demo_bookings;
CREATE POLICY "Anyone can create valid demo bookings" ON public.alba_demo_bookings FOR INSERT TO anon, authenticated
WITH CHECK (length(attendee_email) <= 255 AND attendee_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (attendee_name IS NULL OR length(attendee_name) <= 200)
  AND (company_name IS NULL OR length(company_name) <= 300)
  AND (observations IS NULL OR length(observations) <= 5000)
  AND pipedrive_notified_at IS NULL);

DROP POLICY IF EXISTS "Enable insert for all users" ON public.contact_submissions;
CREATE POLICY "Anyone can submit valid contact form" ON public.contact_submissions FOR INSERT TO anon, authenticated
WITH CHECK (length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (phone IS NULL OR length(phone) <= 50)
  AND (observations IS NULL OR length(observations) <= 5000));

DROP POLICY IF EXISTS "Allow public insert for web view tracking" ON public.email_clicks;
CREATE POLICY "Anyone can log valid web view clicks" ON public.email_clicks FOR INSERT TO anon, authenticated
WITH CHECK (url ~* '^https?://' AND length(url) <= 2048
  AND (user_agent IS NULL OR length(user_agent) <= 1000));

DROP POLICY IF EXISTS "Anyone can submit lead" ON public.plantilla_leads;
CREATE POLICY "Anyone can submit valid lead" ON public.plantilla_leads FOR INSERT TO anon, authenticated
WITH CHECK (length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(plantilla_slug) BETWEEN 1 AND 200
  AND (nombre IS NULL OR length(nombre) <= 200)
  AND (empresa IS NULL OR length(empresa) <= 300));

DROP POLICY IF EXISTS "Allow public insert on setup_requests" ON public.setup_requests;
CREATE POLICY "Anyone can submit valid setup request" ON public.setup_requests FOR INSERT TO anon
WITH CHECK (length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND num_users > 0 AND num_users <= 100000
  AND length(razon_social) <= 300 AND length(nif_cif) <= 20
  AND payment_confirmed_at IS NULL AND payment_confirmed_by IS NULL
  AND (payment_status IS NULL OR payment_status = 'pending'));

-- Public catalog reads: real predicates
DROP POLICY IF EXISTS "Categories are publicly readable" ON public.categories;
CREATE POLICY "Categories with slug are readable" ON public.categories FOR SELECT TO anon, authenticated USING (slug <> '');
DROP POLICY IF EXISTS "Sectors are publicly readable" ON public.sectors;
CREATE POLICY "Sectors with slug are readable" ON public.sectors FOR SELECT TO anon, authenticated USING (slug <> '');
DROP POLICY IF EXISTS "allow_all_read" ON public.help_steps;
CREATE POLICY "Visible help steps are readable" ON public.help_steps FOR SELECT TO anon, authenticated USING (visible IS DISTINCT FROM false);
DROP POLICY IF EXISTS "Solution sectors are publicly readable" ON public.solution_sectors;
CREATE POLICY "Solution sectors of listed companies are readable" ON public.solution_sectors FOR SELECT TO anon, authenticated
USING (EXISTS (SELECT 1 FROM public.companies c WHERE c.id = solution_id));
DROP POLICY IF EXISTS "Solution categories are publicly readable" ON public.solution_categories;
CREATE POLICY "Solution categories of listed companies are readable" ON public.solution_categories FOR SELECT TO anon, authenticated
USING (EXISTS (SELECT 1 FROM public.companies c WHERE c.id = solution_id));