import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onStartTest: () => void;
}

export function HeroSection({ onStartTest }: HeroSectionProps) {
  return (
    <>
      {/* Urgency Bar */}
      <div className="urgency-bar">
        La Inspección de Trabajo impuso 20,2M€ en sanciones en 2024. ¿Sabes cuánto arriesga tu empresa?
      </div>

      <div className="container">
        <div className="hero-shell">
          <div className="text-center py-6">
            {/* Regulatory tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                 style={{ background: 'var(--teal-glow)', border: '1px solid rgba(15,184,159,.25)' }}>
              <span className="text-sm font-semibold" style={{ color: 'var(--teal)' }}>
                RD 8/2019 · Obligatorio para todas las empresas
              </span>
            </div>

            <h1 className="hero-title font-bold" style={{ color: '#ffffff' }}>
              ¿Tu empresa cumple con el registro horario?
            </h1>

            <p className="hero-sub mb-8 max-w-2xl mx-auto">
              Responde 5 preguntas y descubre tu nivel de riesgo de sanción. Resultado inmediato. Sin registro.
            </p>

            <button
              onClick={onStartTest}
              className="btn btn-primary btn-breathing btn-full mb-4 text-lg font-semibold"
              style={{ padding: '18px 32px', fontSize: '17px' }}
            >
              Calcular mi riesgo ahora
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-sm mb-6" style={{ color: 'var(--muted-text)' }}>
              Resultado en &lt; 1 minuto · Online · Sin datos personales
            </p>

            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,.40)' }}>
              Más de 3.000 empresas han calculado su riesgo este año
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
