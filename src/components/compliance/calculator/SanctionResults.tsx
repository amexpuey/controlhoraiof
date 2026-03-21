
import { EstimatedSanctions, ScenarioResult } from "./SanctionForm";
import { getRiskColor } from "../complianceData";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SanctionResultsProps {
  estimatedSanctions: EstimatedSanctions;
}

const fmt = (n: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export function SanctionResults({ estimatedSanctions }: SanctionResultsProps) {
  const { scenarioA, scenarioB, scenarioC } = estimatedSanctions;

  // Find max for relative bar widths
  const globalMax = Math.max(scenarioA.max, scenarioB.max, scenarioC.max, 1);

  return (
    <div className="mt-6 space-y-5">
      {/* Title */}
      <div className="text-center mb-2">
        <h3 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
          Tu riesgo estimado
        </h3>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          3 escenarios de riesgo basados en tu situación
        </p>
      </div>

      {/* Scenario A */}
      <ScenarioCard
        scenario={scenarioA}
        globalMax={globalMax}
        barColor="#3b82f6"
        bgColor="#3b82f608"
        borderColor="#3b82f6"
        estimatedSanctions={estimatedSanctions}
      />

      {/* Scenario B */}
      <ScenarioCard
        scenario={scenarioB}
        globalMax={globalMax}
        barColor="#f59e0b"
        bgColor="#f59e0b08"
        borderColor="#f59e0b"
        estimatedSanctions={estimatedSanctions}
      />

      {/* Scenario C */}
      <ScenarioCard
        scenario={scenarioC}
        globalMax={globalMax}
        barColor="#ef4444"
        bgColor="#ef444408"
        borderColor="#ef4444"
        estimatedSanctions={estimatedSanctions}
      />

      {/* CTA */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          background: '#0fb89f08',
          border: '2px solid #0fb89f30',
        }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
          ¿Todo esto por no usar un sistema que cuesta 0€?
        </p>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          El registro horario es obligatorio desde mayo 2019 (RD 8/2019)
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-xs italic text-center px-4" style={{ color: 'var(--text-secondary)' }}>
        Estimación orientativa basada en LISOS art. 39-40 y jurisprudencia verificada CENDOJ. La sanción real depende del criterio del inspector. No constituye asesoramiento legal.
      </p>
    </div>
  );
}

function ScenarioCard({
  scenario,
  globalMax,
  barColor,
  bgColor,
  borderColor,
  estimatedSanctions,
}: {
  scenario: ScenarioResult;
  globalMax: number;
  barColor: string;
  bgColor: string;
  borderColor: string;
  estimatedSanctions: EstimatedSanctions;
}) {
  const [expanded, setExpanded] = useState(false);
  const barWidthPercent = Math.max(8, Math.round((scenario.max / globalMax) * 100));

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
        border: `1px solid var(--border)`,
      }}
    >
      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{scenario.emoji}</span>
            <span className="font-semibold text-base" style={{ color: 'var(--text)' }}>
              {scenario.label}
            </span>
            {scenario.isPending && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                style={{ background: `${barColor}18`, color: barColor }}
              >
                Pendiente
              </span>
            )}
          </div>
        </div>

        {/* Bar + amount */}
        <div className="mb-3">
          <div
            className="h-7 rounded-full transition-all duration-700 ease-out flex items-center px-3"
            style={{
              width: `${barWidthPercent}%`,
              background: `linear-gradient(135deg, ${barColor}, ${barColor}cc)`,
              minWidth: '100px',
            }}
          >
            <span className="text-xs font-bold text-white whitespace-nowrap">
              {fmt(scenario.min)} — {fmt(scenario.max)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {scenario.description}
        </p>

        {/* Expand details */}
        {scenario.sanctions.length > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 mt-3 text-xs font-medium transition-colors"
            style={{ color: barColor }}
          >
            {expanded ? 'Ocultar detalle' : 'Ver detalle por infracción'}
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}

        {/* Judicial case reference */}
        {scenario.sanctions.length === 0 && (
          <div className="mt-3 p-3 rounded-xl" style={{ background: `${barColor}08` }}>
            <p className="text-xs font-medium" style={{ color: barColor }}>
              Caso real documentado: €67.036 (hostal Madrid, 1 trabajador)
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-secondary)' }}>
              Basado en análisis de 127+ sentencias. Incluye horas extra no pagadas + indemnizaciones.
            </p>
          </div>
        )}
      </div>

      {/* Expanded detail */}
      {expanded && scenario.sanctions.length > 0 && (
        <div
          className="px-5 pb-5 md:px-6 md:pb-6"
        >
          <div className="space-y-2 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            {scenario.sanctions.map((s, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl" style={{ background: 'var(--surface, #f9fafb)' }}>
                <span className={`text-[10px] font-bold whitespace-nowrap px-2 py-0.5 rounded-full ${getRiskColor(s.level)}`}
                  style={{
                    background: s.level === 'leve' ? '#f59e0b18' : s.level === 'grave' ? '#f9731618' : '#ef444418',
                  }}
                >
                  {s.level.toUpperCase()}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>{s.label}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    {fmt(s.minPerCenter)}–{fmt(s.maxPerCenter)} base × {s.level === 'muy grave'
                      ? `${estimatedSanctions.employeesAffected} trabajadores`
                      : `${estimatedSanctions.workCenters} centros`
                    } = <strong>{fmt(s.totalMin)}–{fmt(s.totalMax)}</strong>
                  </p>
                  {s.articleRef && (
                    <p className="text-[10px] mt-0.5 italic" style={{ color: 'var(--text-secondary)' }}>
                      {s.articleRef}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <p className="text-[10px] italic mt-2" style={{ color: 'var(--text-secondary)' }}>
              {scenario.legalBasis}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
