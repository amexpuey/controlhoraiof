import { useState } from "react";
import AppCard from "../AppCard";
import { FilterSection } from "./FilterSection";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppWithMatches extends Company {
  matchingFeaturesCount: number;
  totalSelectedFeatures: number;
  score: number;
  hasMatches: boolean;
  isSelected: boolean;
}

interface DashboardAppsProps {
  apps: Company[];
  selectedFeatures: string[];
}

export default function DashboardApps({ apps, selectedFeatures }: DashboardAppsProps) {
  const [filteredApps, setFilteredApps] = useState<AppWithMatches[]>([]);
  const [showTopRated, setShowTopRated] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const handleFeatureToggle = (feature: string) => {
    setFilteredApps(prev =>
      prev.map(app => {
        const isSelected = app.features?.includes(feature);
        return {
          ...app,
          hasMatches: isSelected,
          matchingFeaturesCount: isSelected ? app.matchingFeaturesCount + 1 : app.matchingFeaturesCount - 1,
        };
      })
    );
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleAvailabilityToggle = (option: string) => {
    setSelectedAvailability(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  return (
    <div>
      <FilterSection
        selectedFeatures={selectedFeatures}
        onFeatureToggle={handleFeatureToggle}
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
        showTopRated={showTopRated}
        onTopRatedToggle={() => setShowTopRated(!showTopRated)}
        selectedPlatforms={selectedPlatforms}
        onPlatformToggle={handlePlatformToggle}
        selectedAvailability={selectedAvailability}
        onAvailabilityToggle={handleAvailabilityToggle}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            showCompare={false}
          />
        ))}
      </div>
    </div>
  );
}
