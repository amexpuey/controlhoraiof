
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { CheckCircle, Calculator, Book } from "lucide-react";
import ComplianceChecker from "./ComplianceChecker";
import LearningModules from "../learning/LearningModules";

// Interactive Tool Component
const InteractiveTool = ({ toolType }: { toolType: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openTool = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="shadow-md border-blue-200 hover:shadow-lg transition-shadow">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-xl text-blue-800 text-left">
            {toolType === 'calculator' && '🧮 Calculadora de Ahorro'}
            {toolType === 'checker' && '✅ Verificador de Cumplimiento'}
            {toolType === 'learning' && '📚 Módulos de Aprendizaje'}
          </CardTitle>
          <CardDescription className="text-left">
            {toolType === 'calculator' && 'Calcula el ahorro con control horario'}
            {toolType === 'checker' && 'Comprueba si cumples con la normativa'}
            {toolType === 'learning' && 'Aprende todo sobre el control horario'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-600 mb-4 text-left">
            {toolType === 'calculator' && '¡Próximamente! Podrás calcular cuánto te costará implementar una solución de control horario en base al número de empleados y funcionalidades.'}
            {toolType === 'checker' && 'Verifica si tu empresa cumple con la normativa española de registro horario a través de este sencillo test. Identificaremos posibles riesgos y sanciones.'}
            {toolType === 'learning' && 'Descubre qué es el control horario, por qué es obligatorio y cómo afecta a tu empresa a través de nuestros módulos interactivos.'}
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className={`w-full ${toolType === 'calculator'
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-300 cursor-not-allowed'
              : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300'}`}
            onClick={openTool}
            disabled={toolType === 'calculator'}
          >
            {toolType === 'checker' && 'Verificar cumplimiento'}
            {toolType === 'calculator' && 'Próximamente'}
            {toolType === 'learning' && 'Comenzar a aprender'}
          </Button>
        </CardFooter>
      </Card>

      {toolType === 'checker' && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-800">
                Verificador de Cumplimiento Normativo
              </DialogTitle>
              <DialogDescription className="text-blue-700">
                Comprueba si tu empresa cumple con la normativa de registro horario en España
              </DialogDescription>
            </DialogHeader>
            <ComplianceChecker />
          </DialogContent>
        </Dialog>
      )}

      {toolType === 'learning' && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-800">
                Módulos de Aprendizaje Interactivo
              </DialogTitle>
              <DialogDescription className="text-blue-700">
                Aprende todo sobre el control horario y su normativa en España
              </DialogDescription>
            </DialogHeader>
            <LearningModules />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default function InteractiveToolsSection() {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Herramientas Interactivas
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        <InteractiveTool toolType="checker" />
        <InteractiveTool toolType="calculator" />
        <InteractiveTool toolType="learning" />
      </div>
    </section>
  );
}
