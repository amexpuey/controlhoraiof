import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onStartTest: () => void;
}

export function HeroSection({ onStartTest }: HeroSectionProps) {
  return (
    <div className="hero">
      {/* Urgency Bar */}
      <div className="urgency-bar">
        La Inspección de Trabajo impuso 20,2M€ en sanciones en 2024. ¿Sabes cuánto arriesga tu empresa?
      </div>

      <div className="container">
        <div className="text-center py-6">
          {/* Regulatory tag */}
          <div className="kicker mx-auto">
            <span className="kicker-dot"></span>
            RD 8/2019 · Obligatorio para todas las empresas
          </div>

          <h1 className="hero-title font-bold">
            ¿Tu empresa cumple con el registro horario?
          </h1>

          <p className="lead mb-8 max-w-2xl mx-auto">
            Responde 5 preguntas y descubre tu nivel de riesgo de sanción. Resultado inmediato. Sin registro.
          </p>

          <button
            onClick={onStartTest}
            className="btn btn-green btn-lg btn-breathing mb-4 text-lg font-semibold mx-auto"
          >
            Calcular mi riesgo ahora
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-sm mb-6" style={{ color: 'var(--dark-muted)' }}>
            Resultado en &lt; 1 minuto · Online · Sin datos personales
          </p>

          <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,.40)' }}>
            Más de 3.000 empresas han calculado su riesgo este año
          </p>
        </div>
      </div>
    </div>
  );
}
