import { ArrowRight, Shield } from "lucide-react";

interface FinalCTASectionProps {
  onStartTest: () => void;
}

export function FinalCTASection({ onStartTest }: FinalCTASectionProps) {
  return (
    <div className="cc-container cc-section">
      <div className="cc-final-cta">
        <div className="cc-final-icon">
          <Shield className="w-10 h-10" />
        </div>

        <h2 className="cc-h2" style={{ marginBottom: '16px' }}>
          Haz la prueba en 1 minuto y evita sanciones de hasta 7.500 € por trabajador
        </h2>

        <p className="cc-sub-center" style={{ marginBottom: '32px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
          No arriesgues tu empresa a multas innecesarias. Verifica tu cumplimiento normativo ahora mismo y obtén recomendaciones específicas.
        </p>

        <button onClick={onStartTest} className="cc-btn-cta">
          Comenzar verificación gratuita
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="cc-micro">Gratis, online y sin datos personales</p>
      </div>
    </div>
  );
}
