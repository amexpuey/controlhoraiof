
import React from "react";
import { Employee, ABSENCE_TYPES, AbsenceType } from "./types";
import { Plus, Trash2, Users } from "lucide-react";

interface EmployeePanelProps {
  employees: Employee[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onUpdateAllowance: (id: string, type: AbsenceType, days: number) => void;
  getUsedDays: (employeeId: string, type: AbsenceType) => number;
}

export default function EmployeePanel({ employees, onAdd, onRemove, onRename, onUpdateAllowance, getUsedDays }: EmployeePanelProps) {
  return (
    <div className="feature-card" style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: 8, color: "var(--text)" }}>
          <Users className="h-5 w-5" style={{ color: "var(--green)" }} />
          Empleados ({employees.length})
        </h3>
        <button onClick={onAdd} className="btn btn-green" style={{ padding: "6px 14px", fontSize: "13px" }}>
          <Plus className="h-4 w-4" /> Añadir
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {employees.map(emp => (
          <div key={emp.id} style={{ padding: 12, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <input
                value={emp.name}
                onChange={e => onRename(emp.id, e.target.value)}
                style={{ flex: 1, fontWeight: 600, fontSize: 14, border: "none", background: "transparent", color: "var(--text)", outline: "none" }}
              />
              {employees.length > 1 && (
                <button onClick={() => onRemove(emp.id)} style={{ color: "var(--text-muted)", cursor: "pointer", background: "none", border: "none" }}>
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {ABSENCE_TYPES.map(t => {
                const used = getUsedDays(emp.id, t.type);
                const allowed = emp.allowances[t.type];
                const overUsed = t.defaultDays > 0 && used > allowed;
                return (
                  <div key={t.type} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.color, flexShrink: 0 }} />
                    <span style={{ color: "var(--text-muted)", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.label}:</span>
                    <span style={{ fontWeight: 700, color: overUsed ? "hsl(0,72%,51%)" : "var(--text)" }}>{used}</span>
                    {t.defaultDays > 0 && (
                      <>
                        <span style={{ color: "var(--text-muted)" }}>/</span>
                        <input
                          type="number"
                          value={allowed}
                          onChange={e => onUpdateAllowance(emp.id, t.type, Math.max(0, parseInt(e.target.value) || 0))}
                          style={{ width: 32, textAlign: "center", fontSize: 11, border: "1px solid var(--border)", borderRadius: 4, background: "var(--white)", color: "var(--text)", padding: "1px 2px" }}
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
