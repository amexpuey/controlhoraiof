
import { format, addMonths, subMonths } from "date-fns";
import { toast } from "sonner";
import { DayData, AbsenceType, YearData } from "../types";

export const useWorkCalendarActions = (
  currentDate: Date,
  setCurrentDate: (date: Date) => void,
  yearData: YearData,
  setYearData: (data: YearData) => void,
  selectedDate: Date | undefined,
  hoursForDay: number,
  absenceType: AbsenceType,
  notes: string,
  setSelectedDate: (date: Date | undefined) => void,
  setHoursForDay: (hours: number) => void,
  setAbsenceType: (type: AbsenceType) => void,
  setNotes: (notes: string) => void,
  setYearlyHoursTarget: (target: number) => void,
  workingHoursPerWeek: number
) => {
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
    if (!selectedDate) {
      toast.error("Por favor, selecciona una fecha primero");
      return;
    }
    
    const monthKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}`;
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
    toast.success(`Datos guardados para ${format(selectedDate, "d 'de' MMMM", { locale: require('date-fns/locale/es') })}`);
  };
  
  // Get the data for a specific day
  const getDayData = (date: Date): DayData | undefined => {
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const dayKey = format(date, "yyyy-MM-dd");
    
    return yearData[monthKey]?.[dayKey];
  };
  
  // Initialize calendar data from calculator
  const initializeCalendarFromCalculation = (calculatedHours: number, workdaysPerWeek: number, hoursPerDay: number) => {
    // Set yearly hours target
    setYearlyHoursTarget(calculatedHours);
    
    // Set appropriate weekly hours
    setWorkingHoursPerWeek(workdaysPerWeek * hoursPerDay);
    
    toast.success(`Calendario inicializado con ${calculatedHours} horas anuales objetivo`);
  };
  
  // Bulk set work days for current month
  const bulkSetWorkDays = () => {
    const { getDaysInMonth, isWeekend } = require('date-fns');
    const daysInMonth = getDaysInMonth(currentDate);
    const newYearData = { ...yearData };
    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;
    
    if (!newYearData[monthKey]) {
      newYearData[monthKey] = {};
    }
    
    const hoursPerDay = workingHoursPerWeek / 5;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayKey = format(date, "yyyy-MM-dd");
      
      // Skip if already has data
      if (newYearData[monthKey][dayKey]) continue;
      
      // Skip weekends
      if (isWeekend(date)) {
        newYearData[monthKey][dayKey] = {
          date,
          hours: 0,
          absenceType: "holiday",
          notes: "Fin de semana"
        };
        continue;
      }
      
      newYearData[monthKey][dayKey] = {
        date,
        hours: hoursPerDay,
        absenceType: "work",
        notes: ""
      };
    }
    
    setYearData(newYearData);
    toast.success(`Todos los días laborables del mes configurados automáticamente`);
  };
  
  // Download the data as a CSV file
  const downloadAsCSV = () => {
    // Verificar si hay datos para descargar
    const hasData = Object.values(yearData).some(monthData => Object.keys(monthData).length > 0);
    
    if (!hasData) {
      toast.error("No hay datos para descargar. Añade al menos un registro.");
      return;
    }
    
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
    link.setAttribute("download", `registro_horas_${currentDate.getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Registro de horas descargado correctamente");
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
      // Default values for new entries
      const { isWeekend } = require('date-fns');
      const hoursPerDay = workingHoursPerWeek / 5;
      setHoursForDay(isWeekend(date) ? 0 : hoursPerDay);
      setAbsenceType(isWeekend(date) ? "holiday" : "work");
      setNotes("");
    }
  };
  
  return {
    goToPreviousMonth,
    goToNextMonth,
    saveDayData,
    getDayData,
    handleDateSelect,
    downloadAsCSV,
    initializeCalendarFromCalculation,
    bulkSetWorkDays
  };
};
