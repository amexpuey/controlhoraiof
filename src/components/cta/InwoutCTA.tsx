import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InwoutCTAProps {
  variant?: 'sidebar' | 'banner' | 'inline';
  className?: string;
}

export function InwoutCTA({ variant = 'sidebar', className = '' }: InwoutCTAProps) {
  if (variant === 'banner') {
    return (
      <div className={`rounded-xl p-6 text-center ${className}`} style={{ background: 'var(--green-bg)', border: '1px solid var(--green-light)' }}>
        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
          ¿Necesitas control horario para tu empresa?
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          INWOUT automatiza el fichaje, gestiona ausencias y cumple la normativa. Gratis para empezar.
        </p>
        <a href="https://inwout.com/" target="_blank" rel="noopener noreferrer" className="btn btn-green">
          Prueba INWOUT gratis
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-3 rounded-lg p-4 ${className}`} style={{ background: 'var(--green-bg)', border: '1px solid var(--green-light)' }}>
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>¿Buscas una alternativa?</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Prueba INWOUT gratis</p>
        </div>
        <a href="https://inwout.com/" target="_blank" rel="noopener noreferrer" className="btn btn-green text-sm">
          Probar gratis
        </a>
      </div>
    );
  }

  // sidebar variant
  return (
    <div className={`sticky top-24 rounded-xl p-6 ${className}`} style={{ background: 'var(--white)', border: '1px solid var(--border)', boxShadow: '0 4px 24px rgba(0,0,0,.06)' }}>
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--green-bg)' }}>
          <span className="text-xl font-bold" style={{ color: 'var(--green)' }}>IW</span>
        </div>
        <h3 className="font-bold mb-1" style={{ color: 'var(--text)' }}>Prueba INWOUT</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Control horario automatizado, gestión de ausencias y cumplimiento legal. Todo en uno.
        </p>
        <a href="https://inwout.com/" target="_blank" rel="noopener noreferrer" className="btn btn-green w-full">
          Empezar gratis
          <ExternalLink className="h-4 w-4" />
        </a>
        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Sin tarjeta de crédito</p>
      </div>
    </div>
  );
}
