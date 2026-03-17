
import { FileText, Info, AlertTriangle, AlertCircle, Scale, TrendingUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function SanctionInfoContent() {
  return (
    <div className="space-y-6 text-sm">
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[var(--radius)] border border-white/30 animate-fade-in">
        <h4 className="flex items-center gap-3 font-medium text-[color:var(--text-strong)] mb-4">
          <div className="p-2 rounded-full bg-[#57BFAD]/20">
            <FileText className="h-5 w-5 text-[#57BFAD]" />
          </div>
          Normativa aplicable
        </h4>
         <p className="text-[color:var(--text)] mb-4 leading-relaxed px-2"><strong>RD 8/2019</strong>, vigente desde el 12 de mayo de 2019, establece la obligación de garantizar un registro diario de la jornada laboral para todos los trabajadores.</p>
         <p className="text-[color:var(--text)] mb-4 leading-relaxed px-2"><strong>LISOS (RD Legislativo 5/2000), art. 40</strong> — define los rangos de sanción aplicables por centro de trabajo.</p>
         <p className="text-[color:var(--text)] leading-relaxed px-2">Las sanciones se aplican por centro de trabajo afectado, no por trabajador (salvo infracciones muy graves).</p>
      </div>

      {/* Key stats */}
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[var(--radius)] border border-white/30 animate-fade-in [animation-delay:100ms]">
        <h4 className="flex items-center gap-3 font-medium text-[color:var(--text-strong)] mb-4">
          <div className="p-2 rounded-full bg-[#F4B957]/20">
            <TrendingUp className="h-5 w-5 text-[#F4B957]" />
          </div>
          Datos clave de inspecciones
        </h4>
        <ul className="space-y-3 text-[color:var(--text)] leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[#F4B957] font-bold">20,2M€</span>
            <span>en multas por registro horario en 2024</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#F4B957] font-bold">+193%</span>
            <span>incremento de sanciones desde 2019</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#F4B957] font-bold">1.869</span>
            <span>infracciones de registro horario detectadas en 2024</span>
          </li>
        </ul>
      </div>
      
      <Accordion type="single" collapsible className="bg-white/10 backdrop-blur-xl rounded-[var(--radius)] border border-white/30 animate-fade-in [animation-delay:200ms]">
        <AccordionItem value="leves">
          <AccordionTrigger className="px-6 py-4 text-sm hover:no-underline text-[color:var(--text-strong)] transition-all duration-200 hover:bg-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-[#F4B957]/20 backdrop-blur-sm">
                <Info className="h-5 w-5 text-[#F4B957]" />
              </div>
              <span className="font-medium">Infracciones leves (60€ - 625€ por centro)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pt-0 pb-4">
            <p className="text-[color:var(--text)] text-sm leading-relaxed mb-3">
              Faltas de carácter meramente formal o documental relacionadas con el registro horario.
            </p>
            <ul className="list-disc pl-6 mt-3 text-xs text-[color:var(--muted)] space-y-2 leading-relaxed">
              <li>No conservar los registros durante el periodo establecido (4 años)</li>
              <li>Errores o defectos formales en el sistema de registro</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="graves">
          <AccordionTrigger className="px-6 py-4 text-sm hover:no-underline text-[color:var(--text-strong)] transition-all duration-200 hover:bg-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-500/20 backdrop-blur-sm">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              </div>
              <span className="font-medium">Infracciones graves (625€ - 6.250€ por centro)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pt-0 pb-4">
            <p className="text-[color:var(--text)] text-sm leading-relaxed mb-3">
              Transgresión de las normas y límites legales en materia de jornada, trabajo nocturno, 
              horas extraordinarias, descansos, vacaciones o permisos.
            </p>
            <ul className="list-disc pl-6 mt-3 text-xs text-[color:var(--muted)] space-y-2 leading-relaxed">
              <li>No llevar registro horario de los trabajadores</li>
              <li>Registro incompleto o inadecuado</li>
              <li>No controlar las horas extraordinarias realizadas</li>
              <li>No informar a los representantes de los trabajadores</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="muy-graves">
          <AccordionTrigger className="px-6 py-4 text-sm hover:no-underline text-[color:var(--text-strong)] transition-all duration-200 hover:bg-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-500/20 backdrop-blur-sm">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <span className="font-medium">Infracciones muy graves (6.251€ - 187.515€ por trabajador)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pt-0 pb-4">
            <p className="text-[color:var(--text)] text-sm leading-relaxed mb-3">
              Acciones u omisiones que impliquen incumplimiento de normas laborales en aspectos esenciales, 
              afectando gravemente los derechos de los trabajadores. Se aplican por trabajador afectado.
            </p>
            <ul className="list-disc pl-6 mt-3 text-xs text-[color:var(--muted)] space-y-2 leading-relaxed">
              <li>No pagar horas extras realizadas</li>
              <li>Retrasos reiterados en el pago del salario</li>
              <li>Obstrucción a la labor inspectora</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Jurisprudencia relevante */}
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[var(--radius)] border border-white/30 animate-fade-in [animation-delay:400ms]">
        <h4 className="flex items-center gap-3 font-medium text-[color:var(--text-strong)] mb-4">
          <div className="p-2 rounded-full bg-[#57BFAD]/20">
            <Scale className="h-5 w-5 text-[#57BFAD]" />
          </div>
          Jurisprudencia relevante
        </h4>
        <ul className="space-y-4 text-[color:var(--text)] leading-relaxed">
          <li>
            <span className="font-medium text-[color:var(--text-strong)]">SAN 22/2022 (Ferrovial):</span>
            <p className="text-sm mt-1 text-[color:var(--muted)]">Los registros en papel y los tiempos estimados no son válidos como registro de jornada.</p>
          </li>
          <li>
            <span className="font-medium text-[color:var(--text-strong)]">STS 41/2023:</span>
            <p className="text-sm mt-1 text-[color:var(--muted)]">Los sistemas telemáticos con trazabilidad son válidos para el cumplimiento del registro horario.</p>
          </li>
          <li>
            <span className="font-medium text-[color:var(--text-strong)]">TSJ Gipuzkoa 2024 (Lidl):</span>
            <p className="text-sm mt-1 text-[color:var(--muted)]">Condena de 57.000€ por irregularidades en registro horario.</p>
          </li>
        </ul>
      </div>
      
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[var(--radius)] border border-white/30 animate-fade-in [animation-delay:600ms]">
        <h4 className="font-medium text-[color:var(--text-strong)] mb-4">Factores que determinan la cuantía</h4>
        <ul className="list-disc pl-6 text-[color:var(--text)] space-y-3 leading-relaxed">
          <li><span className="font-medium">Gravedad de la infracción</span>: Leve, grave o muy grave según LISOS</li>
          <li><span className="font-medium">Centros de trabajo</span>: Las sanciones se aplican por cada centro afectado</li>
          <li><span className="font-medium">Trabajadores afectados</span>: Relevante para infracciones muy graves y riesgo judicial</li>
          <li><span className="font-medium">Reincidencia</span>: La repetición de infracciones similares agrava la sanción</li>
          <li><span className="font-medium">Intencionalidad</span>: Si la infracción fue deliberada, la sanción puede incrementarse</li>
        </ul>
      </div>
    </div>
  );
}
