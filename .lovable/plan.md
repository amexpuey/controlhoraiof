

## Plan: Eliminar enlaces "Ver ejemplo" sin destino

### Problema
Los templates de descarga tienen `exampleLink: "#"` en sus datos, lo que genera botones "Ver ejemplo" que no llevan a ningún sitio.

### Solución

**1. Eliminar `exampleLink` de todos los templates en `templateData.ts`**
- Quitar la propiedad `exampleLink: "#"` de los 9 templates que la tienen (todos apuntan a `#`)

**2. Limpiar el renderizado en `TemplateCard.tsx`**
- Eliminar el bloque que renderiza el botón "Ver ejemplo" (líneas ~80-85), ya que ningún template tiene un enlace real

**3. Limpiar el tipo en `types.ts`**
- Eliminar la propiedad opcional `exampleLink` de la interfaz `TemplateData`

