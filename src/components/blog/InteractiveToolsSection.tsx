
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent
} from "@/components/ui/dialog";
import { CheckCircle, Calculator, Book, ChevronRight } from "lucide-react";
import ComplianceChecker from "./ComplianceChecker";
import LearningModules from "../learning/LearningModules";

export default function InteractiveToolsSection() {
  const [showComplianceDialog, setShowComplianceDialog] = useState(false);
  const [showLearningDialog, setShowLearningDialog] = useState(false);
  
  return (
    <>
      <section className="my-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Herramientas Interactivas
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Verificador de cumplimiento */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-blue-50 p-4 border-b border-blue-100">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-800">
                    Verificador de Cumplimiento
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Comprueba si cumples con la normativa
                </p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Verifica si tu empresa cumple con la normativa española de registro horario a través de este sencillo test. Identificaremos posibles riesgos y sanciones.
                </p>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 w-full"
                  onClick={() => setShowComplianceDialog(true)}
                >
                  Verificar cumplimiento
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calculadora */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-blue-50 p-4 border-b border-blue-100">
                <div className="flex items-center mb-2">
                  <Calculator className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-800">
                    Calculadora de Ahorro
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Calcula el ahorro con control horario
                </p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  ¡Próximamente! Podrás calcular cuánto te costará implementar una solución de control horario en base al número de empleados y funcionalidades.
                </p>
                <Button 
                  className="bg-gray-400 hover:bg-gray-500 cursor-not-allowed w-full"
                  disabled={true}
                >
                  Próximamente
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Módulos de aprendizaje */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-blue-50 p-4 border-b border-blue-100">
                <div className="flex items-center mb-2">
                  <Book className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-800">
                    Módulos de Aprendizaje
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Aprende todo sobre el control horario
                </p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Descubre qué es el control horario, por qué es obligatorio y cómo afecta a tu empresa a través de nuestros módulos interactivos.
                </p>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 w-full"
                  onClick={() => setShowLearningDialog(true)}
                >
                  Comenzar a aprender
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Compliance Checker Dialog */}
      <Dialog 
        open={showComplianceDialog} 
        onOpenChange={(open) => {
          setShowComplianceDialog(open);
          if (!open) document.body.style.pointerEvents = "";
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ComplianceChecker onClose={() => setShowComplianceDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* Learning Modules Dialog */}
      <Dialog 
        open={showLearningDialog} 
        onOpenChange={(open) => {
          setShowLearningDialog(open);
          if (!open) document.body.style.pointerEvents = "";
        }}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <LearningModules />
        </DialogContent>
      </Dialog>
    </>
  );
}
