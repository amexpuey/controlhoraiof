import { MessageSquare, BarChart3, Shield } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Responde",
    description: "5 preguntas sobre tu sistema actual de registro horario"
  },
  {
    num: "02",
    icon: BarChart3,
    title: "Análisis",
    description: "Evaluamos tu riesgo real según normativa española vigente"
  },
  {
    num: "03",
    icon: Shield,
    title: "Resultado",
    description: "Sabrás exactamente qué riesgo tienes y cómo solucionarlo"
  }
];

export function HowItWorksSection() {
  return (
    <div className="cc-container cc-section">
      <h2 className="cc-h2">¿Cómo funciona?</h2>
      <p className="cc-sub-center">Tres pasos simples para verificar el cumplimiento de tu empresa</p>

      <div className="cc-steps">
        {steps.map((step) => (
          <div key={step.num} className="cc-step-card">
            <span className="cc-step-num">{step.num}</span>
            <div className="cc-step-icon">
              <step.icon className="w-5 h-5" />
            </div>
            <h3 className="cc-step-title">Paso {step.num} · {step.title}</h3>
            <p className="cc-step-desc">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
