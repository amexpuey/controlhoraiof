import ExcelJS from "exceljs";
import { Person, Schedule, WEEKDAYS, MONTHS, PersonRecords, validateRecords, timeMinutes } from "./recordLogic";

const HEADERS = ["Fecha", "Día", "Previsto", "Entrada real", "Salida real", "Entrada real 2", "Salida real 2", "Pausa inicio", "Pausa fin", "Observaciones"];
const GREEN = "FF0FB89F", INK = "FF0A1628", BORDER = "FFE2E8F0", AMBER = "FFFFF8E6";
export const CONSERVATION = ["Apunta la entrada y la salida reales cada día, no al final del mes.", "El horario previsto es solo una referencia, no un registro de jornada (Criterio Técnico 101/2019).", "Conserva los registros durante 4 años.", "Deben estar a disposición de la persona trabajadora, de sus representantes y de la Inspección de Trabajo.", "Un Excel se puede modificar sin dejar rastro: es un registro frágil."];
function styleSheet(sheet: ExcelJS.Worksheet, header: number) {
  sheet.views = [{ state: "frozen", ySplit: header }];
  sheet.eachRow((row, i) => {
    row.height = i === header ? 30 : 24;
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { name: "Arial", size: 10, color: { argb: INK }, bold: i === header };
      cell.alignment = { vertical: "middle", wrapText: true };
      cell.border = { bottom: { style: "hair", color: { argb: BORDER } } };
      if (i === header) cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GREEN } };
    });
  });
}
function sheetName(name: string, used: Set<string>) {
  const base = name.replace(/[\\/*?:\[\]]/g, " ").replace(/^'+|'+$/g, "").trim().slice(0, 31) || "Persona";
  let value = base, n = 2;
  while (used.has(value.toLowerCase())) { const suffix = ` (${n++})`; value = base.slice(0, 31 - suffix.length) + suffix; }
  used.add(value.toLowerCase()); return value;
}
export function createRegister(input: { people: Person[]; schedule: Schedule; company: string; year: number; month: number; holidays: Set<string> }) {
  const book = new ExcelJS.Workbook(); book.creator = "INWOUT"; book.calcProperties.fullCalcOnLoad = true;
  const used = new Set(["cómo conservarlo"]);
  for (const p of input.people) {
    const sheet = book.addWorksheet(sheetName(p.name, used)), s = p.schedule || input.schedule;
    sheet.addRow(["Registro de jornada real · INWOUT"]);
    sheet.addRow(["Empresa", input.company]); sheet.addRow(["Persona", p.name.trim()]); sheet.addRow(["Email", p.email.trim().toLowerCase()]);
    sheet.addRow(["Mes", `${MONTHS[input.month]} ${input.year}`]); sheet.addRow(["El horario previsto es referencia. Anota cada día las horas reales."]); sheet.addRow(HEADERS);
    const last = new Date(input.year, input.month + 1, 0).getDate();
    let plannedMinutes = 0;
    for (let d = 1; d <= last; d++) {
      const date = `${input.year}-${String(input.month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`, weekday = (new Date(`${date}T12:00:00`).getDay() + 6) % 7;
      const holiday = input.holidays.has(date), working = s.days[weekday] && !holiday;
      const planned = working ? `${s.start}–${s.end}${s.split ? ` / ${s.start2}–${s.end2}` : ""}${s.pause ? ` · Pausa ${s.pauseStart}–${s.pauseEnd}` : ""}` : "";
      const row = sheet.addRow([new Date(`${date}T00:00:00Z`), WEEKDAYS[weekday], planned, null, null, null, null, null, null, holiday ? "Festivo" : !working ? "No laborable" : ""]);
      row.getCell(1).numFmt = "dd/mm/yyyy";
      for (let c = 4; c <= 9; c++) {
        row.getCell(c).numFmt = "hh:mm";
        row.getCell(c).dataValidation = { type: "decimal", operator: "between", formulae: [0, 0.99999999], allowBlank: true, showErrorMessage: true, errorTitle: "Hora no válida", error: "Escribe una hora, por ejemplo 09:00." };
      }
      const r = row.number;
      row.getCell(11).value = { formula: `IF(COUNT(D${r}:E${r})=2,MOD(E${r}-D${r},1),0)+IF(COUNT(F${r}:G${r})=2,MOD(G${r}-F${r},1),0)-IF(AND(COUNT(H${r}:I${r})=2,OR(COUNT(D${r}:E${r})=2,COUNT(F${r}:G${r})=2)),MOD(I${r}-H${r},1),0)`, result: 0 };
      if (working) {
        const duration = (a: string, b: string) => ((timeMinutes(b) ?? 0) - (timeMinutes(a) ?? 0) + 1440) % 1440;
        plannedMinutes += duration(s.start, s.end) + (s.split ? duration(s.start2, s.end2) : 0) - (s.pause ? duration(s.pauseStart, s.pauseEnd) : 0);
      }
    }
    const totals = sheet.addRow(["Horas previstas del mes", { formula: `L2/60`, result: plannedMinutes / 60 }, "Horas registradas", { formula: `SUM(K8:K${7 + last})*24`, result: 0 }]);
    totals.getCell(2).numFmt = '0.00'; totals.getCell(4).numFmt = '0.00';
    sheet.getCell("L1").value = "Minutos previstos (referencia)"; sheet.getCell("L2").value = plannedMinutes;
    sheet.getCell("L2").note = "Source: Horario previsto introducido por el usuario. Solo referencia; nunca se usa al convertir fichajes.";
    [15, 16, 48, 15, 15, 16, 16, 15, 15, 38].forEach((width, i) => { sheet.getColumn(i + 1).width = width; });
    sheet.getColumn(11).hidden = true; sheet.getColumn(12).hidden = true;
    styleSheet(sheet, 7);
    for (let d = 8; d < 8 + last; d++) if (!sheet.getRow(d).getCell(3).value) sheet.getRow(d).eachCell({ includeEmpty: true }, (c) => { c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: AMBER } }; });
    sheet.autoFilter = { from: "A7", to: `J${7 + last}` };
  }
  const notes = book.addWorksheet("Cómo conservarlo"); notes.addRow(["Cómo conservarlo"]); CONSERVATION.forEach((v) => notes.addRow([v])); notes.getColumn(1).width = 100; styleSheet(notes, 1); notes.eachRow((r) => { r.height = 38; });
  return book;
}
const value = (cell: ExcelJS.Cell): unknown => {
  const v = cell.value;
  if (v && typeof v === "object" && !(v instanceof Date)) {
    if ("richText" in v) return v.richText.map((x) => x.text).join("");
    if ("formula" in v || "sharedFormula" in v) return "FÓRMULA NO ADMITIDA";
  }
  return v;
};
export async function readRegister(data: ArrayBuffer) {
  const book = new ExcelJS.Workbook(); await book.xlsx.load(data);
  const people: PersonRecords[] = [];
  for (const sheet of book.worksheets) {
    if (sheet.name === "Cómo conservarlo") continue;
    if (sheet.getCell("A3").value !== "Persona" || sheet.getCell("A4").value !== "Email" || HEADERS.some((h, i) => sheet.getRow(7).getCell(i + 1).value !== h)) throw new Error("Sube la hoja de registro generada por esta herramienta, sin cambiar sus cabeceras.");
    const days: PersonRecords["days"] = [];
    for (let r = 8; r <= sheet.rowCount; r++) {
      const row = sheet.getRow(r), v = row.getCell(1).value;
      if (v === "Horas previstas del mes") break;
      if (v === null) continue;
      let date = v instanceof Date ? v.toISOString().slice(0, 10) : String(v);
      const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(date);
      if (match) date = `${match[3]}-${match[2]}-${match[1]}`;
      days.push({ date, working: Boolean(row.getCell(3).value), times: [4, 5, 6, 7, 8, 9].map((c) => value(row.getCell(c))) });
    }
    people.push({ name: String(value(sheet.getCell("B3")) ?? ""), email: String(value(sheet.getCell("B4")) ?? ""), days });
  }
  if (!people.length) throw new Error("El archivo no contiene hojas de personas.");
  return validateRecords(people);
}
export function createImport(result: ReturnType<typeof validateRecords>) {
  if (result.errors.length) throw new Error("Corrige los errores antes de descargar.");
  const book = new ExcelJS.Workbook(), sheet = book.addWorksheet("Fichajes");
  sheet.addRow(["Email", "Entrada", "Salida", "Pausa"]);
  result.rows.forEach((r) => { const row = sheet.addRow([r.email, r.start, r.end, r.pause || null]); row.eachCell((c) => { c.numFmt = "@"; }); });
  [38, 25, 25, 12].forEach((w, i) => { sheet.getColumn(i + 1).width = w; }); styleSheet(sheet, 1);
  const summary = book.addWorksheet("Resumen"); summary.addRow(["Persona", "Email", "Días con registro", "Días sin registrar", "Horas registradas"]);
  result.summaries.forEach((s) => {
    const end = sheet.rowCount;
    const name = sheet.name;
    summary.addRow([s.name, s.email, s.registered, s.missing.length, { formula: `SUMPRODUCT(('${name}'!A2:A${Math.max(2, end)}=B${summary.rowCount + 1})*(IFERROR(VALUE('${name}'!C2:C${Math.max(2, end)}),0)-IFERROR(VALUE('${name}'!B2:B${Math.max(2, end)}),0))*IF('${name}'!D2:D${Math.max(2, end)}="TRUE",-1,1))*24`, result: s.minutes / 60 }]);
  });
  summary.addRow([]); summary.addRow(["Días laborables sin registrar", "Email", "Fecha"]);
  result.summaries.forEach((s) => s.missing.forEach((date) => summary.addRow([s.name, s.email, date])));
  [32, 38, 24, 22, 22].forEach((w, i) => { summary.getColumn(i + 1).width = w; }); summary.getColumn(5).numFmt = "0.00"; styleSheet(summary, 1);
  return book;
}
export async function downloadWorkbook(book: ExcelJS.Workbook, filename: string) {
  const buffer = await book.xlsx.writeBuffer();
  const url = URL.createObjectURL(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}