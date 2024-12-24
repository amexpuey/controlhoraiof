import { useState } from "react";
import AppCard from "../AppCard";
import { FilterSection } from "./FilterSection";
import type { Database } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppWithMatches extends Company {
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
  score?: number;
  hasMatches?: boolean;
  isSelected?: boolean;
}

interface DashboardAppsProps {
  apps: Company[];
  selectedFeatures: string[];
  isLoading?: boolean;
}

export default function DashboardApps({ apps, selectedFeatures, isLoading = false }: DashboardAppsProps) {
  const [showTopRated, setShowTopRated] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const handleFeatureToggle = (feature: string) => {
    setSelectedTypes(prev =>
      prev.includes(feature) ? prev.filter(t => t !== feature) : [...prev, feature]
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

  if (isLoading) {
    return (
      <div>
        <div className="space-y-4 mb-8">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-3/4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="space-y-4 p-6 border rounded-lg">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If apps array is empty after loading, show a message
  if (!isLoading && (!apps || apps.length === 0)) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No se encontraron aplicaciones disponibles.</p>
      </div>
    );
  }

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
