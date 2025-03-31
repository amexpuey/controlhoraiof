
import { ReactNode } from "react";

export type AbsenceType = 
  | "work" 
  | "vacation" 
  | "sick" 
  | "personal" 
  | "unpaid" 
  | "holiday";

export interface DayData {
  date: Date;
  hours: number;
  absenceType: AbsenceType;
  notes: string;
}

export interface MonthData {
  [key: string]: DayData;
}

export interface YearData {
  [key: string]: MonthData;
}

export const absenceTypeLabels: Record<AbsenceType, string> = {
  work: "Trabajo",
  vacation: "Vacaciones",
  sick: "Baja por enfermedad",
  personal: "Ausencia justificada",
  unpaid: "Ausencia no remunerada",
  holiday: "Festivo"
};

export const absenceTypeColors: Record<AbsenceType, string> = {
  work: "bg-blue-100 text-blue-800",
  vacation: "bg-green-100 text-green-800",
  sick: "bg-red-100 text-red-800",
  personal: "bg-yellow-100 text-yellow-800",
  unpaid: "bg-gray-100 text-gray-800",
  holiday: "bg-purple-100 text-purple-800"
};

export const absenceTypeIcons: Record<AbsenceType, ReactNode> = {
  work: null,
  vacation: null,
  sick: null,
  personal: null,
  unpaid: null,
  holiday: null
};
