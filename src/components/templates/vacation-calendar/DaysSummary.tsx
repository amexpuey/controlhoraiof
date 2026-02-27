
import React from "react";
import { Employee, ABSENCE_TYPES, AbsenceType } from "./types";
import { AlertTriangle, Calendar } from "lucide-react";

interface DaysSummaryProps {
  employees: Employee[];
  getUsedDays: (employeeId: string, type: AbsenceType) => number;
  overlapCount: number;
  coverageViolationCount: number;
  minCoverage: number;
}

export default function DaysSummary({ employees, getUsedDays, overlapCount, coverageViolationCount, minCoverage }: DaysSummaryProps) {
  return (
    <div className="feature-card" style={{ padding: 20 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, marginBottom: 16, color: "var(--text)" }}>
        <Calendar className="h-5 w-5" style={{ color: "var(--green)" }} />
        Resumen de días
      </h3>

      {coverageViolationCount > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "hsla(0,72%,51%,0.08)", border: "1px solid hsla(0,72%,51%,0.3)", marginBottom: 12, fontSize: 13, color: "hsl(0,50%,40%)" }}>
          <AlertTriangle className="h-4 w-4" style={{ color: "hsl(0,72%,51%)", flexShrink: 0 }} />
          <span><b>{coverageViolationCount}</b> {coverageViolationCount === 1 ? "día" : "días"} sin cobertura mínima ({minCoverage} {minCoverage === 1 ? "persona" : "personas"})</span>
        </div>
      )}

      {overlapCount > 0 && coverageViolationCount === 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "hsla(38,92%,50%,0.1)", border: "1px solid hsla(38,92%,50%,0.3)", marginBottom: 12, fontSize: 13, color: "hsl(38,60%,35%)" }}>
          <AlertTriangle className="h-4 w-4" style={{ color: "hsl(38,92%,50%)", flexShrink: 0 }} />
          <span><b>{overlapCount}</b> {overlapCount === 1 ? "día" : "días"} con solapamiento de 2+ empleados</span>
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "6px 8px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "2px solid var(--border)" }}>Empleado</th>
              {ABSENCE_TYPES.map(t => (
                <th key={t.type} style={{ textAlign: "center", padding: "6px 4px", borderBottom: "2px solid var(--border)" }}>
                  <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: t.color, marginRight: 4 }} />
                  <span style={{ color: "var(--text-secondary)", fontWeight: 600, fontSize: 11 }}>{t.label}</span>
                </th>
              ))}
              <th style={{ textAlign: "center", padding: "6px 4px", color: "var(--text)", fontWeight: 700, borderBottom: "2px solid var(--border)" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => {
              const total = ABSENCE_TYPES.reduce((sum, t) => sum + getUsedDays(emp.id, t.type), 0);
              return (
                <tr key={emp.id}>
                  <td style={{ padding: "6px 8px", fontWeight: 500, color: "var(--text)", borderBottom: "1px solid var(--border)" }}>{emp.name}</td>
                  {ABSENCE_TYPES.map(t => {
                    const used = getUsedDays(emp.id, t.type);
                    const allowed = emp.allowances[t.type];
                    const over = t.defaultDays > 0 && used > allowed;
                    return (
                      <td key={t.type} style={{ textAlign: "center", padding: "6px 4px", fontWeight: 600, borderBottom: "1px solid var(--border)", color: over ? "hsl(0,72%,51%)" : "var(--text)" }}>
                        {used}{t.defaultDays > 0 && <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>/{allowed}</span>}
                      </td>
                    );
                  })}
                  <td style={{ textAlign: "center", padding: "6px 4px", fontWeight: 700, color: "var(--text)", borderBottom: "1px solid var(--border)" }}>{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
