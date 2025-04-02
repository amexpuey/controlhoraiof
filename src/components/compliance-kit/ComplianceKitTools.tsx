
import React, { useState } from "react";
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

// Tool interface
interface Tool {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  component: React.ComponentType<any>;
}

export default function ComplianceKitTools() {
  const [activeTab, setActiveTab] = useState("verificador");

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
        <p className="text-gray-200 max-w-2xl mx-auto">
          Todas nuestras herramientas son gratuitas, sin necesidad de registro y diseñadas para ayudarte a cumplir con la normativa laboral de forma sencilla.
        </p>
      </div>

      {/* Modern Tab Navigation */}
      <div className="flex flex-col space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                activeTab === tool.id 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className={`p-3 rounded-full mb-2 ${
                activeTab === tool.id ? "bg-blue-700" : "bg-blue-50"
              }`}>
                {React.createElement(tool.icon, { 
                  className: `w-6 h-6 ${activeTab === tool.id ? "text-white" : "text-blue-600"}`
                })}
              </div>
              <span className="text-center font-medium text-sm">{tool.title}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="bg-gray-800/40 p-6 rounded-lg border border-gray-700 shadow-xl">
          {tools.map((tool) => (
            activeTab === tool.id && (
              <div key={tool.id}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-900/50 p-3 rounded-full">
                    {React.createElement(tool.icon, { className: "h-8 w-8 text-blue-400" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{tool.title}</h3>
                    <p className="text-gray-200">{tool.description}</p>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-6">
                  {React.createElement(tool.component)}
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Learning Modules Section (visible when aprendizaje is active) */}
      {activeTab === "aprendizaje" && (
        <div className="mt-8 bg-gray-800/40 p-6 rounded-lg border border-gray-700 shadow-xl">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Módulos de Aprendizaje Interactivo</h3>
          <p className="text-gray-200 mb-6">
            Descubre todo lo que necesitas saber sobre el control horario a través de estos módulos interactivos
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Module 1 */}
            <div className="bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600">
              <div className="p-5">
                <div className="bg-blue-900/30 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <h4 className="text-white font-medium mb-2">¿Qué es el control horario?</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Aprende todo lo relativo a la normativa de control horario y cómo afecta a tu empresa.
                </p>
                <a href="#" className="text-blue-400 flex items-center text-sm hover:underline">
                  Acceder
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Module 2 */}
            <div className="bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600">
              <div className="p-5">
                <div className="bg-blue-900/30 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                </div>
                <h4 className="text-white font-medium mb-2">¿Es obligatorio para tu empresa?</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Descubre si tu empresa está obligada a implementar un sistema de fichaje.
                </p>
                <a href="#" className="text-blue-400 flex items-center text-sm hover:underline">
                  Acceder
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Module 3 */}
            <div className="bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600">
              <div className="p-5">
                <div className="bg-blue-900/30 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                </div>
                <h4 className="text-white font-medium mb-2">Cómo implementar un sistema de fichajes</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Conoce las diferentes opciones y encuentra la mejor para tu empresa.
                </p>
                <a href="#" className="text-blue-400 flex items-center text-sm hover:underline">
                  Acceder
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
