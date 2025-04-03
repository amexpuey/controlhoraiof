
import React from "react";
import { useNavigate } from "react-router-dom";
import { useHelpContent } from "@/hooks/useHelpContent";

// Import new components
import AdminHelpContent from "./help-center/AdminHelpContent";
import AppHelpContent from "./help-center/AppHelpContent";
import WebHelpContent from "./help-center/WebHelpContent";
import HelpCenterOverview from "./help-center/HelpCenterOverview";

interface HelpCenterProps {
  isStandalone?: boolean;
  activeSection?: string;
}

export default function HelpCenter({ isStandalone = false, activeSection = "admin" }: HelpCenterProps) {
  const navigate = useNavigate();
  const { helpSteps, welcomeVideo, isLoading, error } = useHelpContent(activeSection);
  
  console.log("HelpCenter - isStandalone:", isStandalone);
  console.log("HelpCenter - activeSection:", activeSection);

  // Render specific help content based on activeSection and standalone mode
  const renderSectionContent = () => {
    if (isStandalone) {
      switch (activeSection) {
        case "admin":
          return <AdminHelpContent helpSteps={helpSteps} isLoading={isLoading} error={error} />;
        case "app":
          return <AppHelpContent />;
        case "web":
          return <WebHelpContent />;
        default:
          return null;
      }
    }
    
    // When not in standalone mode, show the overview
    return <HelpCenterOverview />;
  };

  return (
    <div>
      {activeSection === "admin" && isStandalone && (
        <div className="bg-[#0BC8C1] text-white py-3 px-4 mb-6 rounded-md flex items-center justify-between">
          <span className="font-medium">Configurar horarios en app.inwout.com</span>
          <a 
            href="https://app.inwout.com/settings/timetables/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-[#0BC8C1] px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Ir a configuración →
          </a>
        </div>
      )}
      {renderSectionContent()}
    </div>
  );
}
