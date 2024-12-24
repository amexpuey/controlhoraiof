import { useState, useEffect } from "react";
import { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import FilterSection from "./FilterSection";
import { useNavigate } from "react-router-dom";
import ComparisonTable from "@/components/comparison/ComparisonTable";
import AppsGrid from "@/components/AppsGrid";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppWithMatches extends Company {
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
  score?: number;
  hasMatches?: boolean;
  isSelected?: boolean;
}

interface DashboardAppsProps {
  apps: AppWithMatches[];
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loading?: boolean;
}

export default function DashboardApps({
  apps,
  selectedFeatures,
  onFeatureToggle,
  searchQuery,
  setSearchQuery,
  loading = false
}: DashboardAppsProps) {
  const navigate = useNavigate();
  const [selectedApps, setSelectedApps] = useState<AppWithMatches[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [filteredApps, setFilteredApps] = useState<AppWithMatches[]>([]);

  const handleCompareToggle = (appId: string) => {
    setSelectedApps(prevApps => {
      const app = apps.find(a => a.id === appId);
      if (!app) return prevApps;

      const isCurrentlySelected = prevApps.some(a => a.id === appId);
      if (isCurrentlySelected) {
        return prevApps.filter(a => a.id !== appId);
      } else {
        if (prevApps.length >= 3) {
          return prevApps;
        }
        return [...prevApps, app];
      }
    });
  };

  const handleCompareClick = () => {
    if (selectedApps.length < 2) {
      return;
    }
    setShowComparison(true);
  };

  const handleCloseComparison = () => {
    setShowComparison(false);
  };

  useEffect(() => {
    let filtered = [...apps];

    // Calculate matching features count for each app
    const appsWithMatchingCount = filtered.map(app => ({
      ...app,
      matchingFeaturesCount: selectedFeatures.filter(feature => 
        app.features?.includes(feature)
      ).length,
      totalSelectedFeatures: selectedFeatures.length
    }));

    filtered = appsWithMatchingCount;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(app => 
        app.title?.toLowerCase().includes(query) ||
        app.description?.toLowerCase().includes(query) ||
        app.features?.some(feature => feature.toLowerCase().includes(query)) ||
        app.type?.toLowerCase().includes(query) ||
        app.highlights?.some(highlight => highlight.toLowerCase().includes(query))
      );
    }

    // Apply other filters
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(app => 
        selectedFeatures.some(feature => app.features?.includes(feature))
      );
    }

    // Sort by matching features count
    filtered.sort((a, b) => {
      // Always show INWOUT first
      if (a.title === 'INWOUT') return -1;
      if (b.title === 'INWOUT') return 1;

      // Then sort by matching features count
      const countA = a.matchingFeaturesCount || 0;
      const countB = b.matchingFeaturesCount || 0;
      return countB - countA;
    });

    setFilteredApps(filtered);
  }, [apps, selectedFeatures, searchQuery]);

  if (showComparison) {
    return (
      <ComparisonTable
        apps={selectedApps}
        onClose={handleCloseComparison}
      />
    );
  }

  return (
    <div className="space-y-8">
      <FilterSection
        selectedFeatures={selectedFeatures}
        onFeatureToggle={(feature) => {
          onFeatureToggle(feature);
        }}
      />

      {selectedApps.length > 0 && (
        <div className="flex justify-end">
          <Button
            onClick={handleCompareClick}
            disabled={selectedApps.length < 2}
            className="bg-primary-600 hover:bg-primary-700"
          >
            Comparar ({selectedApps.length}/3)
          </Button>
        </div>
      )}

      <AppsGrid
        apps={filteredApps}
        selectedApps={selectedApps}
        onCompareToggle={handleCompareToggle}
        loading={loading}
      />
    </div>
  );
}