
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import TemplatesGrid from "@/components/templates/TemplatesGrid";
import TemplateFilters from "@/components/templates/TemplateFilters";
import { TemplateCategory, TemplateData } from "@/components/templates/types";
import { templateData } from "@/components/templates/templateData";
import { AppHeader } from "@/components/layout/AppHeader";
import LeadGateModal from "@/components/templates/LeadGateModal";
import { supabase } from "@/integrations/supabase/client";

interface SupabaseTemplate {
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  preview_image_url: string | null;
  pdf_url: string | null;
  cta_text: string | null;
  status: string;
}

export default function Templates() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "all">("all");
  const [publishedSlugs, setPublishedSlugs] = useState<Map<string, SupabaseTemplate>>(new Map());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);

  useEffect(() => {
    const fetchPublished = async () => {
      const { data } = await supabase
        .from("site_templates")
        .select("slug, title, description, category, preview_image_url, pdf_url, cta_text, status")
        .eq("status", "published");

      if (data) {
        const map = new Map<string, SupabaseTemplate>();
        (data as SupabaseTemplate[]).forEach((t) => map.set(t.slug, t));
        setPublishedSlugs(map);
      }
    };
    fetchPublished();
  }, []);

  // Merge hardcoded templates with Supabase data
  const mergedTemplates = templateData.map((t) => {
    const supaT = publishedSlugs.get(t.id);
    if (supaT) {
      return {
        ...t,
        title: supaT.title || t.title,
        description: supaT.description || t.description,
        imageSrc: supaT.preview_image_url || t.imageSrc,
        downloadUrl: supaT.pdf_url || t.downloadUrl,
        actionLabel: supaT.cta_text || "Descargar gratis",
        // Mark as published download
        _published: true,
      };
    }
    return { ...t, _published: false };
  });

  const filteredTemplates = mergedTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLeadGate = useCallback(
    (template: TemplateData & { _published?: boolean }) => {
      setSelectedTemplate(template);
      setModalOpen(true);
    },
    []
  );

  const handleAfterSubmit = useCallback(() => {
    if (!selectedTemplate) return;
    // For interactive/edit templates, navigate or open external
    if (selectedTemplate.action === "external") {
      window.open(selectedTemplate.editUrl, "_blank");
    } else if (selectedTemplate.action === "edit" && selectedTemplate.editUrl) {
      navigate(selectedTemplate.editUrl);
    }
  }, [selectedTemplate, navigate]);

  // Determine pdf_url for the modal
  const modalPdfUrl =
    selectedTemplate?.action === "download"
      ? (selectedTemplate as any).downloadUrl || undefined
      : undefined;

  return (
    <div className="min-h-screen" style={{ background: 'var(--white)' }}>
      <AppHeader />
      
      {/* Hero section */}
      <div className="hero">
        <div className="container">
          <div className="s-center">
            <div className="s-head">
              <div className="kicker" style={{ margin: '0 auto 20px' }}>
                <span className="kicker-dot" />
                Recursos gratuitos
              </div>
              <h1>Plantillas para <span className="accent">Gestión Laboral</span></h1>
              <p className="lead" style={{ margin: '0 auto 28px' }}>
                Descarga o edita plantillas prácticas para RRHH, control horario y cumplimiento normativo. 
                Todas gratuitas y adaptadas a la normativa española.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {["100% Gratuitas", "Sin registro", "Normativa española", "Actualizadas"].map((item) => (
                <span key={item} className="chip" style={{ background: 'rgba(255,255,255,.06)', borderColor: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.7)' }}>
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <main className="container" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <TemplateFilters 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <div className="mb-8">
          <input 
            type="text"
            placeholder="Buscar plantillas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border)',
              background: 'var(--white)',
              fontSize: '14px',
              color: 'var(--text)',
              outline: 'none',
              transition: 'border-color .2s var(--ease)',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--green)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
        
        <TemplatesGrid
          templates={filteredTemplates}
          publishedSlugs={publishedSlugs}
          onLeadGate={handleLeadGate}
        />
      </main>

      {selectedTemplate && (
        <LeadGateModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          templateTitle={selectedTemplate.title}
          templateSlug={selectedTemplate.id}
          templateImage={selectedTemplate.imageSrc}
          templateDescription={selectedTemplate.description}
          pdfUrl={modalPdfUrl}
          onAfterSubmit={handleAfterSubmit}
        />
      )}
    </div>
  );
}
