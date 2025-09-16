
import { Button } from "@/components/ui/button";
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
          title: "¡Excelente! Cumples con la normativa",
          subtitle: "Tu empresa está alineada con las regulaciones laborales",
          icon: Shield,
          iconColor: "var(--success)",
          bgColor: "rgba(32, 201, 151, 0.1)",
          borderColor: "rgba(32, 201, 151, 0.3)"
        };
      case "medium-risk":
        return {
          title: "Riesgo Medio Detectado",
          subtitle: "Posibles sanciones leves o graves",
          icon: AlertTriangle,
          iconColor: "var(--warning)",
          bgColor: "rgba(245, 159, 0, 0.1)",
          borderColor: "rgba(245, 159, 0, 0.3)"
        };
      case "high-risk":
        return {
          title: "¡Atención! Alto Riesgo",
          subtitle: "Posibles sanciones muy graves",
          icon: AlertCircle,
          iconColor: "var(--danger)",
          bgColor: "rgba(224, 49, 49, 0.1)",
          borderColor: "rgba(224, 49, 49, 0.3)"
        };
    }
  };

  const config = getLevelConfig();
  const Icon = config.icon;

  return (
    <div className={`py-6 ${isEmbedded ? "result p-6" : "result"}`}>
      {/* Success Icon and Title */}
      <div className="text-center mb-6">
        <div 
          className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center animate-fade-up"
          style={{ 
            background: `linear-gradient(135deg, rgba(87, 191, 173, 0.2), rgba(87, 191, 173, 0.1))`,
            border: `2px solid ${config.borderColor}`
          }}
        >
          <Icon className="w-12 h-12" style={{ color: config.iconColor }} />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-strong)' }}>
          {config.title}
        </h2>
        
        <p className="text-lg mb-6" style={{ color: 'var(--text)' }}>
          {config.subtitle}
        </p>
      </div>

      {/* Animated Score Display */}
      <div className="text-center mb-8">
        <div className="panel mb-4">
          <div className="mb-3">
            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
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
            <div className="icon mb-4">
              <CheckCircle className="w-8 h-8" style={{ color: 'var(--success)' }} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--success)' }}>
              ¡Enhorabuena! Tu empresa está en regla
            </h3>
            <p style={{ color: 'var(--text)' }} className="leading-relaxed">
              Tu sistema de control horario cumple con los requisitos del Real Decreto-ley 8/2019. 
              Mantén estas buenas prácticas para evitar problemas legales futuros.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-strong)' }}>
              {results.level === "medium-risk" 
                ? "Tu empresa podría enfrentar sanciones" 
                : "¡Atención! Alto riesgo de multas significativas"}
            </h3>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text)' }}>
              {results.level === "medium-risk" 
                ? "Revisa tus prácticas laborales relacionadas con el registro horario para evitar posibles sanciones." 
                : "Es urgente tomar medidas correctivas inmediatas para evitar sanciones muy graves."}
            </p>
            {results.violations.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg" style={{ color: 'var(--text-strong)' }}>
                  Incumplimientos detectados:
                </h4>
                <div className="space-y-3">
                  {results.violations.map((violation, index) => (
                    <div key={index} className="severity" data-level={violation.riskLevel === 'muy grave' ? 'high' : 'low'}>
                      <div className="dot"></div>
                      <div className="flex-1">
                        <p className="font-medium mb-1" style={{ color: 'var(--text-strong)' }}>
                          {violation.question}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text)' }}>
                          <span className="font-medium">Posible sanción:</span> {violation.sanction}
                        </p>
                        <span 
                          className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: violation.riskLevel === 'muy grave' ? 'var(--danger)' : 'var(--warning)',
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

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button 
          onClick={resetForm}
          className="btn btn-ghost w-full sm:w-auto"
        >
          Volver a realizar el test
        </button>
        {!isEmbedded && (
          <a 
            href="https://inwout.com/demo-online" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full sm:w-auto"
          >
            <span>Solicitar demo de INWOUT</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 p-4">
        <a 
          href="https://inwout.com/demo-online" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#57BFAD] to-[#5fd1c3] shadow-[0_10px_30px_rgba(4,43,39,.18)] text-[color:var(--text-strong)] font-semibold flex items-center justify-center gap-2"
        >
          <span>Solicitar demo de INWOUT</span>
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
