import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AppCard from "@/components/AppCard";
import { useToast } from "@/hooks/use-toast";

interface DashboardAppsProps {
  userFeatures: string[];
}

export function DashboardApps({ userFeatures }: DashboardAppsProps) {
  const [apps, setApps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadApps = async () => {
      try {
        let query = supabase
          .from('companies')
          .select('*');
        
        // If user has selected features, filter companies that match any of them
        if (userFeatures.length > 0) {
          query = query.contains('features', userFeatures);
        }

        const { data, error } = await query;

        if (error) throw error;

        // Sort apps by match count (number of matching features)
        const sortedApps = data.sort((a, b) => {
          const aMatches = a.features?.filter((f: string) => userFeatures.includes(f)).length || 0;
          const bMatches = b.features?.filter((f: string) => userFeatures.includes(f)).length || 0;
          return bMatches - aMatches;
        });

        setApps(sortedApps);
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
  }, [userFeatures]);

  if (isLoading) {
    return <div>Cargando aplicaciones...</div>;
  }

  if (apps.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No hay aplicaciones disponibles</h2>
        <p className="text-gray-600">
          No se encontraron aplicaciones que coincidan con tus criterios
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map((app) => (
        <AppCard
          key={app.id}
          app={app}
          onClick={() => {}}
        />
      ))}
    </div>
  );
}