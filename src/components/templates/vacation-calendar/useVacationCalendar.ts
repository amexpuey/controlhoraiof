
import { useState, useCallback, useMemo } from "react";
import { Employee, AbsenceEntry, AbsenceType, ABSENCE_TYPES, SPAIN_HOLIDAYS_2026, Holiday } from "./types";

const createId = () => Math.random().toString(36).slice(2, 9);

const defaultAllowances = (): Record<AbsenceType, number> =>
  Object.fromEntries(ABSENCE_TYPES.map(t => [t.type, t.defaultDays])) as Record<AbsenceType, number>;

export function useVacationCalendar() {
  const [year, setYear] = useState(2026);
  const [employees, setEmployees] = useState<Employee[]>([
    { id: createId(), name: "Empleado 1", allowances: defaultAllowances() },
    { id: createId(), name: "Empleado 2", allowances: defaultAllowances() },
    { id: createId(), name: "Empleado 3", allowances: defaultAllowances() },
  ]);
  const [absences, setAbsences] = useState<AbsenceEntry[]>([]);
  const [selectedType, setSelectedType] = useState<AbsenceType>("vacaciones");
  const [holidays, setHolidays] = useState<Holiday[]>(SPAIN_HOLIDAYS_2026);
  const [view, setView] = useState<"annual" | "monthly">("annual");
  const [currentMonth, setCurrentMonth] = useState(0); // 0-11

  const addEmployee = useCallback(() => {
    setEmployees(prev => [
      ...prev,
      { id: createId(), name: `Empleado ${prev.length + 1}`, allowances: defaultAllowances() },
    ]);
  }, []);

  const removeEmployee = useCallback((id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    setAbsences(prev => prev.filter(a => a.employeeId !== id));
  }, []);

  const renameEmployee = useCallback((id: string, name: string) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, name } : e));
  }, []);

  const updateAllowance = useCallback((id: string, type: AbsenceType, days: number) => {
    setEmployees(prev => prev.map(e =>
      e.id === id ? { ...e, allowances: { ...e.allowances, [type]: days } } : e
    ));
  }, []);

  const toggleAbsence = useCallback((employeeId: string, date: string) => {
    setAbsences(prev => {
      const existing = prev.find(a => a.employeeId === employeeId && a.date === date);
      if (existing) {
        return prev.filter(a => a !== existing);
      }
      return [...prev, { employeeId, date, type: selectedType }];
    });
  }, [selectedType]);

  const getAbsence = useCallback((employeeId: string, date: string) => {
    return absences.find(a => a.employeeId === employeeId && a.date === date);
  }, [absences]);

  const isHoliday = useCallback((date: string) => {
    return holidays.find(h => h.date === date);
  }, [holidays]);

  // Count used days per employee per type
  const getUsedDays = useCallback((employeeId: string, type: AbsenceType) => {
    return absences.filter(a => a.employeeId === employeeId && a.type === type).length;
  }, [absences]);

  // Overlap detection: dates where 2+ employees are absent
  const overlapDates = useMemo(() => {
    const dateCount: Record<string, number> = {};
    absences.forEach(a => {
      dateCount[a.date] = (dateCount[a.date] || 0) + 1;
    });
    return new Set(Object.entries(dateCount).filter(([, c]) => c >= 2).map(([d]) => d));
  }, [absences]);

  return {
    year, setYear,
    employees, addEmployee, removeEmployee, renameEmployee, updateAllowance,
    absences, toggleAbsence, getAbsence,
    selectedType, setSelectedType,
    holidays, setHolidays, isHoliday,
    getUsedDays, overlapDates,
    view, setView,
    currentMonth, setCurrentMonth,
  };
}
