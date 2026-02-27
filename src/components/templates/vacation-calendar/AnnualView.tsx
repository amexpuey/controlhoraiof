
import React from "react";
import { Employee, AbsenceEntry, AbsenceType, ABSENCE_TYPES, Holiday } from "./types";
import { AlertTriangle } from "lucide-react";

interface AnnualViewProps {
  year: number;
  employees: Employee[];
  getAbsence: (employeeId: string, date: string) => AbsenceEntry | undefined;
  toggleAbsence: (employeeId: string, date: string, shiftKey?: boolean) => void;
  isHoliday: (date: string) => Holiday | undefined;
  overlapDates: Set<string>;
  coverageViolationDates: Set<string>;
  onMonthClick: (month: number) => void;
}

const MONTH_NAMES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export default function AnnualView({ year, employees, getAbsence, toggleAbsence, isHoliday, overlapDates, coverageViolationDates, onMonthClick }: AnnualViewProps) {
  const getDaysInMonth = (month: number) => new Date(year, month + 1, 0).getDate();
  const fmt = (m: number, d: number) => `${year}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const isWeekend = (date: string) => { const day = new Date(date).getDay(); return day === 0 || day === 6; };
  const getAbsenceColor = (type: AbsenceType) => ABSENCE_TYPES.find(t => t.type === type)?.color || "var(--text-muted)";

  return (
    <div style={{ overflowX: "auto" }}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(month => {
        const days = getDaysInMonth(month);
        return (
          <div key={month} style={{ marginBottom: 16 }}>
            <button
              onClick={() => onMonthClick(month)}
              style={{ fontWeight: 700, fontSize: 14, color: "var(--green)", marginBottom: 4, cursor: "pointer", background: "none", border: "none", padding: 0 }}
            >
              {MONTH_NAMES[month]} {year}
            </button>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 11, tableLayout: "fixed" }}>
                <thead>
                  <tr>
                    <th style={{ width: 100, textAlign: "left", padding: "2px 4px", color: "var(--text-muted)", fontWeight: 600, position: "sticky", left: 0, background: "var(--white)", zIndex: 1 }}>
                      Empleado
                    </th>
                    {Array.from({ length: days }, (_, i) => {
                      const date = fmt(month, i + 1);
                      const we = isWeekend(date);
                      const hol = isHoliday(date);
                      return (
                        <th
                          key={i}
                          title={hol?.name}
                          style={{
                            width: 22, textAlign: "center", padding: "2px 0", fontSize: 9, fontWeight: 500,
                            color: hol ? "hsl(0,72%,51%)" : we ? "var(--text-muted)" : "var(--text-secondary)",
                            background: hol ? "hsla(0,72%,51%,0.06)" : we ? "var(--surface-alt)" : "transparent",
                          }}
                        >
                          {i + 1}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, empIdx) => (
                    <tr key={emp.id} style={{ background: empIdx % 2 === 1 ? "var(--surface-alt)" : "transparent" }}>
                      <td style={{ padding: "2px 4px", fontWeight: 500, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", position: "sticky", left: 0, background: empIdx % 2 === 1 ? "var(--surface-alt)" : "var(--white)", zIndex: 1 }}>
                        {emp.name}
                      </td>
                      {Array.from({ length: days }, (_, i) => {
                        const date = fmt(month, i + 1);
                        const we = isWeekend(date);
                        const hol = isHoliday(date);
                        const absence = getAbsence(emp.id, date);
                        const hasOverlap = overlapDates.has(date);
                        const hasViolation = coverageViolationDates.has(date);
                        const clickable = !we && !hol;
                        return (
                          <td
                            key={i}
                            onClick={(e) => clickable && toggleAbsence(emp.id, date, e.shiftKey)}
                            title={hol?.name || (absence ? ABSENCE_TYPES.find(t => t.type === absence.type)?.label : "")}
                            className={clickable ? "vc-cell-hover" : ""}
                            style={{
                              width: 22, height: 22, textAlign: "center", padding: 0,
                              background: absence ? getAbsenceColor(absence.type) : hol ? "hsla(0,72%,51%,0.06)" : we ? "var(--surface-alt)" : "transparent",
                              cursor: clickable ? "pointer" : "default",
                              border: hasViolation && absence ? "2px solid hsl(0,72%,51%)" : "1px solid var(--border)",
                              borderRadius: 2,
                              position: "relative",
                              transition: "background 0.1s ease",
                            }}
                          >
                            {hasOverlap && absence && !hasViolation && (
                              <AlertTriangle style={{ width: 8, height: 8, color: "hsl(38,92%,50%)", position: "absolute", top: -2, right: -2 }} />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
