import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InwoutCTAProps {
  variant?: 'sidebar' | 'banner' | 'inline';
  className?: string;
}

export function InwoutCTA({ variant = 'sidebar', className = '' }: InwoutCTAProps) {
  if (variant === 'banner') {
    return (
      <div className={`bg-primary/5 border border-primary/20 rounded-xl p-6 text-center ${className}`}>
        <h3 className="text-lg font-bold text-foreground mb-2">
          ¿Necesitas control horario para tu empresa?
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          INWOUT automatiza el fichaje, gestiona ausencias y cumple la normativa. Gratis para empezar.
        </p>
        <Button asChild className="gap-2">
          <a href="https://inwout.com/" target="_blank" rel="noopener noreferrer">
            Prueba INWOUT gratis
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-lg p-4 ${className}`}>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">¿Buscas una alternativa?</p>
          <p className="text-xs text-muted-foreground">Prueba INWOUT gratis</p>
        </div>
        <Button size="sm" asChild>
          <a href="https://inwout.com/" target="_blank" rel="noopener noreferrer">
            Probar gratis
          </a>
        </Button>
      </div>
    );
  }

  // sidebar variant
  return (
    <div className={`sticky top-24 bg-card border border-border rounded-xl p-6 shadow-sm ${className}`}>
      <div className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
          <span className="text-xl font-bold text-primary">IW</span>
        </div>
        <h3 className="font-bold text-foreground mb-1">Prueba INWOUT</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Control horario automatizado, gestión de ausencias y cumplimiento legal. Todo en uno.
        </p>
        <Button asChild className="w-full gap-2">
          <a href="https://inwout.com/" target="_blank" rel="noopener noreferrer">
            Empezar gratis
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <p className="text-xs text-muted-foreground mt-2">Sin tarjeta de crédito</p>
      </div>
    </div>
  );
}
