
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StandaloneComplianceChecker from "@/components/compliance/StandaloneComplianceChecker";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, CheckCircle, Clock, AlertTriangle, HelpCircle, FileText, Users, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComplianceCheckerPage() {
  const [searchParams] = useSearchParams();
  const isEmbedded = searchParams.get("embed") === "true";
  const [showInstructions, setShowInstructions] = useState(false);
  
  useEffect(() => {
    // Set body styles for embedded mode
    if (isEmbedded) {
      document.body.style.background = "transparent";
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      
      // Hide the footer when in embedded mode
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = 'none';
      }
    }
    
    return () => {
      // Reset styles when component unmounts
      document.body.style.background = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      
      // Restore footer display
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = '';
      }
    };
  }, [isEmbedded]);

  return (
    <div className={`${isEmbedded ? "" : "p-6 max-w-4xl mx-auto"}`}>
      {!isEmbedded && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Verificador de Cumplimiento Normativo</h1>
          <p className="text-gray-600 mb-6">
            Comprueba si tu empresa cumple con la normativa laboral de registro horario en España y evita posibles sanciones.
          </p>
          
          <Collapsible 
            open={showInstructions} 
            onOpenChange={setShowInstructions}
            className="border rounded-lg bg-blue-50 p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium text-blue-800">¿Cómo funciona el verificador?</h3>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronDown className="h-4 w-4 text-blue-600" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <h4 className="font-medium">Paso 1</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Responde a las preguntas sobre cómo gestiona tu empresa el registro de jornada y otros aspectos laborales.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-blue-600" />
                    </div>
                    <h4 className="font-medium">Paso 2</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Recibe un análisis personalizado de los posibles riesgos e incumplimientos normativos que podría tener tu empresa.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Calculator className="h-5 w-5 text-blue-600" />
                    </div>
                    <h4 className="font-medium">Paso 3</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Utiliza la calculadora interactiva para estimar posibles sanciones según el tamaño de tu empresa y tipo de incumplimiento.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-blue-100">
                <h4 className="font-medium mb-2 text-blue-800">Preguntas frecuentes:</h4>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">¿Qué sanciones puede recibir mi empresa por no cumplir con el registro horario?</AccordionTrigger>
                    <AccordionContent className="text-sm">
                      Las sanciones por incumplir la normativa de registro horario pueden ir desde los 625€ hasta los 6.250€ para infracciones graves. 
                      En casos muy graves, las multas pueden alcanzar los 187.515€. El importe final depende del tamaño de la empresa, 
                      duración del incumplimiento y si ha habido reincidencia.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm">¿Es obligatorio el registro horario para todas las empresas?</AccordionTrigger>
                    <AccordionContent className="text-sm">
                      Sí, desde la entrada en vigor del Real Decreto-ley 8/2019, todas las empresas en España están obligadas a llevar un registro diario 
                      de la jornada de trabajo de todos sus empleados, independientemente del tamaño de la empresa o del sector.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-sm">¿Qué información debe incluir el registro horario?</AccordionTrigger>
                    <AccordionContent className="text-sm">
                      El registro debe incluir, como mínimo, la hora de inicio y finalización de la jornada laboral de cada trabajador. 
                      También es recomendable registrar los descansos y pausas no computables como tiempo de trabajo efectivo.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-sm">¿Existen casos reales de sanciones por incumplimiento?</AccordionTrigger>
                    <AccordionContent className="text-sm">
                      Sí, la Inspección de Trabajo ha impuesto numerosas sanciones. Por ejemplo, un restaurante con 5 empleados fue multado con 
                      700€ por no registrar la jornada durante 2 meses. Una empresa de servicios con 15 empleados recibió una multa de 3.000€ 
                      por no comunicar los registros a los representantes de los trabajadores.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
      <StandaloneComplianceChecker isEmbedded={isEmbedded} />
    </div>
  );
}
