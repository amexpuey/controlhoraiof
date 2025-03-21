
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, Users, Calendar, AlertTriangle, Info, Scale } from "lucide-react";
import { sanctionTypes, getCompanySizeMultiplier, getDurationMultiplier, getRiskColor } from "./complianceData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CalculatorFormValues {
  employees: number;
  duration: number;
  infractions: string[];
  reincidence: boolean;
}

export function SanctionCalculator() {
  const [activeTab, setActiveTab] = useState("calculator");
  const [estimatedSanctions, setEstimatedSanctions] = useState<{
    minEstimate: number;
    maxEstimate: number;
    selectedInfractions: typeof sanctionTypes;
    reincidenceApplied: boolean;
  } | null>(null);
  
  const calculatorForm = useForm<CalculatorFormValues>({
    defaultValues: {
      employees: 1,
      duration: 2,
      infractions: ["no_registro"],
      reincidence: false
    }
  });

  const calculateSanctions = (data: CalculatorFormValues) => {
    const { employees, duration, infractions, reincidence } = data;
    
    const companyMultiplier = getCompanySizeMultiplier(employees);
    const durationMultiplier = getDurationMultiplier(duration);
    const reincidenceMultiplier = reincidence ? 1.5 : 1;
    
    const selectedInfractionTypes = sanctionTypes.filter(type => 
      infractions.includes(type.id)
    );
    
    const minEstimate = selectedInfractionTypes.reduce((total, infraction) => {
      return total + (infraction.baseAmount * companyMultiplier * durationMultiplier * reincidenceMultiplier);
    }, 0);
    
    const maxEstimate = selectedInfractionTypes.reduce((total, infraction) => {
      return total + (infraction.maxAmount * companyMultiplier * durationMultiplier * reincidenceMultiplier);
    }, 0);
    
    setEstimatedSanctions({
      minEstimate: Math.round(minEstimate),
      maxEstimate: Math.round(maxEstimate),
      selectedInfractions: selectedInfractionTypes,
      reincidenceApplied: reincidence
    });
  };

  return (
    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-800">Calculadora de sanciones</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Calcula una estimación de las posibles sanciones según el tamaño de tu empresa y tipo de incumplimiento.
      </p>
      
      <Tabs defaultValue="calculator" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
          <TabsTrigger value="info">Información legal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="pt-4">
          <Form {...calculatorForm}>
            <form 
              onSubmit={calculatorForm.handleSubmit(calculateSanctions)} 
              className="space-y-4"
            >
              <FormField
                control={calculatorForm.control}
                name="employees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      Número de empleados con riesgo de sanción para la empresa
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="Ej: 1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={calculatorForm.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Duración del incumplimiento (meses)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="Ej: 2"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={calculatorForm.control}
                name="reincidence"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0 mt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        Aplicar agravante por reincidencia
                      </FormLabel>
                      <p className="text-xs text-gray-500">
                        Se aplica cuando ha habido sanciones previas por infracciones similares
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={calculatorForm.control}
                name="infractions"
                render={() => (
                  <FormItem>
                    <div className="mb-2">
                      <FormLabel className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-blue-600" />
                        Tipos de incumplimiento
                      </FormLabel>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {sanctionTypes.map((item) => (
                        <FormField
                          key={item.id}
                          control={calculatorForm.control}
                          name="infractions"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-2 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal cursor-pointer">
                                  {item.label}
                                  <span className={`ml-1 text-xs ${getRiskColor(item.level)}`}>
                                    ({item.level})
                                  </span>
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Calcular posibles sanciones
              </Button>
            </form>
          </Form>
          
          {estimatedSanctions && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-3">Estimación de sanciones:</h4>
              <p className="text-lg font-bold text-blue-900 mb-3">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(estimatedSanctions.minEstimate)} - {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(estimatedSanctions.maxEstimate)}
              </p>
              <p className="text-sm text-blue-700 mb-4">
                Para {calculatorForm.getValues().employees} {calculatorForm.getValues().employees === 1 ? 'empleado' : 'empleados'} con {calculatorForm.getValues().duration} {calculatorForm.getValues().duration === 1 ? 'mes' : 'meses'} de incumplimiento.
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
          )}
        </TabsContent>
        
        <TabsContent value="info" className="pt-4">
          <div className="space-y-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="flex items-center gap-2 font-medium text-gray-800 mb-3">
                <FileText className="h-4 w-4 text-blue-600" />
                Normativa aplicable
              </h4>
              <p className="text-gray-600 mb-3">El artículo 34 del Estatuto de los Trabajadores (ET) establece la obligación de las empresas de garantizar un registro diario de la jornada laboral.</p>
              <p className="text-gray-600">Las sanciones se detallan en el Real Decreto Legislativo 5/2000 (LISOS).</p>
            </div>
            
            <Accordion type="single" collapsible className="bg-white rounded-lg border border-gray-200">
              <AccordionItem value="leves">
                <AccordionTrigger className="px-4 text-sm hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-yellow-100">
                      <Info className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span>Infracciones leves (60€ - 625€)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-0 pb-3">
                  <p className="text-gray-600 text-sm">
                    Faltas de carácter meramente formal o documental relacionadas con el registro horario.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-xs text-gray-500 space-y-1">
                    <li>No conservar los registros durante el periodo establecido (4 años)</li>
                    <li>Errores o defectos formales en el sistema de registro</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="graves">
                <AccordionTrigger className="px-4 text-sm hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-orange-100">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                    </div>
                    <span>Infracciones graves (626€ - 6.250€)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-0 pb-3">
                  <p className="text-gray-600 text-sm">
                    Transgresión de las normas y límites legales en materia de jornada, trabajo nocturno, 
                    horas extraordinarias, descansos, vacaciones o permisos.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-xs text-gray-500 space-y-1">
                    <li>No llevar registro horario de los trabajadores</li>
                    <li>Registro incompleto o inadecuado</li>
                    <li>No controlar las horas extraordinarias realizadas</li>
                    <li>No informar a los representantes de los trabajadores</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="muy-graves">
                <AccordionTrigger className="px-4 text-sm hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-red-100">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <span>Infracciones muy graves (6.251€ - 187.515€)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-0 pb-3">
                  <p className="text-gray-600 text-sm">
                    Acciones u omisiones que impliquen incumplimiento de normas laborales en aspectos esenciales, 
                    afectando gravemente los derechos de los trabajadores.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-xs text-gray-500 space-y-1">
                    <li>No pagar horas extras realizadas</li>
                    <li>Retrasos reiterados en el pago del salario</li>
                    <li>Obstrucción a la labor inspectora</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="flex items-center gap-2 font-medium text-gray-800 mb-3">
                <Scale className="h-4 w-4 text-blue-600" />
                Factores que determinan la cuantía
              </h4>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li><span className="font-medium">Gravedad de la infracción</span>: Impacto en los derechos de los trabajadores</li>
                <li><span className="font-medium">Tamaño de la empresa</span>: Las sanciones pueden ser más elevadas en empresas de mayor tamaño</li>
                <li><span className="font-medium">Reincidencia</span>: La repetición de infracciones similares agrava la sanción</li>
                <li><span className="font-medium">Intencionalidad</span>: Si la infracción fue deliberada, la sanción puede incrementarse</li>
                <li><span className="font-medium">Perjuicios causados</span>: Daño ocasionado a los trabajadores o terceros</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">Consecuencias adicionales</h4>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>
                  <span className="font-medium">Presunción de jornada completa</span>: 
                  <p className="text-xs mt-1">En ausencia de registro de jornada en contratos a tiempo parcial, se presume que el contrato es a jornada completa.</p>
                </li>
                <li>
                  <span className="font-medium">Abono de horas extraordinarias</span>: 
                  <p className="text-xs mt-1">La falta de registro puede llevar a la obligación de abonar horas extraordinarias no registradas ni compensadas.</p>
                </li>
                <li>
                  <span className="font-medium">Sanciones adicionales</span>: 
                  <p className="text-xs mt-1">La no comunicación a representantes de los trabajadores puede constituir una infracción adicional.</p>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
