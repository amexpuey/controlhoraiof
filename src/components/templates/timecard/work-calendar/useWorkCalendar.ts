
import { useState, useEffect } from "react";
import { format, getDaysInMonth, getMonth, getYear, addMonths, subMonths, isWeekend } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { DayData, AbsenceType, YearData } from "./types";

export const useWorkCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [yearData, setYearData] = useState<YearData>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [hoursForDay, setHoursForDay] = useState<number>(8);
  const [absenceType, setAbsenceType] = useState<AbsenceType>("work");
  const [notes, setNotes] = useState<string>("");
  const [workingHoursPerWeek, setWorkingHoursPerWeek] = useState<number>(40);
  
  const currentMonth = getMonth(currentDate);
  const currentYear = getYear(currentDate);
  
  // Initialize the data for the current month if it doesn't exist
  useEffect(() => {
    const monthKey = `${currentYear}-${currentMonth + 1}`;
    
    if (!yearData[monthKey]) {
      const newYearData = { ...yearData };
      newYearData[monthKey] = {};
      setYearData(newYearData);
    }
  }, [currentDate, yearData]);
  
  // Navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  // Navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  // Save the data for the selected day
  const saveDayData = () => {
    if (!selectedDate) return;
    
    const monthKey = `${getYear(selectedDate)}-${getMonth(selectedDate) + 1}`;
    const dayKey = format(selectedDate, "yyyy-MM-dd");
    
    const newYearData = { ...yearData };
    if (!newYearData[monthKey]) {
      newYearData[monthKey] = {};
    }
    
    newYearData[monthKey][dayKey] = {
      date: selectedDate,
      hours: hoursForDay,
      absenceType: absenceType,
      notes: notes
    };
    
    setYearData(newYearData);
    toast.success(`Datos guardados para ${format(selectedDate, "d 'de' MMMM", { locale: es })}`);
  };
  
  // Get the data for a specific day
  const getDayData = (date: Date): DayData | undefined => {
    const monthKey = `${getYear(date)}-${getMonth(date) + 1}`;
    const dayKey = format(date, "yyyy-MM-dd");
    
    return yearData[monthKey]?.[dayKey];
  };
  
  // Prepare the data for a day when it's selected
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    const dayData = getDayData(date);
    if (dayData) {
      setHoursForDay(dayData.hours);
      setAbsenceType(dayData.absenceType);
      setNotes(dayData.notes);
    } else {
      setHoursForDay(isWeekend(date) ? 0 : 8);
      setAbsenceType(isWeekend(date) ? "holiday" : "work");
      setNotes("");
    }
  };
  
  // Calculate the total hours for the month
  const calculateMonthlyHours = (): number => {
    const monthKey = `${currentYear}-${currentMonth + 1}`;
    const monthData = yearData[monthKey];
    
    if (!monthData) return 0;
    
    return Object.values(monthData).reduce((total, day) => {
      return total + (day.absenceType === "unpaid" ? 0 : day.hours);
    }, 0);
  };
  
  // Calculate the total hours for the year to date
  const calculateYearlyHours = (): number => {
    return Object.values(yearData).reduce((total, monthData) => {
      return total + Object.values(monthData).reduce((monthTotal, day) => {
        return monthTotal + (day.absenceType === "unpaid" ? 0 : day.hours);
      }, 0);
    }, 0);
  };
  
  // Assign a CSS class to a day based on its type
  const dayClassName = (date: Date): string => {
    const dayData = getDayData(date);
    if (!dayData) return isWeekend(date) ? "bg-gray-50" : "";
    
    return absenceTypeColors[dayData.absenceType];
  };
  
  // Download the data as a CSV file
  const downloadAsCSV = () => {
    let csvContent = "Fecha,Horas,Tipo,Notas\n";
    
    Object.values(yearData).forEach(monthData => {
      Object.values(monthData).forEach(day => {
        csvContent += `${format(day.date, "yyyy-MM-dd")},${day.hours},${day.absenceType},"${day.notes}"\n`;
      });
    });
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `registro_horas_${currentYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Registro de horas descargado correctamente");
  };
  
  // Calculate the target hours for the month (based on a 37.5 or 40 hour work week)
  const calculateTargetHours = (): number => {
    const daysInMonth = getDaysInMonth(currentDate);
    let workDays = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      if (!isWeekend(date)) {
        workDays++;
      }
    }
    
    // Hours per day based on weekly hours
    const hoursPerDay = workingHoursPerWeek / 5;
    return Math.round(workDays * hoursPerDay);
  };

  const monthlyHours = calculateMonthlyHours();
  const targetHours = calculateTargetHours();
  const hoursDifference = monthlyHours - targetHours;

  return {
    currentDate,
    currentMonth,
    currentYear,
    selectedDate,
    hoursForDay,
    absenceType,
    notes,
    workingHoursPerWeek,
    yearData,
    monthlyHours,
    targetHours,
    hoursDifference,
    setHoursForDay,
    setAbsenceType,
    setNotes,
    setWorkingHoursPerWeek,
    goToPreviousMonth,
    goToNextMonth,
    saveDayData,
    getDayData,
    handleDateSelect,
    calculateYearlyHours,
    dayClassName,
    downloadAsCSV
  };
};
