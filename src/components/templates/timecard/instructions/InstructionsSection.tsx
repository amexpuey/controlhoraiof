
import React from "react";

export default function InstructionsSection() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <h3 className="text-xl font-bold mb-4">Instrucciones de uso</h3>
      
      <div className="space-y-4">
        <InstructionItem 
          title="1. Información del empleado" 
          description="Completa los campos de cabecera con los datos del trabajador: nombre, email, teléfono y responsable."
        />
        
        <InstructionItem 
          title="2. Registro diario" 
          description="Introduce las horas trabajadas cada día, diferenciando entre horas ordinarias y extraordinarias."
        />
        
        <InstructionItem 
          title="3. Control semanal" 
          description="La plantilla calculará automáticamente los totales semanales y generará alertas visuales si se superan o no se alcanzan las horas estipuladas."
        />
        
        <InstructionItem 
          title="4. Resúmenes mensuales" 
          description="Al final de cada mes, la plantilla mostrará un resumen con las horas ordinarias, extraordinarias y totales trabajadas."
        />
        
        <InstructionItem 
          title="5. Calculadora de horas" 
          description="Utiliza la calculadora interactiva para estimar las horas trabajadas anuales, teniendo en cuenta días de vacaciones y festivos. Podrás determinar fácilmente el total de horas laborables."
        />
        
        <InstructionItem 
          title="6. Calendario interactivo" 
          description="El nuevo calendario interactivo te permite registrar y visualizar las horas trabajadas en un formato de calendario. Puedes indicar diferentes tipos de días (trabajo, vacaciones, enfermedad, etc.) y ver un resumen mensual y anual de tus horas. Perfecto para llevar un control visual de tu jornada laboral."
        />
      </div>
    </div>
  );
}

interface InstructionItemProps {
  title: string;
  description: string;
}

function InstructionItem({ title, description }: InstructionItemProps) {
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
