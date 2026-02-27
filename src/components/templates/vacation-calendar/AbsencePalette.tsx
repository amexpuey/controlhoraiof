
import React from "react";
import { ABSENCE_TYPES, AbsenceType } from "./types";
import { Eraser } from "lucide-react";

interface AbsencePaletteProps {
  selected: AbsenceType;
  onSelect: (type: AbsenceType) => void;
}

export default function AbsencePalette({ selected, onSelect }: AbsencePaletteProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
      {ABSENCE_TYPES.map(t => (
        <button
          key={t.type}
          onClick={() => onSelect(t.type)}
          className="transition-all"
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "6px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 600,
            border: `2px solid ${t.color}`,
            background: selected === t.type ? t.color : t.bgColor,
            color: selected === t.type ? "white" : t.color,
            cursor: "pointer",
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: selected === t.type ? "white" : t.color, display: "inline-block" }} />
          {t.label}
        </button>
      ))}
      <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4, marginLeft: 8 }}>
        <Eraser className="h-3.5 w-3.5" />
        Click otra vez para borrar
      </div>
    </div>
  );
}
