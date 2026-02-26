

# Plan: Evolucionar fichajeempresas.es a Directorio Competitivo + Intelligence Hub

## Estado Actual

- **Tabla `companies`**: Solo 9 registros, con campos: title, slug, url, description, features (text[]), type, verified, is_top_rated, img_url, logo_url, pricing fields, highlights, rating, free_plan, free_trial, platforms, use_case
- **CSV disponible**: 96 soluciones con: title, url, page (slug), text (description), Category (semicolon-separated), Rank, isFree, isTopRated, verified, premium, imgUrl, logoUrl
- **Páginas existentes**: Dashboard (`/dashboard`) con grid+filtros, UserView (`/mejores-apps-control-horario/:slug`), ComparisonPage por UUIDs, Blog, ComplianceChecker, Templates, ComplianceKit
- **El CSV usa logos/imgs placeholder idénticas** para todas las soluciones -- necesitará enriquecimiento posterior

## Alcance del Plan -- Fase 1 (P0)

Dada la magnitud del proyecto, propongo implementar la **Fase 1** que cubre las piezas de mayor impacto SEO inmediato. Las fases 2 y 3 se implementarán en iteraciones posteriores.

---

## 1. Migración de Base de Datos

### 1.1 Expandir tabla `companies` (o crear `solutions`)

Crear una migración que añada columnas a `companies`:

```text
Nuevas columnas:
- long_description TEXT
- redirect_url TEXT  
- rank INTEGER
- is_free BOOLEAN DEFAULT false
- is_premium BOOLEAN DEFAULT false
- pricing_model TEXT (free/freemium/paid/custom)
- price_per_user_month NUMERIC
- min_price NUMERIC
- has_free_trial BOOLEAN
- free_trial_days INTEGER
- Feature booleans: has_time_tracking, has_mobile_app, has_geolocation, 
  has_biometric, has_absence_management, has_shift_management, 
  has_reports, has_api, has_remote_work, has_ai, has_employee_portal, 
  has_payroll, has_geofence, has_project_management, has_document_management
- founded_year INTEGER
- hq_country TEXT
- company_size_target TEXT
- meta_title TEXT
- meta_description TEXT
- positioning_message TEXT
- target_audience TEXT
- key_differentiator TEXT
- is_promoted BOOLEAN DEFAULT false
```

### 1.2 Crear tablas auxiliares

```text
categories (id, name, slug, description, icon)
solution_categories (solution_id FK companies, category_id FK categories)
sectors (id, name, slug, description, relevant_regulations, hero_image)
solution_sectors (solution_id, sector_id, relevance_score)
```

### 1.3 Importar datos del CSV

- Insertar las 96 soluciones del CSV en `companies`
- Parsear el campo `Category` (separado por `;`) para crear categorías y relaciones many-to-many
- Inferir feature booleans desde las categorías (ej: "Geolocalización" -> has_geolocation = true)
- INWOUT marcado como `is_promoted = true`, `rank = 100`

---

## 2. Nuevas Rutas y Páginas

### 2.1 Directorio Principal -- `/directorio`

- Grid responsivo de SolutionCards
- INWOUT siempre primera con badge "Recomendada"
- Panel de filtros lateral: categoría, modelo de precio, funcionalidades, valoración
- Buscador con autocompletado (cmdk ya instalado)
- Ordenar por: relevancia, nombre, precio, valoración
- Paginación (12-24 por página)
- Schema JSON-LD SoftwareApplication inyectado en cada tarjeta

### 2.2 Ficha Individual -- `/directorio/:slug`

- Hero con logo, nombre, descripción, badges, enlace web
- Tabla de funcionalidades con iconos check/cross
- Sección Pricing (placeholder "Consultar en su web")
- Sección "Lo que dicen los usuarios" (placeholder para reviews futuras)
- CTA lateral sticky "Prueba INWOUT gratis"
- Comparativa rápida automática vs INWOUT (tabla side-by-side)
- Breadcrumbs con schema BreadcrumbList
- Carrusel de 4-6 soluciones relacionadas (misma categoría)
- SEO: meta title "[Nombre] - Opiniones, Precios y Alternativas 2026"

