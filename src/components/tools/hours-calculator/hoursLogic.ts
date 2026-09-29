export interface Segment { start: string; end: string }
export interface DayInput { segments: Segment[]; pause: number }

export const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export const toMin = (t: string): number | null => {
  if (!/^\d{1,2}:\d{2}$/.test(t)) return null;
  const [h, m] = t.split(":").map(Number);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
};

/** Returns [start, end] in minutes relative to the day's 00:00; end may exceed 1440 (night shift). */
export const segRange = (s: Segment): [number, number] | null => {
  const a = toMin(s.start), b = toMin(s.end);
  if (a === null || b === null) return null;
  return [a, b <= a ? b + 1440 : b];
};

const NIGHT: [number, number][] = [[0, 360], [1320, 1800], [2760, 2880]];
const overlap = (a: number, b: number, c: number, d: number) => Math.max(0, Math.min(b, d) - Math.max(a, c));

export interface DayResult {
  worked: number; night: number; firstStart: number | null; lastEnd: number | null; longNoBreak: boolean;
}

export const computeDay = (d: DayInput): DayResult => {
  let gross = 0, night = 0, first: number | null = null, last: number | null = null, longSeg = false;
  for (const s of d.segments) {
    const r = segRange(s);
    if (!r) continue;
    const len = r[1] - r[0];
    gross += len;
    night += NIGHT.reduce((acc, [c, e]) => acc + overlap(r[0], r[1], c, e), 0);
    first = first === null ? r[0] : Math.min(first, r[0]);
    last = last === null ? r[1] : Math.max(last, r[1]);
    if (len > 360) longSeg = true;
  }
  const pause = Math.max(0, d.pause || 0);
  return {
    worked: Math.max(0, gross - (gross > 0 ? pause : 0)),
    night,
    firstStart: first,
    lastEnd: last,
    longNoBreak: longSeg && pause < 15,
  };
};

export interface WeekResult {
  days: DayResult[]; total: number; night: number; extra: number; annualExtra: number; warnings: string[];
}

export const computeWeek = (days: DayInput[], agreedHours: number): WeekResult => {
  const res = days.map(computeDay);
  const total = res.reduce((a, d) => a + d.worked, 0);
  const night = res.reduce((a, d) => a + d.night, 0);
  const extra = Math.max(0, total - Math.round((agreedHours || 0) * 60));
  const warnings: string[] = [];
  if (total > 40 * 60) warnings.push("Supera las 40 horas semanales de trabajo efectivo de promedio en cómputo anual (art. 34.1 ET).");
  if (res.some((d) => d.worked > 9 * 60)) warnings.push("Más de 9 horas ordinarias en un día (art. 34.3 ET), salvo que el convenio establezca otra distribución.");
  let shortRest = false;
  for (let i = 0; i < 6; i++) {
    const a = res[i], b = res[i + 1];
    if (a.lastEnd !== null && b.firstStart !== null && b.firstStart + 1440 - a.lastEnd < 720) shortRest = true;
  }
  if (shortRest) warnings.push("Menos de 12 horas de descanso entre jornadas (art. 34.3 ET).");
  if (res.some((d) => d.longNoBreak)) warnings.push("Jornada continuada de más de 6 horas sin un descanso de al menos 15 minutos (art. 34.4 ET).");
  return { days: res, total, night, extra, annualExtra: extra * 52, warnings };
};

export const fmtHM = (m: number) => `${Math.floor(m / 60)} h ${Math.round(m % 60)} min`;
export const fmtDec = (m: number) => `${(m / 60).toFixed(2).replace(".", ",")} h`;
export const fmtEur = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", useGrouping: "always" as any }).format(n);
