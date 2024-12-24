import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Award } from "lucide-react";
import { FeatureFilter } from "./filters/FeatureFilter";
import { PlatformFilter } from "./filters/PlatformFilter";
import { AvailabilityFilter } from "./filters/AvailabilityFilter";

interface FilterSectionProps {
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  showTopRated: boolean;
  onTopRatedToggle: () => void;
  selectedPlatforms?: string[];
  onPlatformToggle?: (platform: string) => void;
  selectedAvailability?: string[];
  onAvailabilityToggle?: (option: string) => void;
}

export function FilterSection({
  selectedFeatures,
  onFeatureToggle,
  selectedTypes,
  onTypeToggle,
  showTopRated,
  onTopRatedToggle,
  selectedPlatforms = [],
  onPlatformToggle = () => {},
  selectedAvailability = [],
  onAvailabilityToggle = () => {},
}: FilterSectionProps) {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>
      
      <div className="space-y-6">
        <FeatureFilter
          selectedFeatures={selectedFeatures}
          onFeatureToggle={onFeatureToggle}
          showFeatures={showFeatures}
          setShowFeatures={setShowFeatures}
        />

        <PlatformFilter
          selectedPlatforms={selectedPlatforms}
          onPlatformToggle={onPlatformToggle}
        />

        <AvailabilityFilter
          selectedAvailability={selectedAvailability}
          onAvailabilityToggle={onAvailabilityToggle}
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="top-rated"
            checked={showTopRated}
            onCheckedChange={onTopRatedToggle}
          />
          <Label htmlFor="top-rated" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Solo mostrar Top Rated
          </Label>
        </div>
      </div>
    </div>
  );
}