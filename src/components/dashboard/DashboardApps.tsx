import { useState, useEffect } from "react";
import { Database } from "@/integrations/supabase/types";
import { FilterSection } from "./FilterSection";
import { useNavigate } from "react-router-dom";
import AppsGrid from "@/components/AppsGrid";
import { supabase } from "@/integrations/supabase/client";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppWithMatches extends Company {
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
  score?: number;
  hasMatches?: boolean;
}

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
  const [filteredApps, setFilteredApps] = useState<AppWithMatches[]>([]);
  const [apps, setApps] = useState<AppWithMatches[]>([]);
  const [showTopRated, setShowTopRated] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  useEffect(() => {
    const fetchApps = async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching apps:', error);
        return;
      }

      setApps(data || []);
    };

    fetchApps();
  }, []);

  useEffect(() => {
    if (!apps) return;
    
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

    // Apply features filter
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(app => 
        selectedFeatures.some(feature => app.features?.includes(feature))
      );
    }

    // Apply top rated filter
    if (showTopRated) {
      filtered = filtered.filter(app => app.is_top_rated);
    }

    // Apply availability filters (free trial and free plan)
    if (selectedAvailability.length > 0) {
      filtered = filtered.filter(app => 
        selectedAvailability.every(filter => {
          if (filter === 'free_trial') return app.free_trial === 'yes';
          if (filter === 'free_plan') return app.free_plan === 'yes';
          return true;
        })
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
  }, [apps, selectedFeatures, searchQuery, showTopRated, selectedAvailability]);

  const handleAvailabilityToggle = (option: string) => {
    setSelectedAvailability(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

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

      <AppsGrid
        apps={filteredApps}
        onAppClick={(app) => navigate(`/mejores-apps-control-horario/${app.slug}`)}
        highlightedFeatures={selectedFeatures}
      />
    </div>
  );
}