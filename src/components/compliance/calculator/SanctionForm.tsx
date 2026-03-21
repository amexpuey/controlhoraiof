import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Calculator } from "lucide-react";
import { SanctionFormFields } from "./SanctionFormFields";
import { SanctionResults } from "./SanctionResults";
import { sanctionTypes } from "../complianceData";

export interface CalculatorFormValues {
  workCenters: number;
  employees: number;
  monthsWithoutRecord: number;
  infractions: string[];
  reincidence: boolean;
}

export interface ITSSSanction {
  label: string;
  level: string;
  minPerCenter: number;
  maxPerCenter: number;
  totalMin: number;
  totalMax: number;
  articleRef?: string;
}

export interface ScenarioResult {
  label: string;
  description: string;
  emoji: string;
  min: number;
  max: number;
  sanctions: ITSSSanction[];
  legalBasis: string;
  isPending?: boolean;
}

export interface EstimatedSanctions {
  // Scenario A: LISOS vigente
  scenarioA: ScenarioResult;
  // Scenario B: Anteproyecto
  scenarioB: ScenarioResult;
  // Scenario C: Judicial risk
  scenarioC: ScenarioResult;
  // Combined total (A + C as worst case)
  totalMin: number;
  totalMax: number;
  // Context
  workCenters: number;
  employeesAffected: number;
  monthsWithoutRecord: number;
  reincidenceApplied: boolean;
  // Legacy compat
  itssMin: number;
  itssMax: number;
  itssSanctions: ITSSSanction[];
  judicialMin: number;
  judicialMax: number;
}

interface SanctionFormProps {
  onResultCalculated?: (result: EstimatedSanctions) => void;
}

