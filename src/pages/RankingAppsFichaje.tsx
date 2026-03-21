import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { useRankingApps, type RankedApp } from '@/hooks/useRankingApps';
import { Star, Check, X, Crown, ExternalLink, MapPin, Shield, ArrowRight, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';

type FilterKey = 'all' | 'free' | 'geofence' | 'compliance' | 'cheap';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'free', label: 'Con plan gratuito' },
  { key: 'geofence', label: 'Con geovallado' },
  { key: 'compliance', label: 'Compliance España' },
  { key: 'cheap', label: 'Precio < 3€' },
];

function filterApps(apps: RankedApp[], filter: FilterKey): RankedApp[] {
  if (filter === 'all') return apps;
  return apps.filter(app => {
    const d = app.dbData;
    if (!d) return false;
    switch (filter) {
      case 'free': return d.free_plan === 'yes' || d.is_free;
      case 'geofence': return d.has_geofence;
      case 'compliance': return d.has_time_tracking;
      case 'cheap': return (d.price_per_user_month ?? d.pricing_starting_price ?? 999) < 3;
      default: return true;
    }
  });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className="h-4 w-4"
          fill={i <= Math.round(rating) ? 'var(--yellow)' : 'none'}
          stroke={i <= Math.round(rating) ? 'var(--yellow)' : 'var(--border)'}
        />
      ))}
      <span className="ml-1.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function SpecBadge({ ok, label }: { ok: boolean | null | undefined; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md font-medium"
      style={{
        background: ok ? 'var(--green-bg)' : 'var(--surface-alt)',
        color: ok ? 'var(--green-dark)' : 'var(--text-muted)',
      }}
    >
      {ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      {label}
    </span>
  );
}

