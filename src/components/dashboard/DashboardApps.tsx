import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AppCard from "@/components/AppCard";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";
import { FilterSection } from "./FilterSection";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ComparisonTable from "@/components/comparison/ComparisonTable";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface DashboardAppsProps {
  userFeatures: string[];
  companySize?: string;
}

export function DashboardApps({ userFeatures, companySize }: DashboardAppsProps) {
  const [apps, setApps] = useState<Company[]>([]);
  const [filteredApps, setFilteredApps] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

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

        console.log('Loaded companies:', data);
        
        // Sort to always show INWOUT first
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

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.title?.toLowerCase().includes(query) ||
        app.description?.toLowerCase().includes(query) ||
        app.features?.some(feature => feature.toLowerCase().includes(query)) ||
        app.type?.toLowerCase().includes(query) ||
        app.highlights?.some(highlight => highlight.toLowerCase().includes(query))
      );
    }

    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(app => 
        selectedFeatures.some(feature => app.features?.includes(feature))
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(app => selectedTypes.includes(app.type));
    }

    if (showTopRated) {
      filtered = filtered.filter(app => app.is_top_rated);
    }

    filtered.sort((a, b) => {
      if (a.title === 'INWOUT') return -1;
      if (b.title === 'INWOUT') return 1;
      return 0;
    });

    if (filtered.length < 3) {
      const remainingApps = apps
        .filter(app => !filtered.includes(app))
        .slice(0, 3 - filtered.length);
      filtered = [...filtered, ...remainingApps];
    }

    setFilteredApps(filtered);
  }, [apps, selectedFeatures, selectedTypes, showTopRated, searchQuery]);

  const handleAppClick = (app: Company) => {
    navigate(`/mejores-apps-control-horario/${app.slug}`);
  };

  const renderAppGrid = (apps: Company[], start: number, end: number) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.slice(start, end).map((app) => (
          <AppCard
            key={app.id}
            app={app}
            onClick={() => handleAppClick(app)}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <div>Cargando aplicaciones...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Buscar por nombre, características, descripción..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full"
        />
      </div>

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

      {/* First two rows of apps */}
      {renderAppGrid(filteredApps, 0, 6)}

      {/* Comparison Table Section */}
      <div className="py-12 bg-gray-50 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Comparación Detallada de Soluciones
          </h2>
          <ComparisonTable apps={filteredApps.slice(0, 6)} />
        </div>
      </div>

      {/* Remaining apps */}
      {filteredApps.length > 6 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-6">Más Soluciones</h3>
          {renderAppGrid(filteredApps, 6, filteredApps.length)}
        </div>
      )}
    </div>
  );
}
