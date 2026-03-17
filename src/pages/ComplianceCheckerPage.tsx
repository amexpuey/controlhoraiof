import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import StandaloneComplianceChecker from "@/components/compliance/StandaloneComplianceChecker";
import { HeroSection } from "@/components/compliance/HeroSection";
import { FinalCTASection } from "@/components/compliance/FinalCTASection";
import { useIframeHeight } from "@/hooks/useIframeHeight";

export default function ComplianceCheckerPage() {
  const [searchParams] = useSearchParams();
  const isEmbedded = searchParams.get("embed") === "true";
  const [showTest, setShowTest] = useState(true);
  const testRef = useRef<HTMLDivElement>(null);

  useIframeHeight();

  useEffect(() => {
    // Hide global footer and header on this page
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    if (footer) (footer as HTMLElement).style.display = 'none';
    if (header) (header as HTMLElement).style.display = 'none';
    if (nav) (nav as HTMLElement).style.display = 'none';

    if (isEmbedded) {
      document.body.style.background = "#ffffff";
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      setShowTest(true);
    }

    return () => {
      const footer = document.querySelector('footer');
      const header = document.querySelector('header');
      const nav = document.querySelector('nav');
      if (footer) (footer as HTMLElement).style.display = '';
      if (header) (header as HTMLElement).style.display = '';
      if (nav) (nav as HTMLElement).style.display = '';
      document.body.style.background = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
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
    </div>
  );
}
