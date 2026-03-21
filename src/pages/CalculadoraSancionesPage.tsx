import { useEffect } from "react";
import { SanctionCalculatorTabs } from "@/components/compliance/calculator/SanctionCalculatorTabs";
import { useIframeHeight } from "@/hooks/useIframeHeight";

export default function CalculadoraSancionesPage() {
  useIframeHeight();

  useEffect(() => {
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    if (footer) (footer as HTMLElement).style.display = 'none';
    if (header) (header as HTMLElement).style.display = 'none';
    if (nav) (nav as HTMLElement).style.display = 'none';

    return () => {
      const footer = document.querySelector('footer');
      const header = document.querySelector('header');
      const nav = document.querySelector('nav');
      if (footer) (footer as HTMLElement).style.display = '';
      if (header) (header as HTMLElement).style.display = '';
      if (nav) (nav as HTMLElement).style.display = '';
    };
  }, []);

  return (
    <div className="compliance-theme min-h-screen pb-12">
      <div className="container pt-6">
        <div className="tool-card">
          <SanctionCalculatorTabs />
        </div>
      </div>
    </div>
  );
}
