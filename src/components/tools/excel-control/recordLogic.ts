export const WEEKDAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
export const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
export type Schedule = { days: boolean[]; start: string; end: string; split: boolean; start2: string; end2: string; pause: boolean; pauseStart: string; pauseEnd: string };
export type Person = { id: string; name: string; email: string; schedule?: Schedule };
export type RealDay = { date: string; working: boolean; times: unknown[] };
export type PersonRecords = { name: string; email: string; days: RealDay[] };
export type Issue = { person: string; date: string; message: string };
export type ImportRow = { email: string; start: string; end: string; pause: "TRUE" | "" };
export type Summary = { name: string; email: string; registered: number; missing: string[]; minutes: number };
export const initialSchedule = (): Schedule => ({ days: [true, true, true, true, true, false, false], start: "09:00", end: "17:00", split: false, start2: "15:00", end2: "18:00", pause: false, pauseStart: "", pauseEnd: "" });
export function peopleError(people: Person[]): string {
  if (!people.length || people.length > 50) return "Añade entre 1 y 50 personas.";
  const seen = new Set<string>();
  for (const p of people) {
    const email = p.email.trim().toLowerCase();
    if (!p.name.trim()) return "Introduce el nombre de cada persona.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Introduce un email válido para cada persona.";
    if (seen.has(email)) return "Los emails no pueden repetirse.";
    seen.add(email);
  }
  return "";
}
export function timeMinutes(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) && value >= 0 && value < 1 ? Math.round(value * 1440) % 1440 : null;
  if (value instanceof Date) return value.getUTCHours() * 60 + value.getUTCMinutes();
  if (typeof value !== "string") return null;
  const match = /^(\d{1,2}):([0-5]\d)(?::([0-5]\d))?$/.exec(value.trim());
  if (!match || Number(match[1]) > 23) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}
const blank = (v: unknown) => v === null || v === undefined || v === "" || (typeof v === "string" && !v.trim());
const stamp = (date: string, mins: number) => {
  const day = new Date(`${date}T00:00:00Z`);
  day.setUTCDate(day.getUTCDate() + Math.floor(mins / 1440));
  return `${day.toISOString().slice(0, 10)} ${String(Math.floor((mins % 1440) / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}:00`;
};
export function validateRecords(people: PersonRecords[]) {
  const errors: Issue[] = [], rows: ImportRow[] = [], summaries: Summary[] = [];
  const identity = peopleError(people.map((p, i) => ({ ...p, id: String(i) })));
  if (identity) errors.push({ person: "Archivo", date: "", message: identity });
  for (const p of people) {
    const summary: Summary = { name: p.name, email: p.email.trim().toLowerCase(), registered: 0, missing: [], minutes: 0 };
    const all: { start: number; end: number; date: string }[] = [];
    const seenDates = new Set<string>();
    for (const day of p.days) {
      const fail = (message: string) => errors.push({ person: p.name, date: day.date, message });
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isFinite(Date.parse(day.date)) || new Date(day.date).toISOString().slice(0, 10) !== day.date) { fail("Fecha no válida."); continue; }
      if (seenDates.has(day.date)) { fail("Fecha repetida."); continue; }
      seenDates.add(day.date);
      if (day.times.every(blank)) { if (day.working) summary.missing.push(day.date); continue; }
      const before = errors.length;
      const pairs: { start: number; end: number; pause: boolean }[] = [];
      let anchor: number | undefined;
      for (let k = 0; k < 3; k++) {
        const a = day.times[k * 2], b = day.times[k * 2 + 1];
        if (blank(a) && blank(b)) continue;
        if (blank(a) || blank(b)) { fail(k === 2 ? "Completa el inicio y el fin de la pausa." : `Completa la entrada y la salida del tramo ${k + 1}.`); continue; }
        let start = timeMinutes(a), end = timeMinutes(b);
        if (start === null || end === null) { fail("Hora no válida. Usa HH:MM (por ejemplo, 09:00)."); continue; }
        if (start === end) { fail("La entrada y la salida no pueden ser iguales."); continue; }
        if (anchor !== undefined && start < anchor && pairs.some((x) => !x.pause && x.end > 1440)) start += 1440;
        if (end <= start % 1440) end += 1440;
        if (start >= 1440 && end < 1440) end += 1440;
        if (k < 2 && anchor === undefined) anchor = start;
        pairs.push({ start, end, pause: k === 2 });
      }
      const work = pairs.filter((x) => !x.pause), pause = pairs.find((x) => x.pause);
      if (!work.length) fail("La pausa necesita un tramo trabajado con entrada y salida reales.");
      if (work.length === 2 && work[0].start < work[1].end && work[1].start < work[0].end) fail("Los tramos trabajados se solapan.");
      if (pause && !work.some((x) => pause.start >= x.start && pause.end <= x.end)) fail("La pausa está fuera de los tramos trabajados.");
      const minutes = work.reduce((sum, x) => sum + x.end - x.start, 0) - (pause ? pause.end - pause.start : 0);
      if (minutes > 720) fail("Más de 12 horas trabajadas en un día. Revisa las horas reales.");
      if (errors.length !== before) continue;
      summary.registered++; summary.minutes += minutes;
      const base = Date.parse(`${day.date}T00:00:00Z`) / 60000;
      work.forEach((x) => all.push({ start: base + x.start, end: base + x.end, date: day.date }));
      pairs.forEach((x) => rows.push({ email: summary.email, start: stamp(day.date, x.start), end: stamp(day.date, x.end), pause: x.pause ? "TRUE" : "" }));
    }
    all.sort((a, b) => a.start - b.start);
    for (let i = 1; i < all.length; i++) if (all[i].start < all[i - 1].end && all[i].date !== all[i - 1].date) errors.push({ person: p.name, date: all[i].date, message: `Se solapa con el turno del ${all[i - 1].date}, que cruza la medianoche.` });
    summaries.push(summary);
  }
  return { errors, rows: errors.length ? [] : rows, summaries };
}
export function scheduleError(s: Schedule) {
  if (!s.days.some(Boolean)) return "Selecciona al menos un día laborable.";
  const r = validateRecords([{ name: "Horario", email: "referencia@example.com", days: [{ date: "2026-01-01", working: true, times: [s.start, s.end, s.split ? s.start2 : "", s.split ? s.end2 : "", s.pause ? s.pauseStart : "", s.pause ? s.pauseEnd : ""] }] }]);
  if (!s.start || !s.end) return "Completa la entrada y la salida previstas.";
  if (s.split && (!s.start2 || !s.end2)) return "Completa el segundo tramo previsto.";
  if (s.pause && (!s.pauseStart || !s.pauseEnd)) return "Completa la pausa prevista.";
  return r.errors[0]?.message || "";
}