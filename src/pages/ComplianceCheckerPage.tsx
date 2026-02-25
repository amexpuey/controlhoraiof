
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
  const [showTest, setShowTest] = useState(true);
  const testRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEmbedded) {
      document.body.style.background = "#ffffff";
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
      <div className="compliance-theme min-h-screen p-6" style={{ background: '#ffffff' }}>
        <StandaloneComplianceChecker isEmbedded={isEmbedded} />
      </div>
    );
  }

  return (
    <div className="compliance-theme min-h-screen pb-12">
      <HeroSection onStartTest={handleStartTest} />
      

      {showTest && (
        <div ref={testRef} className="container">
          <StandaloneComplianceChecker isEmbedded={false} />
        </div>
      )}


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
