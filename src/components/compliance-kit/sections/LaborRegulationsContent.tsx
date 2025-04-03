
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LaborRegulationsContent() {
  const navigate = useNavigate();
  
  const navigateToSection = (sectionId: string) => {
    navigate(`/kit-legal/${sectionId}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Normativa Laboral sobre Control Horario</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Real Decreto-ley 8/2019</h3>
          <p className="text-gray-700 mb-2">
            El 12 de marzo de 2019 se aprobó el Real Decreto-ley 8/2019, de medidas urgentes de protección social y de lucha contra la precariedad laboral en la jornada de trabajo, que incluye la obligación de todas las empresas de registrar diariamente la jornada de sus trabajadores.
          </p>
          <p className="text-gray-700">
            Esta normativa entró en vigor el 12 de mayo de 2019 y afecta a todas las empresas españolas independientemente de su tamaño o sector.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3">¿Qué obligaciones establece?</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Las empresas deben registrar diariamente el horario concreto de inicio y finalización de la jornada de cada trabajador.</li>
            <li>El registro debe incluir el horario concreto de inicio y finalización de la jornada de trabajo.</li>
            <li>Los registros deben conservarse durante cuatro años y estar a disposición de los trabajadores, sus representantes legales y la Inspección de Trabajo.</li>
            <li>La forma de registro debe establecerse mediante negociación colectiva o acuerdo de empresa.</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3">Sanciones por incumplimiento</h3>
          <p className="text-gray-700 mb-2">
            El incumplimiento de la obligación de registro horario está tipificado como infracción grave en la Ley sobre Infracciones y Sanciones en el Orden Social (LISOS).
          </p>
          <p className="text-gray-700 mb-2">
            Las sanciones por incumplimiento pueden oscilar entre 751€ y 7.500€, dependiendo de la gravedad y otras circunstancias.
          </p>
          <p className="text-gray-700">
            Además, la empresa podría enfrentarse a reclamaciones por horas extraordinarias no pagadas y sus correspondientes cotizaciones a la Seguridad Social.
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">Verificador de Cumplimiento</h3>
          <p className="text-gray-700 mb-3">
            ¿Quieres saber si tu empresa cumple con la normativa de control horario? Utiliza nuestro verificador interactivo.
          </p>
          <button 
            onClick={() => navigateToSection("verificador")}
            className="bg-[#0BC8C1] text-white px-4 py-2 rounded hover:bg-[#0AB1AB] transition-colors"
          >
            Verificar cumplimiento
          </button>
        </div>
      </div>
    </div>
  );
}
