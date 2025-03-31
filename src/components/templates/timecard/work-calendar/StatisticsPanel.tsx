
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
  // Calculate daily average
  const workdaysPerMonth = 22; // Aproximación
  const dailyAverage = monthlyHours > 0 ? (monthlyHours / workdaysPerMonth).toFixed(1) : "0";
  
  // Calculate percentage of completion
  const targetHours = monthlyHours - hoursDifference;
  const completionPercentage = targetHours > 0 
    ? Math.min(100, Math.round((monthlyHours / targetHours) * 100)) 
    : 0;

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-blue-800">Resumen de horas</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-sm text-blue-600 mb-1">Este mes:</div>
          <div className="text-xl font-bold text-blue-800">{monthlyHours} horas</div>
          <div className={`text-sm ${hoursDifference > 0 ? 'text-green-600' : hoursDifference < 0 ? 'text-red-600' : 'text-blue-600'} mt-1`}>
            {hoursDifference > 0 ? `+${hoursDifference} horas extra` : 
             hoursDifference < 0 ? `${hoursDifference} horas pendientes` : 'Horas completas'}
          </div>
          
          <div className="mt-3 bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${hoursDifference >= 0 ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="text-xs text-right mt-1 text-gray-500">{completionPercentage}% completado</div>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-sm text-blue-600 mb-1">Total anual:</div>
          <div className="text-xl font-bold text-blue-800">{yearlyHours} horas</div>
          <div className="text-sm text-blue-600 mt-1">
            Media diaria: {dailyAverage} h/día
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Proyección anual: {Math.round(monthlyHours * 12 / (currentMonth() + 1))} horas
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-green-50 rounded-lg border border-green-100">
        <div className="flex justify-between items-center">
          <div className="text-sm text-green-600">Productividad</div>
          <div className="text-sm font-medium text-green-800">
            {hoursDifference >= 0 ? '✓ Al día' : '⚠️ Pendiente'}
          </div>
        </div>
        <div className="text-xs text-gray-600 mt-2">
          Basado en {targetHours} horas objetivo mensual
        </div>
      </div>
    </div>
  );
  
  function currentMonth() {
    return new Date().getMonth();
  }
}
