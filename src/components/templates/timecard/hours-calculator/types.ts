
export interface HoursCalculatorFormValues {
  regularHours: number;
  vacationDays: number;
  vacationType: "business" | "natural";
  extraHolidays: number;
  workdaysPerWeek: number;
  hoursPerDay: number;
}

export interface Holiday {
  id: number;
  name: string;
}
