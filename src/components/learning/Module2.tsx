
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  AlertTriangle,
  FileText, 
  Users, 
  Info,
  CheckCircle,
  X
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Module2Props {
  onComplete: () => void;
}

export default function Module2({ onComplete }: Module2Props) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  
  const [answers, setAnswers] = useState<{
    companyType?: string;
    hasEmployees?: boolean;
    sector?: string;
    workType?: string[];
  }>({});
  
  const [result, setResult] = useState<{
    required: boolean;
    reason: string;
    recommendation: string;
  } | null>(null);
  
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

  const generateResult = () => {
    let required = true;
    let reason = "";
    let recommendation = "";

    // Determine if control horario is required based on answers
    if (answers.companyType === "special") {
      required = false;
      reason = "Tu empresa pertenece a una categoría con relación laboral de carácter especial, por lo que está exenta de la obligación de registro horario.";
      recommendation = "Aunque no sea obligatorio, implementar un sistema de control horario puede mejorar la gestión interna y la transparencia.";
    } else if (answers.companyType === "autonomo" && answers.hasEmployees === false) {
      required = false;
      reason = "Como trabajador autónomo sin empleados a tu cargo, no estás obligado a llevar un registro de tu jornada laboral.";
      recommendation = "Si en el futuro contratas empleados, deberás implementar un sistema de control horario para ellos.";
    } else if (answers.companyType === "cooperativa") {
      required = false;
      reason = "Como socio trabajador de una cooperativa, no estás obligado a registrar tu jornada laboral ya que tu relación es de carácter societario y no laboral.";
      recommendation = "Un sistema de control horario puede ser útil para la gestión interna de la cooperativa, aunque no sea obligatorio.";
    } else if (answers.companyType === "directivo") {
      required = false;
      reason = "Como directivo con plena autonomía en tu jornada y sin un horario definido, estás exento del registro horario.";
      recommendation = "El registro horario sigue siendo obligatorio para el resto de empleados de tu empresa.";
    } else {
      required = true;
      reason = "Tu empresa está obligada a implementar un sistema de control horario según el Real Decreto-ley 8/2019.";
      recommendation = "Debes registrar diariamente la jornada de todos tus empleados, incluyendo el horario de inicio y fin.";
    }

    setResult({ required, reason, recommendation });
  };

  return (
    <div className="py-2">
      <div className="mb-6">
        <Progress value={progress} className="h-2 mb-2" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>¿Es obligatorio?</span>
          <span>Paso {step} de {totalSteps}</span>
        </div>
      </div>
      
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-blue-800">¿Es obligatorio el control horario para tu empresa?</h2>
          
          <p className="text-gray-700">
            El control horario es obligatorio para todas las empresas en España desde la entrada en vigor 
            del Real Decreto-ley 8/2019. Sin embargo, existen algunas excepciones específicas.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <p className="text-sm text-blue-800">
              <strong>¿Sabías que...?</strong> El incumplimiento de la normativa de control horario 
              puede acarrear multas de entre 60€ y más de 6.000€ por trabajador.
            </p>
          </div>
          
          <Card className="bg-white border-blue-200">
            <CardContent className="pt-5">
              <h3 className="text-lg font-medium text-blue-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Normativa básica
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                    <span className="text-blue-700 font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Obligación general</h4>
                    <p className="text-sm text-gray-600">
                      Todas las empresas deben registrar diariamente la jornada laboral de cada empleado, 
                      incluyendo el horario concreto de inicio y finalización.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                    <span className="text-blue-700 font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Conservación</h4>
                    <p className="text-sm text-gray-600">
                      Los registros deben conservarse durante 4 años y estar a disposición de empleados, 
                      representantes sindicales y la Inspección de Trabajo.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                    <span className="text-blue-700 font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Excepciones</h4>
                    <p className="text-sm text-gray-600">
                      Existen excepciones para relaciones laborales especiales, trabajadores autónomos 
                      sin empleados, socios de cooperativas y directivos con régimen de libre disponibilidad.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="border-l-4 border-yellow-400 pl-4 bg-yellow-50 p-3 rounded-r-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 shrink-0" />
              <p className="text-sm text-yellow-800">
                <strong>Importante:</strong> Incluso si tu empresa está en una categoría exenta, 
                el registro horario puede ser beneficioso para la gestión interna, la productividad 
                y la conciliación laboral.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-blue-800">Excepciones a la obligatoriedad</h2>
          
          <p className="text-gray-700 mb-4">
            Aunque la normativa es de aplicación general, existen algunas excepciones específicas 
            donde el registro horario no es obligatorio.
          </p>
          
          <Tabs defaultValue="special">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="special">Relaciones especiales</TabsTrigger>
              <TabsTrigger value="directivos">Directivos</TabsTrigger>
              <TabsTrigger value="cooperativas">Cooperativas</TabsTrigger>
              <TabsTrigger value="autonomos">Autónomos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="special" className="border rounded-md p-4 min-h-[250px] bg-white">
              <h3 className="font-medium text-blue-800 mb-3">Relaciones laborales de carácter especial</h3>
              <p className="text-sm text-gray-700 mb-4">
                Según el artículo 2 del Estatuto de los Trabajadores, estas relaciones están exentas:
              </p>
              
              <div className="grid md:grid-cols-2 gap-3">
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li>Personal de alta dirección</li>
                  <li>Empleados del hogar familiar</li>
                  <li>Penados en instituciones penitenciarias</li>
                  <li>Deportistas profesionales</li>
                  <li>Artistas en espectáculos públicos</li>
                </ul>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li>Personas con discapacidad en centros especiales</li>
                  <li>Menores en internamiento por responsabilidad penal</li>
                  <li>Estudiantes en formación sanitaria especializada</li>
                  <li>Abogados en despachos individuales o colectivos</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="directivos" className="border rounded-md p-4 min-h-[250px] bg-white">
              <h3 className="font-medium text-blue-800 mb-3">Trabajadores con régimen de libre disponibilidad</h3>
              <p className="text-sm text-gray-700 mb-4">
                Empleados que tienen autonomía completa para gestionar su tiempo de trabajo:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 mb-4">
                <li>Directivos con plena autonomía en su jornada</li>
                <li>Trabajadores sin un horario predefinido</li>
                <li>Personas con capacidad de organizar libremente su tiempo</li>
              </ul>
              
              <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
                <p><strong>Nota:</strong> Esta excepción se aplica de forma restrictiva y debe estar claramente 
                justificada por la naturaleza del puesto y las responsabilidades asumidas.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="cooperativas" className="border rounded-md p-4 min-h-[250px] bg-white">
              <h3 className="font-medium text-blue-800 mb-3">Socios trabajadores de cooperativas</h3>
              <p className="text-sm text-gray-700 mb-4">
                Los socios de cooperativas que participan en la gestión y toma de decisiones no están obligados 
                a registrar su jornada laboral.
              </p>
              
              <div className="flex items-start mb-4">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2 shrink-0" />
                <p className="text-sm text-gray-700">
                  Su relación con la cooperativa es de carácter societario y no laboral, lo que les excluye 
                  del ámbito de aplicación del Estatuto de los Trabajadores.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-md text-sm">
                <p><strong>Importante:</strong> Si la cooperativa tiene trabajadores contratados (no socios), 
                sí está obligada a llevar un registro horario para estos empleados.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="autonomos" className="border rounded-md p-4 min-h-[250px] bg-white">
              <h3 className="font-medium text-blue-800 mb-3">Trabajadores autónomos</h3>
              <p className="text-sm text-gray-700 mb-4">
                Los trabajadores autónomos sin empleados a su cargo no están obligados a llevar un registro 
                de su jornada laboral.
              </p>
              
              <div className="mb-4 border p-3 rounded-md bg-gray-50">
                <h4 className="font-medium text-gray-800 mb-2">Dos situaciones diferenciadas:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Autónomos sin empleados</p>
                      <p className="text-xs text-gray-600">No están obligados a registrar su jornada</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mt-0.5 mr-2 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Autónomos con empleados</p>
                      <p className="text-xs text-gray-600">Obligados a registrar la jornada de sus empleados</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
                <p><strong>Consejo:</strong> Incluso como autónomo, llevar un registro de tu tiempo 
                puede ayudarte a mejorar tu productividad y facturación.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-blue-800">¿Se aplica a tu empresa?</h2>
          
          <p className="text-gray-700 mb-6">
            Responde a estas preguntas para determinar si tu empresa está obligada a implementar
            un sistema de control horario.
          </p>
          
          <div className="bg-white p-5 rounded-lg border space-y-8">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800">1. ¿Qué tipo de entidad tienes?</h3>
              <RadioGroup 
                value={answers.companyType} 
                onValueChange={(value) => setAnswers({...answers, companyType: value})}
                className="gap-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="empresa" id="empresa" />
                  <Label htmlFor="empresa">Empresa con trabajadores</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="special" id="special" />
                  <Label htmlFor="special">Relación laboral de carácter especial (abogado en despacho, artista, etc.)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="autonomo" id="autonomo" />
                  <Label htmlFor="autonomo">Trabajador autónomo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cooperativa" id="cooperativa" />
                  <Label htmlFor="cooperativa">Socio trabajador de cooperativa</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="directivo" id="directivo" />
                  <Label htmlFor="directivo">Directivo con plena autonomía horaria</Label>
                </div>
              </RadioGroup>
            </div>
            
            {answers.companyType === "autonomo" && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-800">2. ¿Tienes empleados a tu cargo?</h3>
                <RadioGroup 
                  value={answers.hasEmployees !== undefined ? String(answers.hasEmployees) : undefined} 
                  onValueChange={(value) => setAnswers({...answers, hasEmployees: value === "true"})}
                  className="gap-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="has-employees-yes" />
                    <Label htmlFor="has-employees-yes">Sí, tengo empleados</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="has-employees-no" />
                    <Label htmlFor="has-employees-no">No, soy autónomo sin empleados</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            {answers.companyType === "empresa" && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-800">2. ¿A qué sector pertenece tu empresa?</h3>
                <RadioGroup 
                  value={answers.sector} 
                  onValueChange={(value) => setAnswers({...answers, sector: value})}
                  className="gap-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="servicios" id="servicios" />
                    <Label htmlFor="servicios">Servicios</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comercio" id="comercio" />
                    <Label htmlFor="comercio">Comercio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="industrial" id="industrial" />
                    <Label htmlFor="industrial">Industrial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="construccion" id="construccion" />
                    <Label htmlFor="construccion">Construcción</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="otros" id="otros" />
                    <Label htmlFor="otros">Otro sector</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            {(answers.companyType === "empresa" || (answers.companyType === "autonomo" && answers.hasEmployees)) && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-800">3. ¿Qué modalidades de trabajo utilizáis?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="presencial" 
                      checked={answers.workType?.includes("presencial")}
                      onCheckedChange={(checked) => {
                        const current = answers.workType || [];
                        if (checked) {
                          setAnswers({...answers, workType: [...current, "presencial"]});
                        } else {
                          setAnswers({...answers, workType: current.filter(t => t !== "presencial")});
                        }
                      }}
                    />
                    <Label htmlFor="presencial">Trabajo presencial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="teletrabajo" 
                      checked={answers.workType?.includes("teletrabajo")}
                      onCheckedChange={(checked) => {
                        const current = answers.workType || [];
                        if (checked) {
                          setAnswers({...answers, workType: [...current, "teletrabajo"]});
                        } else {
                          setAnswers({...answers, workType: current.filter(t => t !== "teletrabajo")});
                        }
                      }}
                    />
                    <Label htmlFor="teletrabajo">Teletrabajo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="flexible" 
                      checked={answers.workType?.includes("flexible")}
                      onCheckedChange={(checked) => {
                        const current = answers.workType || [];
                        if (checked) {
                          setAnswers({...answers, workType: [...current, "flexible"]});
                        } else {
                          setAnswers({...answers, workType: current.filter(t => t !== "flexible")});
                        }
                      }}
                    />
                    <Label htmlFor="flexible">Horario flexible</Label>
                  </div>
                </div>
              </div>
            )}
            
            <Button 
              onClick={generateResult} 
              disabled={!answers.companyType || (answers.companyType === "autonomo" && answers.hasEmployees === undefined)}
              className="bg-blue-500 hover:bg-blue-600 mt-4"
            >
              Verificar obligatoriedad
            </Button>
            
            {result && (
              <div className={cn(
                "mt-4 p-4 rounded-md",
                result.required ? "bg-blue-100 border border-blue-200" : "bg-yellow-100 border border-yellow-200"
              )}>
                <h3 className={cn(
                  "font-medium mb-2 flex items-center",
                  result.required ? "text-blue-800" : "text-yellow-800"
                )}>
                  {result.required ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Sí, el control horario es obligatorio para tu caso
                    </>
                  ) : (
                    <>
                      <Info className="h-5 w-5 mr-2" />
                      No es obligatorio en tu caso
                    </>
                  )}
                </h3>
                
                <div className="text-sm space-y-3">
                  <p>{result.reason}</p>
                  <p className="font-medium">{result.recommendation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-blue-800">Consideraciones adicionales</h2>
          
          <p className="text-gray-700 mb-4">
            Además de conocer si estás obligado a implementar un sistema de control horario, 
            es importante tener en cuenta estos aspectos:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="overflow-hidden">
              <CardContent className="pt-5">
                <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                  Sanciones por incumplimiento
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs mr-2 mt-0.5">Leves</span>
                    <span>De 60€ a 625€ por no documentar correctamente las horas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs mr-2 mt-0.5">Graves</span>
                    <span>De 626€ a 6.250€ por no implementar registro o superar límites</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs mr-2 mt-0.5">Muy graves</span>
                    <span>De 6.251€ a 187.515€ por reincidencia o fraude</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardContent className="pt-5">
                <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Beneficios del control horario
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Mejora la productividad y organización del trabajo</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Garantiza el correcto pago de las horas trabajadas</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Facilita la conciliación laboral y familiar</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Evita conflictos sobre las horas trabajadas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-3 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Consulta recursos oficiales
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Para resolver cualquier duda específica sobre la aplicación de la normativa de control 
              horario a tu caso concreto, te recomendamos consultar:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <FileText className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                <span><strong>Guía sobre el Registro de Jornada</strong> del Ministerio de Trabajo y Economía Social</span>
              </li>
              <li className="flex items-start">
                <FileText className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                <span><strong>Real Decreto-ley 8/2019</strong>, de 8 de marzo, de medidas urgentes de protección social</span>
              </li>
              <li className="flex items-start">
                <Users className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                <span>Un <strong>asesor laboral especializado</strong> que pueda evaluar tu caso particular</span>
              </li>
            </ul>
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
