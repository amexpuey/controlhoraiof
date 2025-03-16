
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calculator, Book } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ComplianceChecker from "@/components/blog/ComplianceChecker";
import LearningModules from "@/components/learning/LearningModules";

interface DashboardToolsProps {
  onFeatureSelect?: (features: string[]) => void;
}

export default function DashboardTools({ onFeatureSelect }: DashboardToolsProps) {
  const [showComplianceDialog, setShowComplianceDialog] = useState(false);
  const [showLearningDialog, setShowLearningDialog] = useState(false);
  
  const handleComplianceCheckerClick = () => {
    setShowComplianceDialog(true);
  };

  const handleLearningModulesClick = () => {
    setShowLearningDialog(true);
  };

  return (
    <>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">
          Herramientas Interactivas
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Verificador de cumplimiento */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center text-lg">
                <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
                Verificador de cumplimiento
              </CardTitle>
              <CardDescription>
                Comprueba si cumples con la normativa laboral
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4">
                <p className="text-sm text-left text-gray-600 mb-4">
                  Verifica si tu empresa cumple con la normativa de registro horario y evita multas
                </p>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleComplianceCheckerClick}
                >
                  Comprobar ahora
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calculadora */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center text-lg">
                <Calculator className="mr-2 h-5 w-5 text-blue-600" />
                Calculadora de ahorro
              </CardTitle>
              <CardDescription>
                Calcula cuánto puedes ahorrar con una app de control horario
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4">
                <p className="text-sm text-left text-gray-600 mb-4">
                  Estima cuánto tiempo y dinero puedes ahorrar con una solución de control horario
                </p>
                <Button 
                  className="bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                  disabled={true}
                >
                  Próximamente
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Módulos de aprendizaje */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center text-lg">
                <Book className="mr-2 h-5 w-5 text-blue-600" />
                Módulos de aprendizaje
              </CardTitle>
              <CardDescription>
                Aprende todo sobre el control horario
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4">
                <p className="text-sm text-left text-gray-600 mb-4">
                  Descubre qué es el control horario, su normativa y cómo implementarlo correctamente
                </p>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleLearningModulesClick}
                >
                  Empezar a aprender
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Compliance Checker Dialog */}
      <Dialog open={showComplianceDialog} onOpenChange={setShowComplianceDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ComplianceChecker onClose={() => setShowComplianceDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* Learning Modules Dialog */}
      <Dialog open={showLearningDialog} onOpenChange={setShowLearningDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <LearningModules />
        </DialogContent>
      </Dialog>

      {/* Embedded Learning Modules */}
      <LearningModules />
    </>
  );
}
