import { Clock, BarChart3, Calculator } from "lucide-react";

const steps = [
  {
    icon: Clock,
    title: "Paso 1 · Responde",
    description: "Contesta 12 preguntas sobre tu control horario actual"
  },
  {
    icon: BarChart3,
    title: "Paso 2 · Análisis", 
    description: "Analizamos tu cumplimiento normativo al instante"
  },
  {
    icon: Calculator,
    title: "Paso 3 · Calcula sanciones",
    description: "Te mostramos el riesgo económico y cómo evitarlo"
  }
];

export function HowItWorksSection() {
  return (
    <div className="container mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-strong)' }}>
          ¿Cómo funciona?
        </h2>
        <p className="hero-sub" style={{ color: 'var(--text)' }}>
          Tres pasos simples para verificar el cumplimiento de tu empresa
        </p>
      </div>
      
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="icon">
              <step.icon className="h-6 w-6" style={{ color: 'var(--brand)' }} />
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-strong)' }}>
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}