import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "./FilterSection";
import AppsGrid from "@/components/AppsGrid";
import { useAppsFiltering } from "./useAppsFiltering";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/ads/AdBanner";

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

  // Split apps into groups of two rows (6 apps per row on desktop)
  const appsGroups = [];
  const appsPerRow = 3;
  const rowsPerGroup = 2;
  const appsPerGroup = appsPerRow * rowsPerGroup;

  for (let i = 0; i < filteredApps.length; i += appsPerGroup) {
    appsGroups.push(filteredApps.slice(i, i + appsPerGroup));
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

      {/* Show message if no apps are found */}
      {filteredApps.length === 0 && (
        <div className="text-center text-gray-600 py-8">
          No se encontraron aplicaciones que coincidan con tus criterios.
        </div>
      )}
    </div>
  );
}
