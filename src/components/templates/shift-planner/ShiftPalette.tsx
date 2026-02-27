
import React, { useState } from "react";
import { ShiftType } from "./types";
import { Eraser, Plus, X } from "lucide-react";

interface ShiftPaletteProps {
  shiftTypes: ShiftType[];
  selectedShift: string | null;
  onSelect: (id: string | null) => void;
  onAddShiftType: (st: ShiftType) => void;
  onRemoveShiftType: (id: string) => void;
  allShiftTypes: ShiftType[];
}

export function ShiftPalette({ shiftTypes, selectedShift, onSelect, onAddShiftType, onRemoveShiftType, allShiftTypes }: ShiftPaletteProps) {
  const [showAdd, setShowAdd] = useState(false);

  const available = allShiftTypes.filter((st) => !shiftTypes.find((s) => s.id === st.id));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', padding: '12px 16px', background: 'var(--light)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)' }}>
      <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginRight: '4px' }}>Turnos:</span>

      {shiftTypes.map((st) => (
        <button
          key={st.id}
          onClick={() => onSelect(selectedShift === st.id ? null : st.id)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', border: '2px solid', transition: 'all .15s',
            background: selectedShift === st.id ? st.color : `${st.color}18`,
            color: selectedShift === st.id ? '#fff' : st.color,
            borderColor: selectedShift === st.id ? st.color : `${st.color}40`,
          }}
        >
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: selectedShift === st.id ? '#fff' : st.color }} />
          {st.shortName}
          <span style={{ fontSize: '11px', opacity: 0.7, fontWeight: 400 }}>
            {st.startTime}-{st.endTime}
          </span>
        </button>
      ))}

      {/* Eraser */}
      <button
        onClick={() => onSelect(selectedShift === "eraser" ? null : "eraser")}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          padding: '6px 12px', borderRadius: '6px', fontSize: '13px',
          cursor: 'pointer', border: '2px solid',
          background: selectedShift === "eraser" ? 'var(--text)' : 'transparent',
          color: selectedShift === "eraser" ? '#fff' : 'var(--text-muted)',
          borderColor: selectedShift === "eraser" ? 'var(--text)' : 'var(--border)',
        }}
      >
        <Eraser className="h-3.5 w-3.5" /> Borrar
      </button>

      {/* Add shift */}
      {available.length > 0 && (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="chip"
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <Plus className="h-3 w-3" /> Añadir turno
          </button>
          {showAdd && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, marginTop: '4px', zIndex: 10,
              background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)',
              padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '200px',
              boxShadow: 'var(--glass-shadow)',
            }}>
              {available.map((st) => (
                <button
                  key={st.id}
                  onClick={() => { onAddShiftType(st); setShowAdd(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px',
                    fontSize: '13px', cursor: 'pointer', borderRadius: '4px',
                    border: 'none', background: 'transparent', textAlign: 'left', width: '100%',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--light)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: st.color }} />
                  <span style={{ fontWeight: 500 }}>{st.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{st.startTime}-{st.endTime} ({st.hours}h)</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
