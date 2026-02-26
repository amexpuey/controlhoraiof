

# Plan: Alinear el Blog al Look & Feel de INWOUT

## Problema Actual

El blog usa colores legacy (yellow-600, blue-50, gray-800) que no coinciden con INWOUT. El design system en `index.css` YA tiene los tokens de INWOUT (`--green: #0fb89f`, `--dark: #0A1628`), pero los componentes del blog no los usan.

## Cambios

### 1. BlogLayout — Fondo y Header
- Cambiar `from-blue-50 to-white` → `bg-[var(--white)]`
- Header: usar clases del design system (`bg-[var(--dark)]`) en lugar de `from-gray-800 to-gray-900`
- CTA "Descubre las mejores apps": de `bg-yellow-100` → `bg-[var(--green)] text-white`

### 2. BlogHeader — Hero estilo INWOUT
- Usar el patrón `.hero` del design system (fondo `--dark`, radial gradient verde)
- Kicker con `.s-label` style: "── BLOG INWOUT"
- Título con `.accent` (verde) en la keyword principal
- Subtítulo con `--dark-muted`

### 3. BlogCategoryTabs — Pills estilo INWOUT
- Reemplazar shadcn `Tabs/TabsTrigger` por pills con dot verde (como en inwout.com/blog)
- Estilo: border pill, dot colored cuando activo, fondo `--green-bg` cuando seleccionado
- Eliminar categorías legacy

### 4. BlogPostCard — Colores INWOUT
- Link "Leer más": de `text-yellow-600` → `text-[var(--green)]` con flecha
- Category badge: de `text-yellow-700` → verde
- Tags: chip style del design system
- Card: usar `.feature-card` hover pattern (border-color green on hover)

### 5. FeaturedPost — CTA verde
- Botón: de `bg-yellow-600` → `bg-[var(--green)]` con `color: var(--dark)`
- Category badge: verde
- Tags: chip style

### 6. BlogPost page — Links y detalles
- "Volver al blog": de `text-yellow-600` → `text-[var(--green)]`
- Loading skeleton: usar `bg-[var(--surface-alt)]` en lugar de `bg-gray-200`

### 7. BlogPostContent — Coherencia
- Meta text: usar `var(--text-muted)` en lugar de hardcoded grays

### 8. InwoutBlogCTA — Ya bien, pequeños ajustes
- Ya usa los colores correctos (#0A1628, #0fb89f), mantener

## Archivos a editar

1. `src/components/blog/BlogLayout.tsx`
2. `src/components/blog/BlogHeader.tsx`
3. `src/components/blog/BlogCategoryTabs.tsx`
4. `src/components/blog/BlogPostCard.tsx`
5. `src/components/blog/FeaturedPost.tsx`
6. `src/pages/BlogPost.tsx`
7. `src/components/blog/BlogPostContent.tsx`

