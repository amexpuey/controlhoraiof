
import React from "react";
import { Employee, ShiftType } from "./types";
import { BarChart3 } from "lucide-react";

interface HoursSummaryProps {
  employees: Employee[];
  shiftTypes: ShiftType[];
  hoursSummary: Record<string, { total: number; byShift: Record<string, number> }>;
  view: "week" | "month";
}

export function HoursSummary({ employees, shiftTypes, hoursSummary, view }: HoursSummaryProps) {
  const maxHours = Math.max(...employees.map((e) => hoursSummary[e.id]?.total || 0), 1);

  return (
    <div className="glass" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <BarChart3 className="h-5 w-5" style={{ color: 'var(--green)' }} />
        Resumen de horas ({view === "week" ? "semana" : "mes"} actual)
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {employees.map((emp) => {
          const data = hoursSummary[emp.id] || { total: 0, byShift: {} };
          const barWidth = maxHours > 0 ? (data.total / maxHours) * 100 : 0;

          return (
            <div key={emp.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{emp.name}</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--green)' }}>{data.total}h</span>
              </div>

              {/* Bar */}
              <div style={{ height: '24px', background: 'var(--light)', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                {shiftTypes.map((st) => {
                  const hours = data.byShift[st.id] || 0;
                  if (!hours) return null;
                  const w = (hours / maxHours) * 100;
                  return (
                    <div
                      key={st.id}
                      title={`${st.name}: ${hours}h`}
                      style={{
                        width: `${w}%`, background: st.color, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '10px', color: '#fff', fontWeight: 700,
                        transition: 'width .3s var(--ease)',
                      }}
                    >
                      {hours >= 4 && `${st.shortName} ${hours}h`}
                    </div>
                  );
                })}
              </div>

              {/* Breakdown */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '4px', flexWrap: 'wrap' }}>
                {shiftTypes.map((st) => {
                  const hours = data.byShift[st.id] || 0;
                  if (!hours) return null;
                  return (
                    <span key={st.id} style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: st.color }} />
                      {st.name}: {hours}h
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {employees.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', padding: '20px 0' }}>
          Añade empleados y asigna turnos para ver el resumen.
        </p>
      )}
    </div>
  );
}
