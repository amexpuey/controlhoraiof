
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Building, Users, Clock, CheckCircle2 } from "lucide-react";

interface Module1Props {
  onComplete: () => void;
}

export default function Module1({ onComplete }: Module1Props) {
  const [step, setStep] = useState(1);
  const [companySize, setCompanySize] = useState<"small" | "medium" | "large" | null>(null);
  
  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-blue-600 h-full transition-all duration-300 ease-in-out"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm text-gray-500">
        <span>Introducción</span>
        <span>Paso {step} de 4</span>
      </div>
      
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-800">¿Qué es el registro de jornada?</h3>
          
          <p>El registro de jornada es un sistema mediante el cual los empleadores controlan y documentan el tiempo de trabajo de sus empleados. Este registro incluye:</p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>Hora de inicio de la jornada laboral</li>
            <li>Hora de finalización</li>
            <li>Pausas y descansos</li>
            <li>Horas extraordinarias</li>
          </ul>
          
          <p className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <strong>Nota legal:</strong> En España, el registro horario es obligatorio para todas las empresas desde mayo de 2019, tras la aprobación del Real Decreto-ley 8/2019.
          </p>
          
          <div className="flex items-center p-3 bg-yellow-50 border border-yellow-100 rounded-md">
            <Clock className="text-yellow-600 mr-2 h-5 w-5 flex-shrink-0" />
            <p className="text-sm">Este registro debe conservarse durante un mínimo de 4 años y estar disponible para consulta por parte de trabajadores, representantes y la Inspección de Trabajo.</p>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-800">Objetivos del control horario</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="flex items-center text-lg font-semibold mb-2">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                Para los trabajadores
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Garantiza el pago justo de todas las horas trabajadas</li>
                <li>Evita jornadas excesivas</li>
                <li>Facilita la conciliación laboral</li>
                <li>Protege frente a abusos laborales</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg bg-white">
              <h4 className="flex items-center text-lg font-semibold mb-2">
                <Building className="mr-2 h-5 w-5 text-blue-600" />
                Para las empresas
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Cumplimiento normativo</li>
                <li>Control de costes laborales</li>
                <li>Mejora la productividad</li>
                <li>Optimiza la distribución de cargas de trabajo</li>
                <li>Evita sanciones (625€ a 6.250€)</li>
              </ul>
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
            <p className="text-sm">
              <strong>¿Sabías que...?</strong> Las multas por incumplir con el registro horario pueden llegar a 7.500€ en casos graves, e incluso hasta 225.000€ en infracciones muy graves reiteradas.
            </p>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-800">Mini-simulador: Control horario según tamaño de empresa</h3>
          
          <p>Las necesidades de control horario varían según el tamaño de la empresa y sus características particulares. Utiliza este simulador para recibir recomendaciones personalizadas.</p>
          
          <div className="bg-blue-50 p-5 rounded-lg">
            <h4 className="text-lg font-semibold mb-4">¿Cuál es el tamaño de tu empresa?</h4>
            
            <div className="grid md:grid-cols-3 gap-3">
              <button 
                className={`p-4 rounded-lg border transition-all ${
                  companySize === "small" 
                    ? "bg-blue-100 border-blue-300" 
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => setCompanySize("small")}
              >
                <h5 className="font-medium mb-1">Pequeña</h5>
                <p className="text-sm text-gray-600 mb-2">1-10 empleados</p>
                {companySize === "small" && (
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto" />
                )}
              </button>
              
              <button 
                className={`p-4 rounded-lg border transition-all ${
                  companySize === "medium" 
                    ? "bg-blue-100 border-blue-300" 
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => setCompanySize("medium")}
              >
                <h5 className="font-medium mb-1">Mediana</h5>
                <p className="text-sm text-gray-600 mb-2">11-50 empleados</p>
                {companySize === "medium" && (
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto" />
                )}
              </button>
              
              <button 
                className={`p-4 rounded-lg border transition-all ${
                  companySize === "large" 
                    ? "bg-blue-100 border-blue-300" 
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => setCompanySize("large")}
              >
                <h5 className="font-medium mb-1">Grande</h5>
                <p className="text-sm text-gray-600 mb-2">Más de 50 empleados</p>
                {companySize === "large" && (
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto" />
                )}
              </button>
            </div>
            
            {companySize && (
              <div className="mt-6 p-4 bg-white rounded-lg border">
                <h5 className="font-semibold mb-3">Recomendaciones para tu empresa</h5>
                
                {companySize === "small" && (
                  <>
                    <p className="mb-2"><strong>Método recomendado:</strong> Sistema digital simple o app móvil</p>
                    <p className="mb-2"><strong>Ventajas para ti:</strong> Bajo coste, fácil implementación, ideal para equipos pequeños</p>
                    <p className="mb-2"><strong>Características importantes:</strong> Interfaz sencilla, notificaciones de recordatorio, informes básicos</p>
                    <p className="mt-4 text-blue-600 font-medium">
                      Considera una solución como INWOUT que ofrece planes adaptados a pequeñas empresas con todas las funcionalidades necesarias para cumplir la normativa sin complicaciones.
                    </p>
                  </>
                )}
                
                {companySize === "medium" && (
                  <>
                    <p className="mb-2"><strong>Método recomendado:</strong> Software de gestión integral</p>
                    <p className="mb-2"><strong>Ventajas para ti:</strong> Mayor control de ausencias, integración con nóminas, reportes avanzados</p>
                    <p className="mb-2"><strong>Características importantes:</strong> Gestión de turnos, solicitud de ausencias, notificaciones automatizadas</p>
                  </>
                )}
                
                {companySize === "large" && (
                  <>
                    <p className="mb-2"><strong>Método recomendado:</strong> Plataforma empresarial con control de accesos</p>
                    <p className="mb-2"><strong>Ventajas para ti:</strong> Gestión centralizada, adaptable a diferentes departamentos, integración con RRHH</p>
                    <p className="mb-2"><strong>Características importantes:</strong> Múltiples métodos de fichaje, gestión de permisos multinivel, informes avanzados, API para integración</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-800">Elementos obligatorios del registro horario</h3>
          
          <p>Para cumplir con la normativa, el registro de jornada debe incluir como mínimo:</p>
          
          <div className="space-y-3">
            <div className="p-3 bg-white rounded border border-gray-200">
              <p className="font-medium">1. Hora de inicio y fin de jornada</p>
              <p className="text-sm text-gray-600">Es la información mínima obligatoria.</p>
            </div>
            
            <div className="p-3 bg-white rounded border border-gray-200">
              <p className="font-medium">2. Identificación del trabajador</p>
              <p className="text-sm text-gray-600">Cada registro debe estar asociado a un empleado específico.</p>
            </div>
            
            <div className="p-3 bg-white rounded border border-gray-200">
              <p className="font-medium">3. Firma o verificación</p>
              <p className="text-sm text-gray-600">Algún método que garantice la autenticidad y no manipulación de los datos.</p>
            </div>
            
            <div className="p-3 bg-white rounded border border-gray-200">
              <p className="font-medium">4. Accesibilidad</p>
              <p className="text-sm text-gray-600">Los registros deben ser accesibles para trabajadores, representantes y la inspección.</p>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
            <h4 className="text-lg font-semibold mb-2 text-green-800">¡Enhorabuena!</h4>
            <p>Has completado el módulo sobre los fundamentos del control horario. Ahora conoces los requisitos básicos que tu empresa debe cumplir para estar en regla con la normativa.</p>
          </div>
        </div>
      )}
      
      <div className="flex justify-between pt-4">
        <Button
          onClick={prevStep}
          variant="outline"
          disabled={step === 1}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Anterior
        </Button>
        
        <Button 
          onClick={nextStep}
          className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1"
        >
          {step === 4 ? 'Finalizar' : 'Siguiente'} 
          {step < 4 && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
