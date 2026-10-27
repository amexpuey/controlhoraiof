import { describe, expect, test } from "bun:test";
import { initialSchedule, peopleError, scheduleError, validateRecords } from "./recordLogic";
const convert = (times: unknown[], date = "2026-10-19") => validateRecords([{ name: "Ana", email: "ana@example.com", days: [{ date, working: true, times }] }]);
describe("Registro real e importación", () => {
  test("Un día vacío nunca genera fichajes", () => { const r = convert(["", "", "", "", "", ""]); expect(r.rows).toEqual([]); expect(r.summaries[0].missing).toEqual(["2026-10-19"]); });
  test("Una jornada partida genera dos filas y una pausa propia TRUE", () => { const r = convert(["09:00", "14:00", "15:00", "18:00", "11:00", "11:15"]); expect(r.errors).toEqual([]); expect(r.rows.map((x) => x.pause)).toEqual(["", "", "TRUE"]); expect(r.rows[0].start).toBe("2026-10-19 09:00:00"); expect(r.summaries[0].minutes).toBe(465); });
  test("El turno nocturno termina el día siguiente", () => { const r = convert(["22:00", "06:00", "", "", "02:00", "02:15"]); expect(r.errors).toEqual([]); expect(r.rows[0].end).toBe("2026-10-20 06:00:00"); expect(r.rows[1].start).toBe("2026-10-20 02:00:00"); });
  test("Los tramos solapados bloquean la descarga", () => { const r = convert(["09:00", "14:00", "13:00", "18:00", "", ""]); expect(r.errors.some((e) => e.message.includes("solapan"))).toBe(true); expect(r.rows).toEqual([]); });
  test("Más de 12 horas bloquea", () => { expect(convert(["06:00", "19:00", "", "", "", ""]).errors.some((e) => e.message.includes("12 horas"))).toBe(true); });
  test("Pausa fuera del turno bloquea", () => { expect(convert(["09:00", "17:00", "", "", "18:00", "18:15"]).errors.some((e) => e.message.includes("fuera"))).toBe(true); });
  test("Hora inválida bloquea", () => { expect(convert(["25:00", "17:00", "", "", "", ""]).errors.some((e) => e.message.includes("Hora no válida"))).toBe(true); });
  test("Tramo incompleto no genera ninguna fila", () => { const r = convert(["09:00", "", "", "", "", ""]); expect(r.errors.length).toBeGreaterThan(0); expect(r.rows).toEqual([]); });
  test("Solape entre días tras medianoche bloquea", () => { const r = validateRecords([{ name: "Ana", email: "ana@example.com", days: [{ date: "2026-10-19", working: true, times: ["22:00", "06:00", "", "", "", ""] }, { date: "2026-10-20", working: true, times: ["05:00", "07:00", "", "", "", ""] }] }]); expect(r.errors.some((e) => e.message.includes("medianoche"))).toBe(true); expect(r.rows).toEqual([]); });
  test("Un día no laborable vacío no se lista como sin registrar", () => { const r = validateRecords([{ name: "Ana", email: "ana@example.com", days: [{ date: "2026-10-18", working: false, times: ["", "", "", "", "", ""] }] }]); expect(r.summaries[0].missing).toEqual([]); });
  test("Máximo 50 personas", () => { const p = Array.from({ length: 50 }, (_, i) => ({ id: String(i), name: "Persona", email: `persona${i}@example.com` })); expect(peopleError(p)).toBe(""); expect(peopleError([...p, { id: "51", name: "Otra", email: "otra@example.com" }])).toContain("50"); });
  test("Email válido obligatorio", () => { expect(peopleError([{ id: "1", name: "Ana", email: "" }])).toContain("válido"); });
  test("Email único sin distinguir mayúsculas", () => { expect(peopleError([{ id: "1", name: "Ana", email: "ana@example.com" }, { id: "2", name: "Otra", email: " ANA@example.com " }])).toContain("repetirse"); });
  test("La referencia requiere tramos completos", () => { expect(scheduleError({ ...initialSchedule(), split: true, start2: "" })).toContain("segundo tramo"); });
});