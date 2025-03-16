import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, AlertCircle, ExternalLink, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

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

interface FormValues {
  [key: string]: "si" | "no";
}

export default function ComplianceChecker() {
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
  
  const form = useForm<FormValues>({
    defaultValues: complianceQuestions.reduce((acc, q) => ({ ...acc, [q.id]: "si" }), {})
  });

  const currentBlockId = questionBlocks[currentBlockIndex]?.id;
  const questionsInCurrentBlock = complianceQuestions.filter(q => q.block === currentBlockId);
  const currentQuestion = questionsInCurrentBlock[currentQuestionIndex];
  
  const totalQuestions = complianceQuestions.length;
  const answeredCount = answeredQuestions.length;
  const progress = (answeredCount / totalQuestions) * 100;
  
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

  if (results) {
    return (
      <div className="space-y-6 animate-fade-in">
        <Card className="shadow-md border-blue-200">
          <CardHeader className={`${results.level === "compliant" ? "bg-green-50" : results.level === "medium-risk" ? "bg-yellow-50" : "bg-red-50"}`}>
            <CardTitle className="text-xl flex items-center gap-2">
              {results.level === "compliant" && (
                <>
                  <CheckCircle className="text-green-600" />
                  <span className="text-green-800">Cumples con la normativa</span>
                </>
              )}
              {results.level === "medium-risk" && (
                <>
                  <AlertTriangle className="text-yellow-600" />
                  <span className="text-yellow-800">Riesgo Medio - Posibles sanciones leves o graves</span>
                </>
              )}
              {results.level === "high-risk" && (
                <>
                  <AlertCircle className="text-red-600" />
                  <span className="text-red-800">Alto Riesgo - Posibles sanciones muy graves</span>
                </>
              )}
            </CardTitle>
            <CardDescription>
              Puntuación de cumplimiento: {Math.round(results.complianceScore)}%
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
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
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 relative">
              <div className="flex items-center">
                <div className="absolute top-1 right-1 bg-yellow-100 text-yellow-800 text-xs px-1 rounded flex items-center">
                  <div className="flex items-center justify-center" style={{ width: "16px", height: "16px" }}>
                    <img 
                      src="/public/lovable-uploads/d48380f9-f5c9-4f3f-8184-8ef27150846d.png" 
                      alt="Ad" 
                      className="w-auto h-auto max-w-full max-h-full object-contain" 
                    />
                  </div>
                  <span className="ml-1">Anuncio</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img 
                      src="https://pvqbknpvkohxoftoloda.supabase.co/storage/v1/object/public/app_assets/logos/android-chrome-192x192.png" 
                      alt="INWOUT Logo" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Solución Recomendada:</p>
                    <p className="text-sm text-gray-600 mb-2">INWOUT - Plataforma de control horario que garantiza el cumplimiento normativo</p>
                  </div>
                </div>
                <a 
                  href="https://inwout.com/demo-online" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  Solicitar Demo
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={resetForm}>
              Volver a realizar el test
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
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
  );

  function isLastQuestionAndBlock() {
    return (
      currentBlockIndex === questionBlocks.length - 1 && 
      currentQuestionIndex === questionsInCurrentBlock.length - 1
    );
  }
}
