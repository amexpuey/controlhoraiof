import { Calculator, CheckCircle } from "lucide-react";

interface HeroSectionProps {
  onStartTest: () => void;
}

export function HeroSection({ onStartTest }: HeroSectionProps) {
  return (
    <div className="container">
      {/* Mock Safari Browser Bar */}
      <div className="glass mb-8 p-4 rounded-[20px] border-2 border-white/40">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="glass px-4 py-2 rounded-full flex-1 mx-4">
            <div className="text-sm" style={{ color: 'var(--ink-700)' }}>
              🔒 inwout.com/verificador-cumplimiento-horario
            </div>
          </div>
        </div>
        
        <div className="text-center py-8">
          <h1 className="hero-title font-bold" style={{ color: 'var(--ink-900)' }}>
            Verificador de Cumplimiento Normativo
            <br />
            <span style={{ background: 'var(--g-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Control Horario
            </span>
          </h1>
          
          <p className="hero-sub mb-8 max-w-2xl mx-auto">
            Comprueba si tu empresa cumple con la normativa laboral de registro horario en España y evita posibles sanciones de hasta 187.515€.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="badge glass">
              <CheckCircle className="w-4 h-4" style={{ color: 'var(--success)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--ink-900)' }}>
                Gratis y sin registros
              </span>
            </div>
            <div className="badge glass">
              <CheckCircle className="w-4 h-4" style={{ color: 'var(--success)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--ink-900)' }}>
                Evita multas
              </span>
            </div>
          </div>
          
          <button 
            onClick={onStartTest}
            className="btn btn-primary btn-breathing mb-4 text-lg font-semibold"
          >
            <Calculator className="w-6 h-6" />
            Calcular mi riesgo ahora
          </button>
          
          <p className="text-sm" style={{ color: 'var(--ink-400)' }}>
            Gratis, online y sin datos · resultado en &lt; 1 minuto
          </p>
        </div>
      </div>
    </div>
  );
}