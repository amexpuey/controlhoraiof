
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  User, 
  Home, 
  Settings,
  LogOut,
  BookOpen,
} from "lucide-react";

// Import the newly created components
import SidebarSection from "./SidebarSection";
import SidebarLink from "./SidebarLink";
import SidebarProgressBar from "./SidebarProgressBar";
import LearningModulesLinks from "./LearningModulesLinks";
import ToolsLinks from "./ToolsLinks";
import AccountLinks from "./AccountLinks";

interface LearningSidebarProps {
  learningProgress: number;
  activeModuleId?: string;
}

export default function LearningSidebar({ learningProgress, activeModuleId }: LearningSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    learning: true,
    tools: false,
    account: false
  });

  // Helper function to toggle section collapse state
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Helper function to check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path || 
           (activeModuleId && path.includes(activeModuleId));
  };

  return (
    <div className="w-64 bg-[#2a3040] text-white min-h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <img 
            src="/lovable-uploads/097bacff-123a-439c-8891-97ea5c2ff34a.png" 
            alt="INWOUT Logo" 
            className="h-8" 
          />
        </div>
        
        {/* Navigation Menu - Knowledge Base */}
        <nav className="space-y-5">
          {/* Home Section */}
          <SidebarLink 
            icon={Home}
            text="Inicio Kit Legal"
            path="/kit-legal"
            isActive={isActive('/kit-legal')}
          />
          
          {/* Learning Modules Section */}
          <SidebarSection 
            icon={BookOpen} 
            title="Módulos de Aprendizaje"
            isExpanded={expandedSections.learning}
            onToggle={(expanded) => toggleSection('learning')}
          >
            <LearningModulesLinks 
              learningProgress={learningProgress}
              activeModuleId={activeModuleId}
            />
          </SidebarSection>
          
          {/* Tools Section */}
          <SidebarSection 
            icon={Settings} 
            title="Herramientas"
            isExpanded={expandedSections.tools}
            onToggle={(expanded) => toggleSection('tools')}
          >
            <ToolsLinks />
          </SidebarSection>
          
          {/* Account Links Section */}
          <SidebarSection 
            icon={User} 
            title="Acceso INWOUT"
            isExpanded={expandedSections.account}
            onToggle={(expanded) => toggleSection('account')}
          >
            <AccountLinks />
          </SidebarSection>
        </nav>
        
        {/* Learning Progress Section */}
        <SidebarProgressBar progress={learningProgress} />
        
        <div className="absolute bottom-6 left-0 w-full px-6">
          <a 
            href="https://app.inwout.com/logout"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center w-full py-2 px-3 text-gray-300 hover:bg-[#222A39] hover:text-white rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Cerrar sesión</span>
          </a>
        </div>
      </div>
    </div>
  );
}
