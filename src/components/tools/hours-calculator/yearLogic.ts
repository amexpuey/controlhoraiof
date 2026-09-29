import h2026 from "@/data/holidays/2026.json";

export interface HolidayData {
  year: number;
  source: string;
  national: string[];
  regions: Record<string, { name: string; holidays: { date: string; name: string }[] }>;
}

/** Add future years here (e.g. 2027) without touching the logic. */
export const HOLIDAYS: Record<number, HolidayData> = { 2026: h2026 as HolidayData };
export const YEARS = Object.keys(HOLIDAYS).map(Number);

export const ISLANDS: Record<number, { name: string; date: string }[]> = {
  2026: [
    { name: "El Hierro", date: "2026-09-24" },
    { name: "Fuerteventura", date: "2026-09-18" },
    { name: "Gran Canaria", date: "2026-09-08" },
    { name: "La Gomera", date: "2026-10-05" },
    { name: "La Palma", date: "2026-08-05" },
    { name: "Lanzarote y La Graciosa", date: "2026-09-15" },
    { name: "Tenerife", date: "2026-02-02" },
  ],
};
export const ARAN: Record<number, { remove: string; add: string }> = { 2026: { remove: "2026-12-26", add: "2026-06-17" } };

export interface Hol { date: string; name: string; kind: "oficial" | "insular" | "local" }

export const buildHolidays = (year: number, region: string, island: string, aran: boolean, locals: string[]): Hol[] => {
  const data = HOLIDAYS[year];
  const reg = data?.regions[region];
  if (!reg) return [];
  let list: Hol[] = reg.holidays.map((h) => ({ ...h, kind: "oficial" }));
  if (region === "canarias" && island) {
    const i = ISLANDS[year]?.find((x) => x.name === island);
    if (i) list.push({ date: i.date, name: `Festivo insular (${i.name})`, kind: "insular" });
  }
  if (region === "cataluna" && aran && ARAN[year]) {
    list = list.filter((h) => h.date !== ARAN[year].remove);
    list.push({ date: ARAN[year].add, name: "Festivo de la Val d'Aran", kind: "oficial" });
  }
  locals.filter((d) => d && d.startsWith(String(year))).forEach((d, k) => {
    if (!list.some((h) => h.date === d)) list.push({ date: d, name: `Festivo local ${k + 1}`, kind: "local" });
  });
  return list.sort((a, b) => a.date.localeCompare(b.date));
};

export const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
/** Monday = 0 ... Sunday = 6 */
export const wd = (d: Date) => (d.getDay() + 6) % 7;

export interface DayRow { date: string; weekday: number; type: "laborable" | "festivo" | "fin de semana"; minutes: number }
export interface YearResult {
  rows: DayRow[]; workdays: number; holidaysOnWork: number; vacDays: number; permDays: number;
  total: number; weeklyAvg: number; months: { minutes: number; holidays: number }[]; avgDay: number;
}

export const computeYear = (year: number, dayMinutes: number[], active: Set<string>, vacLab: number, perm: number): YearResult => {
  const rows: DayRow[] = [];
  const months = Array.from({ length: 12 }, () => ({ minutes: 0, holidays: 0 }));
  let workdays = 0, holidaysOnWork = 0, sum = 0;
  for (let d = new Date(year, 0, 1); d.getFullYear() === year; d.setDate(d.getDate() + 1)) {
    const key = iso(d), w = wd(d), m = dayMinutes[w] || 0, isHol = active.has(key);
    if (m > 0) workdays++;
    if (isHol) months[d.getMonth()].holidays++;
    let minutes = m, type: DayRow["type"] = m > 0 ? "laborable" : "fin de semana";
    if (isHol) { type = "festivo"; if (m > 0) holidaysOnWork++; minutes = 0; }
    months[d.getMonth()].minutes += minutes;
    sum += minutes;
    rows.push({ date: key, weekday: w, type, minutes });
  }
  const wdpw = dayMinutes.filter((m) => m > 0).length;
  const avgDay = wdpw ? dayMinutes.reduce((a, b) => a + b, 0) / wdpw : 0;
  const total = Math.max(0, sum - (vacLab + perm) * avgDay);
  const daysInYear = rows.length;
  return { rows, workdays, holidaysOnWork, vacDays: vacLab, permDays: perm, total, weeklyAvg: total / (daysInYear / 7), months, avgDay };
};

export const naturalToLab = (n: number, wdpw: number) => Math.ceil((n * wdpw) / 7);

const nf = new Intl.NumberFormat("es-ES", { useGrouping: "always" as any });
const nf2 = new Intl.NumberFormat("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: "always" as any });
export const fmtHMBig = (m: number) => { const r = Math.round(m); return `${nf.format(Math.floor(r / 60))} h ${r % 60} min`; };
export const fmtDecBig = (m: number) => `${nf2.format(m / 60)} h`;
