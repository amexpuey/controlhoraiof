

# Plan: Blog/CMS Completo para fichajeempresas.es

## Estado Actual

- **Tabla `blog_posts`**: 13 columnas simples (title, slug, content, excerpt, category, featured_image, published_at, author, reading_time, related_apps, created_at, updated_at). Sin columnas de status, SEO, ni HTML dedicado.
- **Frontend**: Renderiza contenido via ReactMarkdown con procesamiento complejo de MD/HTML mixto. Sin tabla de contenidos, sin estilos para HTML pre-renderizado, sin CTAs dinámicos.
- **Categorías hardcodeadas**: "Normativa", "Registro Horario", "Productividad", "Trabajo Remoto"
- **Sin RLS basada en status** (no existe columna status)

---

## 1. Migración de Base de Datos

Expandir `blog_posts` con ~20 nuevas columnas:

```text
Nuevas columnas:
- content_html TEXT              -- HTML pre-renderizado (reemplaza content como fuente principal)
- content_markdown TEXT          -- Backup MD
- meta_title TEXT                -- SEO title alternativo
- meta_description TEXT          -- max 160 chars
- canonical_url TEXT
- schema_json JSONB              -- JSON-LD structured data
- focus_keyword TEXT
- secondary_keywords TEXT[]
- featured_image_alt TEXT
- og_image_url TEXT
- tags TEXT[]
- pillar TEXT
- related_solution_slugs TEXT[]
- comparison_type TEXT
- author_avatar_url TEXT
- status TEXT DEFAULT 'draft'    -- draft/published/scheduled/archived
- scheduled_at TIMESTAMPTZ
- primary_cta_text TEXT DEFAULT 'Prueba INWOUT gratis'
- primary_cta_url TEXT DEFAULT 'https://app.inwout.com/register'
- show_comparison_cta BOOLEAN DEFAULT true
- related_post_slugs TEXT[]
```

Renombrar columnas existentes para compatibilidad:
- `featured_image` se mantiene, `featured_image_url` será un alias via la app
- `content` se mantiene como fallback, `content_html` tiene prioridad
- `reading_time` se mantiene, `reading_time_minutes` será alias
- `author` se mantiene, `author_name` será alias

Nuevos indices: status, focus_keyword, category+status.

RLS actualizada: lectura pública solo para `status = 'published'` y `published_at <= now()`.

Storage bucket: `blog-images` (público).

---

## 2. Actualización de Categorías

Ampliar las categorías del blog para alinearse con el calendario editorial:

```text
control-horario, normativa-legal, comparativas, sectores,
gestion-ausencias, productividad, guias, alternativas
```

Actualizar `BlogCategoryTabs` con las nuevas categorías.

---

## 3. Nuevos Componentes

### 3.1 BlogArticleRenderer
- Recibe `content_html` y lo renderiza con `dangerouslySetInnerHTML`
- Clase contenedora `.blog-article-content` con estilos completos para:
  - Tipografía (h2-h4, p, strong, em, a)
  - Listas (ul/ol con bullets estilizados)
  - Tablas responsive
  - Blockquotes con borde verde (#0fb89f)
  - Code blocks
  - `.highlight-box`, `.warning-box`, `.danger-box`
  - `details/summary` FAQ
  - `.cta-section` con gradiente oscuro
  - Imágenes responsive con caption

### 3.2 TableOfContents
- Parsea content_html, extrae H2/H3 por sus IDs
- Navegación lateral sticky con scroll spy
- En móvil: colapsable arriba del artículo

### 3.3 InwoutBlogCTA
- Variantes: `inline`, `sidebar`, `footer`
- Texto y URL configurables desde los campos del post
- Gradiente oscuro (#0A1628) con acento verde (#0fb89f)

### 3.4 RelatedPosts
- Recibe post actual, muestra 3-4 posts de la misma categoría
- Fallback a posts más recientes

### 3.5 BlogSEOHead
- Reutiliza el `SEOHead` existente pero añade:
  - JSON-LD dinámico desde `schema_json` del post
  - Twitter Card tags
  - article:published_time, article:author

---

## 4. Actualización de Páginas

### 4.1 `/blog` (index)
- Actualizar `BlogPostCard` para mostrar excerpt, reading_time, tags
- Actualizar `useBlogPosts` para filtrar por `status = 'published'` (ya filtra por published_at, pero añadir status)
- Sidebar con categorías, posts populares, CTA INWOUT
- Inyectar SEO con Blog schema

### 4.2 `/blog/:slug` (artículo)
- Reemplazar `ArticleFormatter` (ReactMarkdown) por `BlogArticleRenderer` (HTML directo)
- Lógica: si `content_html` existe, usar BlogArticleRenderer; si no, fallback a ArticleFormatter actual
- Añadir `TableOfContents` en sidebar sticky
- Añadir `InwoutBlogCTA` al final del artículo
- Breadcrumbs: Home > Blog > [Categoría] > [Título]
- `RelatedPosts` al final (usa `related_post_slugs` o misma categoría)
- SEO dinámico completo desde los campos del post

### 4.3 `/blog/categoria/:category` (nueva ruta)
- Mismo layout que `/blog` pero filtrado por categoría
- H1 y meta description específicos

---

## 5. Estilos CSS

Añadir al `index.css` la clase `.blog-article-content` con todos los estilos para el HTML pre-renderizado (~80 líneas de CSS).

---

## 6. Edge Functions

### 6.1 Sitemap Blog (`/sitemap-blog.xml`)
- Edge function que genera XML sitemap con todos los posts publicados
- Incluye lastmod, changefreq, priority

### 6.2 RSS Feed (`/blog/feed.xml`)
- Edge function que genera RSS 2.0 con los últimos 20 posts

---

## 7. Actualización del Type BlogPost

Expandir la interfaz `BlogPost` en `FeaturedPost.tsx` (o moverla a `src/types/blog.ts`) con todos los campos nuevos, manteniendo los existentes como opcionales para retrocompatibilidad.

---

## 8. Compatibilidad

- Los posts existentes (que solo tienen `content` en markdown) seguirán funcionando: el renderer comprobará `content_html` primero, fallback a `content`
- Los mock posts siguen funcionando como fallback
- Las categorías antiguas se mapean a las nuevas

---

## Orden de Implementación

1. Migración DB + storage bucket
2. Tipo `BlogPost` expandido
3. Estilos CSS `.blog-article-content`
4. `BlogArticleRenderer` + `TableOfContents` + `InwoutBlogCTA` + `RelatedPosts`
5. Actualizar `/blog/:slug` con nuevo renderer y sidebar
6. Actualizar `/blog` con nuevas categorías y SEO
7. Nueva ruta `/blog/categoria/:category`
8. Edge functions: sitemap + RSS

