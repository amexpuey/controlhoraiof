
export const complianceQuestions = [
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

export const questionBlocks = [
  { id: "Registro de Jornada", emoji: "🟢", title: "Registro de Jornada" },
  { id: "Control de Horas Extras y Límite de Jornada", emoji: "🟡", title: "Control de Horas Extras y Límite de Jornada" },
  { id: "Pago y Transparencia Salarial", emoji: "🔴", title: "Pago y Transparencia Salarial" }
];

export const sanctionTypes = [
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

export const realCases = [
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

export const getCompanySizeMultiplier = (employees: number) => {
  if (employees <= 5) return 1;
  if (employees <= 10) return 1.2;
  if (employees <= 25) return 1.5;
  if (employees <= 50) return 1.8;
  if (employees <= 100) return 2.2;
  return 2.5;
};

export const getDurationMultiplier = (months: number) => {
  if (months <= 1) return 1;
  if (months <= 3) return 1.3;
  if (months <= 6) return 1.7;
  if (months <= 12) return 2;
  return 2.5;
};

export const getRiskColor = (level: string) => {
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
