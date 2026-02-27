CREATE POLICY "Authenticated users can read leads"
ON public.plantilla_leads
FOR SELECT
TO authenticated
USING (true);