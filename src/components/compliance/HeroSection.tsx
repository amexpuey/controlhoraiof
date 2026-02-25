import { Calculator, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onStartTest: () => void;
}

export function HeroSection({ onStartTest }: HeroSectionProps) {
  return (
    <div className="cc-container">
      {/* Urgency Bar */}
      <div className="cc-urgency-bar">
        La Inspección de Trabajo impuso 20,2M€ en sanciones en 2024. ¿Sabes cuánto arriesga tu empresa?
      </div>

      {/* Hero */}
      <div className="cc-hero">
        {/* Regulatory tag */}
        <div className="cc-reg-tag">
          RD 8/2019 · Obligatorio para todas las empresas
        </div>

        <h1 className="cc-h1">
          ¿Tu empresa cumple con el registro horario?
        </h1>

        <p className="cc-sub">
          Responde 5 preguntas y descubre tu nivel de riesgo de sanción. Resultado inmediato. Sin registro.
        </p>

        <button
          onClick={onStartTest}
          className="cc-btn-cta"
        >
          <Calculator className="w-5 h-5" />
          Calcular mi riesgo ahora
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="cc-micro">
          Resultado en &lt; 1 minuto · Online · Sin datos personales
        </p>

        <p className="cc-social-proof">
          Más de 3.000 empresas han calculado su riesgo este año
        </p>
      </div>
    </div>
  );
}
