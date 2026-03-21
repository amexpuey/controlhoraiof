
import { useState, useCallback } from "react";
import { Building2, Users, CalendarDays, AlertTriangle, ShieldAlert, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { sanctionTypes } from "../complianceData";
import { SanctionResults } from "./SanctionResults";
import { EstimatedSanctions, ITSSSanction, computeAllScenarios } from "./SanctionForm";

interface StepByStepCalculatorProps {
  onResultCalculated?: (result: EstimatedSanctions) => void;
}

// Infraction questions for step 4
const infractionQuestions = sanctionTypes.map((s) => ({
  id: s.id,
  question: getInfractionQuestion(s.id),
  level: s.level,
  baseAmount: s.baseAmount,
  maxAmount: s.maxAmount,
  label: s.label,
}));

function getInfractionQuestion(id: string): string {
  const map: Record<string, string> = {
    no_registro: "¿Tu empresa no lleva registro horario?",
    registro_incompleto: "¿El registro es incompleto o inadecuado?",
    no_conservacion: "¿No se conservan registros 4 años?",
    horas_extra: "¿No se controlan las horas extraordinarias?",
    no_comunicacion: "¿No se informa a representantes de trabajadores?",
    limites_jornada: "¿Se superan límites de jornada laboral?",
    no_trazabilidad: "¿El sistema no tiene trazabilidad de cambios?",
    teletrabajo: "¿Los teletrabajadores no llevan registro?",
    impago_horas: "¿No se pagan las horas extras?",
    no_nomina: "¿Las horas extras no aparecen en nómina?",
    retraso_pago: "¿Hay retrasos reiterados en el pago?",
  };
  return map[id] || "";
}

function getLevelBadge(level: string) {
  const config = {
    leve: { bg: "#f59e0b20", color: "#d97706", label: "LEVE" },
    grave: { bg: "#f9731620", color: "#ea580c", label: "GRAVE" },
    "muy grave": { bg: "#ef444420", color: "#dc2626", label: "MUY GRAVE" },
  }[level] || { bg: "#9ca3af20", color: "#6b7280", label: level.toUpperCase() };

  return (
    <span
      className="text-xs font-bold px-3 py-1 rounded-full"
      style={{ background: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  );
}

const JUDICIAL_MIN_PER_WORKER = 6000;
const JUDICIAL_MAX_PER_WORKER = 18000;

// Section definitions
const sections = [
  { id: "context", color: "#3b82f6", icon: Building2, label: "Contexto empresa" },
  { id: "workers", color: "#3b82f6", icon: Users, label: "Trabajadores" },
  { id: "months", color: "#3b82f6", icon: CalendarDays, label: "Tiempo sin registro" },
  { id: "infractions", color: "#f97316", icon: AlertTriangle, label: "Infracciones" },
  { id: "reincidence", color: "#ef4444", icon: ShieldAlert, label: "Agravante" },
  { id: "result", color: "#0fb89f", icon: CheckCircle, label: "Resultado" },
];

export function StepByStepCalculator({ onResultCalculated }: StepByStepCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [subStep, setSubStep] = useState(0); // for infractions
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Form data
  const [workCenters, setWorkCenters] = useState(1);
  const [employees, setEmployees] = useState(10);
  const [monthsWithoutRecord, setMonthsWithoutRecord] = useState(6);
  const [infractionAnswers, setInfractionAnswers] = useState<Record<string, boolean>>({});
  const [reincidence, setReincidence] = useState<boolean | null>(null);
  const [result, setResult] = useState<EstimatedSanctions | null>(null);

  // Total steps for progress: 3 numeric + 9 infractions + 1 reincidence + 1 result
  const totalDots = 3 + infractionQuestions.length + 1 + 1;

  const getCurrentGlobalIndex = () => {
    if (currentStep <= 2) return currentStep;
    if (currentStep === 3) return 3 + subStep;
    if (currentStep === 4) return 3 + infractionQuestions.length;
    return 3 + infractionQuestions.length + 1;
  };

  const getSectionForDot = (dotIndex: number) => {
    if (dotIndex < 3) return sections[dotIndex < 1 ? 0 : dotIndex < 2 ? 1 : 2];
    if (dotIndex < 3 + infractionQuestions.length) return sections[3];
    if (dotIndex < 3 + infractionQuestions.length + 1) return sections[4];
    return sections[5];
  };

  const transition = useCallback((fn: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      fn();
      setIsTransitioning(false);
    }, 250);
  }, []);

  const handleNext = () => {
    if (currentStep === 3) {
      // In infractions
      if (subStep < infractionQuestions.length - 1) {
        transition(() => setSubStep(subStep + 1));
        return;
      }
    }
    if (currentStep === 4) {
      // Calculate result
      calculateAndShowResult();
      return;
    }
    if (currentStep < 5) {
      transition(() => {
        setCurrentStep(currentStep + 1);
        if (currentStep + 1 === 3) setSubStep(0);
      });
    }
  };

  const handlePrev = () => {
    if (currentStep === 3 && subStep > 0) {
      transition(() => setSubStep(subStep - 1));
      return;
    }
    if (currentStep > 0) {
      transition(() => {
        const prev = currentStep - 1;
        setCurrentStep(prev);
        if (prev === 3) setSubStep(infractionQuestions.length - 1);
      });
    }
  };

  const handleInfractionAnswer = (id: string, value: boolean) => {
    setInfractionAnswers((prev) => ({ ...prev, [id]: value }));
    setTimeout(() => handleNext(), 400);
  };

  const handleReincidenceAnswer = (value: boolean) => {
    setReincidence(value);
    setTimeout(() => {
      calculateAndShowResult();
    }, 400);
  };

  const calculateAndShowResult = () => {
    const selectedInfractionIds = infractionQuestions
      .filter((q) => infractionAnswers[q.id] === true)
      .map((q) => q.id);

    const r = computeAllScenarios({
      workCenters,
      employees,
      monthsWithoutRecord,
      infractions: selectedInfractionIds,
      reincidence: !!reincidence,
    });

    transition(() => {
      setResult(r);
      setCurrentStep(5);
    });
    onResultCalculated?.(r);
  };

  const currentSection = currentStep <= 2 ? sections[currentStep] : sections[Math.min(currentStep, 5)];
  const sectionColor = currentSection.color;
  const SectionIcon = currentSection.icon;
  const globalIndex = getCurrentGlobalIndex();

  const canGoNext = () => {
    if (currentStep === 0) return workCenters >= 1;
    if (currentStep === 1) return employees >= 1;
    if (currentStep === 2) return monthsWithoutRecord >= 1;
    if (currentStep === 3) return infractionAnswers[infractionQuestions[subStep]?.id] !== undefined;
    if (currentStep === 4) return reincidence !== null;
    return false;
  };

  return (
    <div className="py-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          style={{ background: '#0fb89f15', border: '2px solid #0fb89f30' }}
        >
          <SectionIcon className="h-7 w-7" style={{ color: '#0fb89f' }} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>
          Calculadora de sanciones
        </h2>
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          Estima el riesgo económico de tu empresa
        </p>
      </div>

      {/* Progress dots */}
      {currentStep < 5 && (
        <div className="mb-8">
          <div className="flex items-center gap-1.5 justify-center flex-wrap">
            {Array.from({ length: totalDots }).map((_, i) => {
              const isActive = i === globalIndex;
              const isPast = i < globalIndex;
              const dotSection = getSectionForDot(i);
              const dotColor = dotSection.color;

              // Group separators
              const showSep = (i === 3 || i === 3 + infractionQuestions.length || i === 3 + infractionQuestions.length + 1);

              return (
                <div key={i} className="flex items-center gap-1.5">
                  {showSep && (
                    <div className="w-4 h-px mx-1" style={{ background: "var(--border)" }} />
                  )}
                  <div
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: isActive ? 32 : 12,
                      height: 12,
                      background: isActive
                        ? dotColor
                        : isPast
                        ? `${dotColor}80`
                        : "var(--border)",
                      boxShadow: isActive ? `0 0 0 3px ${dotColor}30` : "none",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <p className="text-center mt-3 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Paso {globalIndex + 1} de {totalDots}
          </p>
        </div>
      )}

      {/* Section header */}
      {currentStep < 5 && (
        <div
          className="rounded-xl px-5 py-4 mb-6"
          style={{
            background: `${sectionColor}08`,
            borderLeft: `4px solid ${sectionColor}`,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: `${sectionColor}20` }}
              >
                <SectionIcon className="w-4 h-4" style={{ color: sectionColor }} />
              </div>
              <span className="font-semibold text-base" style={{ color: 'var(--text)' }}>
                {currentSection.label}
              </span>
            </div>
            {currentStep === 3 && (
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: `${sectionColor}18`, color: sectionColor }}
              >
                {subStep + 1} / {infractionQuestions.length}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn(
        "transition-all duration-300",
        isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      )}>
        {/* Step 1: Work centers */}
        {currentStep === 0 && (
          <NumberStepCard
            question="¿Cuántos centros de trabajo tiene tu empresa?"
            subtitle="Las sanciones ITSS se aplican por centro de trabajo (LISOS art. 40)"
            value={workCenters}
            onChange={setWorkCenters}
            min={1}
          />
        )}

        {/* Step 2: Employees */}
        {currentStep === 1 && (
          <NumberStepCard
            question="¿Cuántos trabajadores podrían estar afectados?"
            subtitle="Se usa para estimar el riesgo judicial por horas no registradas"
            value={employees}
            onChange={setEmployees}
            min={1}
          />
        )}

        {/* Step 3: Months */}
        {currentStep === 2 && (
          <NumberStepCard
            question="¿Cuántos meses llevas sin registro horario correcto?"
            subtitle="Solo para cálculo de riesgo judicial, no afecta a la sanción ITSS"
            value={monthsWithoutRecord}
            onChange={setMonthsWithoutRecord}
            min={1}
          />
        )}

        {/* Step 4: Infractions one by one */}
        {currentStep === 3 && (
          <div
            className="rounded-2xl p-6 md:p-8 mb-6"
            style={{
              background: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xl md:text-[22px] font-semibold leading-relaxed" style={{ color: 'var(--text)' }}>
                {infractionQuestions[subStep].question}
              </p>
            </div>
            <div className="mb-10">
              {getLevelBadge(infractionQuestions[subStep].level)}
            </div>

            <div className="flex gap-4">
              <YesNoButton
                label="Sí"
                selected={infractionAnswers[infractionQuestions[subStep].id] === true}
                color="#f97316"
                onClick={() => handleInfractionAnswer(infractionQuestions[subStep].id, true)}
              />
              <YesNoButton
                label="No"
                selected={infractionAnswers[infractionQuestions[subStep].id] === false}
                color="#0fb89f"
                onClick={() => handleInfractionAnswer(infractionQuestions[subStep].id, false)}
              />
            </div>
          </div>
        )}

        {/* Step 5: Reincidence */}
        {currentStep === 4 && (
          <div
            className="rounded-2xl p-6 md:p-8 mb-6"
            style={{
              background: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
              border: '1px solid var(--border)',
            }}
          >
            <p className="text-xl md:text-[22px] font-semibold leading-relaxed mb-2" style={{ color: 'var(--text)' }}>
              ¿Ha habido sanciones previas por infracciones similares en el último año?
            </p>
            <p className="text-sm mb-10" style={{ color: 'var(--text-secondary)' }}>
              La reincidencia sitúa la sanción en el tramo superior del rango
            </p>

            <div className="flex gap-4">
              <YesNoButton
                label="Sí"
                selected={reincidence === true}
                color="#ef4444"
                onClick={() => handleReincidenceAnswer(true)}
              />
              <YesNoButton
                label="No"
                selected={reincidence === false}
                color="#0fb89f"
                onClick={() => handleReincidenceAnswer(false)}
              />
            </div>
          </div>
        )}

        {/* Step 6: Results */}
        {currentStep === 5 && result && (
          <SanctionResults estimatedSanctions={result} />
        )}
      </div>

      {/* Navigation */}
      {currentStep < 5 && currentStep !== 3 && currentStep !== 4 && (
        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all disabled:opacity-30"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext()}
            className="flex items-center gap-2 px-7 py-3 rounded-full text-base font-semibold transition-all hover:scale-[1.02] disabled:opacity-30"
            style={{
              background: canGoNext() ? '#0fb89f' : 'var(--border)',
              color: canGoNext() ? 'white' : 'var(--text-secondary)',
              boxShadow: canGoNext() ? '0 4px 14px rgba(15,184,159,0.3)' : 'none',
            }}
          >
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Navigation for infraction/reincidence steps (prev only since auto-advance) */}
      {(currentStep === 3 || currentStep === 4) && (
        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </button>
          {currentStep === 3 && infractionAnswers[infractionQuestions[subStep]?.id] !== undefined && (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
              style={{ color: 'var(--text-secondary)' }}
            >
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ---- Sub-components ----

function NumberStepCard({
  question,
  subtitle,
  value,
  onChange,
  min = 1,
}: {
  question: string;
  subtitle: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div
      className="rounded-2xl p-6 md:p-8 mb-6"
      style={{
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
        border: '1px solid var(--border)',
      }}
    >
      <p className="text-xl md:text-[22px] font-semibold leading-relaxed mb-2" style={{ color: 'var(--text)' }}>
        {question}
      </p>
      <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
        {subtitle}
      </p>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-all hover:scale-105"
          style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
        >
          −
        </button>
        <input
          type="number"
          min={min}
          value={value}
          onChange={(e) => onChange(Math.max(min, parseInt(e.target.value) || min))}
          className="w-24 text-center text-3xl font-bold border-0 outline-none bg-transparent"
          style={{ color: 'var(--text)' }}
        />
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-all hover:scale-105"
          style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
        >
          +
        </button>
      </div>
    </div>
  );
}

function YesNoButton({
  label,
  selected,
  color,
  onClick,
}: {
  label: string;
  selected: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 py-4 px-6 rounded-full text-lg font-semibold transition-all duration-200 border-2 flex items-center justify-center gap-2",
        "hover:scale-[1.02] active:scale-[0.98]"
      )}
      style={{
        background: selected ? color : 'white',
        color: selected ? 'white' : 'var(--text)',
        borderColor: selected ? color : 'var(--border)',
        boxShadow: selected ? `0 4px 14px ${color}4d` : 'none',
      }}
    >
      <div
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
        style={{
          borderColor: selected ? 'white' : color,
          background: selected ? 'white' : 'transparent',
        }}
      >
        {selected && (
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
        )}
      </div>
      {label}
    </button>
  );
}
