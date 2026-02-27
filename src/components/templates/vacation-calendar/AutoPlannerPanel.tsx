
import React, { useState } from "react";
import { Employee, ABSENCE_TYPES } from "./types";
import { Wand2, Users, Calendar, Settings2, Play, RotateCcw } from "lucide-react";

interface AutoPlannerPanelProps {
  employees: Employee[];
  year: number;
  onPlanRotative: (minCoverage: number) => void;
  onPlanCollective: (minCoverage: number, start: string, end: string) => void;
  onPlanPreferences: (minCoverage: number, prefs: Record<string, number[]>) => void;
  onClearAll: () => void;
  hasAbsences: boolean;
}

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

type PlanMode = "rotative" | "collective" | "preferences";

export default function AutoPlannerPanel({
  employees, year, onPlanRotative, onPlanCollective, onPlanPreferences, onClearAll, hasAbsences,
}: AutoPlannerPanelProps) {
  const [mode, setMode] = useState<PlanMode>("rotative");
  const [minCoverage, setMinCoverage] = useState(Math.max(1, Math.ceil(employees.length / 2)));
  const [collectiveStart, setCollectiveStart] = useState(`${year}-08-03`);
  const [collectiveEnd, setCollectiveEnd] = useState(`${year}-08-14`);
  const [preferences, setPreferences] = useState<Record<string, number[]>>(() => {
    const p: Record<string, number[]> = {};
    employees.forEach(e => (p[e.id] = [6, 7])); // Jul-Aug default
    return p;
  });

  const togglePref = (empId: string, month: number) => {
    setPreferences(prev => {
      const cur = prev[empId] || [];
      return { ...prev, [empId]: cur.includes(month) ? cur.filter(m => m !== month) : [...cur, month] };
    });
  };

  const handleGenerate = () => {
    if (mode === "rotative") onPlanRotative(minCoverage);
    else if (mode === "collective") onPlanCollective(minCoverage, collectiveStart, collectiveEnd);
    else onPlanPreferences(minCoverage, preferences);
  };

  return (
    <div className="feature-card no-print" style={{ padding: 20, marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, color: "var(--text)", margin: 0 }}>
          <Wand2 className="h-5 w-5" style={{ color: "var(--green)" }} />
          Planificación automática
        </h3>
        {hasAbsences && (
          <button onClick={onClearAll} className="btn btn-outline" style={{ padding: "4px 12px", fontSize: 12, color: "hsl(0,72%,51%)" }}>
            <RotateCcw className="h-3 w-3" /> Borrar todo
          </button>
        )}
      </div>

      {/* Mode selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {([
          { key: "rotative" as PlanMode, icon: <RotateCcw className="h-4 w-4" />, label: "Auto-rotativo", desc: "La herramienta distribuye equitativamente" },
          { key: "preferences" as PlanMode, icon: <Users className="h-4 w-4" />, label: "Por preferencias", desc: "Cada empleado elige meses" },
          { key: "collective" as PlanMode, icon: <Calendar className="h-4 w-4" />, label: "Colectivas", desc: "Período común + resto individual" },
        ]).map(m => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            style={{
              flex: "1 1 140px", padding: "10px 12px", borderRadius: 10,
              border: mode === m.key ? "2px solid var(--green)" : "1px solid var(--border)",
              background: mode === m.key ? "var(--green-bg)" : "var(--white)",
              cursor: "pointer", textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 13, color: mode === m.key ? "var(--green-dark)" : "var(--text)", marginBottom: 2 }}>
              {m.icon} {m.label}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.3 }}>{m.desc}</div>
          </button>
        ))}
      </div>

      {/* Coverage config */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <Settings2 className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
        <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Cobertura mínima:</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            onClick={() => setMinCoverage(c => Math.max(1, c - 1))}
            style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border)", background: "var(--white)", cursor: "pointer", fontWeight: 700, fontSize: 14, color: "var(--text)" }}
          >−</button>
          <span style={{ minWidth: 36, textAlign: "center", fontWeight: 700, fontSize: 15, color: "var(--green)" }}>{minCoverage}</span>
          <button
            onClick={() => setMinCoverage(c => Math.min(employees.length, c + 1))}
            style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border)", background: "var(--white)", cursor: "pointer", fontWeight: 700, fontSize: 14, color: "var(--text)" }}
          >+</button>
        </div>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>de {employees.length} empleados presentes cada día</span>
      </div>

      {/* Mode-specific config */}
      {mode === "collective" && (
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Período colectivo:</div>
          <input
            type="date"
            value={collectiveStart}
            onChange={e => setCollectiveStart(e.target.value)}
            min={`${year}-01-01`}
            max={`${year}-12-31`}
            style={{ fontSize: 13, padding: "6px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--white)", color: "var(--text)" }}
          />
          <span style={{ color: "var(--text-muted)" }}>→</span>
          <input
            type="date"
            value={collectiveEnd}
            onChange={e => setCollectiveEnd(e.target.value)}
            min={collectiveStart}
            max={`${year}-12-31`}
            style={{ fontSize: 13, padding: "6px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--white)", color: "var(--text)" }}
          />
        </div>
      )}

      {mode === "preferences" && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>Selecciona meses preferidos por empleado:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {employees.map(emp => (
              <div key={emp.id} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", minWidth: 90 }}>{emp.name}</span>
                <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                  {MONTHS.map((m, i) => {
                    const selected = (preferences[emp.id] || []).includes(i);
                    return (
                      <button
                        key={i}
                        onClick={() => togglePref(emp.id, i)}
                        style={{
                          padding: "2px 7px", fontSize: 10, fontWeight: 600, borderRadius: 4, cursor: "pointer",
                          border: selected ? "1.5px solid var(--green)" : "1px solid var(--border)",
                          background: selected ? "var(--green)" : "var(--white)",
                          color: selected ? "white" : "var(--text-muted)",
                        }}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generate button */}
      <button onClick={handleGenerate} className="btn btn-green" style={{ width: "100%", padding: "10px 20px", fontSize: 14 }}>
        <Play className="h-4 w-4" />
        Generar planificación {mode === "rotative" ? "automática" : mode === "collective" ? "colectiva" : "por preferencias"}
      </button>
    </div>
  );
}