### 2.3 Comparativas VS -- `/comparar/:slug1-vs-:slug2`

- Refactorizar la comparación existente (actualmente usa UUIDs) para usar slugs
- Tabla side-by-side de features con checks/crosses
- Sección "Veredicto" con mención a INWOUT
- Pre-generar links internos para los 15 principales vs INWOUT
- SEO: "[Solución A] vs [Solución B] - Comparativa 2026"

---

## 3. Componentes UI Nuevos

```text
src/components/directory/
  SolutionCard.tsx        -- Tarjeta con logo, nombre, badges, features, CTA
  SolutionGrid.tsx        -- Grid con paginación
  FilterSidebar.tsx       -- Filtros por categoría, precio, features
  SearchBar.tsx           -- Buscador con autocompletado
  SortSelect.tsx          -- Selector de ordenación
  
src/components/solution/
  SolutionHero.tsx        -- Hero de ficha individual
  FeatureChecklist.tsx    -- Lista de features check/cross
  PricingSection.tsx      -- Sección de precios
  ReviewsPlaceholder.tsx  -- Placeholder para reviews
  RelatedSolutions.tsx    -- Carrusel de soluciones relacionadas
  QuickComparison.tsx     -- Mini tabla comparativa vs INWOUT

src/components/comparison/
  VsComparisonTable.tsx   -- Tabla comparativa por slugs
  VerdictSection.tsx      -- Sección de veredicto

src/components/seo/
  SEOHead.tsx             -- Meta tags dinámicos + JSON-LD
  BreadcrumbNav.tsx       -- Breadcrumbs con schema markup

src/components/cta/
  InwoutCTA.tsx           -- CTA sticky reutilizable
  InwoutBanner.tsx        -- Banner flotante global
```

---

## 4. SEO Técnico

- Componente `SEOHead` que use `document.title` y meta tags dinámicos (React Helmet no disponible, usaremos `useEffect` para manipular `<head>`)
- JSON-LD schemas: SoftwareApplication, BreadcrumbList, FAQPage
- Internal linking automático entre fichas y comparativas
- Open Graph tags dinámicos

---

## 5. CTA Strategy (Transversal)

- `InwoutCTA` sticky en todas las fichas de competidores
- `InwoutBanner` flotante inferior en páginas del directorio
- INWOUT siempre con badge "Recomendada" y posición destacada
- Links a inwout.com en cada comparativa

---

## 6. Actualización de Rutas (App.tsx)

```text
Nuevas rutas:
/directorio                        -> DirectoryPage
/directorio/:slug                  -> SolutionPage  
/comparar/:slug1-vs-:slug2         -> VsComparisonPage
```

Mantener las rutas existentes (`/dashboard`, `/blog`, etc.) para no romper nada.

---

## 7. Hooks y Data Layer

```text
src/hooks/
  useSolutions.ts          -- Fetch + filtro + paginación de soluciones
  useSolution.ts           -- Fetch individual por slug
  useCategories.ts         -- Fetch categorías
  useComparison.ts         -- Fetch 2 soluciones por slug para comparar
  useRelatedSolutions.ts   -- Fetch soluciones de misma categoría
```

---

## Fases Posteriores (No incluidas en esta implementación)

- **Fase 2**: Páginas por sector (`/sector/:sector`), pricing intelligence (`/precios`), blog programático
- **Fase 3**: Mapa competitivo visual (`/mapa-competitivo`), sistema de reviews, calculadoras avanzadas

---

## Orden de Implementación

1. Migración DB: expandir `companies` + crear tablas auxiliares
2. Importar las 96 soluciones del CSV + crear categorías
3. Componentes base: SolutionCard, FeatureChecklist, InwoutCTA, SEOHead, BreadcrumbNav
4. Página Directorio (`/directorio`) con filtros y búsqueda
5. Página Ficha Individual (`/directorio/:slug`)
6. Página Comparativas VS (`/comparar/:slug1-vs-:slug2`)
7. Actualizar navegación global con links al directorio

