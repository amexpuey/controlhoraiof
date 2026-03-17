
import { FileText, Scale, TrendingUp, AlertTriangle, ShieldCheck, ShieldAlert, Gavel } from "lucide-react";

export function SanctionInfoContent() {
  return (
    <div className="space-y-6 text-sm animate-fade-in">
      {/* Row 1: Normativa + Datos ITSS — two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Normativa */}
        <div className="bg-white/10 backdrop-blur-xl p-5 rounded-[var(--radius)] border border-white/30">
          <h4 className="flex items-center gap-2.5 font-semibold text-[color:var(--text-strong)] mb-3 text-sm">
            <FileText className="h-4 w-4 text-[#57BFAD] shrink-0" />
            Normativa aplicable
          </h4>
          <ul className="space-y-2 text-[color:var(--text)] text-xs leading-relaxed">
            <li><strong className="text-[color:var(--text-strong)]">RD 8/2019</strong> — Obligación de registro diario de jornada, vigente desde 12 mayo 2019.</li>
            <li><strong className="text-[color:var(--text-strong)]">LISOS art. 40</strong> — RD Legislativo 5/2000, rangos de sanción por centro de trabajo.</li>
          </ul>
        </div>

        {/* Datos ITSS */}
        <div className="bg-white/10 backdrop-blur-xl p-5 rounded-[var(--radius)] border border-white/30">
          <h4 className="flex items-center gap-2.5 font-semibold text-[color:var(--text-strong)] mb-3 text-sm">
            <TrendingUp className="h-4 w-4 text-[#F4B957] shrink-0" />
            Datos ITSS 2024
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "20,2M€", label: "multas totales" },
              { value: "1.869", label: "infracciones" },
              { value: "+193%", label: "desde 2019" },
              { value: "1.237€", label: "multa media" },
            ].map((s) => (
              <div key={s.value} className="text-center">
                <div className="text-base font-bold text-[#F4B957] leading-tight">{s.value}</div>
                <div className="text-[10px] text-[color:var(--muted)] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Rangos LISOS — compact table-style */}
      <div className="bg-white/10 backdrop-blur-xl p-5 rounded-[var(--radius)] border border-white/30">
        <h4 className="flex items-center gap-2.5 font-semibold text-[color:var(--text-strong)] mb-3 text-sm">
          <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0" />
          Rangos de sanción (LISOS art. 40)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/10">
            <ShieldCheck className="h-5 w-5 text-[#F4B957] shrink-0" />
            <div>
              <div className="font-semibold text-xs text-[color:var(--text-strong)]">Leve</div>
              <div className="text-xs text-[color:var(--text)]">60€ – 625€ <span className="text-[color:var(--muted)]">/ centro</span></div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/10">
            <AlertTriangle className="h-5 w-5 text-orange-400 shrink-0" />
            <div>
              <div className="font-semibold text-xs text-[color:var(--text-strong)]">Grave</div>
              <div className="text-xs text-[color:var(--text)]">625€ – 6.250€ <span className="text-[color:var(--muted)]">/ centro</span></div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/10">
            <ShieldAlert className="h-5 w-5 text-red-400 shrink-0" />
            <div>
              <div className="font-semibold text-xs text-[color:var(--text-strong)]">Muy grave</div>
              <div className="text-xs text-[color:var(--text)]">6.251€ – 187.515€ <span className="text-[color:var(--muted)]">/ trabajador</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Jurisprudencia + Factores — two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Jurisprudencia */}
        <div className="bg-white/10 backdrop-blur-xl p-5 rounded-[var(--radius)] border border-white/30">
          <h4 className="flex items-center gap-2.5 font-semibold text-[color:var(--text-strong)] mb-3 text-sm">
            <Scale className="h-4 w-4 text-[#57BFAD] shrink-0" />
            Jurisprudencia clave
          </h4>
          <ul className="space-y-3 text-xs leading-relaxed">
            <li>
              <span className="font-semibold text-[color:var(--text-strong)]">STJUE C-55/18</span>
              <span className="text-[color:var(--muted)]"> — Sistema debe ser «objetivo, fiable y accesible».</span>
            </li>
            <li>
              <span className="font-semibold text-[color:var(--text-strong)]">SAN 22/2022 Ferrovial</span>
              <span className="text-[color:var(--muted)]"> — Papel y tiempos estimados NO válidos.</span>
            </li>
            <li>
              <span className="font-semibold text-[color:var(--text-strong)]">STS 41/2023</span>
              <span className="text-[color:var(--muted)]"> — Autodeclaración telemática con trazabilidad SÍ válida.</span>
            </li>
            <li>
              <span className="font-semibold text-[color:var(--text-strong)]">TSJ Gipuzkoa 2024</span>
              <span className="text-[color:var(--muted)]"> — Lidl: condena de 57.000€.</span>
            </li>
          </ul>
        </div>

        {/* Factores */}
        <div className="bg-white/10 backdrop-blur-xl p-5 rounded-[var(--radius)] border border-white/30">
          <h4 className="flex items-center gap-2.5 font-semibold text-[color:var(--text-strong)] mb-3 text-sm">
            <Gavel className="h-4 w-4 text-[#F4B957] shrink-0" />
            Factores de la cuantía
          </h4>
          <ul className="space-y-2 text-xs text-[color:var(--text)] leading-relaxed">
            <li><strong className="text-[color:var(--text-strong)]">Gravedad</strong> — Leve, grave o muy grave según LISOS</li>
            <li><strong className="text-[color:var(--text-strong)]">Centros de trabajo</strong> — Sanción por cada centro afectado</li>
            <li><strong className="text-[color:var(--text-strong)]">Trabajadores</strong> — Relevante en muy graves y riesgo judicial</li>
            <li><strong className="text-[color:var(--text-strong)]">Reincidencia</strong> — Agrava la sanción</li>
            <li><strong className="text-[color:var(--text-strong)]">Intencionalidad</strong> — Incrementa si fue deliberada</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
