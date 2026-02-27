
import React, { useState } from "react";
import { Holiday } from "./types";
import { CalendarDays, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface HolidayManagerProps {
  holidays: Holiday[];
  onAdd: (date: string, name: string) => void;
  onRemove: (date: string) => void;
  year: number;
}

export default function HolidayManager({ holidays, onAdd, onRemove, year }: HolidayManagerProps) {
  const [open, setOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newName, setNewName] = useState("");

  const yearHolidays = holidays.filter(h => h.date.startsWith(String(year)));

  const handleAdd = () => {
    if (newDate && newName.trim()) {
      onAdd(newDate, newName.trim());
      setNewDate("");
      setNewName("");
    }
  };

  return (
    <div className="feature-card" style={{ padding: 20 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, color: "var(--text)", margin: 0 }}>
          <CalendarDays className="h-5 w-5" style={{ color: "var(--green)" }} />
          Festivos ({yearHolidays.length})
        </h3>
        {open ? <ChevronUp className="h-4 w-4" style={{ color: "var(--text-muted)" }} /> : <ChevronDown className="h-4 w-4" style={{ color: "var(--text-muted)" }} />}
      </button>

      {open && (
        <div style={{ marginTop: 12 }}>
          {/* Add custom holiday */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
            <input
              type="date"
              value={newDate}
              onChange={e => setNewDate(e.target.value)}
              min={`${year}-01-01`}
              max={`${year}-12-31`}
              style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--white)", color: "var(--text)", flex: "0 0 auto" }}
            />
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Nombre del festivo"
              style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--white)", color: "var(--text)", flex: 1, minWidth: 100 }}
              onKeyDown={e => e.key === "Enter" && handleAdd()}
            />
            <button onClick={handleAdd} className="btn btn-green" style={{ padding: "4px 10px", fontSize: 12 }}>
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Holiday list */}
          <div style={{ maxHeight: 200, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
            {yearHolidays.map(h => (
              <div key={h.date} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, padding: "4px 6px", borderRadius: 6, background: "var(--surface-alt)" }}>
                <span style={{ fontWeight: 600, color: "hsl(0,72%,51%)", minWidth: 80 }}>{h.date.slice(5)}</span>
                <span style={{ flex: 1, color: "var(--text-secondary)" }}>{h.name}</span>
                <button onClick={() => onRemove(h.date)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 2 }}>
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
