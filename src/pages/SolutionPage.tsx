import { useParams, Link } from 'react-router-dom';
import { useSolution, useRelatedSolutions } from '@/hooks/useSolutions';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { FeatureChecklist, featureKeys } from '@/components/solution/FeatureChecklist';
import { InwoutCTA } from '@/components/cta/InwoutCTA';
import { SolutionCard } from '@/components/directory/SolutionCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Globe, MessageSquare } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { SolutionHero } from '@/components/solution/SolutionHero';
import { SolutionSocialLinks } from '@/components/solution/SolutionSocialLinks';

export default function SolutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: solution, isLoading, error } = useSolution(slug || '');
  const { data: related } = useRelatedSolutions(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !solution) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Solución no encontrada</h1>
          <Button asChild><Link to="/directorio">Volver al directorio</Link></Button>
        </div>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: solution.title,
    description: solution.description,
    url: solution.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: solution.pricing_starting_price || '0',
      priceCurrency: solution.pricing_currency || 'EUR',
    },
  };

  const sol = solution as Record<string, unknown>;
  const social = (solution as any).social as Record<string, string> | null;
  const screenshotUrl = (solution as any).screenshot_url as string | null;
  const ogImage = (solution as any).og_image as string | null;
  const heroImage = screenshotUrl || ogImage || solution.img_url;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${solution.title} - Opiniones, Precios y Alternativas 2026 | FichajesEmpresas.es`}
        description={`Análisis completo de ${solution.title}: funcionalidades, precios, opiniones y alternativas. Compara con INWOUT y otras soluciones de control horario.`}
        canonical={`https://fichajeempresas.es/directorio/${slug}`}
        jsonLd={jsonLd}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav items={[
          { label: 'Inicio', href: '/' },
          { label: 'Directorio', href: '/directorio' },
          { label: solution.title || '' },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Screenshot hero */}
            {heroImage && (
              <div className="rounded-xl overflow-hidden border border-border">
                <img
                  src={heroImage}
                  alt={`Captura de pantalla de ${solution.title}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Hero */}
            <SolutionHero solution={solution} />

            {/* Social links */}
            {social && Object.keys(social).length > 0 && (
              <SolutionSocialLinks social={social} />
            )}

            <p className="text-muted-foreground leading-relaxed">
              {solution.long_description || solution.description}
            </p>

            {solution.url && (
              <Button variant="outline" asChild>
                <a href={solution.redirect_url || solution.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                  <Globe className="h-4 w-4" />
                  Visitar web
                </a>
              </Button>
            )}

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Funcionalidades</CardTitle>
              </CardHeader>
              <CardContent>
                <FeatureChecklist company={sol} />
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Precios</CardTitle>
              </CardHeader>
              <CardContent>
                {solution.pricing_starting_price && Number(solution.pricing_starting_price) > 0 ? (
                  <div>
                    <span className="text-2xl font-bold text-foreground">
                      {solution.pricing_starting_price}€
                    </span>
                    <span className="text-muted-foreground">/{solution.pricing_billing_period || 'mes'}</span>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Consultar precios en su web
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Reviews placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Opiniones de usuarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Aún no hay opiniones de {solution.title}. ¿Has usado esta herramienta?
                </p>
              </CardContent>
            </Card>

            {/* Quick comparison vs INWOUT */}
            {!solution.is_promoted && (
              <Card>
                <CardHeader>
                  <CardTitle>Comparativa rápida: {solution.title} vs INWOUT</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Funcionalidad</th>
                          <th className="text-center py-2 px-4 font-medium">{solution.title}</th>
                          <th className="text-center py-2 px-4 font-medium text-primary">INWOUT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {featureKeys.slice(0, 10).map(key => (
                          <tr key={key} className="border-b border-border/50">
                            <td className="py-2 pr-4 text-muted-foreground">{key.replace('has_', '').replace(/_/g, ' ')}</td>
                            <td className="text-center py-2 px-4">{sol[key] ? '✅' : '❌'}</td>
                            <td className="text-center py-2 px-4">✅</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/comparar/${slug}-vs-inwout`}>
                        Ver comparativa completa
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <InwoutCTA variant="sidebar" />

            {/* Compare links */}
            {!solution.is_promoted && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Comparar con</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to={`/comparar/${slug}-vs-inwout`} className="block text-sm text-primary hover:underline">
                    {solution.title} vs INWOUT
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Related solutions */}
        {related && related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Soluciones relacionadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.slice(0, 6).map(sol => (
                <SolutionCard key={sol.id} solution={sol} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
