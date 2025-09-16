
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { SanctionCalculator } from "./SanctionCalculator";

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
  return (
    <div className={`py-6 ${isEmbedded ? "glass p-6 rounded-[var(--radius-lg)]" : "glass card-lg"}`}>
      <div className={`mb-4 flex items-center gap-3 ${
        results.level === "compliant" ? "" : 
        results.level === "medium-risk" ? "" : 
        ""
      }`}>
        {results.level === "compliant" && (
          <>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--success)' }}
            >
              <CheckCircle className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                Cumples con la normativa
              </h2>
              <p style={{ color: 'var(--ink-700)' }}>
                Tu empresa está protegida legalmente
              </p>
            </div>
          </>
        )}
        {results.level === "medium-risk" && (
          <>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--warning)' }}
            >
              <AlertTriangle className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--warning)' }}>
                Riesgo Medio
              </h2>
              <p style={{ color: 'var(--ink-700)' }}>
                Posibles sanciones leves o graves
              </p>
            </div>
          </>
        )}
        {results.level === "high-risk" && (
          <>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--danger)' }}
            >
              <AlertCircle className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--danger)' }}>
                Alto Riesgo
              </h2>
              <p style={{ color: 'var(--ink-700)' }}>
                Posibles sanciones muy graves
              </p>
            </div>
          </>
        )}
      </div>
      
      <div className="glass card mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold mb-2" style={{ color: 'var(--ink-900)' }}>
            {Math.round(results.complianceScore)}%
          </div>
          <p style={{ color: 'var(--ink-700)' }}>
            Puntuación de cumplimiento
          </p>
        </div>
      </div>

      <div className="glass card-lg mb-6">
        {results.level === "compliant" ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" 
                 style={{ background: 'var(--g-brand)' }}>
              <CheckCircle className="w-8 h-8" style={{ color: 'var(--ink-900)' }} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--success)' }}>
              ¡Enhorabuena! Tu empresa está en regla
            </h3>
            <p style={{ color: 'var(--ink-700)' }} className="leading-relaxed">
              Tu sistema de control horario cumple con los requisitos del Real Decreto-ley 8/2019. 
              Mantén estas buenas prácticas para evitar problemas legales futuros.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--ink-900)' }}>
              {results.level === "medium-risk" 
                ? "Tu empresa podría enfrentar sanciones" 
                : "¡Atención! Alto riesgo de multas significativas"}
            </h3>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              {results.level === "medium-risk" 
                ? "Revisa tus prácticas laborales relacionadas con el registro horario para evitar posibles sanciones." 
                : "Es urgente tomar medidas correctivas inmediatas para evitar sanciones muy graves."}
            </p>
            {results.violations.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg" style={{ color: 'var(--ink-900)' }}>
                  Incumplimientos detectados:
                </h4>
                <div className="space-y-3">
                  {results.violations.map((violation, index) => (
                    <div key={index} className="glass card">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ 
                            backgroundColor: violation.riskLevel === 'muy grave' ? 'var(--danger)' : 'var(--warning)' 
                          }}
                        />
                        <div className="flex-1">
                          <p className="font-medium mb-1" style={{ color: 'var(--ink-900)' }}>
                            {violation.question}
                          </p>
                          <p className="text-sm" style={{ color: 'var(--ink-700)' }}>
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
    </div>
  );
}
