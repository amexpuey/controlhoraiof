
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  ListChecks, 
  FileText, 
  BookOpen,
  AlertTriangle, 
  BarChart2, 
  ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ComplianceChecker from "@/components/blog/ComplianceChecker";
import ComplianceChecklist from "@/components/compliance-kit/tools/ComplianceChecklist";
import LegalRiskSimulator from "@/components/compliance-kit/tools/LegalRiskSimulator";
import LearningModules from "@/components/learning/LearningModules";
import ComplianceTemplates from "@/components/compliance-kit/tools/ComplianceTemplates";
import AppComparison from "@/components/compliance-kit/tools/AppComparison";

export default function ComplianceKitTools() {
  const [activeTab, setActiveTab] = React.useState("verificador");
  const [openTool, setOpenTool] = React.useState<string | null>(null);

  const tools = [
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

  const handleOpenTool = (toolId: string) => {
    setOpenTool(toolId);
  };

  const handleCloseTool = () => {
    setOpenTool(null);
  };

  const ToolComponent = openTool ? tools.find(t => t.id === openTool)?.component : null;

  return (
    <section id="compliance-tools" className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Herramientas Interactivas
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Todas nuestras herramientas son gratuitas, sin necesidad de registro y diseñadas para ayudarte a cumplir con la normativa laboral de forma sencilla.
        </p>
      </div>

      <Tabs 
        defaultValue="verificador" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          {tools.map((tool) => (
            <TabsTrigger 
              key={tool.id} 
              value={tool.id}
              className="flex flex-col items-center gap-1 py-3 px-3"
            >
              <tool.icon className="h-5 w-5" />
              <span className="text-xs md:text-sm text-center font-medium">{tool.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tools.map((tool) => (
          <TabsContent key={tool.id} value={tool.id} className="mt-0">
            <Card className="border-2 border-blue-100">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="bg-blue-50 p-4 rounded-full">
                    <tool.icon className="h-12 w-12 text-blue-600" />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleOpenTool(tool.id)}
                    >
                      Acceder a la herramienta <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {ToolComponent && (
        <Dialog open={!!openTool} onOpenChange={handleCloseTool}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogTitle className="text-xl font-bold">
              {tools.find(t => t.id === openTool)?.title}
            </DialogTitle>
            <ToolComponent />
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
