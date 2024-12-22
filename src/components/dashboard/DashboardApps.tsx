import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AppCard from "@/components/AppCard";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface DashboardAppsProps {
  userFeatures: string[];
  companySize?: string;
}

export function DashboardApps({ userFeatures, companySize }: DashboardAppsProps) {
  const [apps, setApps] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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

        // Filter and score apps based on matching features
        const appsWithScore = data.map(app => ({
          ...app,
          score: app.features?.filter(
            feature => userFeatures.includes(feature)
          ).length || 0
        }));

        // Sort by score and ensure at least 3 apps are shown
        const sortedApps = appsWithScore
          .sort((a, b) => (b.score || 0) - (a.score || 0))
          .slice(0, Math.max(3, appsWithScore.filter(app => app.score > 0).length));

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
  }, [userFeatures, toast]);

  const handleAppClick = (app: Company) => {
    try {
      const url = new URL(app.url);
      window.open(url.toString(), '_blank');
    } catch (error) {
      console.error('Invalid URL:', app.url);
      toast({
        title: "Error",
        description: "No se pudo abrir la aplicación. URL inválida.",
        variant: "destructive",
      });
    }
  };

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
          onClick={() => handleAppClick(app)}
        />
      ))}
    </div>
  );
}