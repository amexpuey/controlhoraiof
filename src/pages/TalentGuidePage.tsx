
import React, { useState } from "react";
import TalentGuide from "@/components/templates/TalentGuide";
import { AppHeader } from "@/components/layout/AppHeader";
import { TalentGuideHeader } from "@/components/templates/talent-guide/TalentGuideHeader";
import { IntroductionCard } from "@/components/templates/talent-guide/IntroductionCard";
import { DownloadButton } from "@/components/templates/talent-guide/DownloadButton";
import { usePdfGenerator } from "@/components/templates/talent-guide/usePdfGenerator";

export default function TalentGuidePage() {
  const [downloadAttempted, setDownloadAttempted] = useState(false);
  const { generatePdf } = usePdfGenerator();

  const handleDownload = () => {
    setDownloadAttempted(true);
    generatePdf('talent-guide-content');
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
        
        <div className="glass" style={{ padding: '24px', marginBottom: '32px', textAlign: 'center' }}>
          <DownloadButton 
            downloadAttempted={downloadAttempted} 
            handleDownload={handleDownload} 
          />
        </div>
        
        <div id="talent-guide-content">
          <TalentGuide />
        </div>
      </div>
    </div>
  );
}
