
import { Employee, AbsenceEntry, AbsenceType, Holiday } from "./types";

export interface PlannerConfig {
  mode: "rotative" | "preferences" | "collective";
  minCoverage: number; // minimum employees present
  collectiveStart?: string;
  collectiveEnd?: string;
  preferences?: Record<string, { preferred: string[]; alternative: string[] }>; // employeeId -> preferred month indices
}

function getWorkingDays(year: number, holidays: Holiday[]): string[] {
  const days: string[] = [];
  const holidaySet = new Set(holidays.map(h => h.date));
  const date = new Date(year, 0, 1);
  while (date.getFullYear() === year) {
    const dow = date.getDay();
    const ds = date.toISOString().slice(0, 10);
    if (dow !== 0 && dow !== 6 && !holidaySet.has(ds)) {
      days.push(ds);
    }
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function getMonthFromDate(date: string): number {
  return parseInt(date.slice(5, 7)) - 1;
}

// Score: summer months (Jun=5, Jul=6, Aug=7, Sep=8) get higher preference
function summerScore(date: string): number {
  const m = getMonthFromDate(date);
  if (m >= 5 && m <= 8) return 3;
  if (m === 4 || m === 9) return 2; // May, Oct
  if (m === 11) return 1.5; // Dec (Christmas)
  return 1;
}

export function autoplanRotative(
  employees: Employee[],
  holidays: Holiday[],
  year: number,
  minCoverage: number
): AbsenceEntry[] {
  const workingDays = getWorkingDays(year, holidays);
  const totalEmployees = employees.length;
  const maxAbsent = Math.max(1, totalEmployees - minCoverage);
  const entries: AbsenceEntry[] = [];

  // Track how many people are absent each day
  const dayAbsentCount: Record<string, number> = {};
  workingDays.forEach(d => (dayAbsentCount[d] = 0));

  // Sort employees randomly for fairness
  const shuffled = [...employees].sort(() => Math.random() - 0.5);

  for (const emp of shuffled) {
    const vacDays = emp.allowances.vacaciones;
    if (vacDays <= 0) continue;

    // Score each working day: prefer summer, prefer consecutive blocks, respect coverage
    const available = workingDays.filter(d => dayAbsentCount[d] < maxAbsent);
    
    // Group available days by week to create blocks
    const weekMap: Record<string, string[]> = {};
    available.forEach(d => {
      const date = new Date(d);
      const yearWeek = `${date.getFullYear()}-W${String(getWeekNumber(date)).padStart(2, "0")}`;
      if (!weekMap[yearWeek]) weekMap[yearWeek] = [];
      weekMap[yearWeek].push(d);
    });

    // Score weeks by summer preference and fullness
    const scoredWeeks = Object.entries(weekMap).map(([week, days]) => ({
      week,
      days,
      score: days.reduce((s, d) => s + summerScore(d), 0) / days.length + (days.length >= 4 ? 1 : 0),
    }));
    scoredWeeks.sort((a, b) => b.score - a.score);

    // Pick full weeks first, then individual days
    let remaining = vacDays;
    const assignedDays: string[] = [];

    // Try to assign ~60% in summer blocks
    const summerTarget = Math.floor(vacDays * 0.6);
    let summerAssigned = 0;

    for (const sw of scoredWeeks) {
      if (remaining <= 0) break;
      const isSummer = sw.days.some(d => { const m = getMonthFromDate(d); return m >= 5 && m <= 8; });
      
      if (isSummer && summerAssigned < summerTarget) {
        const toTake = Math.min(sw.days.length, remaining);
        const taken = sw.days.slice(0, toTake);
        assignedDays.push(...taken);
        remaining -= toTake;
        summerAssigned += toTake;
      }
    }

    // Fill remaining with best available non-summer weeks
    for (const sw of scoredWeeks) {
      if (remaining <= 0) break;
      const alreadyUsed = sw.days.filter(d => assignedDays.includes(d));
      const unused = sw.days.filter(d => !assignedDays.includes(d));
      if (unused.length > 0 && alreadyUsed.length === 0) {
        const toTake = Math.min(unused.length, remaining);
        assignedDays.push(...unused.slice(0, toTake));
        remaining -= toTake;
      }
    }

    // Create entries and update counts
    for (const d of assignedDays) {
      entries.push({ employeeId: emp.id, date: d, type: "vacaciones" });
      dayAbsentCount[d]++;
    }
  }

  return entries;
}

export function autoplanCollective(
  employees: Employee[],
  holidays: Holiday[],
  year: number,
  startDate: string,
  endDate: string,
  minCoverage: number
): AbsenceEntry[] {
  const holidaySet = new Set(holidays.map(h => h.date));
  const entries: AbsenceEntry[] = [];

  // Assign collective period to all employees
  const cur = new Date(startDate);
  const end = new Date(endDate);
  const collectiveDays: string[] = [];

  while (cur <= end) {
    const ds = cur.toISOString().slice(0, 10);
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6 && !holidaySet.has(ds)) {
      collectiveDays.push(ds);
    }
    cur.setDate(cur.getDate() + 1);
  }

  for (const emp of employees) {
    for (const d of collectiveDays) {
      entries.push({ employeeId: emp.id, date: d, type: "vacaciones" });
    }
  }

  // Distribute remaining days using rotative for each employee
  const remainingEntries = autoplanRotative(
    employees.map(emp => ({
      ...emp,
      allowances: { ...emp.allowances, vacaciones: Math.max(0, emp.allowances.vacaciones - collectiveDays.length) },
    })),
    holidays,
    year,
    minCoverage
  );

  // Remap employee IDs (they're the same objects) and merge
  return [...entries, ...remainingEntries.filter(e => !collectiveDays.includes(e.date))];
}

export function autoplanPreferences(
  employees: Employee[],
  holidays: Holiday[],
  year: number,
  preferences: Record<string, number[]>, // employeeId -> preferred month indices (0-11)
  minCoverage: number
): AbsenceEntry[] {
  const workingDays = getWorkingDays(year, holidays);
  const totalEmployees = employees.length;
  const maxAbsent = Math.max(1, totalEmployees - minCoverage);
  const entries: AbsenceEntry[] = [];
  const dayAbsentCount: Record<string, number> = {};
  workingDays.forEach(d => (dayAbsentCount[d] = 0));

  // Sort by fewest preferred months (most constrained first)
  const sorted = [...employees].sort((a, b) => {
    const pa = preferences[a.id]?.length || 12;
    const pb = preferences[b.id]?.length || 12;
    return pa - pb;
  });

  for (const emp of sorted) {
    const vacDays = emp.allowances.vacaciones;
    if (vacDays <= 0) continue;

    const prefMonths = preferences[emp.id] || [5, 6, 7]; // default summer
    const preferred = workingDays.filter(d => prefMonths.includes(getMonthFromDate(d)) && dayAbsentCount[d] < maxAbsent);
    const others = workingDays.filter(d => !prefMonths.includes(getMonthFromDate(d)) && dayAbsentCount[d] < maxAbsent);

    let remaining = vacDays;
    const assignedDays: string[] = [];

    // Try to fill from preferred months in consecutive blocks
    const prefWeeks = groupByWeek(preferred);
    for (const days of prefWeeks) {
      if (remaining <= 0) break;
      const toTake = Math.min(days.length, remaining);
      assignedDays.push(...days.slice(0, toTake));
      remaining -= toTake;
    }

    // Fill rest from other months
    const otherWeeks = groupByWeek(others);
    for (const days of otherWeeks) {
      if (remaining <= 0) break;
      const toTake = Math.min(days.length, remaining);
      assignedDays.push(...days.slice(0, toTake));
      remaining -= toTake;
    }

    for (const d of assignedDays) {
      entries.push({ employeeId: emp.id, date: d, type: "vacaciones" });
      dayAbsentCount[d]++;
    }
  }

  return entries;
}

function groupByWeek(days: string[]): string[][] {
  const weekMap: Record<string, string[]> = {};
  days.forEach(d => {
    const date = new Date(d);
    const wn = getWeekNumber(date);
    const key = `${date.getFullYear()}-${wn}`;
    if (!weekMap[key]) weekMap[key] = [];
    weekMap[key].push(d);
  });
  return Object.values(weekMap).sort((a, b) => b.length - a.length);
}

function getWeekNumber(d: Date): number {
  const onejan = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
}
