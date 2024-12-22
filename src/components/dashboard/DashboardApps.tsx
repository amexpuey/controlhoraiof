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
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setApps(data || []);
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

  const handleAppClick = (app: any) => {
    try {
      // Ensure the URL is properly formatted
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
          No se encontraron aplicaciones
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