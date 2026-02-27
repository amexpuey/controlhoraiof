

## Test Results

I tested the full download flow end-to-end in the Lovable preview:

1. Navigated to `/plantillas`
2. Clicked "Descargar gratis" on "Control de Ausencias" → lead gate modal opened correctly
3. Filled email (`test-e2e@lovable.dev`), nombre (`Test User`), empresa (`Lovable Inc`)
4. Clicked "Descargar ahora" → modal closed, toast "¡Descarga iniciada!" appeared, no console errors
5. Verified the lead was saved in `plantilla_leads` table (id=3, all fields correct)

**Result: The download flow works correctly end-to-end.**

---

## Plan: Admin Leads Panel

### Discovery

The admin routes (`/admin/companies`, `/admin/users`) are **not defined in App.tsx** -- they're caught by the `*` wildcard and render DirectoryPage (which happens to work because existing admin pages may not be reached). I need to add proper routes.

The `plantilla_leads` table has: `id`, `email`, `nombre`, `empresa`, `plantilla_slug`, `source`, `utm_source`, `utm_medium`, `utm_campaign`, `created_at`.

### Implementation Steps

1. **Create `src/pages/admin/Leads.tsx`** -- New page with AdminHeader, fetches from `plantilla_leads` ordered by `created_at DESC`. Includes:
   - Search by email/nombre/empresa
   - Filter by `plantilla_slug` (dropdown)
   - Table with columns: Email, Nombre, Empresa, Plantilla, Source, UTM Source, Fecha
   - CSV download button
   - Total lead count badge

2. **Create `src/components/admin/LeadsTable.tsx`** -- Table component displaying leads with the columns above, using the existing shadcn Table components.

3. **Create `src/components/admin/LeadsTableHeader.tsx`** -- Search input + slug filter dropdown + CSV download button (following the pattern of `UsersTableHeader`).

4. **Update `src/components/admin/AdminHeader.tsx`** -- Add a third nav link: "Leads" pointing to `/admin/leads`.

5. **Update `src/App.tsx`** -- Add the missing admin routes:
   - `/admin/companies` → Companies page (wrapped in ProtectedRoute)
   - `/admin/users` → Users page (wrapped in ProtectedRoute)
   - `/admin/leads` → Leads page (wrapped in ProtectedRoute)
   - `/login` → Login page

