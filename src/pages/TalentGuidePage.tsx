
import React, { useState } from "react";
import TalentGuide from "@/components/templates/TalentGuide";
import { AppHeader } from "@/components/layout/AppHeader";
import { TalentGuideHeader } from "@/components/templates/talent-guide/TalentGuideHeader";
import { IntroductionCard } from "@/components/templates/talent-guide/IntroductionCard";
import { ArrowDown, ClipboardList } from "lucide-react";

export default function TalentGuidePage() {
  const scrollToGuide = () => {
    const el = document.getElementById('talent-guide-content');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--white)' }}>
      <AppHeader />
      
      {/* Hero */}
      <div className="hero" style={{ padding: '56px 0 48px' }}>
        <div className="container">
          <TalentGuideHeader />
        </div>
      </div>
      
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '48px' }}>
        <IntroductionCard />
        
        {/* CTA to start filling the guide */}
        <div className="glass" style={{ padding: '32px', marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ 
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'var(--green-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <ClipboardList className="h-6 w-6" style={{ color: 'var(--green)' }} />
          </div>
          <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>¿Listo para empezar?</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.6 }}>
            Rellena los campos paso a paso en la guía interactiva de abajo. 
            Al finalizar, podrás generar y descargar tu informe en PDF.
          </p>
          <button className="btn btn-green btn-lg" onClick={scrollToGuide}>
            <ArrowDown className="h-5 w-5" /> Comenzar la guía
          </button>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '20px' }}>
            {["1. Datos", "2. Evaluación", "3. Objetivos", "4. Formación", "5. Resumen + PDF"].map((step) => (
              <span key={step} style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>{step}</span>
            ))}
          </div>
        </div>
        
        <div id="talent-guide-content">
          <TalentGuide />
        </div>
      </div>
    </div>
  );
}
