
import React, { useRef, useState } from "react";
import { useVacationCalendar } from "./useVacationCalendar";
import AbsencePalette from "./AbsencePalette";
import EmployeePanel from "./EmployeePanel";
import AnnualView from "./AnnualView";
import MonthlyView from "./MonthlyView";
import DaysSummary from "./DaysSummary";
import HolidayManager from "./HolidayManager";
import { Calendar, Eye, Printer, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function VacationCalendar() {
  const cal = useVacationCalendar();
  const printRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handlePrint = () => window.print();

  const handleMonthClick = (month: number) => {
    cal.setCurrentMonth(month);
    cal.setView("monthly");
  };

  const handlePrevMonth = () => cal.setCurrentMonth(p => p === 0 ? 11 : p - 1);
  const handleNextMonth = () => cal.setCurrentMonth(p => p === 11 ? 0 : p + 1);

  return (
    <div ref={printRef} className="vacation-calendar-root" style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", display: "flex", alignItems: "center", gap: 8 }}>
            <Calendar className="h-6 w-6" style={{ color: "var(--green)" }} />
            Calendario de vacaciones
          </h2>
          {/* Year selector */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
            <button onClick={() => cal.setYear(y => y - 1)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 2 }}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span style={{ fontSize: 18, fontWeight: 700, color: "var(--green)", minWidth: 50, textAlign: "center" }}>{cal.year}</span>
            <button onClick={() => cal.setYear(y => y + 1)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 2 }}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
            Haz clic en las celdas para asignar ausencias. <b>Shift+clic</b> para seleccionar un rango.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <div className="no-print" style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)" }}>
            <button
              onClick={() => cal.setView("annual")}
              style={{
                padding: "6px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none",
                background: cal.view === "annual" ? "var(--green)" : "var(--white)",
                color: cal.view === "annual" ? "white" : "var(--text-muted)",
              }}
            >
              <Eye className="h-4 w-4 inline mr-1" style={{ verticalAlign: "middle" }} />Anual
            </button>
            <button
              onClick={() => cal.setView("monthly")}
              style={{
                padding: "6px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none",
                borderLeft: "1px solid var(--border)",
                background: cal.view === "monthly" ? "var(--green)" : "var(--white)",
                color: cal.view === "monthly" ? "white" : "var(--text-muted)",
              }}
            >
              <Calendar className="h-4 w-4 inline mr-1" style={{ verticalAlign: "middle" }} />Mensual
            </button>
          </div>
          <button onClick={handlePrint} className="btn btn-outline no-print" style={{ padding: "6px 14px", fontSize: 13 }}>
            <Printer className="h-4 w-4" /> Imprimir
          </button>
        </div>
      </div>

      {/* Absence type selector */}
      <div className="feature-card no-print" style={{ padding: "14px 20px", marginBottom: 20 }}>
        <AbsencePalette selected={cal.selectedType} onSelect={cal.setSelectedType} />
      </div>

      {/* Main layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "280px 1fr",
        gap: 20,
        alignItems: "start",
      }}>
        {/* Sidebar */}
        <div className="no-print" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Collapsible toggle on mobile */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="btn btn-outline"
              style={{ width: "100%", justifyContent: "space-between", fontSize: 14 }}
            >
              <span>Empleados y resumen</span>
              {sidebarOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          )}
          {(sidebarOpen || !isMobile) && (
            <>
              <EmployeePanel
                employees={cal.employees}
                onAdd={cal.addEmployee}
                onRemove={cal.removeEmployee}
                onRename={cal.renameEmployee}
                onUpdateAllowance={cal.updateAllowance}
                getUsedDays={cal.getUsedDays}
              />
              <DaysSummary
                employees={cal.employees}
                getUsedDays={cal.getUsedDays}
                overlapCount={cal.overlapDates.size}
              />
              <HolidayManager
                holidays={cal.holidays}
                onAdd={cal.addHoliday}
                onRemove={cal.removeHoliday}
                year={cal.year}
              />
            </>
          )}
        </div>

        {/* Calendar */}
        <div className="feature-card" style={{ padding: 20, minWidth: 0, overflow: "hidden" }}>
          {cal.view === "annual" ? (
            <AnnualView
              year={cal.year}
              employees={cal.employees}
              getAbsence={cal.getAbsence}
              toggleAbsence={cal.toggleAbsence}
              isHoliday={cal.isHoliday}
              overlapDates={cal.overlapDates}
              onMonthClick={handleMonthClick}
            />
          ) : (
            <MonthlyView
              year={cal.year}
              month={cal.currentMonth}
              employees={cal.employees}
              getAbsence={cal.getAbsence}
              toggleAbsence={cal.toggleAbsence}
              isHoliday={cal.isHoliday}
              overlapDates={cal.overlapDates}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
          )}
        </div>
      </div>
    </div>
  );
}
