
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import StandaloneComplianceChecker from "@/components/compliance/StandaloneComplianceChecker";
import { HeroSection } from "@/components/compliance/HeroSection";
import { HowItWorksSection } from "@/components/compliance/HowItWorksSection";
import { StatsSection } from "@/components/compliance/StatsSection";
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
      <div className="cc-page">
        <StandaloneComplianceChecker isEmbedded={isEmbedded} />
      </div>
    );
  }

  return (
    <div className="cc-page">
      {/* Hero */}
      <HeroSection onStartTest={handleStartTest} />
      
      {/* Stats */}
      <StatsSection />
      
      {/* How It Works */}
      <HowItWorksSection />
      
      {/* Test Section */}
      {showTest && (
        <div ref={testRef} className="cc-container cc-section">
          <StandaloneComplianceChecker isEmbedded={false} />
        </div>
      )}
      
      {/* FAQs */}
      <div className="cc-container cc-section">
        <div className="cc-card" style={{ padding: '32px' }}>
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-6 w-6" style={{ color: '#0FB89F' }} />
            <h3 className="cc-h3">Preguntas frecuentes</h3>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="item-1" className="cc-faq-item">
              <AccordionTrigger className="cc-faq-trigger">
                ¿Qué sanciones puede recibir mi empresa por no cumplir con el registro horario?
              </AccordionTrigger>
              <AccordionContent className="cc-faq-content">
                Las sanciones van desde 625€ hasta 6.250€ para infracciones graves, llegando hasta 7.500€ por infracción según el grado máximo actual de la ITSS. 
                El importe depende del tamaño de la empresa, duración del incumplimiento y reincidencia.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="cc-faq-item">
              <AccordionTrigger className="cc-faq-trigger">
                ¿Es obligatorio el registro horario para todas las empresas?
              </AccordionTrigger>
              <AccordionContent className="cc-faq-content">
                Sí, desde el Real Decreto-ley 8/2019 (mayo 2019), <strong>todas las empresas</strong> deben llevar un registro diario de la jornada 
                de todos sus empleados, sin excepción por tamaño o sector. Esto incluye autónomos con empleados.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="cc-faq-item">
              <AccordionTrigger className="cc-faq-trigger">
                ¿Qué información debe incluir el registro horario?
              </AccordionTrigger>
              <AccordionContent className="cc-faq-content">
                Mínimo: hora de inicio y fin de jornada. <strong>Recomendado:</strong> descansos, pausas no computables, 
                horas extra y ausencias. Los registros deben conservarse durante 4 años y estar disponibles para la Inspección.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="cc-faq-item">
              <AccordionTrigger className="cc-faq-trigger">
                ¿Existen casos reales de sanciones por incumplimiento?
              </AccordionTrigger>
              <AccordionContent className="cc-faq-content">
                Sí. Un restaurante (5 empleados) fue multado con 700€ por 2 meses sin registro. 
                Una empresa de servicios (15 empleados) fue sancionada con 3.000€ por no comunicar registros a representantes. 
                Una consultoría (8 empleados) recibió multa de 1.200€ por registros incompletos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      {/* Final CTA */}
      {!showTest && <FinalCTASection onStartTest={handleStartTest} />}
      
      {/* Footer */}
      <div className="cc-container" style={{ paddingBottom: '48px', paddingTop: '24px' }}>
        <div className="text-center">
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            Verificador creado por{' '}
            <a href="https://www.inwout.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0FB89F', textDecoration: 'none' }}>
              INWOUT
            </a>
            {' '}· Software de control horario para empresas españolas
          </p>
        </div>
      </div>
    </div>
  );
}
