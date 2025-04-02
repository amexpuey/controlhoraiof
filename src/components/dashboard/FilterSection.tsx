
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { FeaturesFilter } from "./filters/FeaturesFilter";
import { AvailabilityFilter } from "./filters/AvailabilityFilter";
import { TopRatedFilter } from "./filters/TopRatedFilter";
import { FilterSectionProps } from "./filters/types";
import { featureOptions, availabilityOptions } from "./filterData";

export function FilterSection({
  selectedFeatures = [],
  onFeatureToggle,
  selectedTypes = [],
  onTypeToggle,
  showTopRated = false,
  onTopRatedToggle,
  selectedAvailability = [],
  onAvailabilityToggle,
  onClearAllFilters,
  autoOpenFeatures = false,
}: FilterSectionProps) {
  const hasActiveFilters = selectedFeatures.length > 0 || 
                          selectedTypes.length > 0 || 
                          showTopRated || 
                          selectedAvailability.length > 0;

  console.log("FilterSection render with:", {
    selectedFeatures,
    selectedTypes,
    showTopRated,
    selectedAvailability,
    hasActiveFilters,
    autoOpenFeatures
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8 filter-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2 text-gray-600" />
          Filtros
        </h2>
        
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              console.log("Clear all filters clicked");
              if (onClearAllFilters) onClearAllFilters();
            }}
            className="flex items-center gap-1 text-sm cursor-pointer"
            type="button"
          >
            <X className="h-4 w-4" />
            Borrar filtros
          </Button>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Features Filter */}
        <FeaturesFilter
          features={featureOptions}
          selectedFeatures={selectedFeatures}
          onFeatureToggle={(featureId) => {
            console.log("Feature toggle clicked:", featureId);
            if (onFeatureToggle) onFeatureToggle(featureId);
          }}
          autoOpenFeatures={autoOpenFeatures}
        />

        {/* Availability Filter */}
        <AvailabilityFilter
          options={availabilityOptions}
          selectedOptions={selectedAvailability}
          onToggle={(option) => {
            console.log("Availability toggle clicked:", option);
            if (onAvailabilityToggle) onAvailabilityToggle(option);
          }}
        />

        {/* Top Rated Filter */}
        <TopRatedFilter
          checked={showTopRated}
          onToggle={() => {
            console.log("Top rated toggle clicked, current:", showTopRated);
            if (onTopRatedToggle) onTopRatedToggle();
          }}
        />
      </div>
    </div>
  );
}
