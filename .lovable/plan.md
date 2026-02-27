

## Plan: Admin Tab para gestionar artículos del blog

### Contexto
La tabla `site_articles` ya existe en Supabase con todos los campos necesarios (title, slug, content_html, status, featured_image, category, etc.). Se añadirá un nuevo tab "Artículos" en el panel de administración con listado, búsqueda, edición inline y opción de publicar/despublicar.

### Pasos de implementación

**1. Añadir tab "Artículos" al AdminHeader**
- Nuevo `<Link>` a `/admin/articles` en `src/components/admin/AdminHeader.tsx`

**2. Añadir ruta en App.tsx**
- Nueva ruta protegida `/admin/articles` apuntando a `AdminArticles`

**3. Crear página `src/pages/admin/Articles.tsx`**
- Lista de artículos desde `site_articles` con `@tanstack/react-query`
- Buscador por título/slug
- Filtro por categoría y estado (published/draft)
- Tabla con columnas: Título, Categoría, Estado, Fecha publicación, Acciones
- Botón rápido para cambiar estado (publicar/despublicar)
- Botón para abrir editor

**4. Crear componente editor `src/components/admin/ArticleEditor.tsx`**
- Modal/dialog con formulario completo para editar un artículo
- Campos editables:
  - **Básicos**: título, slug, excerpt, categoría, autor
  - **Contenido**: content_html (textarea grande), content_markdown
  - **SEO**: meta_title, meta_description, focus_keyword, canonical_url
  - **Imágenes**: featured_image (URL), featured_image_alt, og_image_url
  - **CTA**: primary_cta_text, primary_cta_url
  - **Estado**: status (published/draft), published_at
  - **Tags**: tags, secondary_keywords
- Botón guardar que hace `UPDATE` a `site_articles`
- Botón despublicar que cambia `status` a `draft`

**5. Crear componente tabla `src/components/admin/ArticlesTable.tsx`**
- Tabla reutilizable con las columnas del listado
- Badge de color para estado (verde=published, gris=draft)
- Acciones: Editar, Publicar/Despublicar, Ver en blog (link externo)

### Detalle técnico
- Query a `site_articles` usando `supabase.from('site_articles')` con cast `as any` (patrón ya usado en el proyecto)
- Updates directos vía `supabase.from('site_articles').update(...)` 
- No se requieren migraciones de BD (la tabla ya tiene todos los campos)
- Se sigue el mismo patrón de layout que Leads/Companies (AdminHeader + container)

