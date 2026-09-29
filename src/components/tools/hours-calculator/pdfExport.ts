import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { DAYS, DayInput, WeekResult, fmtEur, segRange } from "./hoursLogic";
import { YearResult } from "./yearLogic";

export interface WeekPdf { days: DayInput[]; res: WeekResult; agreed: number; price: number | null }
export interface YearPdf {
  year: number; regionName: string; island: string; aran: boolean; locals: string[];
  vac: number; vacType: "lab" | "nat"; vacLab: number; perm: number; conv: number | null;
  r: YearResult; hols: { date: string; name: string; kind?: string }[];
}

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const G: [number, number, number] = [15, 184, 159];
const T: [number, number, number] = [10, 22, 40];
const L: [number, number, number] = [226, 232, 240];
const M = 15, W = 210, H = 297, CW = W - 2 * M;

const nf = (n: number, d = 2) => n.toLocaleString("es-ES", { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: "always" as any });
export const hm = (m: number) => { const r = Math.round(m); return `${nf(Math.floor(r / 60), 0)} h ${r % 60} min`; };
export const dec = (m: number) => `${nf(m / 60)} h`;
const fd = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`;

const boxes = (doc: jsPDF, y: number, items: [string, string, string][]) => {
  const bw = (CW - 8) / 3;
  items.forEach(([label, big, small], i) => {
    const x = M + i * (bw + 4);
    doc.setDrawColor(...(i === 0 ? G : L)); if (i === 0) doc.setFillColor(240, 253, 250); else doc.setFillColor(255, 255, 255);
    doc.roundedRect(x, y, bw, 22, 2, 2, "FD");
    doc.setFontSize(8); doc.setTextColor(71, 85, 105); doc.setFont("helvetica", "normal"); doc.text(label, x + 3, y + 5);
    doc.setFontSize(13); doc.setFont("helvetica", "bold"); doc.setTextColor(...(i === 0 ? G : T)); doc.text(big, x + 3, y + 12.5);
    doc.setFontSize(7.5); doc.setFont("helvetica", "normal"); doc.setTextColor(71, 85, 105);
    doc.text(doc.splitTextToSize(small, bw - 6).slice(0, 2), x + 3, y + 17);
  });
  return y + 27;
};

const warnBox = (doc: jsPDF, y: number, text: string, amber = true) => {
  const lines = doc.splitTextToSize(text, CW - 8);
  const h = lines.length * 4 + 4;
  if (amber) { doc.setDrawColor(252, 211, 77); doc.setFillColor(255, 251, 235); } else { doc.setDrawColor(...L); doc.setFillColor(248, 250, 252); }
  doc.roundedRect(M, y, CW, h, 1.5, 1.5, "FD");
  doc.setFontSize(8.5); if (amber) doc.setTextColor(146, 64, 14); else doc.setTextColor(...T); doc.text(lines, M + 4, y + 5);
  return y + h + 2;
};

const h2 = (doc: jsPDF, y: number, t: string) => {
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.setTextColor(...T); doc.text(t, M, y);
  doc.setDrawColor(...G); doc.setLineWidth(0.6); doc.line(M, y + 1.5, M + 20, y + 1.5); doc.setLineWidth(0.2);
  return y + 7;
};

const para = (doc: jsPDF, y: number, t: string, size = 9) => {
  doc.setFont("helvetica", "normal"); doc.setFontSize(size); doc.setTextColor(...T);
  const lines = doc.splitTextToSize(t, CW); doc.text(lines, M, y);
  return y + lines.length * size * 0.42 + 2;
};

const TOP = 33;

export function generateHoursPdf(week: WeekPdf, year: YearPdf | null) {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const yearPages = new Set<number>();
  const table = { theme: "grid" as const, margin: { left: M, right: M, top: TOP, bottom: 30 },
    styles: { fontSize: 8.5, textColor: T, lineColor: L, lineWidth: 0.2, cellPadding: 1.8 },
    headStyles: { fillColor: L, textColor: T, fontStyle: "bold" as const } };

  // Page 1
  let y = h2(doc, TOP + 2, "Tu semana");
  y = para(doc, y, `Jornada semanal pactada: ${nf(week.agreed, week.agreed % 1 ? 1 : 0)} h${week.price ? ` · Precio de la hora extra: ${fmtEur(week.price)}` : ""}`);
  const seg = (d: DayInput, k: number) => { const s = d.segments[k]; return s && segRange(s) ? `${s.start}-${s.end}` : "-"; };
  autoTable(doc, { ...table, startY: y,
    head: [["Día", "Tramo 1", "Tramo 2", "Pausa", "Total (h min)", "Total (decimal)", "Nocturnas"]],
    body: week.days.map((d, i) => { const r = week.res.days[i]; return [DAYS[i], seg(d, 0), seg(d, 1), d.pause ? `${d.pause} min` : "-", r.worked ? hm(r.worked) : "-", r.worked ? dec(r.worked) : "-", r.night ? dec(r.night) : "-"]; }),
    foot: [["Total semana", "", "", "", hm(week.res.total), dec(week.res.total), dec(week.res.night)]],
    footStyles: { fillColor: [240, 253, 250], textColor: G, fontStyle: "bold" },
    didParseCell: (c) => { if (c.section === "body" && !week.res.days[c.row.index].worked) c.cell.styles.textColor = [148, 163, 184]; },
  });
  y = (doc as any).lastAutoTable.finalY + 6;
  y = boxes(doc, y, [
    ["Total semana", hm(week.res.total), dec(week.res.total)],
    ["Horas extra", hm(week.res.extra), `${dec(week.res.extra)}${week.price ? ` · ${fmtEur((week.res.extra / 60) * week.price)}` : ""}`],
    ["Horas nocturnas (22-06)", hm(week.res.night), "El plus de nocturnidad lo fija el convenio"],
  ]);
  doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(...T); doc.text("Avisos legales", M, y + 2); y += 6;
  if (week.res.warnings.length) week.res.warnings.forEach((w) => { y = warnBox(doc, y, w); });
  else y = warnBox(doc, y, "Sin avisos para esta semana.", false);
  const yDiff = year?.conv ? year.r.total / 60 - year.conv : null;
  const extraTxt = year ? (yDiff !== null ? `Con tu proyección anual, harías ${nf(Math.max(0, yDiff))} horas por encima de la jornada anual del convenio.` : "") : `Si todas las semanas fueran como esta, harías ${nf(week.res.annualExtra / 60)} horas extra al año.`;
  y = para(doc, y + 3, `${extraTxt} El límite legal es de 80 horas extra al año (art. 35.2 ET); no cuentan las compensadas con descanso en los 4 meses siguientes.`, 8.5);

  // Page 2
  if (year) {
    const { r } = year;
    doc.addPage(); yearPages.add(doc.getNumberOfPages());
    y = h2(doc, TOP + 2, `Tu año ${year.year}`);
    const loc = year.locals.filter(Boolean).map(fd).join(", ") || "no indicados";
    const place = year.regionName + (year.island ? ` (${year.island})` : "") + (year.aran ? " (Val d'Aran)" : "");
    const vacTxt = year.vacType === "nat" ? `${year.vac} días naturales (= ${year.vacLab} laborables)` : `${year.vac} días laborables`;
    y = para(doc, y, `Comunidad: ${place} · Festivos locales: ${loc} · Vacaciones: ${vacTxt} · Permisos: ${year.perm} días · Jornada anual del convenio: ${year.conv ? `${nf(year.conv, 0)} h` : "no indicada"}`, 8.5);
    const diff = year.conv ? r.total / 60 - year.conv : 0;
    y = boxes(doc, y + 1, [
      ["Horas anuales previstas", hm(r.total), dec(r.total)],
      ["Promedio semanal (cómputo anual)", hm(r.weeklyAvg), "Límite 40 h (art. 34.1 ET). Sin contar vacaciones, permisos ni festivos"],
      ["Diferencia con el convenio", year.conv ? `${diff > 0 ? "+" : "-"}${nf(Math.abs(diff))} h` : "-", year.conv ? (diff > 0 ? "Supera la jornada del convenio" : "Por debajo del convenio") : "Convenio no indicado"],
    ]);
    if (year.conv && diff > 0) y = warnBox(doc, y, `La previsión supera en ${nf(diff)} h la jornada anual del convenio (${nf(year.conv, 0)} h).`);
    if (year.conv && diff > 80) y = warnBox(doc, y, "Más de 80 horas extraordinarias al año (art. 35.2 ET). No cuentan las compensadas con descanso en los 4 meses siguientes.");
    if (r.weeklyAvg > 2400) y = warnBox(doc, y, "El promedio semanal supera las 40 horas de trabajo efectivo en cómputo anual (art. 34.1 ET).");
    y = para(doc, y + 1, `${r.workdays} días con horario · ${r.holidaysOnWork} festivos · ${nf(r.vacDays, r.vacDays % 1 ? 2 : 0)} días de vacaciones · ${nf(r.permDays, 0)} de permisos = ${nf(r.workedDays, r.workedDays % 1 ? 2 : 0)} días de trabajo`, 8.5);

    // Calendar 4x3
    const cw = (CW - 9) / 4, cell = cw / 7, ch = cell * 0.52;
    const byDate = new Map(r.rows.map((x) => [x.date, x]));
    const localSet = new Set(year.hols.filter((h) => h.kind === "local").map((h) => h.date));
    for (let mi = 0; mi < 12; mi++) {
      const cx = M + (mi % 4) * (cw + 3), cy = y + Math.floor(mi / 4) * (ch * 7.6 + 2);
      doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(...T); doc.text(MONTHS[mi], cx, cy + 3);
      doc.setFontSize(6); doc.setTextColor(100, 116, 139);
      ["L", "M", "X", "J", "V", "S", "D"].forEach((d, i) => doc.text(d, cx + i * cell + cell / 2, cy + 3 + ch, { align: "center" }));
      const lead = (new Date(year.year, mi, 1).getDay() + 6) % 7, n = new Date(year.year, mi + 1, 0).getDate();
      for (let dd = 1; dd <= n; dd++) {
        const p = lead + dd - 1, col = p % 7, row = Math.floor(p / 7);
        const x = cx + col * cell, yy = cy + 3 + ch * (row + 1.3);
        const key = `${year.year}-${String(mi + 1).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
        const t = byDate.get(key)?.type;
        const fill: [number, number, number] = t === "festivo" ? [252, 211, 77] : t === "laborable" ? [209, 250, 229] : [241, 245, 249];
        doc.setFillColor(...fill); doc.rect(x + 0.2, yy, cell - 0.4, ch - 0.3, "F");
        if (t === "festivo" && localSet.has(key)) { doc.setDrawColor(180, 83, 9); doc.setLineWidth(0.4); doc.rect(x + 0.4, yy + 0.2, cell - 0.8, ch - 0.7, "S"); doc.setLineWidth(0.2); }
        doc.setFont("helvetica", t === "festivo" ? "bold" : "normal");
        const tc: [number, number, number] = t === "festivo" ? [120, 53, 15] : t === "laborable" ? T : [148, 163, 184]; doc.setTextColor(...tc);
        doc.text(String(dd), x + cell / 2, yy + ch * 0.72, { align: "center" });
      }
    }
    y += 3 * (ch * 7.6 + 2) + 4;
    const legend: [[number, number, number], string][] = [[[209, 250, 229], "Día con horario"], [[252, 211, 77], "Festivo"], [[241, 245, 249], "Fin de semana / sin horario"]];
    let lx = M; doc.setFontSize(7); doc.setFont("helvetica", "normal");
    legend.splice(2, 0, [[252, 211, 77], "Festivo local"]);
    legend.forEach(([c, t]) => { doc.setFillColor(...c); doc.rect(lx, y - 2.5, 3, 3, "F"); if (t === "Festivo local") { doc.setDrawColor(180, 83, 9); doc.setLineWidth(0.4); doc.rect(lx + 0.2, y - 2.3, 2.6, 2.6, "S"); doc.setLineWidth(0.2); } doc.setTextColor(...T); doc.text(t, lx + 4, y); lx += doc.getTextWidth(t) + 8; });
    y += 3.5; doc.setTextColor(100, 116, 139); doc.text("Las vacaciones y los permisos se descuentan del total, sin fecha.", M, y);
    y += 4;

    const gross = r.months.reduce((a, m) => a + m.minutes, 0);
    const monthRows = MONTHS.map((mn, mi) => {
      const rows = r.rows.filter((x) => Number(x.date.slice(5, 7)) === mi + 1);
      const withSched = rows.filter((x) => x.type === "laborable").length;
      const holWork = rows.filter((x) => x.type === "festivo" && week.res.days[x.weekday].worked > 0).length;
      return [mn, String(withSched), String(holWork), dec(r.months[mi].minutes)];
    });
    const offMin = gross - r.total;
    autoTable(doc, { ...table, startY: y, styles: { ...table.styles, fontSize: 7, cellPadding: 0.7 },
      head: [["Mes", "Días con horario", "Festivos en día laborable", "Horas (antes de vacaciones y permisos)"]],
      body: monthRows.map((x) => x.slice(0, 4) as string[]),
      foot: [["Total", String(monthRows.reduce((a, x) => a + Number(x[1]), 0)), String(r.holidaysOnWork), dec(gross)],
        [{ content: `- vacaciones y permisos (${dec(offMin)}) = horas anuales previstas`, colSpan: 3 }, dec(r.total)]],
      footStyles: { fillColor: [240, 253, 250], textColor: G, fontStyle: "bold" },
      didDrawPage: () => { yearPages.add(doc.getNumberOfPages()); },
    });
    y = (doc as any).lastAutoTable.finalY + 2;
    const hl = [...year.hols].sort((a, b) => a.date.localeCompare(b.date)).map((h) => `${fd(h.date).slice(0, 5)}  ${h.name}${h.kind === "local" ? " (local)" : ""}`);
    const third = Math.ceil(hl.length / 3);
    autoTable(doc, { ...table, theme: "plain", startY: y, styles: { fontSize: 5.8, cellPadding: 0.15, textColor: T, overflow: "ellipsize" },
      head: [[{ content: "Festivos aplicados", colSpan: 3 }]], headStyles: { fontStyle: "bold", fontSize: 7, textColor: T },
      body: Array.from({ length: third }, (_, i) => [hl[i] || "", hl[i + third] || "", hl[i + 2 * third] || ""]),
      didDrawPage: () => { yearPages.add(doc.getNumberOfPages()); },
    });
  }

  // Header & footer on every page
  const total = doc.getNumberOfPages();
  const today = new Date();
  const dstr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(...G); doc.text("INWOUT", M, M + 2);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(100, 116, 139); doc.text(`Generado el ${dstr}`, W - M, M + 2, { align: "right" });
    doc.setFont("helvetica", "bold"); doc.setFontSize(16); doc.setTextColor(...T); doc.text("Resumen de horas trabajadas", M, M + 11);
    doc.setDrawColor(...L); doc.line(M, M + 14, W - M, M + 14);
    let fy = H - M - 10;
    doc.line(M, fy - 4, W - M, fy - 4);
    doc.setFont("helvetica", "normal"); doc.setFontSize(6.5); doc.setTextColor(100, 116, 139);
    const legal = doc.splitTextToSize("Orientativo. El calendario laboral de tu empresa y tu convenio pueden fijar otros festivos, vacaciones o jornada. Este cálculo no sustituye el registro de jornada: la ley exige un registro diario, fiable y conservado durante 4 años (art. 34.9 ET).", CW);
    doc.text(legal, M, fy); fy += legal.length * 2.8;
    if (yearPages.has(p) && year) { doc.text(`Festivos ${year.year}: BOE-A-2025-21667.`, M, fy); fy += 2.8; }
    doc.text("Calculado con la calculadora de horas de INWOUT · inwout.com/calculadora-horas-trabajadas", M, fy);
    doc.text(`${p} / ${total}`, W - M, fy, { align: "right" });
  }
  const iso = today.toISOString().slice(0, 10);
  doc.save(`horas-trabajadas-${iso}.pdf`);
}

export const downloadCsv = (name: string, rows: (string | number)[][]) => {
  const csv = "\uFEFF" + rows.map((row) => row.map((c) => /^-?\d+(,\d+)?$/.test(String(c)) ? String(c) : `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  a.download = name;
  a.click();
};
export const num = (m: number) => (m / 60).toFixed(2).replace(".", ",");
export const hhmm = (m: number) => { const r = Math.round(m); return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`; };
