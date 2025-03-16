
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Onboarding } from "@/components/Onboarding";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Interactive Tool Component
const InteractiveTool = ({ toolType }: { toolType: string }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const openQuiz = () => {
    if (toolType === 'quiz') {
      setIsQuizOpen(true);
    }
  };

  return (
    <>
      <Card className="shadow-md border-yellow-200 hover:shadow-lg transition-shadow">
        <CardHeader className="bg-yellow-50">
          <CardTitle className="text-xl text-yellow-800">
            {toolType === 'quiz' && '🧩 AsistenTech'}
            {toolType === 'calculator' && '🧮 Calculadora de Costes'}
            {toolType === 'checker' && '✅ Verificador de Cumplimiento'}
          </CardTitle>
          <CardDescription>
            {toolType === 'quiz' && 'Encuentra la herramienta perfecta para tu empresa'}
            {toolType === 'calculator' && 'Calcula el coste de implementación'}
            {toolType === 'checker' && 'Comprueba si cumples con la normativa'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-600 mb-4">
            {toolType === 'quiz' && 'Este asistente personalizado te ayudará a encontrar la mejor herramienta de control horario según las necesidades específicas de tu empresa.'}
            {toolType === 'calculator' && '¡Próximamente! Podrás calcular cuánto te costará implementar una solución de control horario en base al número de empleados y funcionalidades.'}
            {toolType === 'checker' && '¡Próximamente! Verifica si tu empresa cumple con la normativa española de registro horario a través de este sencillo test.'}
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className={`w-full ${toolType === 'quiz' 
              ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border-yellow-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-300 cursor-not-allowed'}`}
            onClick={openQuiz}
            disabled={toolType !== 'quiz'}
          >
            {toolType === 'quiz' 
              ? 'Comenzar asistente' 
              : 'Próximamente'}
          </Button>
        </CardFooter>
      </Card>

      {toolType === 'quiz' && (
        <Dialog open={isQuizOpen} onOpenChange={setIsQuizOpen}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-yellow-800">
                AsistenTech: Encuentra tu solución ideal
              </DialogTitle>
            </DialogHeader>
            <Onboarding 
              onFeaturesSelect={(features) => {
                // Handle features selection
                setIsQuizOpen(false);
              }}
              onSizeSelect={() => {}}
            />
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
        <InteractiveTool toolType="quiz" />
        <InteractiveTool toolType="calculator" />
        <InteractiveTool toolType="checker" />
      </div>
    </section>
  );
}
