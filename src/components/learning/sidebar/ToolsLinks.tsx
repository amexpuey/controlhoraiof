
import React from "react";
import { useLocation } from "react-router-dom";
import { 
  CheckCircle, 
  ListChecks, 
  FileText, 
  HelpCircle,
  AlertTriangle
} from "lucide-react";
import SidebarLink from "./SidebarLink";

export default function ToolsLinks() {
  const location = useLocation();
  
  // Helper function to check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <SidebarLink 
        icon={CheckCircle}
        text="Verificador de Cumplimiento"
        path="/kit-legal/verificador"
        isActive={isActive('/kit-legal/verificador')}
      />
      
      <SidebarLink 
        icon={ListChecks}
        text="Checklist Interactivo"
        path="/kit-legal/checklist"
        isActive={isActive('/kit-legal/checklist')}
      />
      
      <SidebarLink 
        icon={FileText}
        text="Plantillas"
        path="/kit-legal/plantillas"
        isActive={isActive('/kit-legal/plantillas')}
      />
      
      <SidebarLink 
        icon={AlertTriangle}
        text="Simulador de Riesgos"
        path="/kit-legal/simulador"
        isActive={isActive('/kit-legal/simulador')}
      />
      
      <SidebarLink 
        icon={HelpCircle}
        text="Centro de Ayuda"
        path="/kit-legal/ayuda/admin"
        isActive={isActive('/kit-legal/ayuda/admin')}
      />
    </>
  );
}
