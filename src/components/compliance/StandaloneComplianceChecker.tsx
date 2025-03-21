import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  ExternalLink, 
  ArrowRight, 
  ArrowLeft,
  Calculator,
  Users,
  Clock,
  FileText,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const complianceQuestions = [
  {
    id: "q1",
    question: "¿Llevas un registro horario de las jornadas laborales de todos los empleados?",
    block: "Registro de Jornada",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q2",
    question: "¿El registro horario incluye la hora de entrada y salida de cada trabajador?",
    block: "Registro de Jornada",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q3",
    question: "¿Se conservan los registros de jornada durante al menos 4 años?",
    block: "Registro de Jornada",
    riskLevel: "leve",
    sanction: "€60 - €625"
  },
  {
    id: "q4",
    question: "¿Tu empresa controla el número de horas extraordinarias realizadas?",
    block: "Control de Horas Extras y Límite de Jornada",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q5",
    question: "¿Se informa a los representantes de los trabajadores sobre las horas extras?",
    block: "Control de Horas Extras y Límite de Jornada",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q6",
    question: "¿Se han superado los límites de jornada laboral o trabajo nocturno permitidos?",
    block: "Control de Horas Extras y Límite de Jornada",
    riskLevel: "grave",
    sanction: "€625 - €6.250",
    invertedLogic: true
  },
  {
    id: "q7",
    question: "¿Se pagan todas las horas extras realizadas?",
    block: "Pago y Transparencia Salarial",
    riskLevel: "muy grave",
    sanction: "€6.251 - €187.515"
  },
  {
    id: "q8",
    question: "¿Las horas extras aparecen reflejadas en la nómina del trabajador?",
    block: "Pago y Transparencia Salarial",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q9",
    question: "¿Existen retrasos reiterados en el pago del salario?",
    block: "Pago y Transparencia Salarial",
    riskLevel: "muy grave",
    sanction: "€6.251 - €187.515",
    invertedLogic: true
  }
];

const questionBlocks = [
  { id: "Registro de Jornada", emoji: "🟢", title: "Registro de Jornada" },
  { id: "Control de Horas Extras y Límite de Jornada", emoji: "🟡", title: "Control de Horas Extras y Límite de Jornada" },
  { id: "Pago y Transparencia Salarial", emoji: "🔴", title: "Pago y Transparencia Salarial" }
];

const sanctionTypes = [
  { id: "no_registro", label: "No llevar registro horario", baseAmount: 625, maxAmount: 6250, level: "grave" },
  { id: "registro_incompleto", label: "Registro incompleto o inadecuado", baseAmount: 625, maxAmount: 6250, level: "grave" },
  { id: "no_conservacion", label: "No conservar registros por 4 años", baseAmount: 60, maxAmount: 625, level: "leve" },
  { id: "horas_extra", label: "No controlar horas extraordinarias", baseAmount: 625, maxAmount: 6250, level: "grave" },
  { id: "no_comunicacion", label: "No informar a representantes", baseAmount: 625, maxAmount: 6250, level: "grave" },
  { id: "limites_jornada", label: "Superar límites de jornada laboral", baseAmount: 625, maxAmount: 6250, level: "grave" },
  { id: "impago_horas", label: "No pagar horas extras realizadas", baseAmount: 6251, maxAmount: 187515, level: "muy grave" },
  { id: "no_nomina", label: "No reflejar horas extras en nómina", baseAmount: 625, maxAmount: 6250, level: "grave" },
  { id: "retraso_pago", label: "Retrasos reiterados en el pago", baseAmount: 6251, maxAmount: 187515, level: "muy grave" }
];

const realCases = [
  {
    id: 1,
    sector: "Hostelería",
    employees: 1,
    duration: 2,
    description: "Restaurante sin registro de jornada",
    infraction: "No llevar registro horario",
    sanction: 700,
    level: "grave"
  },
  {
    id: 2,
    sector: "Comercio",
    employees: 12,
    duration: 3,
    description: "Tienda con horas extra no pagadas",
    infraction: "No pagar horas extras realizadas",
    sanction: 7500,
    level: "muy grave"
  },
  {
    id: 3,
    sector: "Servicios",
    employees: 15,
    duration: 1,
    description: "Empresa sin informar a representantes",
    infraction: "No informar a representantes",
    sanction: 3000,
    level: "grave"
  },
  {
    id: 4,
    sector: "Industria",
    employees: 25,
    duration: 4,
    description: "Fábrica superando límites de jornada",
    infraction: "Superar límites de jornada laboral",
    sanction: 8500,
    level: "grave"
  },
  {
    id: 5,
    sector: "Tecnología",
    employees: 8,
    duration: 6,
    description: "Startup sin sistema de registro",
    infraction: "No llevar registro horario",
    sanction: 1200,
    level: "grave"
  }
];

const getCompanySizeMultiplier = (employees: number) => {
  if (employees <= 5) return 1;
  if (employees <= 10) return 1.2;
  if (employees <= 25) return 1.5;
  if (employees <= 50) return 1.8;
  if (employees <= 100) return 2.2;
  return 2.5;
};

