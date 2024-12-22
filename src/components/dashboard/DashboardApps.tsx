import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AppCard from "@/components/AppCard";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";
import { FilterSection } from "./FilterSection";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface DashboardAppsProps {
  userFeatures: string[];
  companySize?: string;
}

export function DashboardApps({ userFeatures, companySize }: DashboardAppsProps) {
  const [apps, setApps] = useState<Company[]>([]);
  const [filteredApps, setFilteredApps] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Filter states
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(userFeatures);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showTopRated, setShowTopRated] = useState(false);

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

        setApps(data);
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

  // Filter apps whenever filter criteria change
  useEffect(() => {
    let filtered = [...apps];

    // Filter by features
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(app => 
        selectedFeatures.some(feature => app.features?.includes(feature))
      );
    }

    // Filter by type
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(app => selectedTypes.includes(app.type));
    }

    // Filter by top rated
    if (showTopRated) {
      filtered = filtered.filter(app => app.is_top_rated);
    }

    // Ensure at least 3 apps are shown
    if (filtered.length < 3) {
      const remainingApps = apps
        .filter(app => !filtered.includes(app))
        .slice(0, 3 - filtered.length);
      filtered = [...filtered, ...remainingApps];
    }

    setFilteredApps(filtered);
  }, [apps, selectedFeatures, selectedTypes, showTopRated]);

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
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
          />
        ))}
      </div>
    </div>
  );
}