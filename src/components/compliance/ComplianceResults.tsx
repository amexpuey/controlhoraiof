
import { ExternalLink, CheckCircle, AlertTriangle, AlertCircle, Shield } from "lucide-react";
import { SanctionCalculator } from "./SanctionCalculator";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface ComplianceResultsProps {
  results: {
    level: "compliant" | "medium-risk" | "high-risk";
    violations: { question: string; sanction: string; riskLevel: string }[];
    complianceScore: number;
  };
  resetForm: () => void;
  isEmbedded?: boolean;
}

export function ComplianceResults({ results, resetForm, isEmbedded = false }: ComplianceResultsProps) {
  const { currentValue: animatedScore } = useAnimatedCounter(results.complianceScore);

  const getLevelConfig = () => {
    switch (results.level) {
      case "compliant":
        return {
          title: "Tu empresa cumple con la normativa",
          subtitle: "Tu sistema de registro horario está alineado con el RD 8/2019",
          icon: Shield,
          iconColor: "var(--teal)",
          bgColor: "var(--teal-glow)",
          borderColor: "rgba(15,184,159,.3)",
          ctaText: "Mantén el cumplimiento automático con INWOUT",
        };
      case "medium-risk":
        return {
          title: "Riesgo medio detectado",
          subtitle: "Tu empresa podría enfrentar sanciones leves o graves",
          icon: AlertTriangle,
          iconColor: "var(--amber)",
          bgColor: "rgba(217,119,6,.12)",
          borderColor: "rgba(217,119,6,.3)",
          ctaText: "Soluciónalo con INWOUT — Prueba gratis 14 días",
        };
      case "high-risk":
        return {
          title: "Alto riesgo de sanción",
          subtitle: "Es urgente tomar medidas correctivas inmediatas",
          icon: AlertCircle,
          iconColor: "var(--danger)",
          bgColor: "rgba(239,68,68,.12)",
          borderColor: "rgba(239,68,68,.3)",
          ctaText: "Soluciónalo con INWOUT — Prueba gratis 14 días",
        };
    }
  };

  const config = getLevelConfig();
  const Icon = config.icon;

  return (
    <div className={`py-6 ${isEmbedded ? "result p-6" : "result"}`}>
      {/* Icon and Title */}
      <div className="text-center mb-6">
        <div
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{
            background: config.bgColor,
            border: `2px solid ${config.borderColor}`,
          }}
        >
          <Icon className="w-10 h-10" style={{ color: config.iconColor }} />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>
          {config.title}
        </h2>

        <p className="text-lg mb-6" style={{ color: 'var(--muted-text)' }}>
          {config.subtitle}
        </p>
      </div>

      {/* Score */}
      <div className="text-center mb-8">
        <div className="panel mb-4">
          <div className="mb-3">
            <span className="text-sm font-medium" style={{ color: 'var(--muted-text)' }}>
              Puntuación de cumplimiento
            </span>
          </div>
          <div className="score">
            <span className="animate-count-up">
              {Math.round(animatedScore)}%
            </span>
          </div>
        </div>
      </div>

      <div className="panel mb-6">
        {results.level === "compliant" ? (
          <div className="text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-4" style={{ color: 'var(--teal)' }} />
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--teal)' }}>
              Tu empresa está en regla
            </h3>
            <p style={{ color: 'var(--muted-text)' }} className="leading-relaxed">
              Tu sistema de control horario cumple con los requisitos del Real Decreto-ley 8/2019.
              Mantén estas buenas prácticas para evitar problemas legales futuros.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>
              {results.level === "medium-risk"
                ? "Tu empresa podría enfrentar sanciones"
                : "Alto riesgo de multas significativas"}
            </h3>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--muted-text)' }}>
              {results.level === "medium-risk"
                ? "Revisa tus prácticas laborales relacionadas con el registro horario para evitar posibles sanciones."
                : "Es urgente tomar medidas correctivas inmediatas para evitar sanciones muy graves."}
            </p>
            {results.violations.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg" style={{ color: '#ffffff' }}>
                  Incumplimientos detectados:
                </h4>
                <div className="space-y-3">
                  {results.violations.map((violation, index) => (
                    <div key={index} className="severity" data-level={violation.riskLevel === 'muy grave' ? 'high' : 'low'}>
                      <div className="dot"></div>
                      <div className="flex-1">
                        <p className="font-medium mb-1" style={{ color: '#ffffff' }}>
                          {violation.question}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                          <span className="font-medium">Posible sanción:</span> {violation.sanction}
                        </p>
                        <span
                          className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: violation.riskLevel === 'muy grave' ? 'var(--danger)' : 'var(--amber)',
                            color: 'white'
                          }}
                        >
                          Riesgo {violation.riskLevel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* INWOUT support text */}
      {results.level !== "compliant" && (
        <p className="text-sm text-center mb-4" style={{ color: 'var(--muted-text)' }}>
          INWOUT implementa registro horario válido según RD 8/2019 en menos de 1 hora.
        </p>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={resetForm}
          className="btn btn-ghost w-full sm:w-auto"
        >
          Volver a realizar el test
        </button>
        <a
          href="https://app.inwout.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary w-full sm:w-auto"
        >
          <span>{config.ctaText}</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 p-4"
           style={{ background: 'linear-gradient(180deg, transparent, rgba(7,17,31,.95))' }}>
        <a
          href="https://app.inwout.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary w-full"
          style={{ height: '56px', fontSize: '16px' }}
        >
          <span>Soluciónalo con INWOUT</span>
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
