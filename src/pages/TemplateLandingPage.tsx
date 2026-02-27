
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { templateData } from "@/components/templates/templateData";
import { AppHeader } from "@/components/layout/AppHeader";
import LeadGateModal from "@/components/templates/LeadGateModal";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbNav } from "@/components/seo/BreadcrumbNav";
import { Download, CheckCircle2, ArrowLeft, Clock, FileText, Users, Calendar, MessageSquare, GraduationCap, Briefcase, Book } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function TemplateLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | undefined>();

  const template = templateData.find((t) => t.id === slug);

  // For interactive templates, redirect to their dedicated pages
  useEffect(() => {
    if (template?.action === "edit" && template.editUrl?.startsWith("/")) {
      navigate(template.editUrl, { replace: true });
    }
  }, [template, navigate]);

  // Fetch PDF url from Supabase
  useEffect(() => {
    if (!slug) return;
    supabase
      .from("site_templates")
      .select("pdf_url")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()
      .then(({ data }) => {
        if (data?.pdf_url) setPdfUrl(data.pdf_url);
      });
  }, [slug]);

  const displayDownloads = useMemo(() => {
    if (!template?.baseDownloads) return null;
    const base = template.baseDownloads;
    const daysSinceEpoch = Math.floor(Date.now() / 86400000);
    const hash = template.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const dailyIncrement = ((daysSinceEpoch + hash) % 7) + 1;
    const dayOffset = daysSinceEpoch % 365;
    const total = base + (dayOffset * dailyIncrement);
    if (total >= 1000) return `${(total / 1000).toFixed(1).replace('.0', '')}k`;
    return total.toString();
  }, [template]);

  if (!template) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--white)' }}>
        <AppHeader />
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Plantilla no encontrada</h1>
          <Link to="/plantillas" className="btn btn-green">Ver todas las plantillas</Link>
        </div>
      </div>
    );
  }

  const isComingSoon = template.action === "download" && !pdfUrl;

  const getCategoryIcon = () => {
    const iconMap: Record<string, React.ReactNode> = {
      "Evaluación": <FileText className="h-6 w-6" />,
      "Control horario": <Clock className="h-6 w-6" />,
      "Formación": <GraduationCap className="h-6 w-6" />,
      "Comunicación Interna": <MessageSquare className="h-6 w-6" />,
      "Normativa Laboral": <Briefcase className="h-6 w-6" />,
      "Onboarding": <Users className="h-6 w-6" />,
      "Productividad": <Calendar className="h-6 w-6" />,
    };
    return iconMap[template.category] || <Book className="h-6 w-6" />;
  };

  const benefits = [
    "100% gratuita, sin costes ocultos",
    "Adaptada a la normativa española vigente",
    "Formato profesional listo para usar",
    "Descarga instantánea sin registro previo",
  ];

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Plantillas", href: "/plantillas" },
    { label: template.title },
  ];

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    "name": template.title,
    "description": template.metaDescription || template.description,
    "url": `https://fichajeempresas.es/plantillas/${template.id}`,
    "provider": {
      "@type": "Organization",
      "name": "FichajeEmpresas.es",
      "url": "https://fichajeempresas.es"
    },
    "category": template.category,
    "isAccessibleForFree": true,
    "inLanguage": "es",
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--white)' }}>
      <SEOHead
        title={`${template.title} | Plantilla Gratis - FichajeEmpresas`}
        description={template.metaDescription || template.description}
        canonical={`https://fichajeempresas.es/plantillas/${template.id}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <AppHeader />

      <div className="container" style={{ paddingTop: '24px', paddingBottom: '64px', maxWidth: '900px' }}>
        <BreadcrumbNav items={breadcrumbs} />

        <div className="template-landing-grid" style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          {/* Left: Image */}
          <div>
            <img
              src={template.imageSrc}
              alt={`Vista previa: ${template.title}`}
              style={{
                width: '100%',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--glass-shadow)',
              }}
            />
            {displayDownloads && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <Download className="h-3.5 w-3.5" />
                <span>{displayDownloads} descargas</span>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                {getCategoryIcon()}
                {template.category}
              </span>
            </div>

            <h1 style={{ fontSize: '26px', fontWeight: 700, lineHeight: 1.3, color: 'var(--text)', marginBottom: '12px' }}>
              {template.title}
            </h1>

            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              {template.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
              {benefits.map((b) => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 className="h-4 w-4" style={{ color: 'var(--green)', flexShrink: 0 }} />
                  {b}
                </div>
              ))}
            </div>

            {isComingSoon ? (
              <div className="btn btn-outline" style={{ opacity: 0.5, cursor: 'default', width: '100%', justifyContent: 'center' }}>
                <Clock className="h-4 w-4" /> Próximamente
              </div>
            ) : (
              <button
                className="btn btn-green btn-lg"
                style={{ width: '100%' }}
                onClick={() => setModalOpen(true)}
              >
                <Download className="h-5 w-5" /> {template.actionLabel || "Descargar gratis"}
              </button>
            )}

            <Link
              to="/plantillas"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px', fontSize: '13px', color: 'var(--text-muted)' }}
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Ver todas las plantillas
            </Link>
          </div>
        </div>
      </div>

      <LeadGateModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        templateTitle={template.title}
        templateSlug={template.id}
        templateImage={template.imageSrc}
        templateDescription={template.description}
        pdfUrl={pdfUrl}
        onAfterSubmit={() => {
          if (template.action === "external" && template.editUrl) {
            window.open(template.editUrl, "_blank");
          }
        }}
      />
    </div>
  );
}
