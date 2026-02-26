

# Plan: Treure anuncis + Aplicar disseny INWOUT a tota la web

## 1. Eliminar TOTS els espais publicitaris

### Fitxers a netejar (treure imports i ús d'AdBanner/SquareAdBanner):
- `src/pages/Dashboard.tsx` — treure DashboardAdBanners (top + bottom)
- `src/components/dashboard/DashboardContent.tsx` — treure sidebar AdBanner (300x600)
- `src/pages/UserView.tsx` — treure els 5 AdBanners (top, 2x in-content, sidebar, bottom)
- `src/components/blog/BlogPostSidebar.tsx` — treure 2x AdBanner sidebar
- `src/components/ui/alert-dialog.tsx` — treure SquareAdBanner
- `src/components/ui/dialog.tsx` — treure SquareAdBanner
- `src/components/ui/sheet.tsx` — treure SquareAdBanner
- `src/components/ui/drawer.tsx` — treure SquareAdBanner

### Fitxers que es poden eliminar:
- `src/components/ads/AdBanner.tsx`
- `src/components/ads/SquareAdBanner.tsx`
- `src/components/dashboard/DashboardAdBanners.tsx`
- `src/components/blog/BlogAdBanners.tsx`

## 2. Aplicar disseny INWOUT al Dashboard (header + hero)

### `DashboardHeader.tsx`:
- Header bar: `from-gray-800 to-gray-900` → `background: var(--dark)`
- CTA button: `bg-yellow-100 text-gray-800` → `bg-[var(--green)] text-white`
- Hero: `from-blue-50 to-white` → `background: radial-gradient(ellipse at 50% 120%, rgba(15,184,159,.12) 0%, transparent 60%), var(--dark)`
- Title + subtitle: white/muted sobre fondo dark
- Search icon: `text-blue-500` → `text-[var(--green)]`
- CTA button: `bg-blue-600` → `bg-[var(--green)]`
- Text "2025" → "2026"

### `AppHeader.tsx` (layout general):
- `from-gray-800 to-gray-900` → `background: var(--dark)`
- CTA: `bg-yellow-100` → `bg-[var(--green)] text-white`

## 3. Blog header — Treure "BLOG INWOUT"

### `BlogHeader.tsx`:
- Canviar kicker "── BLOG INWOUT" → "── BLOG" o "── RECURSOS"

## 4. BlogPostSidebar — Colors INWOUT

- Verificador box: `bg-blue-50 border-blue-200` → `bg-[var(--green-bg)] border-[var(--green-light)]`
- Title/text: `text-blue-800/700` → `color: var(--green-dark)`
- Button: `bg-blue-500` → `bg-[var(--green)]`
- Links "yellow-600" → `var(--green)`
- Dialog title/desc: `text-blue-800/700` → brand colors

## 5. Dashboard page background

- `from-primary-50 to-white` → `background: var(--white)`

