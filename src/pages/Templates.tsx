
import React, { useState } from "react";

import TemplatesGrid from "@/components/templates/TemplatesGrid";
import TemplateFilters from "@/components/templates/TemplateFilters";
import { TemplateCategory } from "@/components/templates/types";
import { templateData } from "@/components/templates/templateData";
import { AppHeader } from "@/components/layout/AppHeader";

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "all">("all");
  
  const filteredTemplates = templateData.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        
        <TemplatesGrid templates={filteredTemplates} />
      </main>
    </div>
  );
}
