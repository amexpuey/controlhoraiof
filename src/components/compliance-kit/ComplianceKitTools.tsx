
import React, { useState } from "react";
import { 
  CheckCircle, 
  ListChecks, 
  FileText, 
  BookOpen,
  AlertTriangle, 
  BarChart2,
  HelpCircle
} from "lucide-react";
import ComplianceChecker from "@/components/blog/ComplianceChecker";
import ComplianceChecklist from "@/components/compliance-kit/tools/ComplianceChecklist";
import LegalRiskSimulator from "@/components/compliance-kit/tools/LegalRiskSimulator";
import LearningModules from "@/components/learning/LearningModules";
import ComplianceTemplates from "@/components/compliance-kit/tools/ComplianceTemplates";
import AppComparison from "@/components/compliance-kit/tools/AppComparison";
import HelpCenter from "@/components/compliance-kit/tools/HelpCenter";
import { useNavigate } from "react-router-dom";
import ToolTabs from "./tools/ToolTabs";
import ToolContent from "./tools/ToolContent";
import LearningModulesSection from "./tools/LearningModulesSection";
import { Tool } from "./types";

interface ComplianceKitToolsProps {
  hideAppComparison?: boolean;
}

export default function ComplianceKitTools({ hideAppComparison = false }: ComplianceKitToolsProps) {
  const [activeTab, setActiveTab] = useState("verificador");
  const navigate = useNavigate();

  // Base tools array
  let tools: Tool[] = [
    {
      id: "verificador",
      title: "Verificador de Cumplimiento",
      icon: CheckCircle,
      description: "Evalúa el nivel de cumplimiento de tu empresa en materia laboral",
      component: ComplianceChecker
    },
    {
      id: "checklist",
      title: "Checklist Interactivo",
      icon: ListChecks,
      description: "Obten una lista personalizada de obligaciones legales según tu sector y tamaño",
      component: ComplianceChecklist
    },
    {
      id: "aprendizaje",
      title: "Módulos de Aprendizaje",
      icon: BookOpen,
      description: "Aprende conceptos clave sobre normativas laborales en formato micro-lecciones",
      component: LearningModules
    },
    {
      id: "plantillas",
      title: "Plantillas Interactivas",
      icon: FileText,
      description: "Completa y descarga documentos esenciales para el cumplimiento normativo",
      component: ComplianceTemplates
    },
    {
      id: "simulador",
      title: "Simulador de Riesgos",
      icon: AlertTriangle,
      description: "Calcula las posibles sanciones y consecuencias de no cumplir con la normativa",
      component: LegalRiskSimulator
    },
    {
      id: "ayuda",
      title: "Centro de Ayuda",
      icon: HelpCircle,
      description: "Manuales y guías para administradores y usuarios de INWOUT",
      component: HelpCenter
    }
  ];
  
  // Add app comparison tool if not hidden
  if (!hideAppComparison) {
    tools.push({
      id: "comparador",
      title: "Comparador de Apps",
      icon: BarChart2,
      description: "Encuentra la solución de control horario que mejor se adapta a tu empresa",
      component: AppComparison
    });
  }
  
  // Handle learning module click - navigate to standalone page instead of showing modal
  const handleLearningModuleClick = () => {
    const isStandalonePage = window.location.pathname.startsWith('/kit-legal');
    
    if (isStandalonePage) {
      navigate('/kit-legal/modulo/que-es-control-horario');
    } else {
      // For controlhorarioelectronico.com, keep the modal behavior
      setActiveTab("aprendizaje");
    }
  };

  const handleTabChange = (tabId: string) => {
    console.log("Tab change to:", tabId);
    if (tabId === "aprendizaje") {
      handleLearningModuleClick();
    } else {
      setActiveTab(tabId);
    }
  };

  const isStandalonePage = window.location.pathname.startsWith('/kit-legal');
  console.log("isStandalonePage:", isStandalonePage);
  console.log("Current path:", window.location.pathname);
  console.log("Active tab:", activeTab);

  return (
    <section id="compliance-tools" className="py-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Herramientas Interactivas
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Todas nuestras herramientas son gratuitas, sin necesidad de registro y diseñadas para ayudarte a cumplir con la normativa laboral de forma sencilla.
        </p>
      </div>

      {/* Modern Tab Navigation */}
      <div className="flex flex-col space-y-6">
        <ToolTabs 
          tools={tools} 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />

        {/* Active Tab Content */}
        <ToolContent 
          activeTab={activeTab} 
          tools={tools} 
          isStandalone={isStandalonePage}
        />
      </div>

      {/* Learning Modules Section (visible when aprendizaje is active) */}
      <LearningModulesSection 
        visible={activeTab === "aprendizaje"} 
        isStandalonePage={isStandalonePage}
      />
    </section>
  );
}
