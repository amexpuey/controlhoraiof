
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle, AlertTriangle, AlertCircle, Shield, ArrowRight } from "lucide-react";
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
          title: "Tu empresa está en regla",
          subtitle: "Tu sistema de registro horario cumple con el RD 8/2019",
          icon: Shield,
          iconColor: "#0FB89F",
          bgColor: "rgba(15, 184, 159, 0.1)",
          borderColor: "rgba(15, 184, 159, 0.3)",
          ctaText: "Mantén el cumplimiento automático con INWOUT",
        };
      case "medium-risk":
        return {
          title: "Riesgo Medio Detectado",
          subtitle: "Tu empresa podría enfrentar sanciones de la ITSS",
          icon: AlertTriangle,
          iconColor: "#d97706",
          bgColor: "rgba(217, 119, 6, 0.1)",
          borderColor: "rgba(217, 119, 6, 0.3)",
          ctaText: "Soluciónalo con INWOUT — Prueba gratis 14 días",
        };
      case "high-risk":
        return {
          title: "¡Atención! Alto Riesgo de Sanción",
          subtitle: "Tu empresa se expone a sanciones muy graves de la ITSS",
          icon: AlertCircle,
          iconColor: "#EF4444",
          bgColor: "rgba(239, 68, 68, 0.1)",
          borderColor: "rgba(239, 68, 68, 0.3)",
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
          className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ 
            background: config.bgColor,
            border: `2px solid ${config.borderColor}`,
            boxShadow: `0 0 30px ${config.borderColor}`
          }}
        >
          <Icon className="w-12 h-12" style={{ color: config.iconColor }} />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {config.title}
        </h2>
        
        <p className="text-lg mb-6" style={{ color: 'rgba(255,255,255,0.50)' }}>
          {config.subtitle}
        </p>
      </div>

      {/* Score */}
      <div className="text-center mb-8">
        <div className="panel mb-4">
          <div className="mb-3">
            <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.50)' }}>
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

      {/* Violations */}
      <div className="panel mb-6">
        {results.level === "compliant" ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-8 h-8" style={{ color: '#0FB89F' }} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#0FB89F' }}>
              ¡Enhorabuena! Tu empresa está en regla
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.50)' }} className="leading-relaxed">
              Tu sistema de control horario cumple con los requisitos del Real Decreto-ley 8/2019. 
              Mantén estas buenas prácticas para evitar problemas legales futuros.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4">
              {results.level === "medium-risk" 
                ? "Tu empresa podría enfrentar sanciones" 
                : "Es urgente tomar medidas correctivas"}
            </h3>
            <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
              {results.level === "medium-risk" 
                ? "Revisa tus prácticas de registro horario para evitar posibles sanciones de la Inspección de Trabajo." 
                : "Sin un sistema de registro horario conforme al RD 8/2019, tu empresa se expone a multas de hasta 7.500€ por infracción."}
            </p>
            {results.violations.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">
                  Incumplimientos detectados:
                </h4>
                <div className="space-y-3">
                  {results.violations.map((violation, index) => (
                    <div key={index} className="severity" data-level={violation.riskLevel === 'muy grave' ? 'high' : 'low'}>
                      <div className="dot"></div>
                      <div className="flex-1">
                        <p className="font-medium mb-1">
                          {violation.question}
                        </p>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          <span className="font-medium">Posible sanción:</span> {violation.sanction}
                        </p>
                        <span 
                          className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: violation.riskLevel === 'muy grave' ? '#EF4444' : '#d97706',
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

      {/* INWOUT CTA */}
      <div className="cc-card" style={{ padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
        <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.50)' }}>
          INWOUT implementa registro horario válido según RD 8/2019 en menos de 1 hora.
        </p>
        <a 
          href="https://app.inwout.com"
          target="_blank"
          rel="noopener noreferrer"
          className="cc-btn-cta"
          style={{ display: 'inline-flex', maxWidth: '100%' }}
        >
          {config.ctaText}
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button 
          onClick={resetForm}
          className="btn btn-ghost w-full sm:w-auto"
        >
          Volver a realizar el test
        </button>
      </div>

      {/* Mobile Sticky CTA */}
      {!isEmbedded && (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-50 p-4">
          <a 
            href="https://app.inwout.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="cc-btn-cta"
            style={{ width: '100%', maxWidth: '100%' }}
          >
            {config.ctaText}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      )}
    </div>
  );
}
