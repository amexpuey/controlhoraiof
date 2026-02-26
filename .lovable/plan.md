

## Pla: Injectar dades del scraping a les fitxes de solucions

### Situació actual
- 98 empreses a la taula `companies`, 95 amb logos/imatges placeholder (`unicorn-cdn`, `ucarecdn`)
- JSON amb 96 empreses amb dades reals: logos, screenshots i thumbnails ja pujats a Supabase Storage, descripcions actualitzades, features complets, social links, pricing, meta_title, og_image
- La taula NO té columnes per: `screenshot_url`, `thumbnail_url`, `social` (jsonb), `og_image`, `scrape_status`, `scrape_date`

### Pas 1: Migració SQL - Afegir columnes noves

Afegir a `companies`:
- `screenshot_url TEXT` (imatge principal 1200x630)
- `thumbnail_url TEXT` (imatge 512x512)
- `og_image TEXT`
- `social JSONB DEFAULT '{}'`
- `scrape_status TEXT`
- `scrape_date DATE`

### Pas 2: Edge function `import-solutions` - Reescriure

Reescriure l'edge function existent per acceptar el JSON complet via POST i fer upsert per slug:

**Mapping de camps:**
- `logo_url` → `logo_url`
- `screenshot_url` → `screenshot_url` (nou) + `img_url` (existent, per compatibilitat)
- `thumbnail_url` → `thumbnail_url` (nou)
- `description` → `description`
- `all_features` → `features` (array)
- `rank`, `is_free`, `is_top_rated`, `verified` → directes
- `premium` → `is_premium`
- `url` → `url` + `redirect_url`
- `meta_title` → `meta_title`
- `og_image` → `og_image`
- `social` → `social` (jsonb)
- `pricing.has_free_plan` → `free_plan` = 'yes'/'no'
- `pricing.tiers[0].price` → `pricing_starting_price`, `min_price`
- `all_features` → mapejar als camps `has_*` booleans (has_time_tracking, has_mobile_app, etc.)
- `scrape_status`, `scrape_date` → directes

**Feature → Boolean mapping:**
```
"Control Horario" → has_time_tracking
"Apps" → has_mobile_app
"Geolocalización" → has_geolocation
"Sistemas Biométricos" → has_biometric
"Gestión de Ausencias" → has_absence_management
"Gestión de Turnos" → has_shift_management
"Reportes" → has_reports
"Integraciones API" → has_api
"Teletrabajo" → has_remote_work
"AI" → has_ai
"Portal del Empleado" → has_employee_portal
"Nóminas" → has_payroll
"Geofence" → has_geofence
"Gestión de proyectos" → has_project_management
"Gestión Documental" → has_document_management
"Evaluación Desempeño" → has_performance_eval
"Selección de Personal" → has_recruitment
"Formación" → has_training
"Canal de Denuncias" → has_whistleblower
```

### Pas 3: Executar la importació

Copiar `companies.json` al projecte, cridar l'edge function amb les dades, i verificar que s'actualitzen les 96 empreses.

### Pas 4: Actualitzar `SolutionPage.tsx` per mostrar les noves dades

- Mostrar `screenshot_url` com a imatge hero de la fitxa
- Mostrar xarxes socials (`social` jsonb) amb icones
- Mostrar `og_image` com a fallback d'imatge

### Resum de fitxers

| Acció | Fitxer |
|-------|--------|
| Migració SQL | Afegir 6 columnes noves a `companies` |
| Reescriure | `supabase/functions/import-solutions/index.ts` |
| Editar | `src/pages/SolutionPage.tsx` (screenshot, social links) |
| Editar | `src/components/directory/SolutionCard.tsx` (thumbnail) |

