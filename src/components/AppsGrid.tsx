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
}

export default function AppsGrid({ apps, onAppClick, onCompareToggle, showCompare = false }: AppsGridProps) {
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
          {showCompare && (
            <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow p-2">
              <Checkbox
                checked={app.isSelected}
                onCheckedChange={() => onCompareToggle?.(app.id)}
                id={`compare-${app.id}`}
              />
              <label
                htmlFor={`compare-${app.id}`}
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Comparar
              </label>
            </div>
          )}
          <AppCard
            app={app}
            onClick={() => onAppClick(app)}
          />
          {!app.hasMatches && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                Aplicación Adicional
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}