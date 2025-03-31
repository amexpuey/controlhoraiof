
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, HelpCircle, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LegalRiskSimulator() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selections, setSelections] = useState<string[]>([]);

  const scenarios = [
    {
      id: "registro_jornada",
      title: "Registro de Jornada Laboral",
      question: "¿Qué ocurre si tu empresa no implementa un sistema de registro horario?",
      options: [
        { id: "a", text: "Nada, no es obligatorio para todas las empresas" },
        { id: "b", text: "Una simple advertencia en caso de inspección" },
        { id: "c", text: "Multas entre 625€ y 6.250€ por ser infracción grave" },
      ],
      correctAnswer: "c",
      consequence: "No implementar el registro horario constituye una infracción grave según la LISOS (Ley sobre Infracciones y Sanciones en el Orden Social), con multas de 625€ a 6.250€.",
      solution: "Implementa un sistema de registro horario fiable que registre la hora de entrada y salida de cada trabajador, garantizando su conservación durante 4 años."
    },
    {
      id: "proteccion_datos",
      title: "Protección de Datos en RRHH",
      question: "¿Qué sucede si guardas datos personales de tus empleados sin medidas de seguridad adecuadas?",
      options: [
        { id: "a", text: "Nada mientras no haya una filtración" },
        { id: "b", text: "Una sanción leve de la AEPD" },
        { id: "c", text: "Multas de hasta 20 millones de euros o el 4% de la facturación anual" },
      ],
      correctAnswer: "c",
      consequence: "Las infracciones graves en materia de protección de datos pueden acarrear multas de hasta 20 millones de euros o el 4% de la facturación anual global según el RGPD.",
      solution: "Implementa medidas técnicas y organizativas para garantizar la seguridad de los datos, realiza evaluaciones de impacto y nombra un Delegado de Protección de Datos si es necesario."
    },
    {
      id: "canal_denuncias",
      title: "Canal de Denuncias (Whistleblowing)",
      question: "¿Qué ocurre si tu empresa con más de 50 trabajadores no implementa un canal de denuncias?",
      options: [
        { id: "a", text: "Es recomendable pero no obligatorio" },
        { id: "b", text: "Multas de hasta 10.000€ y posibles inspecciones adicionales" },
        { id: "c", text: "Solo afecta a empresas públicas" },
      ],
      correctAnswer: "b",
      consequence: "La Ley 2/2023 de protección de informantes establece la obligación de implementar canales de denuncia en empresas de más de 50 trabajadores, con sanciones de hasta 10.000€ por incumplimiento.",
      solution: "Implementa un canal de denuncias que garantice la confidencialidad, establece procedimientos claros y designa una persona o departamento imparcial para su gestión."
    },
    {
      id: "prevencion_riesgos",
      title: "Prevención de Riesgos Laborales",
      question: "¿Qué consecuencias tiene no implementar medidas de prevención de riesgos laborales?",
      options: [
        { id: "a", text: "Solo relevante en caso de accidente" },
        { id: "b", text: "Multas de hasta 49.180€ y posible paralización de actividad" },
        { id: "c", text: "Un simple apercibimiento administrativo" },
      ],
      correctAnswer: "b",
      consequence: "Las infracciones muy graves en PRL pueden conllevar multas de hasta 49.180€, paralización de actividad, e incluso responsabilidad penal en caso de accidente por negligencia.",
      solution: "Elabora e implementa un plan de prevención de riesgos laborales, realiza evaluaciones de riesgos, proporciona formación a los trabajadores y designa recursos para la actividad preventiva."
    },
    {
      id: "horas_extras",
      title: "Registro y Pago de Horas Extras",
      question: "¿Qué ocurre si tu empresa no registra ni paga correctamente las horas extraordinarias?",
      options: [
        { id: "a", text: "Nada si hay acuerdo con el trabajador" },
        { id: "b", text: "Una pequeña compensación al trabajador" },
        { id: "c", text: "Multas de 6.251€ a 187.515€ por infracción muy grave" },
      ],
      correctAnswer: "c",
      consequence: "No registrar o pagar las horas extraordinarias constituye una infracción muy grave en materia laboral, con multas que pueden llegar a 187.515€, además de recargos, intereses y posibles demandas por parte de los trabajadores.",
      solution: "Implementa un sistema de registro exacto de horas extraordinarias, asegúrate de que aparezcan correctamente en las nóminas y respeta los límites legales (80 horas extras anuales salvo excepciones)."
    }
  ];
  
  const handleSelectOption = (optionId: string) => {
    const newSelections = [...selections];
    newSelections[currentScenario] = optionId;
    setSelections(newSelections);
    
    // Move to next scenario or show results
    if (currentScenario < scenarios.length - 1) {
      setTimeout(() => {
        setCurrentScenario(currentScenario + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }
  };
  
  const calculateRiskScore = () => {
    let correctCount = 0;
    
    scenarios.forEach((scenario, index) => {
      if (selections[index] === scenario.correctAnswer) {
        correctCount++;
      }
    });
    
    return Math.round((correctCount / scenarios.length) * 100);
  };
  
  const resetSimulator = () => {
    setCurrentScenario(0);
    setShowResults(false);
    setSelections([]);
  };
  
  const currentProgress = ((currentScenario + 1) / scenarios.length) * 100;
  
  return (
    <div className="py-6">
      {!showResults ? (
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Escenario {currentScenario + 1} de {scenarios.length}</span>
              <span className="text-sm">{Math.round(currentProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${currentProgress}%` }}
              ></div>
            </div>
          </div>
          
          <Card className="mb-6 border-2 border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold">{scenarios[currentScenario].title}</h3>
              </div>
              
              <p className="mb-6 text-gray-700">{scenarios[currentScenario].question}</p>
              
              <div className="space-y-3">
                {scenarios[currentScenario].options.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className={`w-full justify-start text-left py-6 px-4 h-auto ${
                      selections[currentScenario] === option.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleSelectOption(option.id)}
                  >
                    <span className="mr-3 font-bold">{option.id.toUpperCase()}.</span>
                    {option.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={resetSimulator}
            >
              Reiniciar
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-5 w-5 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Este simulador te muestra las consecuencias reales de no cumplir con distintas normativas laborales.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold mb-2">Resultado del simulador</h3>
            <p className="text-gray-600">
              Tu nivel de conocimiento sobre riesgos legales: <span className="font-bold">{calculateRiskScore()}%</span>
            </p>
          </div>
          
          <div className="space-y-6">
            {scenarios.map((scenario, index) => (
              <Card key={scenario.id} className={`border-l-4 ${
                selections[index] === scenario.correctAnswer 
                  ? 'border-l-green-500' 
                  : 'border-l-red-500'
              }`}>
                <CardContent className="p-4">
                  <h4 className="font-bold mb-2">{scenario.title}</h4>
                  
                  <div className="mb-3">
                    <span className="text-sm font-medium">Tu respuesta:</span>
                    <p className={`${
                      selections[index] === scenario.correctAnswer 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {scenario.options.find(o => o.id === selections[index])?.text}
                    </p>
                  </div>
                  
                  {selections[index] !== scenario.correctAnswer && (
                    <div className="mb-3">
                      <span className="text-sm font-medium">Respuesta correcta:</span>
                      <p className="text-green-600">
                        {scenario.options.find(o => o.id === scenario.correctAnswer)?.text}
                      </p>
                    </div>
                  )}
                  
                  <Separator className="my-3" />
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Consecuencia:</span>
                      <p className="text-sm text-gray-700">{scenario.consequence}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">Solución:</span>
                      <p className="text-sm text-gray-700">{scenario.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button
              onClick={resetSimulator}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Volver a realizar el simulador
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
