import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ExternalLink, Star } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Company = Database['public']['Tables']['companies']['Row'];

interface SolutionCardProps {
  solution: Company;
}

const featureLabels: Record<string, string> = {
  has_time_tracking: 'Control horario',
  has_mobile_app: 'App móvil',
  has_geolocation: 'Geolocalización',
  has_biometric: 'Biometría',
  has_absence_management: 'Gestión ausencias',
  has_shift_management: 'Gestión turnos',
  has_reports: 'Informes',
  has_api: 'API',
  has_remote_work: 'Teletrabajo',
  has_ai: 'Inteligencia artificial',
  has_employee_portal: 'Portal empleado',
  has_payroll: 'Nóminas',
  has_geofence: 'Geovalla',
};

export function SolutionCard({ solution }: SolutionCardProps) {
  const isInwout = solution.is_promoted;

  const featureKeys = Object.keys(featureLabels) as (keyof typeof featureLabels)[];
  const activeFeatures = featureKeys.filter(k => (solution as Record<string, unknown>)[k]);

  return (
    <div
      className={`group relative overflow-hidden rounded-[var(--radius)] transition-all ${isInwout ? 'shadow-md' : ''}`}
      style={{
        background: 'var(--white)',
        border: isInwout ? '2px solid var(--green)' : '1px solid var(--border)',
      }}
      onMouseEnter={e => {
        if (!isInwout) (e.currentTarget as HTMLElement).style.borderColor = 'var(--green)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px -6px rgba(15,184,159,.10)';
      }}
      onMouseLeave={e => {
        if (!isInwout) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {isInwout && (
        <div className="text-xs text-center py-1 font-semibold" style={{ background: 'var(--green)', color: 'white' }}>
          ⭐ Recomendada
        </div>
      )}
      <div className={`p-5 ${isInwout ? '' : ''}`}>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'var(--surface-alt)' }}>
            {solution.logo_url ? (
              <img src={solution.logo_url} alt={solution.title} className="w-full h-full object-contain" loading="lazy" />
            ) : (
              <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{solution.title?.charAt(0)}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <Link to={`/directorio/${solution.slug}`} className="font-semibold transition-colors line-clamp-1" style={{ color: 'var(--text)' }}>
              {solution.title}
            </Link>
            <div className="flex items-center gap-2 mt-0.5">
              {solution.is_top_rated && (
                <span className="text-[10px] px-1.5 py-0 rounded-full font-medium" style={{ background: 'var(--green-bg)', color: 'var(--green-dark)' }}>Top</span>
              )}
              {solution.verified && (
                <span className="text-[10px] px-1.5 py-0 rounded-full font-medium" style={{ background: 'var(--surface-alt)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>Verificada</span>
              )}
              {solution.is_free && (
                <span className="text-[10px] px-1.5 py-0 rounded-full font-medium" style={{ background: 'var(--green-bg)', color: 'var(--green-dark)' }}>Gratis</span>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm line-clamp-2 mb-3 min-h-[2.5rem]" style={{ color: 'var(--text-secondary)' }}>
          {solution.description}
        </p>

        {activeFeatures.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {activeFeatures.slice(0, 4).map(f => (
              <span key={f} className="inline-flex items-center gap-0.5 text-[11px] px-1.5 py-0.5 rounded" style={{ background: 'var(--surface-alt)', color: 'var(--text-secondary)' }}>
                <Check className="h-3 w-3" style={{ color: 'var(--green)' }} />
                {featureLabels[f]}
              </span>
            ))}
            {activeFeatures.length > 4 && (
              <span className="text-[11px] px-1.5 py-0.5" style={{ color: 'var(--text-muted)' }}>
                +{activeFeatures.length - 4} más
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 mt-auto">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link to={`/directorio/${solution.slug}`}>Ver ficha</Link>
          </Button>
          {solution.url && (
            <Button variant="ghost" size="sm" asChild>
              <a href={solution.redirect_url || solution.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
