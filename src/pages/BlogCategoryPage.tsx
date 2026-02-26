
import { useParams } from "react-router-dom";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogPostsContent from "@/components/blog/BlogPostsContent";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbNav } from "@/components/seo/BreadcrumbNav";

const categoryMeta: Record<string, { title: string; description: string }> = {
  "control-horario": { title: "Control Horario", description: "Artículos sobre control horario y registro de jornada laboral." },
  "normativa-legal": { title: "Normativa Legal", description: "Toda la normativa legal sobre registro de jornada en España." },
  "comparativas": { title: "Comparativas", description: "Comparativas entre las mejores apps de control horario." },
  "sectores": { title: "Sectores", description: "Control horario por sectores: hostelería, construcción, retail y más." },
  "gestion-ausencias": { title: "Gestión de Ausencias", description: "Guías sobre gestión de ausencias y vacaciones." },
  "productividad": { title: "Productividad", description: "Mejora la productividad de tu equipo con estas guías." },
  "guias": { title: "Guías", description: "Guías completas sobre control horario y gestión de RRHH." },
  "alternativas": { title: "Alternativas", description: "Alternativas a las principales apps de control horario." },
  // Legacy categories
  "Normativa": { title: "Normativa", description: "Artículos sobre normativa laboral." },
  "Registro Horario": { title: "Registro Horario", description: "Todo sobre el registro horario." },
  "Productividad": { title: "Productividad", description: "Artículos sobre productividad." },
  "Trabajo Remoto": { title: "Trabajo Remoto", description: "Guías sobre teletrabajo y trabajo remoto." },
};

export default function BlogCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { posts, loading, loadingMore, hasMore, lastPostElementRef } = useBlogPosts(category || "all");

  const meta = categoryMeta[category || ""] || { title: category || "Blog", description: "Artículos del blog." };

  return (
    <BlogLayout>
      <SEOHead
        title={`${meta.title} — Blog FichajesEmpresas.es`}
        description={meta.description}
        canonical={`https://fichajeempresas.es/blog/categoria/${category}`}
      />
      <main className="container mx-auto px-4 py-8">
        <BreadcrumbNav
          items={[
            { label: "Inicio", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: meta.title },
          ]}
        />
        <h1 className="text-3xl font-bold mt-4 mb-8">{meta.title}</h1>
        <BlogPostsContent
          posts={posts}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          lastPostElementRef={lastPostElementRef}
        />
      </main>
    </BlogLayout>
  );
}
