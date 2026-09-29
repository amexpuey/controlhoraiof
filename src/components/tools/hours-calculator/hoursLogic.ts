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

/** Subtract covered ranges from [a,b]. */
const clip = (a: number, b: number, cover: [number, number][]): [number, number][] => {
  let parts: [number, number][] = [[a, b]];
  for (const [c, e] of cover) parts = parts.flatMap(([x, y]) => (e <= x || c >= y ? [[x, y]] : [[x, Math.min(y, c)], [Math.max(x, e), y]].filter(([p, q]) => q > p)) as [number, number][]);
  return parts;
};

export const computeDay = (d: DayInput, cover: [number, number][] = []): DayResult => {
  let gross = 0, night = 0, first: number | null = null, last: number | null = null, longSeg = false;
  const seen: [number, number][] = [...cover];
  for (const s of d.segments) {
    const r = segRange(s);
    if (!r) continue;
    const len = r[1] - r[0];
    const pieces = clip(r[0], r[1], seen);
    seen.push(r);
    for (const [x, y] of pieces) {
      gross += y - x;
      night += NIGHT.reduce((acc, [c, e]) => acc + overlap(x, y, c, e), 0);
    }
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
  days: DayResult[]; overlaps: Record<string, string>; total: number; night: number; extra: number; annualExtra: number; warnings: string[];
}

export const computeWeek = (days: DayInput[], agreedHours: number): WeekResult => {
  const hhmmOf = (m: number) => { const x = ((m % 1440) + 1440) % 1440; return `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(x % 60).padStart(2, "0")}`; };
  const overlaps: Record<string, string> = {};
  const res = days.map((d, i) => {
    const pi = (i + 6) % 7;
    const prev = days[pi].segments.map(segRange).filter((r): r is [number, number] => !!r && r[1] > 1440).map((r) => [r[0] - 1440, r[1] - 1440] as [number, number]);
    d.segments.forEach((s, k) => {
      const r = segRange(s); if (!r) return;
      const p = prev.find(([c, e]) => overlap(r[0], r[1], c, e) > 0);
      if (p) { overlaps[`${i}-${k}`] = `Se solapa con el turno del ${DAYS[pi].toLowerCase()}, que termina a las ${hhmmOf(p[1])}.`; return; }
      for (let j = 0; j < k; j++) { const q = segRange(d.segments[j]); if (q && overlap(r[0], r[1], q[0], q[1]) > 0) { overlaps[`${i}-${k}`] = `Se solapa con el tramo ${j + 1} del ${DAYS[i].toLowerCase()}.`; return; } }
      // next-day overflow into the following day's early segments is caught when processing that day
    });
    return computeDay(d, prev);
  });
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
  if (res.some((d) => d.longNoBreak)) warnings.push("Más de 6 horas seguidas sin pausa indicada. La ley exige un descanso de al menos 15 minutos (art. 34.4 ET). Si lo haces y tu convenio lo cuenta como trabajo, no hace falta restarlo aquí.");
  // Art. 37.1: 36 h uninterrupted weekly rest (circular week)
  const iv: [number, number][] = [];
  days.forEach((d, i) => d.segments.forEach((sg) => { const rg = segRange(sg); if (rg) iv.push([i * 1440 + rg[0], i * 1440 + rg[1]]); }));
  if (iv.length) {
    iv.sort((a, b) => a[0] - b[0]);
    let maxGap = 0, end = iv[0][1];
    for (let k = 1; k < iv.length; k++) { maxGap = Math.max(maxGap, iv[k][0] - end); end = Math.max(end, iv[k][1]); }
    maxGap = Math.max(maxGap, iv[0][0] + 10080 - end);
    if (maxGap < 2160) warnings.push("Menos de día y medio de descanso semanal ininterrumpido (art. 37.1 ET). Puede acumularse en periodos de hasta 14 días.");
  }
  if (res.some((d) => d.night >= 180 && d.worked > 480))
    warnings.push("Quien trabaja de noche de forma habitual no puede superar 8 horas diarias de promedio en 15 días (art. 36.1 ET).");
  const withSched = res.filter((d) => d.worked > 0);
  const nightDays = withSched.filter((d) => d.night >= 180).length;
  if (withSched.length && nightDays > withSched.length / 2 && extra > 0)
    warnings.push("Los trabajadores nocturnos no pueden hacer horas extraordinarias (art. 36.1 ET).");
  return { days: res, overlaps, total, night, extra, annualExtra: extra * 52, warnings };
};

export const fmtHM = (m: number) => `${Math.floor(m / 60)} h ${Math.round(m % 60)} min`;
export const fmtDec = (m: number) => `${(m / 60).toFixed(2).replace(".", ",")} h`;
export const fmtEur = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", useGrouping: "always" as any }).format(n);
