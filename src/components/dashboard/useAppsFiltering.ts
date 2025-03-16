
import { useState, useEffect } from "react";
import type { Database } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppWithMatches extends Company {
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
  score?: number;
  hasMatches?: boolean;
}

export function useAppsFiltering(
  selectedFeatures: string[],
  searchQuery: string,
  showTopRated: boolean,
  selectedAvailability: string[]
) {
  const [apps, setApps] = useState<AppWithMatches[]>([]);
  const [filteredApps, setFilteredApps] = useState<AppWithMatches[]>([]);

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
    if (!apps || apps.length === 0) return;
    
    // If no filters are applied, return an empty array
    const hasActiveFilters = selectedFeatures.length > 0 || 
                            showTopRated || 
                            selectedAvailability.length > 0 ||
                            searchQuery.trim() !== "";
    
    if (!hasActiveFilters) {
      setFilteredApps([]);
      return;
    }
    
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

    // Apply availability filters
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
      if (a.title === 'INWOUT') return -1;
      if (b.title === 'INWOUT') return 1;
      return (b.matchingFeaturesCount || 0) - (a.matchingFeaturesCount || 0);
    });

    setFilteredApps(filtered);
  }, [apps, selectedFeatures, searchQuery, showTopRated, selectedAvailability]);

  return { filteredApps };
}
