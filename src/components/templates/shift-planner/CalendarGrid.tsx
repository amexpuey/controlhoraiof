
import React from "react";
import { Employee, ShiftType, ShiftAssignment } from "./types";
import { format, isToday, isWeekend } from "date-fns";
import { es } from "date-fns/locale";

interface CalendarGridProps {
  employees: Employee[];
  days: Date[];
  shiftTypes: ShiftType[];
  getAssignment: (employeeId: string, date: string) => ShiftAssignment | undefined;
  onCellClick: (employeeId: string, dateStr: string) => void;
  view: "week" | "month";
}

export function CalendarGrid({ employees, days, shiftTypes, getAssignment, onCellClick, view }: CalendarGridProps) {
  const cellSize = view === "week" ? "minmax(80px, 1fr)" : "minmax(36px, 1fr)";

  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `150px repeat(${days.length}, ${cellSize})`,
          minWidth: view === "month" ? `${150 + days.length * 38}px` : undefined,
        }}
      >
        {/* Header row */}
        <div style={{
          padding: '8px 12px', fontWeight: 600, fontSize: '12px', color: 'var(--text-muted)',
          background: 'var(--light)', borderBottom: '1px solid var(--border)',
          position: 'sticky', left: 0, zIndex: 2,
        }}>
          Empleado
        </div>
        {days.map((day) => {
          const today = isToday(day);
          const weekend = isWeekend(day);
          return (
            <div
              key={day.toISOString()}
              style={{
                padding: view === "week" ? '8px 4px' : '4px 2px',
                textAlign: 'center',
                fontSize: view === "week" ? '12px' : '10px',
                fontWeight: today ? 700 : 500,
                color: today ? 'var(--green)' : weekend ? 'var(--text-muted)' : 'var(--text-secondary)',
                background: today ? 'var(--green-bg)' : weekend ? 'var(--surface-alt)' : 'var(--light)',
                borderBottom: '1px solid var(--border)',
                borderLeft: '1px solid var(--border-light)',
              }}
            >
              <div>{format(day, view === "week" ? "EEE" : "EEE", { locale: es })}</div>
              <div style={{ fontWeight: 700, fontSize: view === "week" ? '14px' : '11px' }}>
                {format(day, "d")}
              </div>
            </div>
          );
        })}

        {/* Employee rows */}
        {employees.map((emp, empIdx) => (
          <React.Fragment key={emp.id}>
            <div
              style={{
                padding: '8px 12px', fontSize: '13px', fontWeight: 500,
                borderBottom: '1px solid var(--border-light)',
                background: empIdx % 2 === 0 ? 'var(--white)' : 'var(--surface-alt)',
                display: 'flex', alignItems: 'center',
                position: 'sticky', left: 0, zIndex: 1,
              }}
            >
              {emp.name}
            </div>
            {days.map((day) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const assignment = getAssignment(emp.id, dateStr);
              const shift = assignment ? shiftTypes.find((s) => s.id === assignment.shiftTypeId) : null;
              const weekend = isWeekend(day);
              const today = isToday(day);

              return (
                <div
                  key={dateStr}
                  onClick={() => onCellClick(emp.id, dateStr)}
                  style={{
                    padding: view === "week" ? '8px 4px' : '4px 2px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--border-light)',
                    borderLeft: '1px solid var(--border-light)',
                    background: today
                      ? 'var(--green-bg)'
                      : shift
                      ? `${shift.color}12`
                      : weekend
                      ? 'var(--surface-alt)'
                      : empIdx % 2 === 0
                      ? 'var(--white)'
                      : 'var(--surface-alt)',
                    transition: 'background .1s',
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    if (!shift) e.currentTarget.style.background = 'var(--green-faint)';
                  }}
                  onMouseLeave={(e) => {
                    if (!shift) {
                      e.currentTarget.style.background = today
                        ? 'var(--green-bg)'
                        : weekend
                        ? 'var(--surface-alt)'
                        : empIdx % 2 === 0
                        ? 'var(--white)'
                        : 'var(--surface-alt)';
                    }
                  }}
                  title={shift ? `${shift.name} (${shift.startTime}-${shift.endTime})` : "Libre — clic para asignar"}
                >
                  {shift && (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: view === "week" ? '4px 8px' : '2px 4px',
                        borderRadius: '4px',
                        fontSize: view === "week" ? '12px' : '10px',
                        fontWeight: 700,
                        color: '#fff',
                        background: shift.color,
                        lineHeight: 1,
                      }}
                    >
                      {shift.shortName}
                    </span>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
