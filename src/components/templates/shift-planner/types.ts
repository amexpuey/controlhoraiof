
export interface ShiftType {
  id: string;
  name: string;
  shortName: string;
  startTime: string; // "06:00"
  endTime: string;   // "14:00"
  color: string;     // hex
  hours: number;
}

export interface Employee {
  id: string;
  name: string;
  /** Optional rank/priority for rotation fairness (1 = highest) */
  rank: number;
  /** Preferred shift type IDs */
  preferences: string[];
}

export interface ShiftAssignment {
  employeeId: string;
  date: string; // "YYYY-MM-DD"
  shiftTypeId: string | null; // null = day off
}

export interface RotationPattern {
  name: string;
  /** Array of shift type IDs (use "OFF" for day off) */
  sequence: string[];
}

export const DEFAULT_SHIFT_TYPES: ShiftType[] = [
  { id: "morning", name: "Mañana", shortName: "M", startTime: "06:00", endTime: "14:00", color: "#3B82F6", hours: 8 },
  { id: "afternoon", name: "Tarde", shortName: "T", startTime: "14:00", endTime: "22:00", color: "#F59E0B", hours: 8 },
  { id: "night", name: "Noche", shortName: "N", startTime: "22:00", endTime: "06:00", color: "#6366F1", hours: 8 },
  { id: "split", name: "Partido", shortName: "P", startTime: "09:00", endTime: "18:00", color: "#10B981", hours: 8 },
  { id: "day12", name: "Día 12h", shortName: "D12", startTime: "07:00", endTime: "19:00", color: "#EC4899", hours: 12 },
  { id: "night12", name: "Noche 12h", shortName: "N12", startTime: "19:00", endTime: "07:00", color: "#8B5CF6", hours: 12 },
];

export const DEFAULT_PATTERNS: RotationPattern[] = [
  { name: "M-T-N-Libre", sequence: ["morning", "afternoon", "night", "OFF"] },
  { name: "M-M-T-T-N-N-LL", sequence: ["morning", "morning", "afternoon", "afternoon", "night", "night", "OFF", "OFF"] },
  { name: "12h: D-D-N-N-LLLL", sequence: ["day12", "day12", "night12", "night12", "OFF", "OFF", "OFF", "OFF"] },
];
