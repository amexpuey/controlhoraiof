
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import StandaloneComplianceChecker from "@/components/compliance/StandaloneComplianceChecker";
import { HeroSection } from "@/components/compliance/HeroSection";
import { HowItWorksSection } from "@/components/compliance/HowItWorksSection";
import { FinalCTASection } from "@/components/compliance/FinalCTASection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function ComplianceCheckerPage() {
  const [searchParams] = useSearchParams();
  const isEmbedded = searchParams.get("embed") === "true";
  const [showTest, setShowTest] = useState(false);
  const testRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Height management script for iframe
    function postHeight() {
      const h = document.documentElement.scrollHeight;
      parent.postMessage({ type: 'INWOUT_IFRAME_HEIGHT', height: h }, '*');
    }
    
    // Set body styles for embedded mode
    if (isEmbedded) {
      document.body.style.background = "transparent";
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      
      // Hide the footer when in embedded mode
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = 'none';
      }
      setShowTest(true); // Show test directly in embedded mode
      
      // Add height management listeners for embedded mode
      window.addEventListener('load', postHeight);
      window.addEventListener('resize', postHeight);
      
      // Post height immediately
      postHeight();
    }
    
    return () => {
      // Reset styles when component unmounts
      document.body.style.background = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      
      // Restore footer display
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = '';
      }
      
      // Remove height management listeners
      if (isEmbedded) {
        window.removeEventListener('load', postHeight);
        window.removeEventListener('resize', postHeight);
      }
    };
  }, [isEmbedded]);

  const handleStartTest = () => {
    setShowTest(true);
    // Smooth scroll to test section
    setTimeout(() => {
      testRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
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
      {/* Hero Section */}
      <HeroSection onStartTest={handleStartTest} />
      
      {/* How It Works */}
      <HowItWorksSection />
      
      {/* Test Section */}
      {showTest && (
        <div ref={testRef} className="container">
          <StandaloneComplianceChecker isEmbedded={false} />
        </div>
      )}
      
      {/* FAQs Section */}
      <div className="container mb-12">
        <div className="glass card-lg">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-6 w-6" style={{ color: 'var(--brand-teal)' }} />
            <h3 className="text-2xl font-bold" style={{ color: 'var(--ink-900)' }}>
              Preguntas frecuentes
            </h3>
          </div>
          
          <Accordion type="single" collapsible className="w-full faq">
            <AccordionItem value="item-1" className="glass mb-3 rounded-[var(--radius-md)] border-0">
              <AccordionTrigger className="px-5 py-4 text-left font-medium hover:no-underline" style={{ color: 'var(--ink-900)' }}>
                ¿Qué sanciones puede recibir mi empresa por no cumplir con el registro horario?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                Las sanciones van desde 625€ hasta 6.250€ para infracciones graves, llegando hasta 187.515€ en casos muy graves. 
                El importe depende del tamaño de la empresa, duración del incumplimiento y reincidencia. <strong>Un ejemplo real:</strong> Una empresa 
                de logística con 20 empleados recibió una multa de 4.500€ por no llevar registro horario durante 3 meses.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="glass mb-3 rounded-[var(--radius-md)] border-0">
              <AccordionTrigger className="px-5 py-4 text-left font-medium hover:no-underline" style={{ color: 'var(--ink-900)' }}>
                ¿Es obligatorio el registro horario para todas las empresas?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                Sí, desde el Real Decreto-ley 8/2019, <strong>todas las empresas</strong> deben llevar un registro diario de la jornada 
                de todos sus empleados, sin excepción por tamaño o sector. Esto incluye autónomos con empleados.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="glass mb-3 rounded-[var(--radius-md)] border-0">
              <AccordionTrigger className="px-5 py-4 text-left font-medium hover:no-underline" style={{ color: 'var(--ink-900)' }}>
                ¿Qué información debe incluir el registro horario?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                Mínimo: hora de inicio y fin de jornada. <strong>Recomendado:</strong> descansos, pausas no computables, 
                horas extra y ausencias. Los registros deben conservarse durante 4 años y estar disponibles para la Inspección.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="glass rounded-[var(--radius-md)] border-0">
              <AccordionTrigger className="px-5 py-4 text-left font-medium hover:no-underline" style={{ color: 'var(--ink-900)' }}>
                ¿Existen casos reales de sanciones por incumplimiento?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                <strong>Casos reales:</strong> Restaurante (5 empleados) multado con 700€ por 2 meses sin registro. 
                Empresa de servicios (15 empleados) sancionada con 3.000€ por no comunicar registros a representantes. 
                Consultoría (8 empleados) multada con 1.200€ por registros incompletos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      {/* Final CTA */}
      {!showTest && <FinalCTASection onStartTest={handleStartTest} />}
    </div>
  );
}
