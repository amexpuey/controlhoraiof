
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
    hint: "Excel no cumple este requisito (STJUE C-55/18)",
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

export const questionBlocks = [
  { id: "Registro de Jornada", emoji: "🟢", title: "Registro de Jornada", color: "#10b981" },
  { id: "Horas Extras y Jornada", emoji: "🟡", title: "Horas Extras y Jornada", color: "#f59e0b" },
  { id: "Pago y Transparencia", emoji: "🔴", title: "Pago y Transparencia", color: "#ef4444" }
];

export const sanctionTypes = [
  { id: "no_registro", label: "No llevar registro horario", baseAmount: 625, maxAmount: 6250, level: "grave" },
  { id: "registro_incompleto", label: "Registro incompleto o inadecuado", baseAmount: 625, maxAmount: 6250, level: "grave" },
  { id: "no_conservacion", label: "No conservar registros por 4 años", baseAmount: 60, maxAmount: 625, level: "leve" },
  { id: "no_trazabilidad", label: "Sistema sin trazabilidad (ej. Excel)", baseAmount: 625, maxAmount: 6250, level: "grave" },
  { id: "horas_extra", label: "No controlar horas extraordinarias", baseAmount: 625, maxAmount: 6250, level: "grave" },
  { id: "no_comunicacion", label: "No informar a representantes", baseAmount: 625, maxAmount: 6250, level: "grave" },
  { id: "limites_jornada", label: "No respetar límites de jornada", baseAmount: 625, maxAmount: 6250, level: "grave" },
  { id: "teletrabajo", label: "Teletrabajo sin registro horario", baseAmount: 625, maxAmount: 6250, level: "grave" },
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
    infraction: "No respetar límites de jornada",
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
