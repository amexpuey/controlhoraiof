
import { getDaysInMonth, isWeekend, getMonth, getYear, format } from "date-fns";
import { YearData, absenceTypeColors } from "../types";

export const useWorkCalendarCalculations = (
  currentDate: Date,
  yearData: YearData,
  workingHoursPerWeek: number
) => {
  const currentMonth = getMonth(currentDate);
  const currentYear = getYear(currentDate);
  
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
  
  // Calculate the target hours for the month (based on working hours per week)
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
  
  // Assign a CSS class to a day based on its type
  const dayClassName = (date: Date): string => {
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const dayKey = format(date, "yyyy-MM-dd");
    const dayData = yearData[monthKey]?.[dayKey];
    
    if (!dayData) return isWeekend(date) ? "bg-gray-50" : "";
    
    return absenceTypeColors[dayData.absenceType];
  };
  
  // Calculate derived values
  const monthlyHours = calculateMonthlyHours();
  const targetHours = calculateTargetHours();
  const hoursDifference = monthlyHours - targetHours;
  
  return {
    currentMonth,
    currentYear,
    monthlyHours,
    targetHours,
    hoursDifference,
    calculateYearlyHours,
    dayClassName
  };
};
