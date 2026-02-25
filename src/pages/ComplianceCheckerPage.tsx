
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import StandaloneComplianceChecker from "@/components/compliance/StandaloneComplianceChecker";
import { HeroSection } from "@/components/compliance/HeroSection";
import { HowItWorksSection } from "@/components/compliance/HowItWorksSection";
import { FinalCTASection } from "@/components/compliance/FinalCTASection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

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
    <div className="min-h-screen pb-12">
      <HeroSection onStartTest={handleStartTest} />
      <HowItWorksSection />

      {showTest && (
        <div ref={testRef} className="container">
          <StandaloneComplianceChecker isEmbedded={false} />
        </div>
      )}

      {/* FAQs */}
      <div className="container mb-12">
        <div className="glass card-lg">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-6 w-6" style={{ color: 'var(--teal)' }} />
            <h3 className="text-2xl font-bold" style={{ color: '#ffffff' }}>
              Preguntas frecuentes
            </h3>
          </div>

          <Accordion type="single" collapsible className="w-full faq">
            <AccordionItem value="item-1" className="glass mb-3 rounded-[var(--radius-md)] border-0">
              <AccordionTrigger className="px-5 py-4 text-left font-medium hover:no-underline" style={{ color: '#ffffff' }}>
                ¿Qué sanciones puede recibir mi empresa por no cumplir con el registro horario?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
                Las sanciones van desde 751€ hasta 7.500€ por infracción grave, según el RD 5/2000.
                El importe depende del tamaño de la empresa, duración del incumplimiento y reincidencia.
                En vía judicial, la condena media documentada es de 12.000€ por trabajador.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="glass mb-3 rounded-[var(--radius-md)] border-0">
              <AccordionTrigger className="px-5 py-4 text-left font-medium hover:no-underline" style={{ color: '#ffffff' }}>
                ¿Es obligatorio el registro horario para todas las empresas?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
                Sí, desde mayo de 2019 por el Real Decreto-ley 8/2019, <strong>todas las empresas</strong> deben llevar un registro diario de la jornada
                de todos sus empleados, sin excepción por tamaño o sector.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="glass mb-3 rounded-[var(--radius-md)] border-0">
              <AccordionTrigger className="px-5 py-4 text-left font-medium hover:no-underline" style={{ color: '#ffffff' }}>
                ¿Qué información debe incluir el registro horario?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
                Mínimo: hora de inicio y fin de jornada. Recomendado: descansos, pausas no computables,
                horas extra y ausencias. Los registros deben conservarse durante 4 años y estar disponibles para la Inspección.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="glass rounded-[var(--radius-md)] border-0">
              <AccordionTrigger className="px-5 py-4 text-left font-medium hover:no-underline" style={{ color: '#ffffff' }}>
                ¿Qué ocurre en una inspección de trabajo?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
                La Inspección de Trabajo puede solicitar los registros horarios de los últimos 4 años.
                Si no puedes presentarlos o son incompletos, la empresa se expone a sanciones de hasta 7.500€
                por infracción. En 2024 se registraron 1.869 infracciones por control horario en España.
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
