
import { EstimatedSanctions, CalculatorFormValues } from "./SanctionForm";
import { getRiskColor } from "../complianceData";

interface SanctionResultsProps {
  estimatedSanctions: EstimatedSanctions;
  formValues: CalculatorFormValues;
}

export function SanctionResults({ estimatedSanctions, formValues }: SanctionResultsProps) {
  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
      <h4 className="font-medium text-blue-800 mb-3">Estimación de sanciones:</h4>
      <p className="text-lg font-bold text-blue-900 mb-3">
        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(estimatedSanctions.minEstimate)} - {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(estimatedSanctions.maxEstimate)}
      </p>
      <p className="text-sm text-blue-700 mb-4">
        Para {formValues.employees} {formValues.employees === 1 ? 'empleado' : 'empleados'} con {formValues.duration} {formValues.duration === 1 ? 'mes' : 'meses'} de incumplimiento.
        {estimatedSanctions.reincidenceApplied && " Se ha aplicado un agravante por reincidencia."}
      </p>
      
      <div className="space-y-2">
        <p className="text-xs text-blue-800 font-medium">Infracciones incluidas:</p>
        <ul className="list-disc pl-5 space-y-1">
          {estimatedSanctions.selectedInfractions.map((infraction, index) => (
            <li key={index} className="text-xs">
              <span className={`font-medium ${getRiskColor(infraction.level)}`}>{infraction.label}</span>
              <span className="text-gray-600"> - Sanción base: {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(infraction.baseAmount)} - {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(infraction.maxAmount)}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4 pt-3 border-t border-blue-100">
        <p className="text-xs text-gray-500 italic">
          Nota: Esta es una estimación basada en los parámetros ingresados. La cuantía final de la sanción puede variar según criterios específicos de la Inspección de Trabajo y Seguridad Social.
        </p>
      </div>
    </div>
  );
}
