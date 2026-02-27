
import React from "react";
import { Employee, AbsenceEntry, AbsenceType, ABSENCE_TYPES, Holiday } from "./types";
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";

interface MonthlyViewProps {
  year: number;
  month: number;
  employees: Employee[];
  getAbsence: (employeeId: string, date: string) => AbsenceEntry | undefined;
  toggleAbsence: (employeeId: string, date: string, shiftKey?: boolean) => void;
  isHoliday: (date: string) => Holiday | undefined;
  overlapDates: Set<string>;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const MONTH_FULL = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DAY_NAMES = ["L", "M", "X", "J", "V", "S", "D"];

export default function MonthlyView({ year, month, employees, getAbsence, toggleAbsence, isHoliday, overlapDates, onPrevMonth, onNextMonth }: MonthlyViewProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const fmt = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const isWeekend = (date: string) => { const day = new Date(date).getDay(); return day === 0 || day === 6; };
  const getAbsenceConfig = (type: AbsenceType) => ABSENCE_TYPES.find(t => t.type === type);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>
        <button onClick={onPrevMonth} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)" }}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 style={{ fontWeight: 700, fontSize: 18, color: "var(--text)", minWidth: 180, textAlign: "center" }}>
          {MONTH_FULL[month]} {year}
        </h3>
        <button onClick={onNextMonth} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)" }}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "6px 8px", color: "var(--text-muted)", fontWeight: 600, minWidth: 120, position: "sticky", left: 0, background: "var(--white)", zIndex: 1 }}>
                Empleado
              </th>
              {Array.from({ length: daysInMonth }, (_, i) => {
                const date = fmt(i + 1);
                const dayOfWeek = new Date(date).getDay();
                const we = isWeekend(date);
                const hol = isHoliday(date);
                return (
                  <th key={i} style={{ textAlign: "center", padding: "4px 2px", minWidth: 28 }}>
                    <div style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 500 }}>{DAY_NAMES[dayOfWeek === 0 ? 6 : dayOfWeek - 1]}</div>
                    <div style={{
                      fontSize: 12, fontWeight: 600,
                      color: hol ? "hsl(0,72%,51%)" : we ? "var(--text-muted)" : "var(--text)",
                    }}>
                      {i + 1}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, empIdx) => (
              <tr key={emp.id} style={{ background: empIdx % 2 === 1 ? "var(--surface-alt)" : "transparent" }}>
                <td style={{ padding: "4px 8px", fontWeight: 500, color: "var(--text)", whiteSpace: "nowrap", position: "sticky", left: 0, background: empIdx % 2 === 1 ? "var(--surface-alt)" : "var(--white)", zIndex: 1, borderBottom: "1px solid var(--border)" }}>
                  {emp.name}
                </td>
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const date = fmt(i + 1);
                  const we = isWeekend(date);
                  const hol = isHoliday(date);
                  const absence = getAbsence(emp.id, date);
                  const absConfig = absence ? getAbsenceConfig(absence.type) : null;
                  const hasOverlap = overlapDates.has(date);
                  const clickable = !we && !hol;
                  return (
                    <td
                      key={i}
                      onClick={(e) => clickable && toggleAbsence(emp.id, date, e.shiftKey)}
                      title={hol?.name || absConfig?.label || ""}
                      className={clickable ? "vc-cell-hover" : ""}
                      style={{
                        textAlign: "center", padding: 2, cursor: clickable ? "pointer" : "default",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <div style={{
                        width: 26, height: 26, borderRadius: 6, margin: "0 auto",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        position: "relative",
                        background: absence ? absConfig?.color : hol ? "hsla(0,72%,51%,0.08)" : we ? "var(--surface-alt)" : "transparent",
                        border: absence ? "none" : "1px solid var(--border)",
                        color: absence ? "white" : "transparent",
                        fontSize: 9, fontWeight: 700,
                        transition: "all 0.1s",
                      }}>
                        {absence && absConfig?.label.charAt(0)}
                        {hasOverlap && absence && (
                          <AlertTriangle style={{ width: 10, height: 10, color: "hsl(38,92%,50%)", position: "absolute", top: -4, right: -4 }} />
                        )}
                      </div>
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
}
