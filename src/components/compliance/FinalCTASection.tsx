import { ArrowRight, Shield } from "lucide-react";

interface FinalCTASectionProps {
  onStartTest: () => void;
}

export function FinalCTASection({ onStartTest }: FinalCTASectionProps) {
  return (
    <div className="cta-section">
      <div className="container">
        <div className="cta-box" style={{ flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
          <div className="mb-4">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                 style={{ background: 'var(--green-bg)', border: '1px solid var(--green-light)' }}>
              <Shield className="w-8 h-8" style={{ color: 'var(--green)' }} />
            </div>

            <h3>
              Haz la prueba en 1 minuto y evita sanciones de hasta 7.500€ por infracción
            </h3>

            <p className="mx-auto" style={{ maxWidth: '44ch' }}>
              No arriesgues tu empresa. Verifica tu cumplimiento según el RD 8/2019.
            </p>
          </div>

          <button
            onClick={onStartTest}
            className="btn btn-green btn-lg"
          >
            Comenzar verificación gratuita
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Gratis, online y sin datos personales
          </p>
        </div>
      </div>
    </div>
  );
}
