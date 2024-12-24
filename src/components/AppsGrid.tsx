import type { Database } from "@/integrations/supabase/types";
import AppCard from "./AppCard";
import { Checkbox } from "@/components/ui/checkbox";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppWithMatches extends Company {
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
  score?: number;
  hasMatches?: boolean;
  isSelected?: boolean;
}

interface AppsGridProps {
  apps: AppWithMatches[];
  onAppClick: (app: Company) => void;
  onCompareToggle?: (appId: string) => void;
  showCompare?: boolean;
  highlightedFeatures?: string[];
}

export default function AppsGrid({ 
  apps, 
  onAppClick, 
  onCompareToggle, 
  showCompare = false,
  highlightedFeatures = []
}: AppsGridProps) {
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
        <div key={app.id} className="relative">
          <AppCard
            app={app}
            onClick={() => onAppClick(app)}
            showCompare={showCompare}
            isSelected={app.isSelected}
            onCompareToggle={() => onCompareToggle?.(app.id)}
            highlightedFeatures={highlightedFeatures}
          />
        </div>
      ))}
    </div>
  );
}