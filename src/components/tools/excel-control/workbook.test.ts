/// <reference types="bun" />
import { expect, test } from "bun:test";
import ExcelJS from "exceljs";
import { createImport } from "./workbooks";
import { validateRecords } from "./recordLogic";
test("El Excel descargado tiene Pausa como booleano real y el resumen no suma pausas", async () => {
  const r = validateRecords([{ name: "Ana", email: "ana@example.com", days: [{ date: "2026-10-19", working: true, times: ["09:00", "17:30", "", "", "13:00", "14:00"] }, { date: "2026-10-20", working: true, times: ["09:00", "14:00", "15:00", "18:00", "", ""] }] }]);
  const buf = await createImport(r).xlsx.writeBuffer();
  const book = new ExcelJS.Workbook(); await book.xlsx.load(buf as ArrayBuffer);
  const s = book.getWorksheet("Fichajes")!;
  expect(s.getRow(1).values).toEqual([, "Email", "Entrada", "Salida", "Pausa"]);
  const d = [2, 3, 4, 5, 6].map((i) => s.getRow(i).getCell(4).value);
  expect(d).toEqual([null, true, null, null, null]);
  expect(typeof d[1]).toBe("boolean");
  expect(s.getRow(3).getCell(2).value).toBe("2026-10-19 13:00:00");
  const f = book.getWorksheet("Resumen")!.getRow(2).getCell(5).value as { formula: string; result: number };
  expect(f.formula).toContain("D2:D6<>TRUE"); expect(f.result).toBe(15.5);
});
