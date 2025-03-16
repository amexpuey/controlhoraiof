import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, AlertCircle, ExternalLink } from "lucide-react";
import AdBanner from "../ads/AdBanner";

// Define the questions with their risk levels
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
    invertedLogic: true // This question is inverted - "Sí" means non-compliance
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
    invertedLogic: true // This question is inverted - "Sí" means non-compliance
  }
];

// Define question blocks for UI grouping
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

  const form = useForm<FormValues>({
    defaultValues: complianceQuestions.reduce((acc, q) => ({ ...acc, [q.id]: "si" }), {})
  });

  const onSubmit = (data: FormValues) => {
    // Count violations by risk level
    const violations = complianceQuestions.filter(q => {
      const answer = data[q.id];
      return q.invertedLogic ? answer === "si" : answer === "no";
    }).map(q => ({
      question: q.question,
      sanction: q.sanction,
      riskLevel: q.riskLevel
    }));

    // Calculate compliance level
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
  };
  
  // If we have results, show them instead of the form
  if (results) {
    return (
      <div className="space-y-6">
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
                  <img 
                    src="/public/lovable-uploads/d48380f9-f5c9-4f3f-8184-8ef27150846d.png" 
                    alt="Ad" 
                    className="w-3 h-3 mr-1" 
                  />
                  Anuncio
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Solución Recomendada:</p>
                  <p className="text-sm text-gray-600 mb-2">INWOUT - Plataforma de control horario que garantiza el cumplimiento normativo</p>
                </div>
                <a 
                  href="https://inwout.com/solicitar-demo" 
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

  // Show the form if we don't have results
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {questionBlocks.map((block) => (
          <div key={block.id} className="space-y-4 border p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span>{block.emoji}</span> {block.title}
            </h3>
            
            {complianceQuestions
              .filter(q => q.block === block.id)
              .map((question) => (
                <FormField
                  key={question.id}
                  control={form.control}
                  name={question.id}
                  render={({ field }) => (
                    <FormItem className="bg-white p-3 rounded-md space-y-3 shadow-sm">
                      <FormLabel className="font-medium text-gray-800">{question.question}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="si" id={`${question.id}-si`} />
                            <FormLabel htmlFor={`${question.id}-si`} className="cursor-pointer">Sí</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id={`${question.id}-no`} />
                            <FormLabel htmlFor={`${question.id}-no`} className="cursor-pointer">No</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
          </div>
        ))}
        
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
          Evaluar Cumplimiento
        </Button>
      </form>
    </Form>
  );
}
