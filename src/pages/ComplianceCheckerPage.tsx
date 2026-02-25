
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import StandaloneComplianceChecker from "@/components/compliance/StandaloneComplianceChecker";
import { HeroSection } from "@/components/compliance/HeroSection";
import { HowItWorksSection } from "@/components/compliance/HowItWorksSection";
import { FinalCTASection } from "@/components/compliance/FinalCTASection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export default function ComplianceCheckerPage() {
  const [searchParams] = useSearchParams();
  const isEmbedded = searchParams.get("embed") === "true";
  const [showTest, setShowTest] = useState(false);
  const testRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEmbedded) {
      document.body.style.background = "transparent";
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      const footer = document.querySelector('footer');
      if (footer) footer.style.display = 'none';
      setShowTest(true);
    }

    return () => {
      document.body.style.background = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      const footer = document.querySelector('footer');
      if (footer) footer.style.display = '';
    };
  }, [isEmbedded]);

  const handleStartTest = () => {
    setShowTest(true);
    setTimeout(() => {
      testRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  if (isEmbedded) {
    return (
      <div className="min-h-screen">
        <StandaloneComplianceChecker isEmbedded={isEmbedded} />
      </div>
    );
  }

  return (
    <div className="compliance-theme min-h-screen pb-12">
      <HeroSection onStartTest={handleStartTest} />
      <HowItWorksSection />

      {showTest && (
        <div ref={testRef} className="container">
          <StandaloneComplianceChecker isEmbedded={false} />
        </div>
      )}

      {/* FAQs */}
      <div className="s-light">
        <div className="container">
          <div className="s-head">
            <div className="s-label">FAQ</div>
            <h2>Preguntas frecuentes</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="faq-item">
              <AccordionTrigger className="faq-q hover:no-underline">
                ¿Qué pasa si me hace una inspección de trabajo?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                La Inspección de Trabajo puede solicitar los registros horarios de los últimos 4 años.
                Si no puedes presentarlos o son incompletos, la empresa se expone a sanciones de hasta 7.500€
                por infracción. En 2024 se registraron 1.869 infracciones por control horario en España.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="faq-item">
              <AccordionTrigger className="faq-q hover:no-underline">
                ¿Vale el papel o el Excel para cumplir la ley?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Técnicamente sí, pero en la práctica la Inspección exige registros fiables, inalterables y accesibles.
                Un Excel o papel puede ser cuestionado por su facilidad de manipulación, lo que debilita tu posición ante una reclamación.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="faq-item">
              <AccordionTrigger className="faq-q hover:no-underline">
                ¿Desde cuándo es obligatorio el registro horario?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Desde mayo de 2019 por el Real Decreto-ley 8/2019. Todas las empresas deben llevar un registro diario
                de la jornada de todos sus empleados, sin excepción por tamaño o sector.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {!showTest && <FinalCTASection onStartTest={handleStartTest} />}

      {/* Compliance Footer */}
      <div className="compliance-footer">
        <div className="container">
          Verificador creado por <a href="https://www.inwout.com" target="_blank" rel="noopener noreferrer">INWOUT</a> · Software de control horario para empresas españolas
        </div>
      </div>
    </div>
  );
}
