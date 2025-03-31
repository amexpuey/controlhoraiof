
import { useEffect, useCallback } from "react";
import { useWorkCalendarState } from "./useWorkCalendarState";
import { useWorkCalendarActions } from "./useWorkCalendarActions";
import { useWorkCalendarCalculations } from "./useWorkCalendarCalculations";

export const useWorkCalendar = () => {
  // Combine all the hooks
  const state = useWorkCalendarState();
  
  const actions = useWorkCalendarActions(
    state.currentDate,
    state.setCurrentDate,
    state.yearData,
    state.setYearData,
    state.selectedDate,
    state.hoursForDay,
    state.absenceType,
    state.notes,
    state.setSelectedDate,
    state.setHoursForDay,
    state.setAbsenceType,
    state.setNotes,
    state.setYearlyHoursTarget,
    state.workingHoursPerWeek,
    state.setWorkingHoursPerWeek
  );
  
  const calculations = useWorkCalendarCalculations(
    state.currentDate,
    state.yearData,
    state.workingHoursPerWeek
  );
  
  // Initialize the data for the current month if it doesn't exist
  useEffect(() => {
    const monthKey = `${calculations.currentYear}-${calculations.currentMonth + 1}`;
    
    if (!state.yearData[monthKey]) {
      const newYearData = { ...state.yearData };
      newYearData[monthKey] = {};
      state.setYearData(newYearData);
    }
  }, [state.currentDate, state.yearData, calculations.currentYear, calculations.currentMonth]);
  
  // Memoize the downloadAsCSV function to prevent unnecessary rerenders
  const memoizedDownloadAsCSV = useCallback(actions.downloadAsCSV, [actions.downloadAsCSV]);
  
  // Memoize the bulkSetWorkDays function to prevent unnecessary rerenders
  const memoizedBulkSetWorkDays = useCallback(actions.bulkSetWorkDays, [actions.bulkSetWorkDays]);
  
  // Memoize the initializeCalendarFromCalculation function to prevent unnecessary rerenders
  const memoizedInitializeCalendarFromCalculation = useCallback(
    actions.initializeCalendarFromCalculation,
    [actions.initializeCalendarFromCalculation]
  );
  
  return {
    // State
    currentDate: state.currentDate,
    selectedDate: state.selectedDate,
    hoursForDay: state.hoursForDay,
    absenceType: state.absenceType,
    notes: state.notes,
    workingHoursPerWeek: state.workingHoursPerWeek,
    yearData: state.yearData,
    yearlyHoursTarget: state.yearlyHoursTarget,
    
    // Setters
    setHoursForDay: state.setHoursForDay,
    setAbsenceType: state.setAbsenceType,
    setNotes: state.setNotes,
    setWorkingHoursPerWeek: state.setWorkingHoursPerWeek,
    
    // Calculations
    currentMonth: calculations.currentMonth,
    currentYear: calculations.currentYear,
    monthlyHours: calculations.monthlyHours,
    targetHours: calculations.targetHours,
    hoursDifference: calculations.hoursDifference,
    
    // Actions
    goToPreviousMonth: actions.goToPreviousMonth,
    goToNextMonth: actions.goToNextMonth,
    saveDayData: actions.saveDayData,
    getDayData: actions.getDayData,
    handleDateSelect: actions.handleDateSelect,
    calculateYearlyHours: calculations.calculateYearlyHours,
    dayClassName: calculations.dayClassName,
    downloadAsCSV: memoizedDownloadAsCSV,
    initializeCalendarFromCalculation: memoizedInitializeCalendarFromCalculation,
    bulkSetWorkDays: memoizedBulkSetWorkDays
  };
};
