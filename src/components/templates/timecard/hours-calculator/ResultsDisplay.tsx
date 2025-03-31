
import React from "react";
import { HoursCalculatorFormValues } from "./types";
import { UseFormWatch } from "react-hook-form";

interface ResultsDisplayProps {
  totalWorkHours: number | null;
  watch: UseFormWatch<HoursCalculatorFormValues>;
  extraHolidaysCount: number;
}

export function ResultsDisplay({ 
  totalWorkHours, 
  watch, 
  extraHolidaysCount 
}: ResultsDisplayProps) {
  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
      <h3 className="text-lg font-bold text-blue-800 mb-3">Resultado del cálculo:</h3>
      
      {totalWorkHours !== null ? (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-blue-700">Total horas laborables estimadas:</span>
            <span className="text-2xl font-bold text-blue-900">{totalWorkHours} horas</span>
          </div>
          
          <div className="text-sm text-gray-600 mt-4 pt-4 border-t border-blue-100">
            <p>Este cálculo considera:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>{watch("workdaysPerWeek")} días laborables por semana</li>
              <li>{watch("vacationDays")} días de vacaciones ({watch("vacationType") === "business" ? "hábiles" : "naturales"})</li>
              <li>{extraHolidaysCount} festivos extras añadidos manualmente</li>
              <li>{watch("hoursPerDay")} horas por día laboral</li>
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">Introduce los datos para calcular las horas totales.</p>
      )}
    </div>
  );
}
