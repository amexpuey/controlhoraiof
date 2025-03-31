
import React, { useState } from "react";
import TalentGuide from "@/components/templates/TalentGuide";
import { AppHeader } from "@/components/layout/AppHeader";
import { TalentGuideHeader } from "@/components/templates/talent-guide/TalentGuideHeader";
import { IntroductionCard } from "@/components/templates/talent-guide/IntroductionCard";
import { DownloadButton } from "@/components/templates/talent-guide/DownloadButton";
import { usePdfGenerator } from "@/components/templates/talent-guide/usePdfGenerator";
import { Card, CardContent } from "@/components/ui/card";

export default function TalentGuidePage() {
  const [downloadAttempted, setDownloadAttempted] = useState(false);
  const { generatePdf } = usePdfGenerator();

  const handleDownload = () => {
    setDownloadAttempted(true);
    generatePdf('talent-guide-content');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Responsive header with navigation */}
      <AppHeader />
      
      <div className="container mx-auto px-4 py-6">
        <TalentGuideHeader />
        
        <IntroductionCard />
        
        <Card className="mb-8">
          <CardContent className="p-4 md:p-6">
            <DownloadButton 
              downloadAttempted={downloadAttempted} 
              handleDownload={handleDownload} 
            />
          </CardContent>
        </Card>
        
        <div id="talent-guide-content">
          <TalentGuide />
        </div>
      </div>
    </div>
  );
}
