
import React, { useState, useRef } from "react";
import { useShiftPlanner } from "./useShiftPlanner";
import { ShiftType, DEFAULT_SHIFT_TYPES, DEFAULT_PATTERNS, RotationPattern } from "./types";
import { CalendarGrid } from "./CalendarGrid";
import { ShiftPalette } from "./ShiftPalette";
import { EmployeePanel } from "./EmployeePanel";
import { HoursSummary } from "./HoursSummary";
import { RotationDialog } from "./RotationDialog";
import { format, addWeeks, addMonths, subWeeks, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar, CalendarDays, RotateCcw, Printer, Wand2, Users, Clock } from "lucide-react";

export default function ShiftPlanner() {
  const planner = useShiftPlanner();
  const [selectedShift, setSelectedShift] = useState<string | null>(null);
  const [showRotation, setShowRotation] = useState(false);
  const [activeTab, setActiveTab] = useState<"calendar" | "employees" | "hours">("calendar");
  const printRef = useRef<HTMLDivElement>(null);

  const navigate = (dir: number) => {
    if (planner.view === "week") {
      planner.setCurrentDate((d) => (dir > 0 ? addWeeks(d, 1) : subWeeks(d, 1)));
    } else {
      planner.setCurrentDate((d) => (dir > 0 ? addMonths(d, 1) : subMonths(d, 1)));
    }
  };

  const handleCellClick = (employeeId: string, dateStr: string) => {
    const existing = planner.getAssignment(employeeId, dateStr);
    if (selectedShift === "eraser") {
      planner.setAssignment(employeeId, dateStr, null);
    } else if (selectedShift) {
      planner.setAssignment(employeeId, dateStr, selectedShift);
    } else if (existing) {
      // Cycle through shifts
      const idx = planner.shiftTypes.findIndex((s) => s.id === existing.shiftTypeId);
      const next = planner.shiftTypes[(idx + 1) % planner.shiftTypes.length];
      planner.setAssignment(employeeId, dateStr, next.id);
    } else {
      planner.setAssignment(employeeId, dateStr, planner.shiftTypes[0]?.id || null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const tabs = [
    { id: "calendar" as const, label: "Calendario", icon: <CalendarDays className="h-4 w-4" /> },
    { id: "employees" as const, label: "Empleados", icon: <Users className="h-4 w-4" /> },
    { id: "hours" as const, label: "Resumen horas", icon: <Clock className="h-4 w-4" /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Tabs */}
      <div className="chips" style={{ gap: '6px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="chip"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
              background: activeTab === tab.id ? 'var(--green)' : undefined,
              borderColor: activeTab === tab.id ? 'var(--green)' : undefined,
              color: activeTab === tab.id ? 'white' : undefined,
              fontWeight: activeTab === tab.id ? 600 : undefined,
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "calendar" && (
        <>
          {/* Toolbar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button className="btn btn-outline" style={{ padding: '8px' }} onClick={() => navigate(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span style={{ fontWeight: 600, fontSize: '15px', minWidth: '180px', textAlign: 'center' }}>
                {planner.view === "week"
                  ? `Semana del ${format(planner.weekStart, "d MMM yyyy", { locale: es })}`
                  : format(planner.currentDate, "MMMM yyyy", { locale: es })}
              </span>
              <button className="btn btn-outline" style={{ padding: '8px' }} onClick={() => navigate(1)}>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                className={`chip ${planner.view === 'week' ? '' : ''}`}
                style={{
                  cursor: 'pointer',
                  background: planner.view === "week" ? 'var(--green)' : undefined,
                  borderColor: planner.view === "week" ? 'var(--green)' : undefined,
                  color: planner.view === "week" ? 'white' : undefined,
                }}
                onClick={() => planner.setView("week")}
              >
                <Calendar className="h-3.5 w-3.5" /> Semanal
              </button>
              <button
                className="chip"
                style={{
                  cursor: 'pointer',
                  background: planner.view === "month" ? 'var(--green)' : undefined,
                  borderColor: planner.view === "month" ? 'var(--green)' : undefined,
                  color: planner.view === "month" ? 'white' : undefined,
                }}
                onClick={() => planner.setView("month")}
              >
                <CalendarDays className="h-3.5 w-3.5" /> Mensual
              </button>
              <button className="btn btn-outline" style={{ fontSize: '13px', padding: '6px 12px' }} onClick={() => setShowRotation(true)}>
                <Wand2 className="h-3.5 w-3.5" /> Rotación automática
              </button>
              <button className="btn btn-outline" style={{ fontSize: '13px', padding: '6px 12px' }} onClick={handlePrint}>
                <Printer className="h-3.5 w-3.5" /> Imprimir
              </button>
              <button className="btn btn-outline" style={{ fontSize: '13px', padding: '6px 12px', color: 'var(--text-muted)' }} onClick={planner.clearAll}>
                <RotateCcw className="h-3.5 w-3.5" /> Limpiar
              </button>
            </div>
          </div>

          {/* Shift palette */}
          <ShiftPalette
            shiftTypes={planner.shiftTypes}
            selectedShift={selectedShift}
            onSelect={setSelectedShift}
            onAddShiftType={planner.addShiftType}
            onRemoveShiftType={planner.removeShiftType}
            allShiftTypes={DEFAULT_SHIFT_TYPES}
          />

          {/* Calendar grid */}
          <div ref={printRef} id="shift-planner-print">
            <CalendarGrid
              employees={planner.employees}
              days={planner.visibleDays}
              shiftTypes={planner.shiftTypes}
              getAssignment={planner.getAssignment}
              onCellClick={handleCellClick}
              view={planner.view}
            />
          </div>
        </>
      )}

      {activeTab === "employees" && (
        <EmployeePanel
          employees={planner.employees}
          onAdd={planner.addEmployee}
          onRemove={planner.removeEmployee}
          onRename={planner.updateEmployeeName}
        />
      )}

      {activeTab === "hours" && (
        <HoursSummary
          employees={planner.employees}
          shiftTypes={planner.shiftTypes}
          hoursSummary={planner.hoursSummary}
          view={planner.view}
        />
      )}

      {showRotation && (
        <RotationDialog
          open={showRotation}
          onClose={() => setShowRotation(false)}
          patterns={DEFAULT_PATTERNS}
          shiftTypes={planner.shiftTypes}
          onApply={(pattern, weeks) => {
            planner.applyRotation(pattern, planner.visibleDays[0], weeks);
            setShowRotation(false);
          }}
        />
      )}
    </div>
  );
}
