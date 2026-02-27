
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RotationPattern, ShiftType } from "./types";
import { Wand2, ChevronRight } from "lucide-react";

interface RotationDialogProps {
  open: boolean;
  onClose: () => void;
  patterns: RotationPattern[];
  shiftTypes: ShiftType[];
  onApply: (pattern: RotationPattern, weeks: number) => void;
}

export function RotationDialog({ open, onClose, patterns, shiftTypes, onApply }: RotationDialogProps) {
  const [selectedPattern, setSelectedPattern] = useState<number>(0);
  const [weeks, setWeeks] = useState(4);

  const getShiftColor = (id: string) => {
    if (id === "OFF") return "var(--text-muted)";
    return shiftTypes.find((s) => s.id === id)?.color || "var(--text-muted)";
  };

  const getShiftLabel = (id: string) => {
    if (id === "OFF") return "L";
    return shiftTypes.find((s) => s.id === id)?.shortName || "?";
  };

  // Filter patterns to only show those with available shift types
  const validPatterns = patterns.filter((p) =>
    p.sequence.every((id) => id === "OFF" || shiftTypes.find((s) => s.id === id))
  );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent style={{ borderRadius: 'var(--radius-sm)', maxWidth: '500px' }}>
        <DialogHeader>
          <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wand2 className="h-5 w-5" style={{ color: 'var(--green)' }} />
            Rotación automática
          </DialogTitle>
        </DialogHeader>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Selecciona un patrón de rotación. Cada empleado empezará en una posición diferente del ciclo para garantizar equidad.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {validPatterns.map((pattern, idx) => (
            <button
              key={pattern.name}
              onClick={() => setSelectedPattern(idx)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                borderRadius: 'var(--radius-xs)', cursor: 'pointer', textAlign: 'left',
                border: '2px solid',
                borderColor: selectedPattern === idx ? 'var(--green)' : 'var(--border)',
                background: selectedPattern === idx ? 'var(--green-bg)' : 'var(--white)',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>{pattern.name}</div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {pattern.sequence.map((id, i) => (
                    <React.Fragment key={i}>
                      <span
                        style={{
                          display: 'inline-block', padding: '2px 6px', borderRadius: '3px',
                          fontSize: '11px', fontWeight: 700, color: '#fff',
                          background: getShiftColor(id),
                        }}
                      >
                        {getShiftLabel(id)}
                      </span>
                      {i < pattern.sequence.length - 1 && (
                        <ChevronRight className="h-3 w-3" style={{ color: 'var(--border)', alignSelf: 'center' }} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500 }}>Semanas a generar:</label>
          <input
            type="number"
            min={1}
            max={12}
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
            style={{
              width: '70px', padding: '8px 12px', borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border)', fontSize: '14px', textAlign: 'center',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button className="btn btn-outline" onClick={onClose}>Cancelar</button>
          <button
            className="btn btn-green"
            onClick={() => validPatterns[selectedPattern] && onApply(validPatterns[selectedPattern], weeks)}
          >
            <Wand2 className="h-4 w-4" /> Aplicar rotación
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
