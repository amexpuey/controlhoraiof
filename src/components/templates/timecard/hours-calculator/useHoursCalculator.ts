
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Holiday, HoursCalculatorFormValues } from "./types";
import { toast } from "sonner";

export function useHoursCalculator() {
  const [extraHolidays, setExtraHolidays] = useState<Holiday[]>([]);
  const [nextHolidayId, setNextHolidayId] = useState(1);
  const [totalWorkHours, setTotalWorkHours] = useState<number | null>(null);
  const [holidayName, setHolidayName] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);

  const form = useForm<HoursCalculatorFormValues>({
    defaultValues: {
      regularHours: 1782, // Valor por defecto para España
      vacationDays: 22,    // Valor estándar en España
      vacationType: "business",
      extraHolidays: 0,
      workdaysPerWeek: 5,
      hoursPerDay: 8
    }
  });

  const addHoliday = () => {
    if (holidayName.trim()) {
      const updatedHolidays = [...extraHolidays, { id: nextHolidayId, name: holidayName }];
      setExtraHolidays(updatedHolidays);
      setNextHolidayId(nextHolidayId + 1);
      setHolidayName("");
      
      // Actualizar el formulario con el número actualizado de festivos extras
      form.setValue("extraHolidays", updatedHolidays.length);
      
      // Si ya se había calculado, recalcular con el nuevo festivo
      if (isCalculated) {
        calculateTotalHours();
      }
    }
  };

  const removeHoliday = (id: number) => {
    const updatedHolidays = extraHolidays.filter(holiday => holiday.id !== id);
    setExtraHolidays(updatedHolidays);
    
    // Actualizar el formulario con el número actualizado de festivos extras
    form.setValue("extraHolidays", updatedHolidays.length);
    
    // Si ya se había calculado, recalcular con los festivos actualizados
    if (isCalculated) {
      calculateTotalHours();
    }
  };

  const calculateTotalHours = () => {
    const data = form.getValues();
    
    let totalWorkingDays = 0;
    
    // Días laborables según los días de trabajo por semana
    const workdaysPerYear = data.workdaysPerWeek * 52;
    
    // Restar vacaciones según el tipo
    if (data.vacationType === "business") {
      // Si son días laborables, se restan directamente
      totalWorkingDays = workdaysPerYear - data.vacationDays;
    } else {
      // Si son días naturales, calcular cuántos días laborables equivalen
      const businessDayRatio = data.workdaysPerWeek / 7;
      totalWorkingDays = workdaysPerYear - (data.vacationDays * businessDayRatio);
    }
    
    // Restar días festivos extras (asumiendo que todos caen en días laborables)
    totalWorkingDays -= extraHolidays.length;
    
    // Calcular horas totales
    const calculatedTotalHours = totalWorkingDays * data.hoursPerDay;
    
    setTotalWorkHours(Math.round(calculatedTotalHours));
    setIsCalculated(true);
    toast.success("Cálculo realizado correctamente");
  };

  return {
    form,
    extraHolidays,
    holidayName,
    setHolidayName,
    addHoliday,
    removeHoliday,
    totalWorkHours,
    calculateTotalHours,
    isCalculated
  };
}
