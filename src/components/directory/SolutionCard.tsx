import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ExternalLink, Crown, Sparkles } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';
import inwoutLogo from '@/assets/inwout-logo.png';
import { trackSolutionClick, trackExternalLinkClick } from '@/lib/analytics';

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

  if (isInwout) {
    return (
      <div
        className="group relative overflow-hidden rounded-[var(--radius)] transition-all duration-300 col-span-1 md:col-span-2"
        style={{
          background: 'linear-gradient(135deg, #0A1628 0%, #0D2847 50%, #0A1628 100%)',
          border: '1px solid rgba(15,184,159,.3)',
          boxShadow: '0 0 40px -10px rgba(15,184,159,.2), 0 8px 32px -8px rgba(0,0,0,.3)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px -10px rgba(15,184,159,.35), 0 12px 40px -8px rgba(0,0,0,.4)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px -10px rgba(15,184,159,.2), 0 8px 32px -8px rgba(0,0,0,.3)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Animated gradient border glow */}
        <div
          className="absolute inset-0 rounded-[var(--radius)] opacity-60 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(15,184,159,.08) 50%, transparent 100%)',
          }}
        />

        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--green) 30%, var(--green-light) 50%, var(--green) 70%, transparent 100%)',
          }}
        />

        <div className="relative p-6 md:p-7 flex flex-col md:flex-row gap-5 md:gap-8 items-start">
          {/* Logo */}
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden shrink-0 ring-2 ring-[rgba(15,184,159,.3)] shadow-lg">
            <img src={inwoutLogo} alt={solution.title} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1.5">
              <Link to={`/directorio/${solution.slug}`} className="text-lg md:text-xl font-bold text-white transition-colors hover:text-[var(--green)]">
                {solution.title}
              </Link>
              <span
                className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, var(--green), var(--green-dark))',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(15,184,159,.3)',
                }}
              >
                <Crown className="h-3 w-3" />
                Recomendada
              </span>
            </div>

            <p className="text-sm md:text-[15px] leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,.65)' }}>
              Plataforma española de control horario y gestión de ausencias para cumplir el RD 8/2019. Geofencing automático, flujos de aprobación y trazabilidad inmutable según criterios ITSS. Para empresas de 5 a 500 empleados.
            </p>

            {activeFeatures.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {activeFeatures.slice(0, 6).map(f => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md font-medium"
                    style={{
                      background: 'rgba(15,184,159,.1)',
                      color: 'var(--green-light)',
                      border: '1px solid rgba(15,184,159,.15)',
                    }}
                  >
                    <Check className="h-3 w-3 text-[var(--green)]" />
                    {featureLabels[f]}
                  </span>
                ))}
                {activeFeatures.length > 6 && (
                  <span className="text-[11px] px-2 py-1" style={{ color: 'rgba(255,255,255,.4)' }}>
                    +{activeFeatures.length - 6} más
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center gap-3">
              <Button size="sm" asChild className="bg-[var(--green)] hover:bg-[var(--green-dark)] text-white font-semibold px-5 shadow-lg shadow-[rgba(15,184,159,.25)]">
                <Link to={`/directorio/${solution.slug}`} className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Ver ficha completa
                </Link>
              </Button>
              {solution.url && (
                <Button variant="ghost" size="sm" asChild className="text-white/50 hover:text-white hover:bg-white/10">
                  <a href={solution.redirect_url || solution.url} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLinkClick(solution.slug || '', solution.title, solution.redirect_url || solution.url || '')}>
                    Visitar web <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular card (non-promoted)
  return (
    <div
      className="group relative overflow-hidden rounded-[var(--radius)] transition-all"
      style={{
        background: 'var(--white)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--green)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px -6px rgba(15,184,159,.10)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div className="p-5">
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
              <a href={solution.redirect_url || solution.url} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLinkClick(solution.slug || '', solution.title, solution.redirect_url || solution.url || '')}>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
