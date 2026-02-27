
import { useState, useCallback, useMemo } from "react";
import { ShiftType, Employee, ShiftAssignment, RotationPattern, DEFAULT_SHIFT_TYPES, DEFAULT_PATTERNS } from "./types";
import { addDays, startOfWeek, startOfMonth, endOfMonth, format, eachDayOfInterval, getISOWeek } from "date-fns";
import { es } from "date-fns/locale";

export function useShiftPlanner() {
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>(DEFAULT_SHIFT_TYPES.slice(0, 3));
  const [employees, setEmployees] = useState<Employee[]>([
    { id: "emp1", name: "Empleado 1", rank: 1, preferences: [] },
    { id: "emp2", name: "Empleado 2", rank: 2, preferences: [] },
    { id: "emp3", name: "Empleado 3", rank: 3, preferences: [] },
  ]);
  const [assignments, setAssignments] = useState<ShiftAssignment[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"week" | "month">("week");

  // Date ranges
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const visibleDays = view === "week" ? weekDays : monthDays;

  // Get assignment for employee + date
  const getAssignment = useCallback(
    (employeeId: string, date: string) =>
      assignments.find((a) => a.employeeId === employeeId && a.date === date),
    [assignments]
  );

  // Set assignment
  const setAssignment = useCallback(
    (employeeId: string, date: string, shiftTypeId: string | null) => {
      setAssignments((prev) => {
        const filtered = prev.filter(
          (a) => !(a.employeeId === employeeId && a.date === date)
        );
        if (shiftTypeId) {
          filtered.push({ employeeId, date, shiftTypeId });
        }
        return filtered;
      });
    },
    []
  );

  // Add employee
  const addEmployee = useCallback((name: string) => {
    const id = `emp_${Date.now()}`;
    setEmployees((prev) => [...prev, { id, name, rank: prev.length + 1, preferences: [] }]);
  }, []);

  // Remove employee
  const removeEmployee = useCallback((id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    setAssignments((prev) => prev.filter((a) => a.employeeId !== id));
  }, []);

  // Update employee name
  const updateEmployeeName = useCallback((id: string, name: string) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, name } : e)));
  }, []);

  // Add shift type
  const addShiftType = useCallback((st: ShiftType) => {
    setShiftTypes((prev) => [...prev, st]);
  }, []);

  // Remove shift type
  const removeShiftType = useCallback((id: string) => {
    setShiftTypes((prev) => prev.filter((s) => s.id !== id));
    setAssignments((prev) => prev.filter((a) => a.shiftTypeId !== id));
  }, []);

  // Apply rotation pattern
  const applyRotation = useCallback(
    (pattern: RotationPattern, startDate: Date, numWeeks: number = 4) => {
      const totalDays = numWeeks * 7;
      const newAssignments: ShiftAssignment[] = [];

      employees.forEach((emp, empIndex) => {
        // Offset each employee by their position in the pattern
        const offset = empIndex % pattern.sequence.length;

        for (let d = 0; d < totalDays; d++) {
          const date = format(addDays(startDate, d), "yyyy-MM-dd");
          const seqIndex = (d + offset) % pattern.sequence.length;
          const shiftId = pattern.sequence[seqIndex];

          if (shiftId !== "OFF") {
            newAssignments.push({
              employeeId: emp.id,
              date,
              shiftTypeId: shiftId,
            });
          }
        }
      });

      setAssignments((prev) => {
        // Remove existing assignments in the date range
        const rangeStart = format(startDate, "yyyy-MM-dd");
        const rangeEnd = format(addDays(startDate, totalDays - 1), "yyyy-MM-dd");
        const filtered = prev.filter(
          (a) => a.date < rangeStart || a.date > rangeEnd
        );
        return [...filtered, ...newAssignments];
      });
    },
    [employees]
  );

  // Hours summary per employee
  const hoursSummary = useMemo(() => {
    const summary: Record<string, { total: number; byShift: Record<string, number> }> = {};

    employees.forEach((emp) => {
      summary[emp.id] = { total: 0, byShift: {} };
    });

    // Filter assignments to visible date range
    const startStr = format(visibleDays[0], "yyyy-MM-dd");
    const endStr = format(visibleDays[visibleDays.length - 1], "yyyy-MM-dd");

    assignments
      .filter((a) => a.date >= startStr && a.date <= endStr)
      .forEach((a) => {
        const st = shiftTypes.find((s) => s.id === a.shiftTypeId);
        if (st && summary[a.employeeId]) {
          summary[a.employeeId].total += st.hours;
          summary[a.employeeId].byShift[st.id] =
            (summary[a.employeeId].byShift[st.id] || 0) + st.hours;
        }
      });

    return summary;
  }, [assignments, employees, shiftTypes, visibleDays]);

  // Clear all assignments
  const clearAll = useCallback(() => setAssignments([]), []);

  return {
    shiftTypes,
    setShiftTypes,
    employees,
    assignments,
    currentDate,
    setCurrentDate,
    view,
    setView,
    visibleDays,
    weekStart,
    getAssignment,
    setAssignment,
    addEmployee,
    removeEmployee,
    updateEmployeeName,
    addShiftType,
    removeShiftType,
    applyRotation,
    hoursSummary,
    clearAll,
  };
}
