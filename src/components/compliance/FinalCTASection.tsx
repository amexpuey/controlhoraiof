import { ArrowRight, Shield } from "lucide-react";

interface FinalCTASectionProps {
  onStartTest: () => void;
}

export function FinalCTASection({ onStartTest }: FinalCTASectionProps) {
  return (
    <div className="container">
      <div className="glass card-lg text-center mb-8">
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
               style={{ background: 'var(--teal-glow)', border: '1px solid rgba(15,184,159,.25)' }}>
            <Shield className="w-10 h-10" style={{ color: 'var(--teal)' }} />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
            Haz la prueba en 1 minuto y evita sanciones de hasta 7.500€ por infracción
          </h2>

          <p className="hero-sub mb-8 max-w-2xl mx-auto">
            No arriesgues tu empresa. Verifica tu cumplimiento según el RD 8/2019.
          </p>
        </div>

        <button
          onClick={onStartTest}
          className="btn btn-primary btn-full mb-4 text-lg font-semibold"
        >
          Comenzar verificación gratuita
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
          Gratis, online y sin datos personales
        </p>
      </div>
    </div>
  );
}
