
import { ComplianceQuestion, QuestionBlock } from "./types";

export const complianceQuestions: ComplianceQuestion[] = [
  {
    id: "q1",
    question: "¿Llevas un registro horario de las jornadas laborales de todos los empleados?",
    block: "Registro de Jornada",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q2",
    question: "¿El registro incluye la hora exacta de entrada y salida de cada trabajador?",
    block: "Registro de Jornada",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q3",
    question: "¿Se conservan los registros durante al menos 4 años accesibles para la Inspección?",
    block: "Registro de Jornada",
    riskLevel: "leve",
    sanction: "€60 - €625"
  },
  {
    id: "q4",
    question: "¿Tu sistema de registro es inmodificable y deja trazabilidad de cambios?",
    block: "Registro de Jornada",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q5",
    question: "¿Tu empresa controla el número de horas extraordinarias realizadas?",
    block: "Horas Extras y Jornada",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q6",
    question: "¿Se informa a los representantes de los trabajadores sobre las horas extras?",
    block: "Horas Extras y Jornada",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q7",
    question: "¿Tu empresa respeta los límites legales de jornada y trabajo nocturno?",
    block: "Horas Extras y Jornada",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q8",
    question: "¿Los empleados en teletrabajo también llevan registro horario?",
    block: "Horas Extras y Jornada",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q9",
    question: "¿Se pagan todas las horas extras realizadas?",
    block: "Pago y Transparencia",
    riskLevel: "muy grave",
    sanction: "€6.251 - €187.515"
  },
  {
    id: "q10",
    question: "¿Las horas extras aparecen reflejadas en la nómina?",
    block: "Pago y Transparencia",
    riskLevel: "grave",
    sanction: "€625 - €6.250"
  },
  {
    id: "q11",
    question: "¿Hay retrasos reiterados en el pago del salario?",
    block: "Pago y Transparencia",
    riskLevel: "muy grave",
    sanction: "€6.251 - €187.515",
    invertedLogic: true
  }
];

export const questionBlocks: QuestionBlock[] = [
  { id: "Registro de Jornada", emoji: "🟢", title: "Registro de Jornada" },
  { id: "Horas Extras y Jornada", emoji: "🟡", title: "Horas Extras y Jornada" },
  { id: "Pago y Transparencia", emoji: "🔴", title: "Pago y Transparencia" }
];
