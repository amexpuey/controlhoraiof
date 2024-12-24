import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "./FilterSection";
import AppsGrid from "@/components/AppsGrid";
import { useAppsFiltering } from "./useAppsFiltering";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface DashboardAppsProps {
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loading?: boolean;
}

export default function DashboardApps({
  selectedFeatures = [],
  onFeatureToggle,
  searchQuery = "",
  setSearchQuery,
  loading = false
}: DashboardAppsProps) {
  const navigate = useNavigate();
  const [showTopRated, setShowTopRated] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const { filteredApps } = useAppsFiltering(
    selectedFeatures,
    searchQuery,
    showTopRated,
    selectedAvailability
  );

  const handleAvailabilityToggle = (option: string) => {
    setSelectedAvailability(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  // Split apps into two groups: first 6 and the rest
  const firstSixApps = filteredApps.slice(0, 6);
  const remainingApps = filteredApps.slice(6);

  return (
    <div className="space-y-8">
      <FilterSection
        selectedFeatures={selectedFeatures}
        onFeatureToggle={onFeatureToggle}
        selectedTypes={[]}
        onTypeToggle={() => {}}
        showTopRated={showTopRated}
        onTopRatedToggle={() => setShowTopRated(!showTopRated)}
        selectedAvailability={selectedAvailability}
        onAvailabilityToggle={handleAvailabilityToggle}
      />

      {/* First 6 apps */}
      <AppsGrid
        apps={firstSixApps}
        onAppClick={(app) => navigate(`/mejores-apps-control-horario/${app.slug}`)}
        highlightedFeatures={selectedFeatures}
      />

      {/* Remaining apps */}
      {remainingApps.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-8">Más aplicaciones para comparar</h2>
          <AppsGrid
            apps={remainingApps}
            onAppClick={(app) => navigate(`/mejores-apps-control-horario/${app.slug}`)}
            highlightedFeatures={selectedFeatures}
          />
        </div>
      )}
    </div>
  );
}