import { ClipboardList, BarChart3, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Paso 1 · Responde",
    description: "5 preguntas sobre tu sistema actual de registro horario"
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Paso 2 · Análisis",
    description: "Evaluamos tu riesgo real según normativa española vigente"
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Paso 3 · Resultado",
    description: "Sabrás exactamente qué riesgo tienes y cómo solucionarlo"
  }
];

const stats = [
  { number: "20,2M€", label: "Sanciones ITSS en 2024" },
  { number: "12.000€", label: "Condena judicial media por trabajador" },
  { number: "90%", label: "Casos ganados por el trabajador sin registro" },
  { number: "1.869", label: "Infracciones de control horario en 2024" }
];

export function HowItWorksSection() {
  return (
    <div className="container mb-12">
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
          ¿Cómo funciona?
        </h2>
        <p className="hero-sub">
          Tres pasos para verificar el cumplimiento de tu empresa
        </p>
      </div>

      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="icon">
              <step.icon className="h-6 w-6" style={{ color: 'var(--teal)' }} />
            </div>
            <div className="step-number">{step.number}</div>
            <h3 className="font-bold text-lg mb-2">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
