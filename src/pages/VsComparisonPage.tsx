import { useParams, Link } from 'react-router-dom';
import { useSolution } from '@/hooks/useSolutions';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { InwoutCTA } from '@/components/cta/InwoutCTA';
import { featureKeys, getFeatureLabel } from '@/components/solution/FeatureChecklist';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, ExternalLink } from 'lucide-react';
import { Footer } from '@/components/Footer';

export default function VsComparisonPage() {
  const { slugs } = useParams<{ slugs: string }>();
  const parts = slugs?.split('-vs-') || [];
  const slug1 = parts[0] || '';
  const slug2 = parts[1] || '';

  const { data: sol1, isLoading: l1 } = useSolution(slug1);
  const { data: sol2, isLoading: l2 } = useSolution(slug2);

  if (l1 || l2) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!sol1 || !sol2) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Comparativa no disponible</h1>
          <p className="text-muted-foreground mb-4">No se encontraron las soluciones solicitadas.</p>
          <Button asChild><Link to="/directorio">Volver al directorio</Link></Button>
        </div>
      </div>
    );
  }

  const s1 = sol1 as Record<string, unknown>;
  const s2 = sol2 as Record<string, unknown>;

  const s1Features = featureKeys.filter(k => s1[k]);
  const s2Features = featureKeys.filter(k => s2[k]);

  const isInwoutInComparison = sol1.is_promoted || sol2.is_promoted;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${sol1.title} vs ${sol2.title} - Comparativa 2026 | FichajesEmpresas.es`}
        description={`Comparativa detallada entre ${sol1.title} y ${sol2.title}: funcionalidades, precios y opiniones. Descubre cuál es mejor para tu empresa.`}
        canonical={`https://fichajeempresas.es/comparar/${slugs}`}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav items={[
          { label: 'Inicio', href: '/' },
          { label: 'Directorio', href: '/directorio' },
          { label: `${sol1.title} vs ${sol2.title}` },
        ]} />

        <div className="mt-6 mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {sol1.title} vs {sol2.title}
          </h1>
          <p className="text-muted-foreground mt-2">Comparativa de funcionalidades y características 2026</p>
        </div>

        {/* Header cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[sol1, sol2].map((sol) => (
            <Card key={sol.id} className={sol.is_promoted ? 'ring-2 ring-primary' : ''}>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto mb-2 overflow-hidden">
                  {sol.logo_url ? (
                    <img src={sol.logo_url} alt={sol.title} className="w-full h-full object-contain" />
                  ) : (
                    <span className="font-bold text-muted-foreground">{sol.title?.charAt(0)}</span>
                  )}
                </div>
                <h2 className="font-bold text-foreground">{sol.title}</h2>
                <div className="flex justify-center gap-1 mt-1">
                  {sol.is_promoted && <Badge>Recomendada</Badge>}
                  {sol.is_free && <Badge variant="secondary">Gratis</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {(featureKeys.filter(k => (sol as Record<string, unknown>)[k])).length} funcionalidades
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Comparativa de funcionalidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 pr-4 font-medium text-muted-foreground">Funcionalidad</th>
                    <th className={`text-center py-3 px-4 font-medium ${sol1.is_promoted ? 'text-primary' : ''}`}>{sol1.title}</th>
                    <th className={`text-center py-3 px-4 font-medium ${sol2.is_promoted ? 'text-primary' : ''}`}>{sol2.title}</th>
                  </tr>
                </thead>
                <tbody>
                  {featureKeys.map(key => (
                    <tr key={key} className="border-b border-border/50">
                      <td className="py-3 pr-4">{getFeatureLabel(key)}</td>
                      <td className="text-center py-3 px-4">
                        {s1[key] ? <Check className="h-5 w-5 text-green-600 mx-auto" /> : <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />}
                      </td>
                      <td className="text-center py-3 px-4">
                        {s2[key] ? <Check className="h-5 w-5 text-green-600 mx-auto" /> : <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Verdict */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Veredicto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              <strong>{sol1.title}</strong> ofrece {s1Features.length} funcionalidades mientras que{' '}
              <strong>{sol2.title}</strong> ofrece {s2Features.length}.{' '}
              {!isInwoutInComparison && (
                <>
                  Si buscas una alternativa completa, te recomendamos probar{' '}
                  <Link to="/directorio/inwout" className="text-primary font-medium hover:underline">INWOUT</Link>,
                  que ofrece todas las funcionalidades en una sola plataforma.
                </>
              )}
            </p>
          </CardContent>
        </Card>

        {!isInwoutInComparison && <InwoutCTA variant="banner" className="mb-8" />}

        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link to={`/directorio/${slug1}`}>Ver {sol1.title}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/directorio/${slug2}`}>Ver {sol2.title}</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
