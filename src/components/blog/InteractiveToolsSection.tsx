
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Interactive Tool Component
const InteractiveTool = ({ toolType }: { toolType: string }) => {
  return (
    <Card className="shadow-md border-yellow-200 hover:shadow-lg transition-shadow">
      <CardHeader className="bg-yellow-50">
        <CardTitle className="text-xl text-yellow-800">
          {toolType === 'quiz' && '🧩 Software Finder Quiz'}
          {toolType === 'calculator' && '🧮 Cost Estimator'}
          {toolType === 'checker' && '✅ Compliance Checker'}
        </CardTitle>
        <CardDescription>
          {toolType === 'quiz' && 'Encuentra la herramienta perfecta para tu empresa'}
          {toolType === 'calculator' && 'Calcula el coste de implementación'}
          {toolType === 'checker' && 'Comprueba si cumples con la normativa'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-600 mb-4">
          {toolType === 'quiz' && 'Este cuestionario te ayudará a encontrar la mejor herramienta de control horario según las necesidades específicas de tu empresa.'}
          {toolType === 'calculator' && 'Calcula cuánto te costará implementar una solución de control horario en base al número de empleados y funcionalidades.'}
          {toolType === 'checker' && 'Verifica si tu empresa cumple con la normativa española de registro horario a través de este sencillo test.'}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border-yellow-300">
          Comenzar {toolType === 'quiz' ? 'quiz' : toolType === 'calculator' ? 'cálculo' : 'comprobación'}
        </Button>
      </CardFooter>
    </Card>
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
