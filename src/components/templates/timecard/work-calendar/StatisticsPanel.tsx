
import React from "react";

interface StatisticsPanelProps {
  monthlyHours: number;
  hoursDifference: number;
  yearlyHours: number;
}

export default function StatisticsPanel({ 
  monthlyHours, 
  hoursDifference, 
  yearlyHours 
}: StatisticsPanelProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="text-sm text-blue-600 mb-1">Este mes:</div>
        <div className="text-xl font-bold text-blue-800">{monthlyHours} horas</div>
        <div className={`text-sm ${hoursDifference > 0 ? 'text-green-600' : hoursDifference < 0 ? 'text-red-600' : 'text-blue-600'} mt-1`}>
          {hoursDifference > 0 ? `+${hoursDifference} horas extra` : 
           hoursDifference < 0 ? `${hoursDifference} horas pendientes` : 'Horas completas'}
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="text-sm text-blue-600 mb-1">Total anual:</div>
        <div className="text-xl font-bold text-blue-800">{yearlyHours} horas</div>
      </div>
    </div>
  );
}
