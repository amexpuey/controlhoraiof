
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "./FilterSection";
import AppsGrid from "@/components/AppsGrid";
import { useAppsFiltering } from "./useAppsFiltering";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/ads/AdBanner";
import { AlertCircle } from "lucide-react";

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
  const [selectedAppsForComparison, setSelectedAppsForComparison] = useState<string[]>([]);

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

  const handleCompareToggle = (appId: string) => {
    setSelectedAppsForComparison(prev => {
      if (prev.includes(appId)) {
        return prev.filter(id => id !== appId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, appId];
    });
  };

  const handleCompareClick = () => {
    if (selectedAppsForComparison.length > 1) {
      navigate(`/mejores-apps-control-horario/comparar/${selectedAppsForComparison.join(',')}`);
    }
  };

  const clearAllFilters = () => {
    onFeatureToggle("CLEAR_ALL");
    setShowTopRated(false);
    setSelectedAvailability([]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedFeatures.length > 0 || 
                          showTopRated || 
                          selectedAvailability.length > 0 ||
                          searchQuery.trim() !== "";

  // Split apps into groups of two rows (6 apps per row on desktop)
  const appsGroups = [];
  const appsPerRow = 3;
  const rowsPerGroup = 2;
  const appsPerGroup = appsPerRow * rowsPerGroup;

  // Only process apps if we have active filters
  const appsToShow = hasActiveFilters ? filteredApps : [];

  for (let i = 0; i < appsToShow.length; i += appsPerGroup) {
    appsGroups.push(appsToShow.slice(i, i + appsPerGroup));
  }

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
        onClearAllFilters={clearAllFilters}
      />

      {/* Comparison Section */}
      {selectedAppsForComparison.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Comparar ({selectedAppsForComparison.length}/3)
          </h2>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {selectedAppsForComparison.length < 2
                ? "Selecciona al menos 2 aplicaciones para comparar"
                : "¡Listo para comparar!"}
            </p>
            <Button
              onClick={handleCompareClick}
              disabled={selectedAppsForComparison.length < 2}
            >
              Comparar Aplicaciones
            </Button>
          </div>
        </div>
      )}

      {/* Show message when no filters are selected */}
      {!hasActiveFilters && (
        <div className="text-center bg-blue-50 p-8 rounded-lg border border-blue-100">
          <AlertCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-800 mb-2">No hay filtros seleccionados</h3>
          <p className="text-blue-700 mb-4">
            Selecciona al menos un filtro para visualizar las aplicaciones disponibles.
          </p>
        </div>
      )}

      {/* Display apps with ad banners between groups */}
      {appsGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-8">
          <AppsGrid
            apps={group}
            onAppClick={(app) => navigate(`/mejores-apps-control-horario/${app.slug}`)}
            highlightedFeatures={selectedFeatures}
            selectedAppsForComparison={selectedAppsForComparison}
            onCompareToggle={handleCompareToggle}
          />
          
          {/* Add an ad banner after each group except the last one */}
          {groupIndex < appsGroups.length - 1 && (
            <div className="flex justify-center">
              <AdBanner
                position="in-content"
                adSize="970x250"
              />
            </div>
          )}
        </div>
      ))}

      {/* Show message if filters are applied but no apps are found */}
      {hasActiveFilters && appsToShow.length === 0 && (
        <div className="text-center text-gray-600 py-8">
          No se encontraron aplicaciones que coincidan con tus criterios.
        </div>
      )}
    </div>
  );
}
