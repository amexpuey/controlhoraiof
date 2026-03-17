
import { EstimatedSanctions } from "./SanctionForm";
import { getRiskColor } from "../complianceData";
import { Building2, Scale, AlertTriangle } from "lucide-react";

interface SanctionResultsProps {
  estimatedSanctions: EstimatedSanctions;
}

const fmt = (n: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export function SanctionResults({ estimatedSanctions }: SanctionResultsProps) {
  const { itssMin, itssMax, itssSanctions, workCenters, judicialMin, judicialMax, employeesAffected, monthsWithoutRecord, totalMin, totalMax, reincidenceApplied } = estimatedSanctions;

  return (
    <div className="mt-6 space-y-4">
      {/* Section A: ITSS */}
      <div className="glass card-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-orange-500/20">
            <Building2 className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <h4 className="font-semibold text-lg" style={{ color: 'var(--text-strong)' }}>
              Sanción administrativa ITSS estimada
            </h4>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Sección A · Riesgo Sanción ITSS
            </p>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="text-3xl font-bold mb-1" style={{ color: 'var(--danger)' }}>
            {fmt(itssMin)} — {fmt(itssMax)}
          </div>
          <p className="text-sm" style={{ color: 'var(--text)' }}>
            Para {workCenters} {workCenters === 1 ? 'centro de trabajo' : 'centros de trabajo'}
            {reincidenceApplied && " · Agravante por reincidencia aplicado"}
          </p>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-xs font-medium" style={{ color: 'var(--text-strong)' }}>Infracciones incluidas:</p>
          <ul className="space-y-1">
            {itssSanctions.map((s, i) => (
              <li key={i} className="text-xs flex items-start gap-2 p-2 rounded-lg bg-white/5">
                <span className={`font-semibold whitespace-nowrap ${getRiskColor(s.level)}`}>
                  {s.level.toUpperCase()}
                </span>
                <span style={{ color: 'var(--text)' }}>
                  {s.label} — {fmt(s.minPerCenter)}–{fmt(s.maxPerCenter)} × {s.level === 'muy grave' ? `${employeesAffected} trabajadores` : `${workCenters} centros`} = <strong>{fmt(s.totalMin)}–{fmt(s.totalMax)}</strong>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs italic" style={{ color: 'var(--muted)' }}>
          Las sanciones se aplican por centro de trabajo afectado (LISOS art. 40). Las infracciones muy graves pueden aplicarse por trabajador.
        </p>
      </div>

      {/* Section B: Judicial Risk */}
      <div className="glass card-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-red-500/20">
            <Scale className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h4 className="font-semibold text-lg" style={{ color: 'var(--text-strong)' }}>
              Estimación riesgo judicial por horas no registradas
            </h4>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Sección B · Riesgo Condena Judicial
            </p>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="text-3xl font-bold mb-1" style={{ color: 'var(--danger)' }}>
            {fmt(judicialMin)} — {fmt(judicialMax)}
          </div>
          <p className="text-sm" style={{ color: 'var(--text)' }}>
            Para {employeesAffected} {employeesAffected === 1 ? 'trabajador afectado' : 'trabajadores afectados'} · {monthsWithoutRecord} {monthsWithoutRecord === 1 ? 'mes' : 'meses'} sin registro
          </p>
        </div>

        <div className="space-y-2 text-xs" style={{ color: 'var(--muted)' }}>
          <p>Basado en análisis de 127 sentencias. Incluye horas extra no pagadas + indemnizaciones.</p>
          <p className="font-medium" style={{ color: 'var(--text)' }}>
            Caso real: Lidl Gipuzkoa 57.000€ — Big Four consultoras 1,4M€ total (TSJ 2024)
          </p>
        </div>
      </div>

      {/* Combined Total */}
      <div className="glass card-lg border-2" style={{ borderColor: 'var(--danger)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-full bg-red-500/20">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <h4 className="font-semibold text-lg" style={{ color: 'var(--text-strong)' }}>
            Riesgo total estimado
          </h4>
        </div>

        <div className="text-center mb-4">
          <div className="text-4xl font-bold" style={{ color: 'var(--danger)' }}>
            {fmt(totalMin)} — {fmt(totalMax)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-center text-xs">
          <div className="p-3 rounded-xl bg-white/10">
            <p className="font-semibold" style={{ color: 'var(--text-strong)' }}>Sanción ITSS</p>
            <p style={{ color: 'var(--text)' }}>{fmt(itssMin)} — {fmt(itssMax)}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/10">
            <p className="font-semibold" style={{ color: 'var(--text-strong)' }}>Riesgo Judicial</p>
            <p style={{ color: 'var(--text)' }}>{fmt(judicialMin)} — {fmt(judicialMax)}</p>
          </div>
        </div>

        <p className="text-xs italic text-center" style={{ color: 'var(--muted)' }}>
          Estimación orientativa basada en LISOS art. 40 y jurisprudencia verificada. La sanción real depende del criterio del inspector. No constituye asesoramiento legal.
        </p>
      </div>
    </div>
  );
}
