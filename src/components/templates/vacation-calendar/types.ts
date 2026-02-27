
export type AbsenceType = "vacaciones" | "asuntos_propios" | "baja_medica" | "permiso";

export interface AbsenceConfig {
  type: AbsenceType;
  label: string;
  color: string;
  bgColor: string;
  defaultDays: number;
}

export const ABSENCE_TYPES: AbsenceConfig[] = [
  { type: "vacaciones", label: "Vacaciones", color: "hsl(199, 89%, 48%)", bgColor: "hsla(199, 89%, 48%, 0.2)", defaultDays: 22 },
  { type: "asuntos_propios", label: "Asuntos propios", color: "hsl(38, 92%, 50%)", bgColor: "hsla(38, 92%, 50%, 0.2)", defaultDays: 6 },
  { type: "baja_medica", label: "Baja médica", color: "hsl(0, 72%, 51%)", bgColor: "hsla(0, 72%, 51%, 0.2)", defaultDays: 0 },
  { type: "permiso", label: "Permiso retribuido", color: "hsl(270, 50%, 50%)", bgColor: "hsla(270, 50%, 50%, 0.2)", defaultDays: 0 },
];

export interface Employee {
  id: string;
  name: string;
  allowances: Record<AbsenceType, number>; // days allowed per type
}

export interface AbsenceEntry {
  employeeId: string;
  date: string; // YYYY-MM-DD
  type: AbsenceType;
}

export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
}

// Spanish national holidays 2026
export const SPAIN_HOLIDAYS_2026: Holiday[] = [
  { date: "2026-01-01", name: "Año Nuevo" },
  { date: "2026-01-06", name: "Epifanía del Señor" },
  { date: "2026-04-02", name: "Jueves Santo" },
  { date: "2026-04-03", name: "Viernes Santo" },
  { date: "2026-05-01", name: "Día del Trabajo" },
  { date: "2026-08-15", name: "Asunción de la Virgen" },
  { date: "2026-10-12", name: "Fiesta Nacional" },
  { date: "2026-11-02", name: "Todos los Santos" },
  { date: "2026-12-07", name: "Día de la Constitución" },
  { date: "2026-12-08", name: "Inmaculada Concepción" },
  { date: "2026-12-25", name: "Navidad" },
];
