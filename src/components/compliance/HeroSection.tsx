interface HeroSectionProps {
  onStartTest: () => void;
}

export function HeroSection({ onStartTest }: HeroSectionProps) {
  return (
    <div className="hero">
      {/* Urgency Bar */}
      <div className="urgency-bar">
        En 2024, la Inspección de Trabajo sancionó a 1.869 empresas por control horario. ¿Es la tuya la siguiente?
      </div>

      <div className="container">
        <div className="text-center py-6">
          <div className="kicker mx-auto">
            <span className="kicker-dot"></span>
            RD 8/2019 · Vigente desde mayo 2019
          </div>

          <h1 className="hero-title font-bold">
            ¿Cuánto arriesga tu empresa?
          </h1>

          <p className="lead mb-8 max-w-2xl mx-auto">
            Responde 5 preguntas. Descubre tu nivel de riesgo real. Sin registro, sin datos personales.
          </p>

          <button
            onClick={onStartTest}
            className="btn btn-green btn-lg btn-breathing mb-4 text-lg font-semibold mx-auto"
          >
            Calcular mi riesgo ahora →
          </button>

          <p className="text-sm mb-6" style={{ color: 'var(--dark-muted)' }}>
            Resultado en menos de 1 minuto
          </p>
        </div>
      </div>
    </div>
  );
}
