
import React from "react";
import { Employee, AbsenceType, ABSENCE_TYPES, AbsenceEntry, Holiday } from "./types";

interface PrintSummaryProps {
  year: number;
  employees: Employee[];
  absences: AbsenceEntry[];
  holidays: Holiday[];
  getUsedDays: (employeeId: string, type: AbsenceType) => number;
  minCoverage: number;
}

const MONTH_FULL = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

function formatDate(d: string) {
  const date = new Date(d);
  return `${date.getDate()} ${MONTH_FULL[date.getMonth()].slice(0, 3)}`;
}

function groupConsecutive(dates: string[]): string[] {
  if (!dates.length) return [];
  const sorted = [...dates].sort();
  const ranges: string[] = [];
  let start = sorted[0];
  let prev = sorted[0];
  for (let i = 1; i <= sorted.length; i++) {
    const cur = sorted[i];
    const prevD = new Date(prev);
    const curD = cur ? new Date(cur) : null;
    const diff = curD ? (curD.getTime() - prevD.getTime()) / 86400000 : 999;
    if (diff > 3) {
      ranges.push(start === prev ? formatDate(start) : `${formatDate(start)} – ${formatDate(prev)}`);
      start = cur;
    }
    prev = cur;
  }
  return ranges;
}

export default function PrintSummary({ year, employees, absences, holidays, getUsedDays, minCoverage }: PrintSummaryProps) {
  return (
    <div className="print-only" style={{ pageBreakBefore: "always", padding: "40px 20px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
        Resumen de vacaciones y ausencias — {year}
      </h2>
      <p style={{ fontSize: 11, color: "#666", marginBottom: 20 }}>
        Documento generado para consulta del trabajador. Cobertura mínima configurada: {minCoverage} empleado{minCoverage !== 1 ? "s" : ""} presentes.
      </p>

      {employees.map(emp => {
        const empAbsences = absences.filter(a => a.employeeId === emp.id);
        return (
          <div key={emp.id} style={{ marginBottom: 24, pageBreakInside: "avoid" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, borderBottom: "2px solid #222", paddingBottom: 4, marginBottom: 8 }}>
              {emp.name}
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 8 }}>
              <thead>
                <tr style={{ background: "#f5f5f5" }}>
                  <th style={{ textAlign: "left", padding: "4px 8px", border: "1px solid #ddd" }}>Tipo de ausencia</th>
                  <th style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>Días asignados</th>
                  <th style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>Días usados</th>
                  <th style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>Días restantes</th>
                  <th style={{ textAlign: "left", padding: "4px 8px", border: "1px solid #ddd" }}>Períodos</th>
                </tr>
              </thead>
              <tbody>
                {ABSENCE_TYPES.map(at => {
                  const used = getUsedDays(emp.id, at.type);
                  const allowed = emp.allowances[at.type];
                  const remaining = allowed - used;
                  const dates = empAbsences.filter(a => a.type === at.type).map(a => a.date);
                  const ranges = groupConsecutive(dates);
                  return (
                    <tr key={at.type}>
                      <td style={{ padding: "4px 8px", border: "1px solid #ddd", fontWeight: 600 }}>
                        <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: at.color, marginRight: 6, verticalAlign: "middle" }} />
                        {at.label}
                      </td>
                      <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{allowed}</td>
                      <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd", fontWeight: 700 }}>{used}</td>
                      <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd", color: remaining < 0 ? "red" : "inherit", fontWeight: remaining < 0 ? 700 : 400 }}>
                        {remaining}
                      </td>
                      <td style={{ padding: "4px 8px", border: "1px solid #ddd", fontSize: 11 }}>
                        {ranges.length > 0 ? ranges.join(", ") : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}

      {/* Holidays list */}
      <div style={{ marginTop: 16, pageBreakInside: "avoid" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Festivos {year}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", fontSize: 11 }}>
          {holidays.map(h => (
            <span key={h.date}>• {formatDate(h.date)}: {h.name}</span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 32, borderTop: "1px solid #ccc", paddingTop: 12, fontSize: 10, color: "#999" }}>
        <p style={{ margin: 0 }}>
          <strong>Leyenda:</strong> Los días de vacaciones y ausencias se han planificado según el calendario anual.
          Los días sombreados en el calendario corresponden a los períodos indicados arriba.
          Los fines de semana y festivos no cuentan como días laborables.
        </p>
        <p style={{ margin: "4px 0 0" }}>Firma del trabajador: ____________________________&nbsp;&nbsp;&nbsp;&nbsp; Fecha: ____/____/________</p>
      </div>
    </div>
  );
}
