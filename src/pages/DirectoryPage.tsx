import { useState } from 'react';
import { useSolutions } from '@/hooks/useSolutions';
import { SolutionCard } from '@/components/directory/SolutionCard';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';

export default function DirectoryPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'title' | 'rating'>('rank');
  const [page, setPage] = useState(1);
  const [showFree, setShowFree] = useState(false);
  const [showTopRated, setShowTopRated] = useState(false);

  const { data, isLoading } = useSolutions({
    search: search || undefined,
    isFree: showFree || undefined,
    isTopRated: showTopRated || undefined,
    sortBy,
    page,
    perPage: 24,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Directorio de Software de Control Horario en España',
    description: 'Compara las mejores soluciones de control horario y fichaje para empresas en España.',
    url: 'https://fichajeempresas.es/directorio',
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--white)' }}>
      <SEOHead
        title="Directorio de Software de Control Horario en España 2026 | FichajesEmpresas.es"
        description="Compara +90 soluciones de control horario y fichaje para empresas en España. Filtros por funcionalidad, precio y valoración."
        canonical="https://fichajeempresas.es/directorio"
        jsonLd={jsonLd}
      />

      <AppHeader />

      {/* Hero */}
      <div className="hero">
        <div className="container text-center py-6">
          <div className="kicker mx-auto">
            <span className="kicker-dot"></span>
            Directorio 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--dark-text)' }}>
            Directorio de <span className="accent">Control Horario</span>
          </h1>
          <p className="lead max-w-2xl mx-auto mb-8">
            Compara {data?.total || '90+'} soluciones de fichaje y control horario para empresas en España
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav items={[
          { label: 'Inicio', href: '/' },
          { label: 'Directorio' },
        ]} />

        {/* Filters bar */}
        <div className="flex flex-col md:flex-row gap-3 mt-6 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-muted)' }} />
            <Input
              placeholder="Buscar solución..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-10 px-3 rounded-[var(--radius-xs)] text-sm font-medium"
            style={{ background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            <option value="rank">Relevancia</option>
            <option value="title">Nombre A-Z</option>
            <option value="rating">Valoración</option>
          </select>

          <div className="flex gap-2">
            <button
              className="chip"
              onClick={() => { setShowFree(!showFree); setPage(1); }}
              style={showFree ? { background: 'var(--green-bg)', borderColor: 'var(--green)', color: 'var(--green-dark)' } : {}}
            >
              Gratis
            </button>
            <button
              className="chip"
              onClick={() => { setShowTopRated(!showTopRated); setPage(1); }}
              style={showTopRated ? { background: 'var(--green-bg)', borderColor: 'var(--green)', color: 'var(--green-dark)' } : {}}
            >
              Mejor valoradas
            </button>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-xl" style={{ background: 'var(--surface-alt)' }} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.solutions.map(sol => (
                <SolutionCard key={sol.id} solution={sol} />
              ))}
            </div>

            {data && data.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  className="btn btn-outline"
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </button>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Página {page} de {data.totalPages}
                </span>
                <button
                  className="btn btn-outline"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage(p => p + 1)}
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
