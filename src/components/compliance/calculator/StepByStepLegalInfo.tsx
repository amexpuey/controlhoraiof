
import { useState, useCallback } from "react";
import { FileText, TrendingUp, AlertTriangle, Scale, ShieldCheck, ShieldAlert, Gavel, ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const legalSteps = [
  {
    id: "base",
    title: "Base legal",
    icon: FileText,
    color: "#3b82f6",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-xl" style={{ background: '#3b82f608', borderLeft: '4px solid #3b82f6' }}>
          <h4 className="font-bold text-base mb-2" style={{ color: 'var(--text)' }}>RD 8/2019</h4>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Obligación de registro diario de jornada para todas las empresas, vigente desde el 12 de mayo de 2019. 
            Incluye hora de entrada y salida de cada trabajador.
          </p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: '#3b82f608', borderLeft: '4px solid #3b82f6' }}>
          <h4 className="font-bold text-base mb-2" style={{ color: 'var(--text)' }}>LISOS art. 40</h4>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            RD Legislativo 5/2000 — Establece los rangos de sanción por centro de trabajo afectado. 
            Las infracciones se clasifican en leves, graves y muy graves.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "rangos",
    title: "Rangos de sanción",
    icon: AlertTriangle,
    color: "#f97316",
    content: (
      <div className="space-y-3">
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Rangos establecidos por la LISOS art. 40 según la gravedad de la infracción:
        </p>
        {[
          { level: "Leve", range: "60€ – 625€", per: "por centro", icon: ShieldCheck, color: "#d97706" },
          { level: "Grave", range: "625€ – 6.250€", per: "por centro", icon: AlertTriangle, color: "#ea580c" },
          { level: "Muy grave", range: "6.251€ – 187.515€", per: "por trabajador", icon: ShieldAlert, color: "#dc2626" },
        ].map((item) => (
          <div
            key={item.level}
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{ background: 'white', border: '1px solid var(--border)' }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${item.color}15` }}>
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-base" style={{ color: 'var(--text)' }}>{item.level}</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {item.range} <span className="opacity-60">{item.per}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "jurisprudencia",
    title: "Jurisprudencia clave",
    icon: Scale,
    color: "#0fb89f",
    content: (
      <div className="space-y-3">
        {[
          { ref: "STJUE C-55/18", desc: "Sistema debe ser «objetivo, fiable y accesible». Sentencia que obliga a todos los estados miembros de la UE." },
          { ref: "SAN 22/2022 (Ferrovial)", desc: "Papel y tiempos estimados NO válidos como sistema de registro horario." },
          { ref: "STS 41/2023", desc: "Autodeclaración telemática con trazabilidad SÍ válida como sistema de registro." },
        ].map((item) => (
          <div
            key={item.ref}
            className="p-4 rounded-xl"
            style={{ background: 'white', border: '1px solid var(--border)' }}
          >
            <p className="font-bold text-base mb-1" style={{ color: 'var(--text)' }}>{item.ref}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "casos",
    title: "Casos reales",
    icon: Gavel,
    color: "#ef4444",
    content: (
      <div className="space-y-4">
        <div
          className="p-5 rounded-xl text-center"
          style={{ background: '#ef444410', border: '1px solid #ef444420' }}
        >
          <p className="text-3xl font-bold mb-1" style={{ color: '#dc2626' }}>57.000€</p>
          <p className="font-semibold text-base" style={{ color: 'var(--text)' }}>Lidl Gipuzkoa</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Condena judicial TSJ Gipuzkoa 2024 por horas extras no registradas
          </p>
        </div>
        <div
          className="p-5 rounded-xl text-center"
          style={{ background: '#ef444410', border: '1px solid #ef444420' }}
        >
          <p className="text-3xl font-bold mb-1" style={{ color: '#dc2626' }}>1,4M€</p>
          <p className="font-semibold text-base" style={{ color: 'var(--text)' }}>Big Four consultoras</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Sanción acumulada TSJ 2024 por incumplimiento sistemático del registro horario
          </p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'white', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4" style={{ color: '#d97706' }} />
            <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Datos ITSS 2024</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            {[
              { value: "20,2M€", label: "multas totales" },
              { value: "1.869", label: "infracciones" },
              { value: "+193%", label: "desde 2019" },
              { value: "1.237€", label: "multa media" },
            ].map((s) => (
              <div key={s.value}>
                <div className="text-base font-bold" style={{ color: '#d97706' }}>{s.value}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export function StepByStepLegalInfo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const step = legalSteps[currentStep];
  const StepIcon = step.icon;

  const transition = useCallback((fn: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      fn();
      setIsTransitioning(false);
    }, 250);
  }, []);

  return (
    <div className="py-4">
      {/* Progress dots */}
      <div className="mb-8">
        <div className="flex items-center gap-2 justify-center">
          {legalSteps.map((s, i) => (
            <div
              key={s.id}
              className="transition-all duration-300 rounded-full cursor-pointer"
              onClick={() => transition(() => setCurrentStep(i))}
              style={{
                width: i === currentStep ? 32 : 12,
                height: 12,
                background: i === currentStep ? s.color : i < currentStep ? `${s.color}80` : "var(--border)",
                boxShadow: i === currentStep ? `0 0 0 3px ${s.color}30` : "none",
              }}
            />
          ))}
        </div>
        <p className="text-center mt-3 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          {currentStep + 1} de {legalSteps.length}
        </p>
      </div>

      {/* Section header */}
      <div
        className="rounded-xl px-5 py-4 mb-6"
        style={{
          background: `${step.color}08`,
          borderLeft: `4px solid ${step.color}`,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${step.color}20` }}>
            <StepIcon className="w-4 h-4" style={{ color: step.color }} />
          </div>
          <span className="font-semibold text-base" style={{ color: 'var(--text)' }}>
            {step.title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={cn(
        "transition-all duration-300 mb-6",
        isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      )}>
        {step.content}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={() => transition(() => setCurrentStep(currentStep - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all disabled:opacity-30"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Anterior
        </button>
        <button
          type="button"
          onClick={() => transition(() => setCurrentStep(currentStep + 1))}
          disabled={currentStep === legalSteps.length - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all disabled:opacity-30"
          style={{ color: 'var(--text-secondary)' }}
        >
          Siguiente
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
