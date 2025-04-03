
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Layout components
import KitLegalLayout from "@/components/compliance-kit/layout/KitLegalLayout";
import SectionHeader from "@/components/compliance-kit/navigation/SectionHeader";
import LearningSidebar from "@/components/learning/sidebar/LearningSidebar"; // Added missing import

// Main sections
import KitLegalDashboard from "@/components/compliance-kit/dashboard/KitLegalDashboard";
import ComplianceKitTools from "@/components/compliance-kit/ComplianceKitTools";
import LaborRegulationsContent from "@/components/compliance-kit/sections/LaborRegulationsContent";
import ConfigurationGuideContent from "@/components/compliance-kit/sections/ConfigurationGuideContent";

// Tool components
import ComplianceChecker from "@/components/blog/ComplianceChecker";
import ComplianceChecklist from "@/components/compliance-kit/tools/ComplianceChecklist";
import LegalRiskSimulator from "@/components/compliance-kit/tools/LegalRiskSimulator";
import ComplianceTemplates from "@/components/compliance-kit/tools/ComplianceTemplates";

// Hooks
import { useLearningProgress } from "@/components/compliance-kit/hooks/useLearningProgress";

export default function ComplianceKit() {
  const navigate = useNavigate();
  const { section } = useParams<{ section: string }>();
  const learningProgress = useLearningProgress();
  const [activeTab, setActiveTab] = useState(section || "inicio");
  
  useEffect(() => {
    document.title = "INWOUT - Kit Legal | Control Horario Electrónico";
    
    // Update activeTab based on URL section
    if (section) {
      setActiveTab(section);
    }
  }, [section]);

  // Function to navigate to learning module pages
  const navigateToModule = (moduleId: string) => {
    navigate(`/kit-legal/modulo/${moduleId}`);
  };
  
  // Render specific section content for individual tool pages
  const renderSectionContent = () => {
    switch (section) {
      case "verificador":
        return <ComplianceChecker />;
      case "checklist":
        return <ComplianceChecklist />;
      case "simulador":
        return <LegalRiskSimulator />;
      case "plantillas":
        return <ComplianceTemplates />;
      case "normativa":
        return <LaborRegulationsContent />;
      case "modulo-fichajes":
      case "define-horarios":
      case "bienvenida-equipo":
      case "comunicacion-equipo":
      case "automatiza-con-geofence":
        return <ConfigurationGuideContent section={section} />;
      default:
        return null;
    }
  };

  // Show specific section content if we're in a specific section
  if (section && section !== "inicio" && section !== "herramientas" && section !== "configuracion-inwout") {
    return (
      <div className="min-h-screen bg-[#f8f9fa] text-gray-800">
        <div className="flex">
          {/* Sidebar */}
          <LearningSidebar 
            learningProgress={learningProgress} 
            activeModuleId={null}
          />
          
          {/* Main content */}
          <div className="ml-64 flex-1">
            <SectionHeader />
            
            <main className="container max-w-5xl mx-auto px-8 py-8">
              {renderSectionContent()}
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Main Kit Legal dashboard
  return (
    <KitLegalLayout 
      learningProgress={learningProgress}
      activeModuleId={null}
    >
      {activeTab === "inicio" && (
        <KitLegalDashboard 
          learningProgress={learningProgress}
          navigateToModule={navigateToModule}
        />
      )}
      
      {activeTab === "herramientas" && (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Herramientas de Cumplimiento Legal
          </h1>
          <ComplianceKitTools />
        </>
      )}
    </KitLegalLayout>
  );
}