export function SanctionForm({ onResultCalculated }: SanctionFormProps) {
  const [estimatedSanctions, setEstimatedSanctions] = useState<EstimatedSanctions | null>(null);
  
  const calculatorForm = useForm<CalculatorFormValues>({
    defaultValues: {
      workCenters: 1,
      employees: 10,
      monthsWithoutRecord: 6,
      infractions: ["no_registro"],
      reincidence: false
    }
  });

  const calculateSanctions = (data: CalculatorFormValues) => {
    const result = computeAllScenarios(data);
    setEstimatedSanctions(result);
    onResultCalculated?.(result);
  };

  return (
    <>
      <Form {...calculatorForm}>
        <form 
          id="sanction-calculator-form"
          onSubmit={calculatorForm.handleSubmit(calculateSanctions)} 
          className="space-y-6"
        >
          <SanctionFormFields control={calculatorForm.control} />
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-b from-[#3DC6B0] to-[#36AF9A] text-white border border-white/55 rounded-full py-4 px-6 font-bold flex items-center justify-center gap-3 shadow-[0_8px_22px_rgba(54,175,154,0.35)] transition-all duration-200 ease-out hover:transform hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(54,175,154,0.4)] hover:brightness-105 active:transform active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DC6B0]/35"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="3" width="14" height="18" rx="2"></rect>
              <line x1="8" y1="7" x2="16" y2="7"></line>
              <circle cx="9" cy="12" r="1.5"></circle>
              <circle cx="13" cy="12" r="1.5"></circle>
              <circle cx="9" cy="16" r="1.5"></circle>
              <circle cx="13" cy="16" r="1.5"></circle>
            </svg>
            Calcular posibles sanciones
          </button>
        </form>
      </Form>
      
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 p-4">
        <button 
          type="submit"
          form="sanction-calculator-form"
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#57BFAD] to-[#5fd1c3] shadow-[0_10px_30px_rgba(4,43,39,.18)] text-[color:var(--text-strong)] font-semibold flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calcular posibles sanciones
        </button>
      </div>
      
      {estimatedSanctions && (
        <SanctionResults estimatedSanctions={estimatedSanctions} />
      )}
    </>
  );
}

// ---- Shared calculation engine ----

/** Art. 39.2 LISOS graduation by company size */
function getGradeRanges(level: string, employees: number): { min: number; max: number } {
  if (level === "leve") {
    if (employees <= 9) return { min: 60, max: 125 };
    if (employees <= 49) return { min: 126, max: 310 };
    return { min: 311, max: 625 };
  }
  if (level === "grave") {
    if (employees <= 9) return { min: 751, max: 1500 };
    if (employees <= 49) return { min: 1501, max: 3750 };
    return { min: 3751, max: 7500 };
  }
  // muy grave
  if (employees <= 9) return { min: 7501, max: 30000 };
  if (employees <= 49) return { min: 30001, max: 120005 };
  return { min: 120006, max: 225018 };
}

const JUDICIAL_MIN_PER_WORKER = 6000;
const JUDICIAL_MAX_PER_WORKER = 18000;

// Infractions affected by anteproyecto per-worker rule
const ANTEPROYECTO_PER_WORKER_IDS = ["no_registro", "registro_incompleto", "no_trazabilidad"];
const ANTEPROYECTO_MAX_PER_WORKER = 10000;

export function computeAllScenarios(data: {
  workCenters: number;
  employees: number;
  monthsWithoutRecord: number;
  infractions: string[];
  reincidence: boolean;
}): EstimatedSanctions {
  const { workCenters, employees, monthsWithoutRecord, infractions, reincidence } = data;
  const reincidenceMultiplier = reincidence ? 1.5 : 1;

  const selectedInfractions = sanctionTypes.filter(t => infractions.includes(t.id));

  // ── SCENARIO A: LISOS Vigent (graduated by Art. 39.2) ──
  const sanctionsA: ITSSSanction[] = selectedInfractions.map(inf => {
    const grade = getGradeRanges(inf.level, employees);
    const multiplier = inf.level === "muy grave" ? employees : workCenters;
    return {
      label: inf.label,
      level: inf.level,
      minPerCenter: grade.min,
      maxPerCenter: grade.max,
      totalMin: Math.round(grade.min * multiplier * reincidenceMultiplier),
      totalMax: Math.round(grade.max * multiplier * reincidenceMultiplier),
      articleRef: `Art. 39.2 LISOS — grado ${employees <= 9 ? 'mínimo' : employees <= 49 ? 'medio' : 'máximo'}`,
    };
  });
  const aMin = sanctionsA.reduce((s, x) => s + x.totalMin, 0);
  const aMax = sanctionsA.reduce((s, x) => s + x.totalMax, 0);

  // ── SCENARIO B: Anteproyecto ──
  const sanctionsB: ITSSSanction[] = selectedInfractions.map(inf => {
    const isPerWorker = ANTEPROYECTO_PER_WORKER_IDS.includes(inf.id);
    if (isPerWorker) {
      // Anteproyecto: per worker, up to €10,000
      const baseMin = inf.level === "muy grave" ? 7501 : 751;
      const baseMax = ANTEPROYECTO_MAX_PER_WORKER;
      return {
        label: inf.label,
        level: "muy grave",
        minPerCenter: baseMin,
        maxPerCenter: baseMax,
        totalMin: Math.round(baseMin * employees * reincidenceMultiplier),
        totalMax: Math.round(baseMax * employees * reincidenceMultiplier),
        articleRef: "Anteproyecto — cómputo por trabajador",
      };
    }
    // Same as Scenario A for non-affected infractions
    const grade = getGradeRanges(inf.level, employees);
    const multiplier = inf.level === "muy grave" ? employees : workCenters;
    return {
      label: inf.label,
      level: inf.level,
      minPerCenter: grade.min,
      maxPerCenter: grade.max,
      totalMin: Math.round(grade.min * multiplier * reincidenceMultiplier),
      totalMax: Math.round(grade.max * multiplier * reincidenceMultiplier),
      articleRef: `Art. 39.2 LISOS`,
    };
  });
  const bMin = sanctionsB.reduce((s, x) => s + x.totalMin, 0);
  const bMax = sanctionsB.reduce((s, x) => s + x.totalMax, 0);

  // ── SCENARIO C: Judicial Risk ──
  const cMin = Math.round(employees * JUDICIAL_MIN_PER_WORKER);
  const cMax = Math.round(employees * JUDICIAL_MAX_PER_WORKER);

  return {
    scenarioA: {
      label: "Ley vigente (LISOS)",
      description: `${selectedInfractions.length} infracción${selectedInfractions.length !== 1 ? 'es' : ''} × ${workCenters} centro${workCenters !== 1 ? 's' : ''} · Art. 39.2: grado ${employees <= 9 ? 'mínimo' : employees <= 49 ? 'medio' : 'máximo'} (${employees <= 9 ? '≤9' : employees <= 49 ? '10-49' : '≥50'} empleados)`,
      emoji: "📋",
      min: aMin,
      max: aMax,
      sanctions: sanctionsA,
      legalBasis: "Art. 39.2 y 40 LISOS (RD 5/2000, modificado por RD 8/2019)",
    },
    scenarioB: {
      label: "Si se aprueba el anteproyecto",
      description: `Cómputo por trabajador para ausencia de registro (${employees} afectados)`,
      emoji: "⚠️",
      min: bMin,
      max: bMax,
      sanctions: sanctionsB,
      legalBasis: "Anteproyecto de reforma laboral 2026 — pendiente de aprobación en BOE",
      isPending: true,
    },
    scenarioC: {
      label: "Si un trabajador te demanda",
      description: `Horas extra no registradas (${employees} empl.) · ${monthsWithoutRecord} meses sin registro`,
      emoji: "⚖️",
      min: cMin,
      max: cMax,
      sanctions: [],
      legalBasis: "Jurisprudencia CENDOJ verificada. Caso real documentado: €67.036 (hostal Madrid, 1 trabajador)",
    },
    // Combined worst case: A + C
    totalMin: aMin + cMin,
    totalMax: aMax + cMax,
    workCenters,
    employeesAffected: employees,
    monthsWithoutRecord,
    reincidenceApplied: reincidence,
    // Legacy compat
    itssMin: aMin,
    itssMax: aMax,
    itssSanctions: sanctionsA,
    judicialMin: cMin,
    judicialMax: cMax,
  };
}
