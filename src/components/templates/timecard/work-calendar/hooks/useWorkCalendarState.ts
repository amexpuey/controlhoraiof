
import { useState } from "react";
import { YearData, AbsenceType } from "../types";

export const useWorkCalendarState = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [yearData, setYearData] = useState<YearData>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [hoursForDay, setHoursForDay] = useState<number>(8);
  const [absenceType, setAbsenceType] = useState<AbsenceType>("work");
  const [notes, setNotes] = useState<string>("");
  const [workingHoursPerWeek, setWorkingHoursPerWeek] = useState<number>(40);
  const [yearlyHoursTarget, setYearlyHoursTarget] = useState<number>(1782); // Default for Spain
  
  return {
    // State values
    currentDate,
    yearData,
    selectedDate,
    hoursForDay,
    absenceType,
    notes,
    workingHoursPerWeek,
    yearlyHoursTarget,
    
    // State setters
    setCurrentDate,
    setYearData,
    setSelectedDate,
    setHoursForDay,
    setAbsenceType,
    setNotes,
    setWorkingHoursPerWeek,
    setYearlyHoursTarget
  };
};
