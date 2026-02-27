
import React, { useState } from "react";
import { Employee } from "./types";
import { Plus, Trash2, UserPlus } from "lucide-react";

interface EmployeePanelProps {
  employees: Employee[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  onRename: (id: string, name: string) => void;
}

export function EmployeePanel({ employees, onAdd, onRemove, onRename }: EmployeePanelProps) {
  const [newName, setNewName] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd(newName.trim());
      setNewName("");
    }
  };

  return (
    <div className="glass" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <UserPlus className="h-5 w-5" style={{ color: 'var(--green)' }} />
        Gestión de empleados
      </h3>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nombre del empleado..."
          style={{
            flex: 1, padding: '10px 14px', borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--border)', fontSize: '14px', outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--green)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
        />
        <button type="submit" className="btn btn-green" style={{ padding: '10px 16px' }}>
          <Plus className="h-4 w-4" /> Añadir
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {employees.map((emp, idx) => (
          <div
            key={emp.id}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px',
              background: idx % 2 === 0 ? 'var(--white)' : 'var(--surface-alt)',
              borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)',
            }}
          >
            <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--green-bg)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
              {idx + 1}
            </span>
            <input
              type="text"
              value={emp.name}
              onChange={(e) => onRename(emp.id, e.target.value)}
              style={{
                flex: 1, border: 'none', background: 'transparent', fontSize: '14px',
                fontWeight: 500, outline: 'none', color: 'var(--text)',
              }}
            />
            <button
              onClick={() => onRemove(emp.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
              title="Eliminar empleado"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {employees.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', padding: '20px 0' }}>
          Añade empleados para empezar a planificar turnos.
        </p>
      )}
    </div>
  );
}
