import { Shield } from "lucide-react";

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
              Evita una sanción de hasta 7.500€
            </h3>

            <p className="mx-auto" style={{ maxWidth: '44ch' }}>
              Comprueba ahora si tu empresa cumple con el RD 8/2019.
            </p>
          </div>

          <button
            onClick={onStartTest}
            className="btn btn-green btn-lg"
          >
            Comenzar verificación gratuita →
          </button>
        </div>
      </div>
    </div>
  );
}
