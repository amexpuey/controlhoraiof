
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FilterSection } from "./FilterSection";
import AppsGrid from "@/components/AppsGrid";
import { useAppsFiltering } from "./useAppsFiltering";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/ads/AdBanner";
import { AlertCircle, Filter } from "lucide-react";
import { toast } from "sonner";

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
  const location = useLocation();
  const [showTopRated, setShowTopRated] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedAppsForComparison, setSelectedAppsForComparison] = useState<string[]>([]);
  const [autoOpenFeatures, setAutoOpenFeatures] = useState(false);

  // Check if we're coming from the tool card
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fromTool = searchParams.get('fromTool');
    if (fromTool === 'appfinder') {
      setAutoOpenFeatures(true);
    }
  }, [location]);

  const { filteredApps, loading: isLoading } = useAppsFiltering(
    selectedFeatures,
    searchQuery,
    showTopRated,
    selectedAvailability
  );

  const handleAvailabilityToggle = (option: string) => {
    console.log('Toggling availability in DashboardApps:', option);
    setSelectedAvailability(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleFeatureToggle = (feature: string) => {
    console.log('Feature toggled in DashboardApps:', feature);
    if (onFeatureToggle) {
      onFeatureToggle(feature);
    }
  };

  const handleCompareToggle = (appId: string) => {
    setSelectedAppsForComparison(prev => {
      if (prev.includes(appId)) {
        return prev.filter(id => id !== appId);
      }
      if (prev.length >= 3) {
        toast.warning("Solo puedes comparar hasta 3 aplicaciones");
        return prev;
      }
      return [...prev, appId];
    });
  };

  const handleCompareClick = () => {
    if (selectedAppsForComparison.length > 1) {
      navigate(`/mejores-apps-control-horario/comparar/${selectedAppsForComparison.join(',')}`);
    } else {
      toast.warning("Selecciona al menos 2 aplicaciones para comparar");
    }
  };

  const clearAllFilters = () => {
    console.log('Clearing all filters in DashboardApps');
    onFeatureToggle("CLEAR_ALL");
    setShowTopRated(false);
    setSelectedAvailability([]);
    setSearchQuery("");
    toast.success("Filtros eliminados correctamente");
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
        onFeatureToggle={handleFeatureToggle}
        selectedTypes={[]}
        onTypeToggle={() => {}}
        showTopRated={showTopRated}
        onTopRatedToggle={() => setShowTopRated(!showTopRated)}
        selectedAvailability={selectedAvailability}
        onAvailabilityToggle={handleAvailabilityToggle}
        onClearAllFilters={clearAllFilters}
        autoOpenFeatures={autoOpenFeatures}
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
              type="button"
              className="cursor-pointer"
            >
              Comparar Aplicaciones
            </Button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-pulse mb-2">
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
          <p className="text-gray-500">Cargando aplicaciones...</p>
        </div>
      )}

      {/* Show message when no filters are selected */}
      {!hasActiveFilters && !isLoading && (
        <div className="text-center bg-blue-50 p-8 rounded-lg border border-blue-100">
          <AlertCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-800 mb-2">No hay filtros seleccionados</h3>
          <p className="text-blue-700 mb-4">
            Selecciona al menos un filtro para visualizar las aplicaciones disponibles.
          </p>
        </div>
      )}

      {/* Display apps with ad banners between groups */}
      {!isLoading && appsGroups.map((group, groupIndex) => (
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
      {hasActiveFilters && appsToShow.length === 0 && !isLoading && (
        <div className="text-center text-gray-600 py-8 bg-gray-50 rounded-lg border border-gray-100">
          <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="font-medium">No se encontraron aplicaciones que coincidan con tus criterios.</p>
          <Button 
            onClick={clearAllFilters} 
            variant="link" 
            className="mt-2 text-blue-600 cursor-pointer"
            type="button"
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
