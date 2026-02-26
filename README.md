# FichajesEmpresas.es

> Anteriormente conocido como controlhorarioelectronico.com

## ¿Qué es?

FichajesEmpresas.es es un directorio web y hub de contenido SEO enfocado en el **control horario para empresas en España**. Su objetivo principal es captar tráfico orgánico cualificado relacionado con fichajes, registro de jornada y cumplimiento normativo laboral, y canalizarlo hacia [INWOUT](https://www.inwout.com), software de control horario.

### Funcionalidades principales

- **Directorio de apps de fichaje**: Comparativa de las principales aplicaciones de control horario del mercado español, con filtros por funcionalidades, disponibilidad y valoraciones.
- **Verificador de cumplimiento legal**: Herramienta interactiva que permite a las empresas comprobar si cumplen con la normativa de registro de jornada (RD-Ley 8/2019), con cálculo de posibles sanciones.
- **Calculadora de sanciones**: Estimador del importe de multas según tipo de infracción, tamaño de empresa y duración del incumplimiento.
- **Blog SEO**: Artículos optimizados sobre normativa laboral, control horario, horas extra y cumplimiento legal.
- **Kit de cumplimiento legal**: Módulos de aprendizaje, checklists, plantillas y simulador de riesgo legal para empresas.
- **Plantillas y herramientas**: Fichas horarias descargables, calculadora de horas trabajadas y guía de gestión del talento.
- **Onboarding de captación**: Flujo de registro por email segmentado por tamaño de empresa y funcionalidades de interés.

## Stack tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM v6
- **Estado y datos**: TanStack React Query + Supabase (auth, base de datos, edge functions)
- **Animaciones**: Framer Motion
- **Despliegue**: Lovable Cloud / Netlify

## Estrategia SEO para INWOUT

El proyecto está diseñado como una **herramienta de posicionamiento orgánico** para INWOUT:

1. **Contenido transaccional**: El verificador de cumplimiento y la calculadora de sanciones atraen usuarios con intención de compra alta (empresas preocupadas por cumplir la ley).
2. **Contenido informativo**: Blog y módulos de aprendizaje posicionan para keywords long-tail como "es obligatorio el control horario", "sanción por no fichar", etc.
3. **Comparativas**: El directorio de apps posiciona para búsquedas comparativas ("mejor app fichaje empresa") donde INWOUT aparece destacada.
4. **CTAs estratégicos**: Todos los flujos terminan sugiriendo INWOUT como solución, con enlaces directos a registro y demo.
5. **Herramientas gratuitas**: Las plantillas y calculadoras generan backlinks naturales y tráfico recurrente.
6. **Embeddable**: El verificador de cumplimiento puede embeberse en webs de terceros (`?embed=true`), ampliando el alcance de marca.

## Desarrollo local

```sh
git clone <URL_DEL_REPO>
cd <NOMBRE_DEL_PROYECTO>
npm install
npm run dev
```

Requiere Node.js 18+ y las variables de entorno de Supabase configuradas en `.env`.
