import { useState } from 'react';
import { useSolutions, useCategories } from '@/hooks/useSolutions';
import { SolutionCard } from '@/components/directory/SolutionCard';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { InwoutCTA } from '@/components/cta/InwoutCTA';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Footer } from '@/components/Footer';

export default function DirectoryPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'title' | 'rating'>('rank');
  const [page, setPage] = useState(1);
  const [showFree, setShowFree] = useState(false);
  const [showTopRated, setShowTopRated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { data, isLoading } = useSolutions({
    search: search || undefined,
    isFree: showFree || undefined,
    isTopRated: showTopRated || undefined,
    sortBy,
    page,
    perPage: 24,
  });

  const { data: categories } = useCategories();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Directorio de Software de Control Horario en España',
    description: 'Compara las mejores soluciones de control horario y fichaje para empresas en España. Encuentra la herramienta ideal para tu negocio.',
    url: 'https://fichajeempresas.es/directorio',
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Directorio de Software de Control Horario en España 2026 | FichajesEmpresas.es"
        description="Compara +90 soluciones de control horario y fichaje para empresas en España. Filtros por funcionalidad, precio y valoración. Encuentra la mejor app para tu negocio."
        canonical="https://fichajeempresas.es/directorio"
        jsonLd={jsonLd}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav items={[
          { label: 'Inicio', href: '/' },
          { label: 'Directorio' },
        ]} />

        {/* Header */}
        <div className="mt-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Directorio de Control Horario
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Compara {data?.total || '90+'} soluciones de fichaje y control horario para empresas en España
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar solución..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9"
            />
          </div>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rank">Relevancia</SelectItem>
              <SelectItem value="title">Nombre A-Z</SelectItem>
              <SelectItem value="rating">Valoración</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Badge
              variant={showFree ? 'default' : 'outline'}
              className="cursor-pointer select-none"
              onClick={() => { setShowFree(!showFree); setPage(1); }}
            >
              Gratis
            </Badge>
            <Badge
              variant={showTopRated ? 'default' : 'outline'}
              className="cursor-pointer select-none"
              onClick={() => { setShowTopRated(!showTopRated); setPage(1); }}
            >
              Top Rated
            </Badge>
          </div>
        </div>

        {/* CTA banner */}
        <InwoutCTA variant="banner" className="mb-8" />

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-56 bg-muted animate-pulse rounded-xl" />
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
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {page} de {data.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage(p => p + 1)}
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