const getDurationMultiplier = (months: number) => {
  if (months <= 1) return 1;
  if (months <= 3) return 1.3;
  if (months <= 6) return 1.7;
  if (months <= 12) return 2;
  return 2.5;
};

interface FormValues {
  [key: string]: "si" | "no";
}

interface CalculatorFormValues {
  employees: number;
  sector: string;
  duration: number;
  infractions: string[];
}

interface StandaloneComplianceCheckerProps {
  isEmbedded?: boolean;
}

export default function StandaloneComplianceChecker({ isEmbedded = false }: StandaloneComplianceCheckerProps) {
  const [results, setResults] = useState<{
    level: "compliant" | "medium-risk" | "high-risk";
    violations: { question: string; sanction: string; riskLevel: string }[];
    complianceScore: number;
  } | null>(null);
  
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [completedBlocks, setCompletedBlocks] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("calculator");
  const [estimatedSanctions, setEstimatedSanctions] = useState<{
    minEstimate: number;
    maxEstimate: number;
    selectedInfractions: typeof sanctionTypes;
  } | null>(null);
  
  const form = useForm<FormValues>({
    defaultValues: complianceQuestions.reduce((acc, q) => ({ ...acc, [q.id]: "si" }), {})
  });

  const calculatorForm = useForm<CalculatorFormValues>({
    defaultValues: {
      employees: 5,
      sector: "Hostelería",
      duration: 2,
      infractions: ["no_registro"]
    }
  });

  const currentBlockId = questionBlocks[currentBlockIndex]?.id;
  const questionsInCurrentBlock = complianceQuestions.filter(q => q.block === currentBlockId);
  const currentQuestion = questionsInCurrentBlock[currentQuestionIndex];
  
  const totalQuestions = complianceQuestions.length;
  const answeredCount = answeredQuestions.length;
  const progress = (answeredCount / totalQuestions) * 100;

  const calculateSanctions = (data: CalculatorFormValues) => {
    const { employees, duration, infractions } = data;
    
    const companyMultiplier = getCompanySizeMultiplier(employees);
    const durationMultiplier = getDurationMultiplier(duration);
    
    const selectedInfractionTypes = sanctionTypes.filter(type => 
      infractions.includes(type.id)
    );
    
    const minEstimate = selectedInfractionTypes.reduce((total, infraction) => {
      return total + (infraction.baseAmount * companyMultiplier * durationMultiplier);
    }, 0);
    
    const maxEstimate = selectedInfractionTypes.reduce((total, infraction) => {
      return total + (infraction.maxAmount * companyMultiplier * durationMultiplier);
    }, 0);
    
    setEstimatedSanctions({
      minEstimate: Math.round(minEstimate),
      maxEstimate: Math.round(maxEstimate),
      selectedInfractions: selectedInfractionTypes
    });
  };
  
  const handleNext = () => {
    if (!answeredQuestions.includes(currentQuestion.id)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
    }
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < questionsInCurrentBlock.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        if (!completedBlocks.includes(currentBlockId)) {
          setCompletedBlocks([...completedBlocks, currentBlockId]);
        }
        
        if (currentBlockIndex < questionBlocks.length - 1) {
          setCurrentBlockIndex(currentBlockIndex + 1);
          setCurrentQuestionIndex(0);
        } else {
          form.handleSubmit(onSubmit)();
          return;
        }
      }
      
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else if (currentBlockIndex > 0) {
        setCurrentBlockIndex(currentBlockIndex - 1);
        const prevBlockQuestions = complianceQuestions.filter(
          q => q.block === questionBlocks[currentBlockIndex - 1].id
        );
        setCurrentQuestionIndex(prevBlockQuestions.length - 1);
      }
      
      setIsTransitioning(false);
    }, 300);
  };

  const onSubmit = (data: FormValues) => {
    const violations = complianceQuestions.filter(q => {
      const answer = data[q.id];
      return q.invertedLogic ? answer === "si" : answer === "no";
    }).map(q => ({
      question: q.question,
      sanction: q.sanction,
      riskLevel: q.riskLevel
    }));

    const hasVerySerious = violations.some(v => v.riskLevel === "muy grave");
    const complianceScore = ((complianceQuestions.length - violations.length) / complianceQuestions.length) * 100;
    
    let level: "compliant" | "medium-risk" | "high-risk";

    if (violations.length === 0) {
      level = "compliant";
    } else if (hasVerySerious) {
      level = "high-risk";
    } else {
      level = "medium-risk";
    }

    setResults({ level, violations, complianceScore });
  };

  const resetForm = () => {
    form.reset();
    setResults(null);
    setCurrentBlockIndex(0);
    setCurrentQuestionIndex(0);
    setAnsweredQuestions([]);
    setCompletedBlocks([]);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "leve":
        return "text-yellow-600";
      case "grave":
        return "text-orange-600";
      case "muy grave":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (results) {
    return (
      <div className={`py-6 ${isEmbedded ? "bg-white p-4 rounded-lg shadow-sm" : ""}`}>
        <div className={`mb-4 flex items-center gap-2 ${
          results.level === "compliant" ? "text-green-700" : 
          results.level === "medium-risk" ? "text-yellow-700" : 
          "text-red-700"
        }`}>
          {results.level === "compliant" && (
            <>
              <CheckCircle className="text-green-600 h-6 w-6" />
              <h2 className="text-xl font-bold">Cumples con la normativa</h2>
            </>
          )}
          {results.level === "medium-risk" && (
            <>
              <AlertTriangle className="text-yellow-600 h-6 w-6" />
              <h2 className="text-xl font-bold">Riesgo Medio - Posibles sanciones leves o graves</h2>
            </>
          )}
          {results.level === "high-risk" && (
            <>
              <AlertCircle className="text-red-600 h-6 w-6" />
              <h2 className="text-xl font-bold">Alto Riesgo - Posibles sanciones muy graves</h2>
            </>
          )}
        </div>
        
        <div className="text-lg font-medium mb-4">
          Puntuación de cumplimiento: {Math.round(results.complianceScore)}%
        </div>

        <div className="py-4">
          {results.level === "compliant" ? (
            <p className="text-green-700 mb-4">
              ¡Tu empresa está en regla! Sigue así para evitar problemas legales con el registro horario. Tu sistema de control horario cumple con los requisitos establecidos por el Real Decreto-ley 8/2019.
            </p>
          ) : (
            <>
              <p className={`mb-4 ${results.level === "medium-risk" ? "text-yellow-700" : "text-red-700"}`}>
                {results.level === "medium-risk" 
                  ? "Tu empresa podría enfrentar sanciones. Revisa tus prácticas laborales relacionadas con el registro horario." 
                  : "Tu empresa está en alto riesgo de multas significativas. Es urgente tomar medidas correctivas inmediatas."}
              </p>
              {results.violations.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Incumplimientos detectados:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {results.violations.map((violation, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{violation.question}</span>
                        <div className="ml-2 text-xs text-gray-600">Posible sanción: <span className="font-semibold">{violation.sanction}</span> (Riesgo {violation.riskLevel})</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-8 mb-6">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-800">Calculadora de sanciones</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Calcula una estimación de las posibles sanciones según el tamaño de tu empresa y tipo de incumplimiento.
            </p>
            
            <Tabs defaultValue="calculator" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="calculator">Calculadora</TabsTrigger>
              </TabsList>
              
              <TabsContent value="calculator" className="pt-4">
                <Form {...calculatorForm}>
                  <form 
                    onSubmit={calculatorForm.handleSubmit(calculateSanctions)} 
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={calculatorForm.control}
                        name="employees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-blue-600" />
                              Número de empleados
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                placeholder="Ej: 5"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={calculatorForm.control}
                        name="sector"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-600" />
                              Sector de la empresa
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Hostelería" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
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
                      Para {calculatorForm.getValues().employees} empleados con {calculatorForm.getValues().duration} {calculatorForm.getValues().duration === 1 ? 'mes' : 'meses'} de incumplimiento.
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
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={resetForm}
          >
            Volver a realizar el test
          </Button>
          {!isEmbedded && (
            <a 
              href="https://inwout.com/demo-online" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <span>Solicitar demo de INWOUT</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`py-6 ${isEmbedded ? "bg-white p-4 rounded-lg shadow-sm" : ""}`}>
      <div className="flex items-center mb-6">
        <CheckCircle className="text-blue-600 h-7 w-7 mr-3" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Verificador de cumplimiento</h2>
          <p className="text-gray-600">Comprueba si cumples con la normativa laboral</p>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-1">
              <span>{questionBlocks[currentBlockIndex].emoji}</span> 
              {questionBlocks[currentBlockIndex].title}
            </h3>
            <p className="text-sm text-gray-600">
              Pregunta {currentQuestionIndex + 1} de {questionsInCurrentBlock.length}
            </p>
          </div>
          
          <div className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
          )}>
            <FormField
              key={currentQuestion.id}
              control={form.control}
              name={currentQuestion.id}
              render={({ field }) => (
                <FormItem className="bg-white p-5 rounded-lg shadow-sm space-y-4 border">
                  <FormLabel className="text-base font-medium text-gray-800">{currentQuestion.question}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (!answeredQuestions.includes(currentQuestion.id)) {
                          setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
                        }
                      }}
                      value={field.value}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="si" id={`${currentQuestion.id}-si`} />
                        <FormLabel htmlFor={`${currentQuestion.id}-si`} className="cursor-pointer">Sí</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`${currentQuestion.id}-no`} />
                        <FormLabel htmlFor={`${currentQuestion.id}-no`} className="cursor-pointer">No</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentBlockIndex === 0 && currentQuestionIndex === 0}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </Button>
            
            <Button 
              type="button" 
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1"
            >
              {isLastQuestionAndBlock() ? (
                'Finalizar Test'
              ) : (
                <>
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );

  function isLastQuestionAndBlock() {
    return (
      currentBlockIndex === questionBlocks.length - 1 && 
      currentQuestionIndex === questionsInCurrentBlock.length - 1
    );
  }
}
