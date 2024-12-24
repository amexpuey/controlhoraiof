import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";
import { FilterSection } from "./FilterSection";
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
  userFeatures: string[];
  companySize?: string;
}

export function DashboardApps({ userFeatures, companySize }: DashboardAppsProps) {
  const [apps, setApps] = useState<Company[]>([]);
  const [filteredApps, setFilteredApps] = useState<AppWithMatches[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Filter states
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(userFeatures);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showTopRated, setShowTopRated] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  useEffect(() => {
    const loadApps = async () => {
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
          setApps([]);
          return;
        }

        console.log('Loaded companies:', data);
        
        const sortedData = data.sort((a, b) => {
          if (a.title === 'INWOUT') return -1;
          if (b.title === 'INWOUT') return 1;
          return 0;
        });
        
        setApps(sortedData);
      } catch (error) {
        console.error('Error loading apps:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las aplicaciones",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadApps();
  }, [toast]);

  useEffect(() => {
    let filtered = [...apps];

    // Calculate matching features count for each app
    const appsWithMatchingCount = filtered.map(app => {
      const matchingFeaturesCount = selectedFeatures.filter(feature => 
        app.features?.includes(feature)
      ).length;
      return { ...app, matchingFeaturesCount };
    });

    filtered = appsWithMatchingCount;

    // Apply filters
    if (searchQuery) {
      filtered = filtered.filter(app => 
        app.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.features?.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase())) ||
        app.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.highlights?.some(highlight => highlight.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(app => 
        selectedFeatures.some(feature => app.features?.includes(feature))
      );
    }

    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter(app =>
        selectedPlatforms.some(platform => app.platforms?.includes(platform))
      );
    }

    if (selectedAvailability.length > 0) {
      filtered = filtered.filter(app =>
        selectedAvailability.every(option => {
          if (option === 'free_trial') return app.free_trial === 'yes';
          if (option === 'free_plan') return app.free_plan === 'yes';
          return true;
        })
      );
    }

    if (showTopRated) {
      filtered = filtered.filter(app => app.is_top_rated);
    }

    // Sort by matching features count and ensure INWOUT is first
    filtered.sort((a, b) => {
      if (a.title === 'INWOUT') return -1;
      if (b.title === 'INWOUT') return 1;
      return (b.matchingFeaturesCount || 0) - (a.matchingFeaturesCount || 0);
    });

    setFilteredApps(filtered);
  }, [apps, selectedFeatures, selectedTypes, showTopRated, searchQuery, selectedPlatforms, selectedAvailability]);

  const handleAppClick = (app: Company) => {
    navigate(`/mejores-apps-control-horario/${app.slug}`);
  };

  if (isLoading) {
    return <div>Cargando aplicaciones...</div>;
  }

  return (
    <div className="space-y-8">
      <FilterSection
        selectedFeatures={selectedFeatures}
        onFeatureToggle={(feature) => {
          setSelectedFeatures(prev =>
            prev.includes(feature)
              ? prev.filter(f => f !== feature)
              : [...prev, feature]
          );
        }}
        selectedTypes={selectedTypes}
        onTypeToggle={(type) => {
          setSelectedTypes(prev =>
            prev.includes(type)
              ? prev.filter(t => t !== type)
              : [...prev, type]
          );
        }}
        showTopRated={showTopRated}
        onTopRatedToggle={() => setShowTopRated(prev => !prev)}
        selectedPlatforms={selectedPlatforms}
        onPlatformToggle={(platform) => {
          setSelectedPlatforms(prev =>
            prev.includes(platform)
              ? prev.filter(p => p !== platform)
              : [...prev, platform]
          );
        }}
        selectedAvailability={selectedAvailability}
        onAvailabilityToggle={(option) => {
          setSelectedAvailability(prev =>
            prev.includes(option)
              ? prev.filter(o => o !== option)
              : [...prev, option]
          );
        }}
      />

      <AppsGrid
        apps={filteredApps}
        onAppClick={handleAppClick}
        highlightedFeatures={selectedFeatures}
      />

      <div className="py-12 bg-gray-50 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Comparación Detallada de Soluciones
          </h2>
          <ComparisonTable apps={filteredApps} />
        </div>
      </div>
    </div>
  );
}
