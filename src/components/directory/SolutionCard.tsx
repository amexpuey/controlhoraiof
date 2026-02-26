import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ExternalLink, Star } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Company = Database['public']['Tables']['companies']['Row'];

interface SolutionCardProps {
  solution: Company;
}

export function SolutionCard({ solution }: SolutionCardProps) {
  const isInwout = solution.is_promoted;

  // Count active features
  const featureKeys = [
    'has_time_tracking', 'has_mobile_app', 'has_geolocation', 'has_biometric',
    'has_absence_management', 'has_shift_management', 'has_reports', 'has_api',
    'has_remote_work', 'has_ai', 'has_employee_portal', 'has_payroll', 'has_geofence',
  ] as const;
  
  const activeFeatures = featureKeys.filter(k => (solution as Record<string, unknown>)[k]);

  return (
    <Card className={`group relative overflow-hidden transition-all hover:shadow-lg ${isInwout ? 'ring-2 ring-primary shadow-md' : 'hover:border-primary/30'}`}>
      {isInwout && (
        <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-xs text-center py-1 font-semibold">
          ⭐ Recomendada
        </div>
      )}
      <CardContent className={`p-5 ${isInwout ? 'pt-8' : ''}`}>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
            {solution.logo_url ? (
              <img src={solution.logo_url} alt={solution.title} className="w-full h-full object-contain" loading="lazy" />
            ) : (
              <span className="text-xs font-bold text-muted-foreground">{solution.title?.charAt(0)}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <Link to={`/directorio/${solution.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
              {solution.title}
            </Link>
            <div className="flex items-center gap-2 mt-0.5">
              {solution.is_top_rated && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Top</Badge>}
              {solution.verified && <Badge variant="outline" className="text-[10px] px-1.5 py-0">Verificada</Badge>}
              {solution.is_free && <Badge className="text-[10px] px-1.5 py-0 bg-green-100 text-green-800 border-green-200">Gratis</Badge>}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem]">
          {solution.description}
        </p>

        {activeFeatures.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {activeFeatures.slice(0, 4).map(f => (
              <span key={f} className="inline-flex items-center gap-0.5 text-[11px] bg-muted px-1.5 py-0.5 rounded">
                <Check className="h-3 w-3 text-green-600" />
                {f.replace('has_', '').replace(/_/g, ' ')}
              </span>
            ))}
            {activeFeatures.length > 4 && (
              <span className="text-[11px] text-muted-foreground px-1.5 py-0.5">
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
      </CardContent>
    </Card>
  );
}
