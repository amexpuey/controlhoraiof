import { Badge } from '@/components/ui/badge';

interface SolutionHeroProps {
  solution: any;
}

export function SolutionHero({ solution }: SolutionHeroProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center overflow-hidden shrink-0">
        {solution.logo_url ? (
          <img src={solution.logo_url} alt={solution.title} className="w-full h-full object-contain" />
        ) : (
          <span className="text-xl font-bold text-muted-foreground">{solution.title?.charAt(0)}</span>
        )}
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{solution.title}</h1>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {solution.verified && <Badge variant="outline">Verificada</Badge>}
          {solution.is_top_rated && <Badge variant="secondary">Top Rated</Badge>}
          {solution.is_free && <Badge className="bg-green-100 text-green-800 border-green-200">Gratis</Badge>}
          {solution.is_promoted && <Badge>⭐ Recomendada</Badge>}
        </div>
      </div>
    </div>
  );
}
