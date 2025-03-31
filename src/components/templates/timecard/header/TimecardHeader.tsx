
import React from "react";

export default function TimecardHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4">Registro de horas trabajadas - Timecard para empleados</h1>
      <p className="text-gray-600 mb-6">
        Esta plantilla permite a los empleados y managers llevar un registro detallado de las horas trabajadas, 
        facilitando el control de la jornada laboral y el cumplimiento de la normativa de registro horario.
      </p>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">Características principales:</h3>
        <ul className="list-disc pl-5 space-y-1 text-blue-700">
          <li>Campos personalizables para información del empleado</li>
          <li>Control por semanas, meses y trimestres</li>
          <li>Diferenciación entre horas ordinarias y extraordinarias</li>
          <li>Cálculos automáticos de totales diarios, semanales y mensuales</li>
          <li>Indicadores visuales de desviaciones respecto a la jornada estándar</li>
          <li>Tablas de resumen para evaluación rápida</li>
          <li>Calculadora interactiva de horas totales con gestión de vacaciones y festivos</li>
          <li>Calendario interactivo para visualización y gestión de jornada laboral</li>
        </ul>
      </div>
    </div>
  );
}
