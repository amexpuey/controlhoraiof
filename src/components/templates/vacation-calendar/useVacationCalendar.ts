
import { useState, useCallback, useMemo, useRef } from "react";
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
  const [currentMonth, setCurrentMonth] = useState(0);

  // Shift+click range selection
  const lastClick = useRef<{ employeeId: string; date: string } | null>(null);

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

  const isHoliday = useCallback((date: string) => {
    return holidays.find(h => h.date === date);
  }, [holidays]);

  const isWeekendDay = useCallback((date: string) => {
    const day = new Date(date).getDay();
    return day === 0 || day === 6;
  }, []);

  // Fill a range of dates for an employee, skipping weekends and holidays
  const fillRange = useCallback((employeeId: string, startDate: string, endDate: string, type: AbsenceType) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) { const tmp = new Date(start); start.setTime(end.getTime()); end.setTime(tmp.getTime()); }

    const dates: string[] = [];
    const cur = new Date(start);
    while (cur <= end) {
      const ds = cur.toISOString().slice(0, 10);
      if (!isWeekendDay(ds) && !isHoliday(ds)) {
        dates.push(ds);
      }
      cur.setDate(cur.getDate() + 1);
    }

    setAbsences(prev => {
      const filtered = prev.filter(a => !(a.employeeId === employeeId && dates.includes(a.date)));
      return [...filtered, ...dates.map(d => ({ employeeId, date: d, type }))];
    });
  }, [isWeekendDay, isHoliday]);

  const toggleAbsence = useCallback((employeeId: string, date: string, shiftKey?: boolean) => {
    if (shiftKey && lastClick.current && lastClick.current.employeeId === employeeId) {
      fillRange(employeeId, lastClick.current.date, date, selectedType);
      lastClick.current = null;
      return;
    }

    lastClick.current = { employeeId, date };

    setAbsences(prev => {
      const existing = prev.find(a => a.employeeId === employeeId && a.date === date);
      if (existing) {
        return prev.filter(a => a !== existing);
      }
      return [...prev, { employeeId, date, type: selectedType }];
    });
  }, [selectedType, fillRange]);

  const getAbsence = useCallback((employeeId: string, date: string) => {
    return absences.find(a => a.employeeId === employeeId && a.date === date);
  }, [absences]);

  const getUsedDays = useCallback((employeeId: string, type: AbsenceType) => {
    return absences.filter(a => a.employeeId === employeeId && a.type === type).length;
  }, [absences]);

  const overlapDates = useMemo(() => {
    const dateCount: Record<string, number> = {};
    absences.forEach(a => {
      dateCount[a.date] = (dateCount[a.date] || 0) + 1;
    });
    return new Set(Object.entries(dateCount).filter(([, c]) => c >= 2).map(([d]) => d));
  }, [absences]);

  // Holiday management
  const addHoliday = useCallback((date: string, name: string) => {
    setHolidays(prev => {
      if (prev.find(h => h.date === date)) return prev;
      return [...prev, { date, name }].sort((a, b) => a.date.localeCompare(b.date));
    });
  }, []);

  const removeHoliday = useCallback((date: string) => {
    setHolidays(prev => prev.filter(h => h.date !== date));
  }, []);

  return {
    year, setYear,
    employees, addEmployee, removeEmployee, renameEmployee, updateAllowance,
    absences, setAbsences, toggleAbsence, getAbsence,
    selectedType, setSelectedType,
    holidays, setHolidays, isHoliday, addHoliday, removeHoliday,
    getUsedDays, overlapDates,
    view, setView,
    currentMonth, setCurrentMonth,
  };
}