function RankingCard({ app }: { app: RankedApp }) {
  const d = app.dbData;
  const isInwout = app.featured;
  const description = d?.description || 'En revisión';
  const rating = d?.rating ?? 4;
  const price = d?.price_per_user_month ?? d?.pricing_starting_price ?? null;
  const hasFree = d?.free_plan === 'yes' || d?.is_free;
  const hasGeofence = d?.has_geofence;
  const hasCompliance = d?.has_time_tracking;

  return (
    <div
      className="relative overflow-hidden rounded-[var(--radius)] transition-all duration-200"
      style={{
        background: isInwout
          ? 'linear-gradient(135deg, #0A1628 0%, #0D2847 100%)'
          : 'var(--white)',
        border: isInwout
          ? '2px solid var(--green)'
          : '1px solid var(--border)',
        boxShadow: isInwout
          ? '0 0 30px -8px rgba(15,184,159,.2)'
          : undefined,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.boxShadow = isInwout
          ? '0 0 40px -8px rgba(15,184,159,.3)'
          : '0 8px 24px -6px rgba(0,0,0,.08)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = isInwout
          ? '0 0 30px -8px rgba(15,184,159,.2)'
          : 'none';
      }}
    >
      <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6 items-start">
        {/* Position */}
        <div
          className="flex items-center justify-center shrink-0 w-12 h-12 rounded-xl font-bold text-lg"
          style={{
            background: isInwout ? 'var(--green)' : 'var(--surface-alt)',
            color: isInwout ? 'white' : 'var(--text)',
          }}
        >
          #{app.position}
        </div>

        {/* Logo */}
        <div
          className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
          style={{
            background: isInwout ? 'rgba(255,255,255,.1)' : 'var(--surface-alt)',
            border: isInwout ? '1px solid rgba(255,255,255,.15)' : '1px solid var(--border)',
          }}
        >
          {d?.logo_url && d.logo_url !== '/placeholder.svg' ? (
            <img src={d.logo_url} alt={app.title} className="w-full h-full object-contain" loading="lazy" />
          ) : (
            <span
              className="text-sm font-bold"
              style={{ color: isInwout ? 'var(--green)' : 'var(--text-muted)' }}
            >
              {app.title.charAt(0)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3
              className="text-base md:text-lg font-bold"
              style={{ color: isInwout ? 'white' : 'var(--text)' }}
            >
              {app.title}
            </h3>
            {isInwout && (
              <span
                className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, var(--green), var(--green-dark))',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(15,184,159,.3)',
                }}
              >
                <Crown className="h-3 w-3" />
                Editor's Choice
              </span>
            )}
            {app.isDraft && (
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: 'var(--yellow-bg)',
                  color: 'var(--yellow)',
                  border: '1px solid rgba(245,166,35,.2)',
                }}
              >
                Ficha en revisión
              </span>
            )}
          </div>

          <p
            className="text-sm line-clamp-2 mb-3"
            style={{ color: isInwout ? 'rgba(255,255,255,.6)' : 'var(--text-secondary)' }}
          >
            {description}
          </p>

          {/* Specs row */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <SpecBadge ok={hasFree} label={hasFree ? 'Plan gratis' : 'Sin plan gratis'} />
            <SpecBadge ok={hasGeofence} label={hasGeofence ? 'Geovallado' : 'Sin geovallado'} />
            <SpecBadge ok={hasCompliance} label={hasCompliance ? 'RD 8/2019' : 'Sin compliance'} />
            {price !== null && (
              <span
                className="inline-flex items-center text-xs px-2 py-1 rounded-md font-medium"
                style={{
                  background: isInwout ? 'rgba(15,184,159,.15)' : 'var(--surface-alt)',
                  color: isInwout ? 'var(--green-light)' : 'var(--text-secondary)',
                }}
              >
                {price === 0 ? 'Gratis' : `${price}€/usuario`}
              </span>
            )}
          </div>

          {/* Rating + CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <StarRating rating={rating} />
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant={isInwout ? 'default' : 'outline'}
                size="sm"
                asChild
                className={isInwout ? 'bg-[var(--green)] hover:bg-[var(--green-dark)] text-white font-semibold shadow-lg shadow-[rgba(15,184,159,.25)]' : ''}
              >
                <Link to={`/directorio/${app.slug}`} className="flex items-center gap-1.5">
                  Ver ficha completa
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
              {isInwout && (
                <Button variant="ghost" size="sm" asChild className="text-white/50 hover:text-white hover:bg-white/10">
                  <a href="https://inwout.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                    Prueba gratis
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RankingAppsFichaje() {
  const { data: apps, isLoading } = useRankingApps();
  const [filter, setFilter] = useState<FilterKey>('all');

  const filtered = apps ? filterApps(apps, filter) : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Las 10 Mejores Apps de Fichaje Laboral 2026',
    description: 'Ranking actualizado de las mejores apps de fichaje para empresas españolas.',
    numberOfItems: 10,
    itemListElement: (apps || []).map(app => ({
      '@type': 'ListItem',
      position: app.position,
      name: app.title,
      url: `https://fichajeempresas.es/directorio/${app.slug}`,
    })),
  };

  return (
    <>
      <SEOHead
        title="Las 10 Mejores Apps de Fichaje Laboral 2026 | FichajeEmpresas.es"
        description="Ranking actualizado de las mejores apps de fichaje para empresas españolas. Comparativa de precios, funcionalidades y cumplimiento del RD 8/2019."
        canonical="https://fichajeempresas.es/ranking-apps-fichaje"
        jsonLd={jsonLd}
      />

      <div style={{ background: 'var(--light)', minHeight: '100vh' }}>
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0A1628 0%, #0D2847 50%, #0A1628 100%)',
            borderBottom: '1px solid rgba(15,184,159,.2)',
          }}
        >
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
            <BreadcrumbNav
              items={[
                { label: 'Inicio', href: '/' },
                { label: 'Ranking Apps Fichaje', href: '/ranking-apps-fichaje' },
              ]}
            />
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-4 mt-4"
              style={{
                background: 'rgba(15,184,159,.15)',
                color: 'var(--green)',
                border: '1px solid rgba(15,184,159,.2)',
              }}
            >
              <Shield className="h-3.5 w-3.5" />
              Actualizado marzo 2026
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Las 10 Mejores Apps de Fichaje Laboral en 2026
            </h1>
            <p className="text-base md:text-lg" style={{ color: 'rgba(255,255,255,.6)' }}>
              Ranking actualizado · Basado en 104 apps analizadas en el directorio FichajeEmpresas.es
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="text-sm font-medium px-4 py-2 rounded-full transition-all"
                style={{
                  background: filter === f.key ? 'var(--green)' : 'var(--white)',
                  color: filter === f.key ? 'white' : 'var(--text-secondary)',
                  border: filter === f.key ? '1px solid var(--green)' : '1px solid var(--border)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Ranking list */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin" style={{ color: 'var(--green)' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-12 rounded-[var(--radius)]"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}
            >
              <p style={{ color: 'var(--text-muted)' }}>
                No hay apps que coincidan con este filtro.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map(app => (
                <RankingCard key={app.slug} app={app} />
              ))}
            </div>
          )}

          {/* Footer CTA */}
          <div
            className="mt-12 text-center p-8 rounded-[var(--radius)]"
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
            }}
          >
            <MessageSquare className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--green)' }} />
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
              ¿No encuentras tu app?
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Sugiere una app de fichaje y la añadiremos al directorio
            </p>
            <Button asChild className="bg-[var(--green)] hover:bg-[var(--green-dark)] text-white">
              <a href="mailto:hola@fichajeempresas.es?subject=Sugerir app de fichaje" className="flex items-center gap-2">
                Sugiere una app
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
