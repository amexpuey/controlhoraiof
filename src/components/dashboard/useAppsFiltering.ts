import { useState, useEffect, useCallback } from "react";
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
  const [loading, setLoading] = useState(true);

  // Fetch apps once when the component mounts
  useEffect(() => {
    const fetchApps = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching apps:', error);
          return;
        }

        if (data) {
          console.log('Fetched apps:', data.length);
          setApps(data);
        }
      } catch (err) {
        console.error('Error in fetchApps:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    if (!apps || apps.length === 0) {
      console.log('No apps available to filter');
      return;
    }
    
    console.log('Filtering apps with criteria:', {
      selectedFeatures,
      searchQuery,
      showTopRated,
      selectedAvailability
    });
    
    // If no filters are applied, return all apps
    const hasActiveFilters = selectedFeatures.length > 0 || 
                            showTopRated || 
                            selectedAvailability.length > 0 ||
                            searchQuery.trim() !== "";
    
    if (!hasActiveFilters) {
      console.log('No active filters, showing all apps');
      setFilteredApps(apps);
      return;
    }
    
    let filtered = [...apps];
    console.log('Starting filtering with', filtered.length, 'apps');

    // Calculate matching features count for each app
    const appsWithMatchingCount = filtered.map(app => {
      const matchingFeatures = selectedFeatures.filter(feature => 
        app.features?.includes(feature)
      );
      
      return {
        ...app,
        matchingFeaturesCount: matchingFeatures.length,
        totalSelectedFeatures: selectedFeatures.length,
        score: selectedFeatures.length > 0 
          ? (matchingFeatures.length / selectedFeatures.length) * 100 
          : 0,
        hasMatches: matchingFeatures.length > 0
      };
    });

    filtered = appsWithMatchingCount;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      console.log('Applying search filter:', query);
      filtered = filtered.filter(app => 
        (app.title?.toLowerCase().includes(query) ||
        app.description?.toLowerCase().includes(query) ||
        app.features?.some(feature => feature.toLowerCase().includes(query)) ||
        app.type?.toLowerCase().includes(query) ||
        app.highlights?.some(highlight => highlight.toLowerCase().includes(query)))
      );
      console.log('After search filter:', filtered.length, 'apps');
    }

    // Apply features filter
    if (selectedFeatures.length > 0) {
      console.log('Applying features filter with', selectedFeatures.length, 'features');
      filtered = filtered.filter(app => 
        app.hasMatches
      );
      console.log('After features filter:', filtered.length, 'apps');
    }

    // Apply top rated filter
    if (showTopRated) {
      console.log('Applying top rated filter');
      filtered = filtered.filter(app => app.is_top_rated);
      console.log('After top rated filter:', filtered.length, 'apps');
    }

    // Apply availability filters
    if (selectedAvailability.length > 0) {
      console.log('Applying availability filters:', selectedAvailability);
      filtered = filtered.filter(app => 
        selectedAvailability.every(filter => {
          if (filter === 'free_trial') return app.free_trial === 'yes';
          if (filter === 'free_plan') return app.free_plan === 'yes';
          return true;
        })
      );
      console.log('After availability filter:', filtered.length, 'apps');
    }

    // Sort by matching features count, but keep INWOUT at the top
    filtered.sort((a, b) => {
      if (a.title === 'INWOUT') return -1;
      if (b.title === 'INWOUT') return 1;
      return (b.matchingFeaturesCount || 0) - (a.matchingFeaturesCount || 0);
    });

    console.log('Final filtered apps:', filtered.length);
    setFilteredApps(filtered);
  }, [apps, selectedFeatures, searchQuery, showTopRated, selectedAvailability]);

  return { filteredApps, loading };
}
