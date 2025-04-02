
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Play, Info, Check, ArrowLeft } from "lucide-react";

interface ModuleContentProps {
  title: string;
  description: string;
  icon: React.ElementType;
  duration: string;
  videoUrl?: string;
  ModuleComponent: React.ComponentType<any>;
  onCompleteModule: () => void;
  isLastModule: boolean;
}

export default function ModuleContent({
  title,
  description,
  icon: Icon,
  duration,
  videoUrl,
  ModuleComponent,
  onCompleteModule,
  isLastModule
}: ModuleContentProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 4; // Set the total number of pages for the progress bar
  
  const stepTips = [
    {
      title: "Bienvenido al módulo",
      content: "En este tutorial aprenderás todo lo necesario sobre este tema. Navega por los pasos para completar el aprendizaje."
    },
    {
      title: "Explora el contenido",
      content: "Lee el material y visualiza el video explicativo para entender mejor los conceptos."
    },
    {
      title: "Completa las actividades",
      content: "Realiza los ejercicios prácticos para asegurar la comprensión del tema."
    }
  ];
  
  const nextTip = () => {
    if (currentStep < stepTips.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTips(false);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onCompleteModule();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-[#2a3040] rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#2a3040] p-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#0BC8C1]/10 p-3 rounded-full">
            <Icon className="h-8 w-8 text-[#0BC8C1]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-gray-300">{description}</p>
            <div className="flex items-center mt-2 text-sm text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Duración: {duration}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="bg-white p-6">
        <div className="flex justify-between mb-4">
          {!showVideo && videoUrl && (
            <Button 
              className="flex items-center gap-2 bg-[#0BC8C1] hover:bg-[#0AB1AB] text-white"
              onClick={() => setShowVideo(true)}
            >
              <Play className="h-4 w-4" />
              Ver video explicativo
            </Button>
          )}
          
          <Button
            variant="outline"
            className="flex items-center gap-2 ml-auto"
            onClick={() => setShowTips(true)}
          >
            <Info className="h-4 w-4" />
            Mostrar guía interactiva
          </Button>
        </div>
        
        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#0BC8C1]" 
              style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Introducción</span>
            <span>Paso {currentPage + 1} de {totalPages}</span>
          </div>
        </div>
        
        {showVideo && videoUrl ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Video explicativo</h2>
            <div className="relative pb-[56.25%] h-0">
              <iframe 
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={videoUrl} 
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : null}
        
        {/* Module content - This would be different for each module */}
        <div className="module-content">
          {currentPage === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Qué es el registro de jornada?</h2>
              <p className="text-gray-700 mb-4">
                El registro de jornada es un sistema mediante el cual los empleadores controlan y documentan el tiempo de trabajo de sus empleados. Este registro incluye:
              </p>
              <ul className="list-disc pl-8 space-y-2 mb-6 text-gray-700">
                <li>Hora de inicio de la jornada laboral</li>
                <li>Hora de finalización</li>
                <li>Pausas y descansos</li>
                <li>Horas extraordinarias</li>
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Nota legal:</h3>
                <p className="text-gray-700">
                  En España, el registro horario es obligatorio para todas las empresas desde mayo de 2019, tras la aprobación del Real Decreto-ley 8/2019.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <div className="flex items-start gap-3">
                  <div className="text-yellow-600 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <p className="text-gray-700">
                    Este registro debe conservarse durante un mínimo de 4 años y estar disponible para consulta por parte de trabajadores, representantes y la Inspección de Trabajo.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {currentPage === 1 && <ModuleComponent standalone={true} />}
          
          {currentPage === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Beneficios del registro horario</h2>
              <p className="text-gray-700 mb-4">
                Implementar un sistema de registro horario ofrece múltiples ventajas tanto para empleadores como para trabajadores:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-semibold text-gray-800 mb-2">Para la empresa</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Control efectivo de la productividad</li>
                    <li>Gestión eficiente de los recursos humanos</li>
                    <li>Cumplimiento legal y evitación de sanciones</li>
                    <li>Cálculo preciso de nóminas</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-gray-800 mb-2">Para el trabajador</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Protección de sus derechos laborales</li>
                    <li>Remuneración justa de todas las horas trabajadas</li>
                    <li>Mejor conciliación de la vida laboral y personal</li>
                    <li>Transparencia en la relación laboral</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {currentPage === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Métodos de registro horario</h2>
              <p className="text-gray-700 mb-4">
                Existen diferentes métodos para implementar el registro horario. Cada empresa puede elegir el que mejor se adapte a sus necesidades:
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">Sistema de fichaje digital</h3>
                  <p className="text-gray-700">
                    Aplicaciones y plataformas online como INWOUT que permiten registrar las horas de trabajo desde cualquier dispositivo.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">Sistemas biométricos</h3>
                  <p className="text-gray-700">
                    Basados en el reconocimiento de huellas dactilares, reconocimiento facial o del iris.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">Tarjetas de proximidad</h3>
                  <p className="text-gray-700">
                    Tarjetas con chip que se aproximan a un lector para registrar entrada y salida.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">Registro manual</h3>
                  <p className="text-gray-700">
                    Hojas de firmas o formularios en papel (menos recomendable por su falta de seguridad y dificultad de gestión).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Interactive Tips Modal */}
        {showTips && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
              <div className="bg-[#0BC8C1] text-white p-4 rounded-t-lg">
                <h3 className="text-lg font-medium">{stepTips[currentStep].title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-6">{stepTips[currentStep].content}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    {stepTips.map((_, index) => (
                      <div 
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentStep ? "bg-[#0BC8C1]" : "bg-gray-300"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => setShowTips(false)}
                    >
                      Cerrar
                    </Button>
                    <Button 
                      className="bg-[#0BC8C1] hover:bg-[#0AB1AB] text-white"
                      onClick={nextTip}
                    >
                      {currentStep < stepTips.length - 1 ? "Siguiente" : "Finalizar"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer / Navigation */}
      <div className="bg-white p-6 border-t border-gray-200">
        <div className="flex justify-between">
          {currentPage > 0 ? (
            <Button 
              variant="outline" 
              onClick={prevPage}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/kit-legal'}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4 mr-2" />
              Volver al Kit Legal
            </Button>
          )}
          
          {currentPage < totalPages - 1 ? (
            <Button 
              className="bg-[#0BC8C1] hover:bg-[#0AB1AB] text-white flex items-center gap-2" 
              onClick={nextPage}
            >
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              className="bg-[#0BC8C1] hover:bg-[#0AB1AB] text-white flex items-center gap-2" 
              onClick={onCompleteModule}
            >
              {isLastModule ? (
                <>
                  Finalizar y volver al Kit
                  <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  Siguiente módulo
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
