
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
import ComplianceChecker from "./ComplianceChecker";

// Interactive Tool Component
const InteractiveTool = ({ toolType }: { toolType: string }) => {
  const [isCheckerOpen, setIsCheckerOpen] = useState(false);

  const openTool = () => {
    if (toolType === 'checker') {
      setIsCheckerOpen(true);
    }
  };

  return (
    <>
      <Card className="shadow-md border-blue-200 hover:shadow-lg transition-shadow">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-xl text-blue-800 text-left">
            {toolType === 'calculator' && '🧮 Calculadora de Ahorro'}
            {toolType === 'checker' && '✅ Verificador de Cumplimiento'}
          </CardTitle>
          <CardDescription className="text-left">
            {toolType === 'calculator' && 'Calcula el ahorro con control horario'}
            {toolType === 'checker' && 'Comprueba si cumples con la normativa'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-600 mb-4 text-left">
            {toolType === 'calculator' && '¡Próximamente! Podrás calcular cuánto te costará implementar una solución de control horario en base al número de empleados y funcionalidades.'}
            {toolType === 'checker' && 'Verifica si tu empresa cumple con la normativa española de registro horario a través de este sencillo test. Identificaremos posibles riesgos y sanciones.'}
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className={`w-full ${toolType === 'checker'
              ? 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-300 cursor-not-allowed'}`}
            onClick={openTool}
            disabled={toolType === 'calculator'}
          >
            {toolType === 'checker' && 'Verificar cumplimiento'}
            {toolType === 'calculator' && 'Próximamente'}
          </Button>
        </CardFooter>
      </Card>

      {toolType === 'checker' && (
        <Dialog open={isCheckerOpen} onOpenChange={setIsCheckerOpen}>
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
    </>
  );
};

export default function InteractiveToolsSection() {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Herramientas Interactivas
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <InteractiveTool toolType="checker" />
        <InteractiveTool toolType="calculator" />
      </div>
    </section>
  );
}
