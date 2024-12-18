import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppWithMatches extends Company {
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
  score?: number;
  hasMatches?: boolean;
}

interface AppsGridProps {
  apps: AppWithMatches[];
  onAppClick: (app: Company) => void;
}

export default function AppsGrid({ apps, onAppClick }: AppsGridProps) {
  if (apps.length === 0) {
    return (
      <div className="text-center text-gray-600">
        No se encontraron aplicaciones que coincidan con tus criterios.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map((app) => (
        <AppCard
          key={app.id}
          app={app}
          onClick={() => onAppClick(app)}
          matchingFeaturesCount={app.matchingFeaturesCount}
          totalSelectedFeatures={app.totalSelectedFeatures}
        />
      ))}
    </div>
  );
}