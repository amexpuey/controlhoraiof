
import { FileText, Info, AlertTriangle, AlertCircle, Scale } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function SanctionInfoContent() {
  return (
    <div className="space-y-4 text-sm">
      <div className="bg-white/10 backdrop-blur-xl p-4 rounded-[var(--radius)] border border-white/30">
        <h4 className="flex items-center gap-2 font-medium text-[color:var(--text-strong)] mb-3">
          <FileText className="h-4 w-4 text-[#57BFAD]" />
          Normativa aplicable
        </h4>
        <p className="text-[color:var(--text)] mb-3">El artículo 34 del Estatuto de los Trabajadores (ET) establece la obligación de las empresas de garantizar un registro diario de la jornada laboral.</p>
        <p className="text-[color:var(--text)]">Las sanciones se detallan en el Real Decreto Legislativo 5/2000 (LISOS).</p>
      </div>
      
      <Accordion type="single" collapsible className="bg-white/10 backdrop-blur-xl rounded-[var(--radius)] border border-white/30">
        <AccordionItem value="leves">
          <AccordionTrigger className="px-4 text-sm hover:no-underline text-[color:var(--text-strong)]">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-[#F4B957]/20 backdrop-blur-sm">
                <Info className="h-4 w-4 text-[#F4B957]" />
              </div>
              <span>Infracciones leves (60€ - 625€)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-0 pb-3">
            <p className="text-[color:var(--text)] text-sm">
              Faltas de carácter meramente formal o documental relacionadas con el registro horario.
            </p>
            <ul className="list-disc pl-5 mt-2 text-xs text-[color:var(--muted)] space-y-1">
              <li>No conservar los registros durante el periodo establecido (4 años)</li>
              <li>Errores o defectos formales en el sistema de registro</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="graves">
          <AccordionTrigger className="px-4 text-sm hover:no-underline text-[color:var(--text-strong)]">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-orange-500/20 backdrop-blur-sm">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </div>
              <span>Infracciones graves (626€ - 6.250€)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-0 pb-3">
            <p className="text-[color:var(--text)] text-sm">
              Transgresión de las normas y límites legales en materia de jornada, trabajo nocturno, 
              horas extraordinarias, descansos, vacaciones o permisos.
            </p>
            <ul className="list-disc pl-5 mt-2 text-xs text-[color:var(--muted)] space-y-1">
              <li>No llevar registro horario de los trabajadores</li>
              <li>Registro incompleto o inadecuado</li>
              <li>No controlar las horas extraordinarias realizadas</li>
              <li>No informar a los representantes de los trabajadores</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="muy-graves">
          <AccordionTrigger className="px-4 text-sm hover:no-underline text-[color:var(--text-strong)]">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-red-500/20 backdrop-blur-sm">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
              <span>Infracciones muy graves (6.251€ - 187.515€)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-0 pb-3">
            <p className="text-[color:var(--text)] text-sm">
              Acciones u omisiones que impliquen incumplimiento de normas laborales en aspectos esenciales, 
              afectando gravemente los derechos de los trabajadores.
            </p>
            <ul className="list-disc pl-5 mt-2 text-xs text-[color:var(--muted)] space-y-1">
              <li>No pagar horas extras realizadas</li>
              <li>Retrasos reiterados en el pago del salario</li>
              <li>Obstrucción a la labor inspectora</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="bg-white/10 backdrop-blur-xl p-4 rounded-[var(--radius)] border border-white/30">
        <h4 className="flex items-center gap-2 font-medium text-[color:var(--text-strong)] mb-3">
          <Scale className="h-4 w-4 text-[#57BFAD]" />
          Factores que determinan la cuantía
        </h4>
        <ul className="list-disc pl-5 text-[color:var(--text)] space-y-1">
          <li><span className="font-medium">Gravedad de la infracción</span>: Impacto en los derechos de los trabajadores</li>
          <li><span className="font-medium">Tamaño de la empresa</span>: Las sanciones pueden ser más elevadas en empresas de mayor tamaño</li>
          <li><span className="font-medium">Reincidencia</span>: La repetición de infracciones similares agrava la sanción</li>
          <li><span className="font-medium">Intencionalidad</span>: Si la infracción fue deliberada, la sanción puede incrementarse</li>
          <li><span className="font-medium">Perjuicios causados</span>: Daño ocasionado a los trabajadores o terceros</li>
        </ul>
      </div>
      
      <div className="bg-white/10 backdrop-blur-xl p-4 rounded-[var(--radius)] border border-white/30">
        <h4 className="font-medium text-[color:var(--text-strong)] mb-3">Consecuencias adicionales</h4>
        <ul className="list-disc pl-5 text-[color:var(--text)] space-y-2">
          <li>
            <span className="font-medium">Presunción de jornada completa</span>: 
            <p className="text-xs mt-1 text-[color:var(--muted)]">En ausencia de registro de jornada en contratos a tiempo parcial, se presume que el contrato es a jornada completa.</p>
          </li>
          <li>
            <span className="font-medium">Abono de horas extraordinarias</span>: 
            <p className="text-xs mt-1 text-[color:var(--muted)]">La falta de registro puede llevar a la obligación de abonar horas extraordinarias no registradas ni compensadas.</p>
          </li>
          <li>
            <span className="font-medium">Sanciones adicionales</span>: 
            <p className="text-xs mt-1 text-[color:var(--muted)]">La no comunicación a representantes de los trabajadores puede constituir una infracción adicional.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
