
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ArrowLeft, Check, Video, FileText, ListChecks, Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Module1Props {
  onComplete: () => void;
}

export default function Module1({ onComplete }: Module1Props) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [quizResult, setQuizResult] = useState<number | null>(null);
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleQuizSubmit = () => {
    // Calculate quiz result
    let correctAnswers = 0;
    if (answers.q1 === "2019") correctAnswers++;
    if (answers.q2 === "true") correctAnswers++;
    if (answers.q3 === "all") correctAnswers++;
    
    setQuizResult((correctAnswers / 3) * 100);
  };

  return (
    <div className="py-2">
      <div className="mb-6">
        <Progress value={progress} className="h-2 mb-2" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Introducción</span>
          <span>Paso {step} de {totalSteps}</span>
        </div>
      </div>
      
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-blue-800">¿Qué es el control horario?</h2>
          
          <p className="text-gray-700">
            El control horario es un sistema obligatorio en España que permite registrar la jornada laboral de los 
            empleados, incluyendo el horario de inicio y fin de cada día de trabajo. Esta medida, establecida por 
            el Real Decreto-ley 8/2019, busca garantizar el cumplimiento de los horarios laborales y evitar los 
            excesos de jornada no remunerados.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-5">
                <h3 className="text-lg font-medium text-blue-800 mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Principales obligaciones
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Registrar diariamente la jornada laboral de cada empleado</li>
                  <li>Incluir el horario concreto de inicio y finalización</li>
                  <li>Conservar los registros durante 4 años</li>
                  <li>Tener el registro a disposición de empleados y autoridades</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-5">
                <h3 className="text-lg font-medium text-green-800 mb-2 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  Beneficios del control horario
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Garantiza el pago correcto de las horas trabajadas</li>
                  <li>Mejora la conciliación laboral y familiar</li>
                  <li>Reduce conflictos sobre las horas trabajadas</li>
                  <li>Ayuda a la empresa a optimizar recursos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="border-l-4 border-yellow-400 pl-4 bg-yellow-50 p-3 rounded-r-md">
            <p className="text-sm text-yellow-800">
              <strong>Importante:</strong> El incumplimiento de la normativa puede conllevar sanciones económicas 
              que van desde los 60€ hasta más de 6.000€ por trabajador.
            </p>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-blue-800">Métodos de control horario</h2>
          
          <p className="text-gray-700 mb-4">
            Existen diferentes métodos para cumplir con la obligación de registro horario. 
            Cada empresa puede elegir el sistema que mejor se adapte a sus necesidades.
          </p>
          
          <Tabs defaultValue="digital">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="digital">Digital</TabsTrigger>
              <TabsTrigger value="biometrico">Biométrico</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
              <TabsTrigger value="hibrido">Híbrido</TabsTrigger>
            </TabsList>
            
            <TabsContent value="digital" className="border rounded-md p-4 min-h-[200px] bg-white">
              <h3 className="font-medium text-blue-800 mb-2">Sistemas digitales</h3>
              <p className="text-sm text-gray-700 mb-3">
                Aplicaciones y software que permiten registrar la jornada desde dispositivos móviles o computadoras.
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium text-blue-700">Ventajas</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1 text-gray-700">
                    <li>Accesible desde cualquier lugar</li>
                    <li>Facilita el teletrabajo</li>
                    <li>Automatiza informes</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-3 rounded-md">
                  <h4 className="font-medium text-red-700">Desventajas</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1 text-gray-700">
                    <li>Requiere dispositivos</li>
                    <li>Posibles problemas técnicos</li>
                    <li>Puede necesitar una adopción gradual</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="biometrico" className="border rounded-md p-4 min-h-[200px] bg-white">
              <h3 className="font-medium text-blue-800 mb-2">Sistemas biométricos</h3>
              <p className="text-sm text-gray-700 mb-3">
                Utilizan datos biométricos como huella digital o reconocimiento facial para registrar entradas y salidas.
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium text-blue-700">Ventajas</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1 text-gray-700">
                    <li>Alta precisión</li>
                    <li>Difícil de falsificar</li>
                    <li>Mayor seguridad</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-3 rounded-md">
                  <h4 className="font-medium text-red-700">Desventajas</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1 text-gray-700">
                    <li>Mayor coste inicial</li>
                    <li>Consideraciones de protección de datos</li>
                    <li>Requiere presencia física</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="manual" className="border rounded-md p-4 min-h-[200px] bg-white">
              <h3 className="font-medium text-blue-800 mb-2">Sistemas manuales</h3>
              <p className="text-sm text-gray-700 mb-3">
                Registros en papel o sistemas básicos como hojas de cálculo donde los empleados anotan sus horas.
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium text-blue-700">Ventajas</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1 text-gray-700">
                    <li>Bajo coste</li>
                    <li>Fácil implementación</li>
                    <li>No requiere formación tecnológica</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-3 rounded-md">
                  <h4 className="font-medium text-red-700">Desventajas</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1 text-gray-700">
                    <li>Mayor riesgo de error</li>
                    <li>Difícil análisis de datos</li>
                    <li>Conservación física por 4 años</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="hibrido" className="border rounded-md p-4 min-h-[200px] bg-white">
              <h3 className="font-medium text-blue-800 mb-2">Sistemas híbridos</h3>
              <p className="text-sm text-gray-700 mb-3">
                Combinación de varios métodos según las necesidades de diferentes departamentos o situaciones.
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium text-blue-700">Ventajas</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1 text-gray-700">
                    <li>Flexibilidad adaptada</li>
                    <li>Ideal para empresas con teletrabajo parcial</li>
                    <li>Puede implementarse gradualmente</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-3 rounded-md">
                  <h4 className="font-medium text-red-700">Desventajas</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1 text-gray-700">
                    <li>Mayor complejidad de gestión</li>
                    <li>Posible inconsistencia de datos</li>
                    <li>Requiere buena coordinación</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="border p-4 rounded-md bg-gray-50 mt-6">
            <h3 className="font-medium text-gray-800 mb-2 flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-600" />
              Caso práctico: Mejora de productividad
            </h3>
            <p className="text-sm text-gray-700">
              Una empresa de 25 empleados implementó un sistema digital de control horario y consiguió reducir 
              un 15% los descuadres en horas extra, optimizando el uso de recursos y mejorando la organización 
              de turnos.
            </p>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-blue-800">Mini-simulador: Control horario según tamaño de empresa</h2>
          
          <p className="text-gray-700 mb-6">
            Las necesidades de control horario varían según el tamaño de la empresa y sus características particulares. 
            Utiliza este simulador para recibir recomendaciones personalizadas.
          </p>
          
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-4">¿Cuál es el tamaño de tu empresa?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card 
                className={cn(
                  "cursor-pointer transition-all hover:border-blue-400",
                  answers.companySize === "small" ? "border-blue-500 bg-blue-100" : "border-gray-200 bg-white"
                )}
                onClick={() => setAnswers({...answers, companySize: "small"})}
              >
                <CardContent className="p-4 text-center">
                  <h4 className="font-medium mb-2">Pequeña</h4>
                  <p className="text-sm text-gray-600 mb-2">1-10 empleados</p>
                  {answers.companySize === "small" && (
                    <Check className="h-5 w-5 mx-auto text-blue-600" />
                  )}
                </CardContent>
              </Card>
              
              <Card 
                className={cn(
                  "cursor-pointer transition-all hover:border-blue-400",
                  answers.companySize === "medium" ? "border-blue-500 bg-blue-100" : "border-gray-200 bg-white"
                )}
                onClick={() => setAnswers({...answers, companySize: "medium"})}
              >
                <CardContent className="p-4 text-center">
                  <h4 className="font-medium mb-2">Mediana</h4>
                  <p className="text-sm text-gray-600 mb-2">11-50 empleados</p>
                  {answers.companySize === "medium" && (
                    <Check className="h-5 w-5 mx-auto text-blue-600" />
                  )}
                </CardContent>
              </Card>
              
              <Card 
                className={cn(
                  "cursor-pointer transition-all hover:border-blue-400",
                  answers.companySize === "large" ? "border-blue-500 bg-blue-100" : "border-gray-200 bg-white"
                )}
                onClick={() => setAnswers({...answers, companySize: "large"})}
              >
                <CardContent className="p-4 text-center">
                  <h4 className="font-medium mb-2">Grande</h4>
                  <p className="text-sm text-gray-600 mb-2">Más de 50 empleados</p>
                  {answers.companySize === "large" && (
                    <Check className="h-5 w-5 mx-auto text-blue-600" />
                  )}
                </CardContent>
              </Card>
            </div>
            
            {answers.companySize && (
              <div className="mt-6 border p-4 rounded-md bg-white">
                <h3 className="font-medium text-blue-800 mb-2">Recomendaciones para tu empresa</h3>
                
                {answers.companySize === "small" && (
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Método recomendado:</strong> Sistema digital simple o app móvil</p>
                    <p><strong>Ventajas para ti:</strong> Bajo coste, fácil implementación, ideal para equipos pequeños</p>
                    <p><strong>Características importantes:</strong> Interfaz sencilla, notificaciones de recordatorio, informes básicos</p>
                    <p className="text-blue-700 mt-4">
                      Considera una solución como INWOUT que ofrece planes adaptados a pequeñas empresas con todas las funcionalidades necesarias para cumplir la normativa sin complicaciones.
                    </p>
                  </div>
                )}
                
                {answers.companySize === "medium" && (
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Método recomendado:</strong> Software en la nube con aplicación móvil complementaria</p>
                    <p><strong>Ventajas para ti:</strong> Escalabilidad, gestión por departamentos, automatización de informes</p>
                    <p><strong>Características importantes:</strong> Integración con RRHH, gestión de turnos, aprobación de ausencias</p>
                    <p className="text-blue-700 mt-4">
                      INWOUT te permite una gestión eficiente por departamentos, con niveles de aprobación personalizados y análisis de datos para optimizar la productividad.
                    </p>
                  </div>
                )}
                
                {answers.companySize === "large" && (
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Método recomendado:</strong> Sistema integral con múltiples opciones de fichaje</p>
                    <p><strong>Ventajas para ti:</strong> Centralización de datos, adaptación a múltiples centros, análisis avanzado</p>
                    <p><strong>Características importantes:</strong> APIs de integración, gestión de permisos multinivel, cumplimiento RGPD reforzado</p>
                    <p className="text-blue-700 mt-4">
                      Con INWOUT Enterprise puedes gestionar equipos grandes y dispersos, integrando el control horario con otros sistemas de la empresa y garantizando el cumplimiento normativo a todos los niveles.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-blue-800">Autoevaluación: ¿Has comprendido el tema?</h2>
          
          <p className="text-gray-700 mb-6">
            Comprueba tus conocimientos sobre el control horario con este breve cuestionario.
          </p>
          
          <div className="space-y-6 bg-gray-50 p-5 rounded-lg border">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800">1. ¿En qué año entró en vigor la normativa actual de control horario en España?</h3>
              <RadioGroup 
                value={answers.q1} 
                onValueChange={(value) => setAnswers({...answers, q1: value})}
                className="gap-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2018" id="q1-2018" />
                  <Label htmlFor="q1-2018">2018</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2019" id="q1-2019" />
                  <Label htmlFor="q1-2019">2019</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2020" id="q1-2020" />
                  <Label htmlFor="q1-2020">2020</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800">2. ¿Es obligatorio conservar los registros de fichaje durante al menos 4 años?</h3>
              <RadioGroup 
                value={answers.q2} 
                onValueChange={(value) => setAnswers({...answers, q2: value})}
                className="gap-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="q2-true" />
                  <Label htmlFor="q2-true">Verdadero</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="q2-false" />
                  <Label htmlFor="q2-false">Falso</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800">3. ¿Qué empresas están obligadas a llevar un registro de jornada?</h3>
              <RadioGroup 
                value={answers.q3} 
                onValueChange={(value) => setAnswers({...answers, q3: value})}
                className="gap-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="q3-small" />
                  <Label htmlFor="q3-small">Solo las pequeñas empresas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="q3-large" />
                  <Label htmlFor="q3-large">Solo empresas de más de 50 empleados</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="q3-all" />
                  <Label htmlFor="q3-all">Todas las empresas, independientemente de su tamaño</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button 
              onClick={handleQuizSubmit} 
              disabled={!answers.q1 || !answers.q2 || !answers.q3}
              className="bg-blue-500 hover:bg-blue-600 mt-4"
            >
              Comprobar respuestas
            </Button>
            
            {quizResult !== null && (
              <div className={cn(
                "mt-4 p-4 rounded-md",
                quizResult === 100 ? "bg-green-100 border border-green-200" : "bg-yellow-100 border border-yellow-200"
              )}>
                <h3 className={cn(
                  "font-medium mb-2 flex items-center",
                  quizResult === 100 ? "text-green-800" : "text-yellow-800"
                )}>
                  {quizResult === 100 ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      ¡Perfecto! Has respondido correctamente a todas las preguntas.
                    </>
                  ) : (
                    <>
                      <Info className="h-5 w-5 mr-2" />
                      Has acertado el {quizResult}% de las preguntas.
                    </>
                  )}
                </h3>
                
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Respuestas correctas:</strong>
                  </p>
                  <p>1. La normativa actual entró en vigor en 2019 con el Real Decreto-ley 8/2019.</p>
                  <p>2. Verdadero. La ley obliga a conservar los registros durante 4 años.</p>
                  <p>3. Todas las empresas están obligadas, sin importar su tamaño o sector.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={step === 1}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>
        
        <Button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 flex items-center"
        >
          {step === totalSteps ? (
            <>Finalizar</>
          ) : (
            <>Siguiente <ArrowRight className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </div>
    </div>
  );
}
