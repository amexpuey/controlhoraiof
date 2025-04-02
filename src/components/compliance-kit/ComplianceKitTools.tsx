
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  ListChecks, 
  FileText, 
  BookOpen,
  AlertTriangle, 
  BarChart2
} from "lucide-react";
import ComplianceChecker from "@/components/blog/ComplianceChecker";
import ComplianceChecklist from "@/components/compliance-kit/tools/ComplianceChecklist";
import LegalRiskSimulator from "@/components/compliance-kit/tools/LegalRiskSimulator";
import LearningModules from "@/components/learning/LearningModules";
import ComplianceTemplates from "@/components/compliance-kit/tools/ComplianceTemplates";
import AppComparison from "@/components/compliance-kit/tools/AppComparison";

// Define unique prop types for each component
interface ComplianceCheckerProps {
  onClose?: () => void;
}

interface LearningModulesProps {
  initialModule?: string;
}

// Generic tool interface that can accommodate different component props
interface Tool<T = any> {
  id: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  component: React.ComponentType<T>;
}

export default function ComplianceKitTools() {
  const [activeTab, setActiveTab] = React.useState("verificador");

  const tools: Tool[] = [
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
      id: "comparador",
      title: "Comparador de Apps",
      icon: BarChart2,
      description: "Encuentra la solución de control horario que mejor se adapta a tu empresa",
      component: AppComparison
    }
  ];

  return (
    <section id="compliance-tools" className="py-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Herramientas Interactivas
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Todas nuestras herramientas son gratuitas, sin necesidad de registro y diseñadas para ayudarte a cumplir con la normativa laboral de forma sencilla.
        </p>
      </div>

      <Tabs 
        defaultValue="verificador" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8 bg-gray-800/60">
          {tools.map((tool) => (
            <TabsTrigger 
              key={tool.id} 
              value={tool.id}
              className="flex flex-col items-center gap-1 py-3 px-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              {/* Use createElement to properly pass props to icon component */}
              {React.createElement(tool.icon, { className: "h-5 w-5" })}
              <span className="text-xs md:text-sm text-center font-medium">{tool.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="bg-gray-800/40 p-6 rounded-lg border border-gray-700 shadow-xl">
          {tools.map((tool) => (
            <TabsContent key={tool.id} value={tool.id} className="mt-0">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-900/50 p-3 rounded-full">
                    {/* Use createElement to properly pass props to icon component */}
                    {React.createElement(tool.icon, { className: "h-8 w-8 text-blue-400" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{tool.title}</h3>
                    <p className="text-gray-300">{tool.description}</p>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  {React.createElement(tool.component)}
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </section>
  );
}
