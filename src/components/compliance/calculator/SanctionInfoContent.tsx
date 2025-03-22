
import { FileText, Info, AlertTriangle, AlertCircle, Scale } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function SanctionInfoContent() {
  return (
    <div className="space-y-4 text-sm">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="flex items-center gap-2 font-medium text-gray-800 mb-3">
          <FileText className="h-4 w-4 text-blue-600" />
          Normativa aplicable
        </h4>
        <p className="text-gray-600 mb-3">El artículo 34 del Estatuto de los Trabajadores (ET) establece la obligación de las empresas de garantizar un registro diario de la jornada laboral.</p>
        <p className="text-gray-600">Las sanciones se detallan en el Real Decreto Legislativo 5/2000 (LISOS).</p>
      </div>
      
      <Accordion type="single" collapsible className="bg-white rounded-lg border border-gray-200">
        <AccordionItem value="leves">
          <AccordionTrigger className="px-4 text-sm hover:no-underline">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-yellow-100">
                <Info className="h-4 w-4 text-yellow-600" />
              </div>
              <span>Infracciones leves (60€ - 625€)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-0 pb-3">
            <p className="text-gray-600 text-sm">
              Faltas de carácter meramente formal o documental relacionadas con el registro horario.
            </p>
            <ul className="list-disc pl-5 mt-2 text-xs text-gray-500 space-y-1">
              <li>No conservar los registros durante el periodo establecido (4 años)</li>
              <li>Errores o defectos formales en el sistema de registro</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="graves">
          <AccordionTrigger className="px-4 text-sm hover:no-underline">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-orange-100">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </div>
              <span>Infracciones graves (626€ - 6.250€)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-0 pb-3">
            <p className="text-gray-600 text-sm">
              Transgresión de las normas y límites legales en materia de jornada, trabajo nocturno, 
              horas extraordinarias, descansos, vacaciones o permisos.
            </p>
            <ul className="list-disc pl-5 mt-2 text-xs text-gray-500 space-y-1">
              <li>No llevar registro horario de los trabajadores</li>
              <li>Registro incompleto o inadecuado</li>
              <li>No controlar las horas extraordinarias realizadas</li>
              <li>No informar a los representantes de los trabajadores</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="muy-graves">
          <AccordionTrigger className="px-4 text-sm hover:no-underline">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-red-100">
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
              <span>Infracciones muy graves (6.251€ - 187.515€)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-0 pb-3">
            <p className="text-gray-600 text-sm">
              Acciones u omisiones que impliquen incumplimiento de normas laborales en aspectos esenciales, 
              afectando gravemente los derechos de los trabajadores.
            </p>
            <ul className="list-disc pl-5 mt-2 text-xs text-gray-500 space-y-1">
              <li>No pagar horas extras realizadas</li>
              <li>Retrasos reiterados en el pago del salario</li>
              <li>Obstrucción a la labor inspectora</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="flex items-center gap-2 font-medium text-gray-800 mb-3">
          <Scale className="h-4 w-4 text-blue-600" />
          Factores que determinan la cuantía
        </h4>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li><span className="font-medium">Gravedad de la infracción</span>: Impacto en los derechos de los trabajadores</li>
          <li><span className="font-medium">Tamaño de la empresa</span>: Las sanciones pueden ser más elevadas en empresas de mayor tamaño</li>
          <li><span className="font-medium">Reincidencia</span>: La repetición de infracciones similares agrava la sanción</li>
          <li><span className="font-medium">Intencionalidad</span>: Si la infracción fue deliberada, la sanción puede incrementarse</li>
          <li><span className="font-medium">Perjuicios causados</span>: Daño ocasionado a los trabajadores o terceros</li>
        </ul>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Consecuencias adicionales</h4>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>
            <span className="font-medium">Presunción de jornada completa</span>: 
            <p className="text-xs mt-1">En ausencia de registro de jornada en contratos a tiempo parcial, se presume que el contrato es a jornada completa.</p>
          </li>
          <li>
            <span className="font-medium">Abono de horas extraordinarias</span>: 
            <p className="text-xs mt-1">La falta de registro puede llevar a la obligación de abonar horas extraordinarias no registradas ni compensadas.</p>
          </li>
          <li>
            <span className="font-medium">Sanciones adicionales</span>: 
            <p className="text-xs mt-1">La no comunicación a representantes de los trabajadores puede constituir una infracción adicional.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
