import { Clock, BarChart3, Calculator } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Responde",
      description: "Responde a las preguntas sobre cómo gestiona tu empresa el registro de jornada y otros aspectos laborales.",
      icon: Clock,
      color: "var(--brand-teal)"
    },
    {
      number: 2,
      title: "Análisis",
      description: "Recibe un análisis personalizado de los posibles riesgos e incumplimientos normativos que podría tener tu empresa.",
      icon: BarChart3,
      color: "var(--brand-lime)"
    },
    {
      number: 3,
      title: "Calcula sanciones",
      description: "Utiliza la calculadora interactiva para estimar posibles sanciones según el tamaño de tu empresa y tipo de incumplimiento.",
      icon: Calculator,
      color: "var(--success)"
    }
  ];

  return (
    <div className="container mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--ink-900)' }}>
          ¿Cómo funciona?
        </h2>
        <p className="hero-sub">
          Tres pasos simples para verificar el cumplimiento de tu empresa
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div 
              key={step.number}
              className="glass card-lg text-center transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <div className="mb-4">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center glass"
                  style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)` }}
                >
                  <Icon className="w-8 h-8" style={{ color: step.color }} />
                </div>
                <div 
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mb-2"
                  style={{ 
                    background: 'var(--g-brand)',
                    color: 'var(--ink-900)'
                  }}
                >
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--ink-900)' }}>
                Paso {step.number} · {step.title}
              </h3>
              
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}