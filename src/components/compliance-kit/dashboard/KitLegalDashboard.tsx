
import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ComplianceKitBenefits from "@/components/compliance-kit/ComplianceKitBenefits";

interface KitLegalDashboardProps {
  learningProgress: number;
  navigateToModule: (moduleId: string) => void;
}

export default function KitLegalDashboard({ 
  learningProgress, 
  navigateToModule 
}: KitLegalDashboardProps) {
  const navigate = useNavigate();

  // Define quick action steps with status
  const onboardingSteps = [
    { id: 1, title: "Define los horarios de tus empleados", completed: false, url: "https://app.inwout.com/settings/schedules" },
    { id: 2, title: "Da la bienvenida a tu equipo", completed: false, url: "https://app.inwout.com/settings/team" },
    { id: 3, title: "Haz que la comunicación fluya", completed: false, url: "https://app.inwout.com/channels" },
    { id: 4, title: "Prueba a automatizar el registro horario con Geofence", completed: false, url: "https://app.inwout.com/settings/locations" }
  ];

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Bienvenido a tu Kit Interactivo de Cumplimiento Legal
        </h1>
        <p className="text-xl text-gray-600">
          Fichajes simples, rápidos y adaptados a tu empresa
        </p>
        <p className="mt-2 text-gray-600">
          Deja de perseguir a tu equipo para que fiche. Con INWOUT, todo queda registrado automáticamente, sin estrés y sin perder tiempo.
        </p>
      </div>
      
      {/* Quick Action Cards - Next Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Próximos pasos para configurar INWOUT
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {onboardingSteps.map((step) => (
            <a 
              key={step.id}
              href={step.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
                step.completed ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
              }`}>
                {step.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="text-sm text-gray-500">
                  {step.completed ? "Completado" : "Pendiente"}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
      
      {/* Learning Progress Tracker Cards */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-blue-800">Progreso de aprendizaje</h3>
          <span className="text-sm font-medium text-blue-600">{learningProgress}% completado</span>
        </div>
        <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#0BC8C1]" 
            style={{ width: `${learningProgress}%` }}
          ></div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => navigateToModule("que-es-control-horario")}
            className="bg-white p-4 rounded border border-blue-200 cursor-pointer hover:shadow-md transition-all"
          >
            <h4 className="font-medium text-blue-800 mb-1">Módulo 1</h4>
            <p className="text-sm text-gray-600">¿Qué es el control horario?</p>
            {learningProgress >= 33 && (
              <div className="mt-2 text-xs text-green-600 font-medium">✓ Completado</div>
            )}
          </div>
          <div 
            onClick={() => navigateToModule("es-obligatorio")}
            className="bg-white p-4 rounded border border-blue-200 cursor-pointer hover:shadow-md transition-all"
          >
            <h4 className="font-medium text-blue-800 mb-1">Módulo 2</h4>
            <p className="text-sm text-gray-600">¿Es obligatorio para tu empresa?</p>
            {learningProgress >= 66 && (
              <div className="mt-2 text-xs text-green-600 font-medium">✓ Completado</div>
            )}
          </div>
          <div 
            onClick={() => navigateToModule("como-implementar")}
            className="bg-white p-4 rounded border border-blue-200 cursor-pointer hover:shadow-md transition-all"
          >
            <h4 className="font-medium text-blue-800 mb-1">Módulo 3</h4>
            <p className="text-sm text-gray-600">¿Cómo implementar un sistema de fichajes?</p>
            {learningProgress >= 100 && (
              <div className="mt-2 text-xs text-green-600 font-medium">✓ Completado</div>
            )}
          </div>
        </div>
      </div>
      
      <ComplianceKitBenefits />
    </>
  );
}
