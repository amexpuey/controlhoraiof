import { ClipboardList, BarChart3, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Responde",
    description: "5 preguntas sobre tu sistema actual"
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Analizamos",
    description: "Tu riesgo según normativa vigente"
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Resultado",
    description: "Qué riesgo tienes y cómo evitarlo"
  }
];

const stats = [
  { number: "7.500€", label: "Sanción máxima por infracción" },
  { number: "12.000€", label: "Condena judicial media por trabajador" },
  { number: "1.869", label: "Empresas sancionadas en 2024" }
];

export function HowItWorksSection() {
  return (
    <div className="s-light">
      <div className="container">
        {/* Stats Grid */}
        <div className="results-grid" style={{ marginBottom: '48px' }}>
          {stats.map((stat, index) => (
            <div key={index} className="result-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="result-num dark">{stat.number}</div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="s-head s-center" style={{ marginBottom: '32px' }}>
          <div className="s-label">Cómo funciona</div>
          <h2>Verifica tu cumplimiento en 3 pasos</h2>
        </div>

        <div className="trio">
          {steps.map((step, index) => (
            <div key={index} className="tile">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                   style={{ background: 'var(--green-bg)', border: '1px solid var(--green-light)' }}>
                <step.icon className="h-6 w-6" style={{ color: 'var(--green)' }} />
              </div>
              <div className="step-num" style={{ color: 'var(--green)', marginBottom: '4px' }}>{step.number}</div>
              <h4 className="font-bold text-lg mb-2">
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
