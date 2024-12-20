import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
import AppsGrid from "@/components/AppsGrid";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppWithMatches extends Company {
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
  score?: number;
  hasMatches?: boolean;
  isSelected?: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matchingApps, setMatchingApps] = useState<AppWithMatches[]>([]);
  const [allApps, setAllApps] = useState<AppWithMatches[]>([]);
  const [showAllApps, setShowAllApps] = useState(false);
  const [selectedApps, setSelectedApps] = useState<AppWithMatches[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const checkAuthAndFetchApps = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/");
          return;
        }

        console.log("Fetching user profile and apps...");

        // Get user profile to access selected features and company size
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("selected_features, company_size")
          .eq("id", session.user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          throw profileError;
        }

        // Fetch all companies
        const { data: allApps, error: appsError } = await supabase
          .from("companies")
          .select("*")
          .order('created_at', { ascending: false });

        if (appsError) {
          console.error("Apps fetch error:", appsError);
          throw appsError;
        }

        if (!allApps || allApps.length === 0) {
          setMatchingApps([]);
          setAllApps([]);
          return;
        }

        // Find INWOUT app
        const inwoutApp = allApps.find(app => app.title === 'INWOUT');

        // Calculate matching features for all apps
        const appsWithScore = allApps.map(app => ({
          ...app,
          matchingFeaturesCount: profile?.selected_features?.filter(
            selectedFeature => app.features?.includes(selectedFeature)
          ).length || 0,
          totalSelectedFeatures: profile?.selected_features?.length || 0,
          score: profile?.selected_features?.filter(
            selectedFeature => app.features?.includes(selectedFeature)
          ).length || 0,
          hasMatches: profile?.selected_features?.some(
            selectedFeature => app.features?.includes(selectedFeature)
          ) || false,
          isSelected: false
        }));

        // Sort apps by matching features
        const sortedApps = [...appsWithScore].sort((a, b) => {
          if (a.title === 'INWOUT') return -1;
          if (b.title === 'INWOUT') return 1;
          return (b.matchingFeaturesCount || 0) - (a.matchingFeaturesCount || 0);
        });

        // Set matching apps (top 4 including INWOUT)
        const topApps = sortedApps.slice(0, 4);
        setMatchingApps(topApps);
        setAllApps(sortedApps);

      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las aplicaciones.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchApps();
  }, [navigate, toast, searchParams]);

  const handleAppClick = (app: Company) => {
    console.log("App clicked:", app);
    navigate(`/admin/user-view/${app.id}`);
  };

  const handleCompareToggle = (appId: string) => {
    setAllApps(prevApps => {
      const updatedApps = prevApps.map(app => {
        if (app.id === appId) {
          return { ...app, isSelected: !app.isSelected };
        }
        return app;
      });
      
      // Update selected apps
      const newSelectedApps = updatedApps.filter(app => app.isSelected);
      if (newSelectedApps.length > 3) {
        toast({
          title: "Límite alcanzado",
          description: "Solo puedes comparar hasta 3 aplicaciones.",
          variant: "destructive",
        });
        return prevApps;
      }
      
      setSelectedApps(newSelectedApps);
      return updatedApps;
    });
  };

  const handleCompareClick = () => {
    if (selectedApps.length < 2) {
      toast({
        title: "Selección insuficiente",
        description: "Selecciona al menos 2 aplicaciones para comparar.",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to comparison page with selected app IDs
    const appIds = selectedApps.map(app => app.id).join(',');
    navigate(`/admin/compare/${appIds}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <div className="container py-12">
          <div className="text-center">
            <div className="animate-pulse">
              Cargando aplicaciones...
            </div>
          </div>
        </div>
      </div>
    );
  }

  const firstApp = matchingApps[0];
  const matchingFeaturesCount = firstApp?.matchingFeaturesCount || 0;
  const totalSelectedFeatures = firstApp?.totalSelectedFeatures || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container py-12">
        <DashboardHeader 
          matchingFeaturesCount={matchingFeaturesCount}
          totalSelectedFeatures={totalSelectedFeatures}
        />
        
        <AppsGrid 
          apps={showAllApps ? allApps : matchingApps} 
          onAppClick={handleAppClick}
          onCompareToggle={handleCompareToggle}
          showCompare={true}
        />
        
        {!showAllApps && (
          <div className="mt-8 text-center">
            <Button 
              onClick={() => setShowAllApps(true)}
              variant="outline"
              className="mx-auto"
            >
              Ver todas las aplicaciones
            </Button>
          </div>
        )}

        {selectedApps.length > 0 && (
          <div className="mt-8 text-center">
            <Button 
              onClick={handleCompareClick}
              variant="default"
              className="mx-auto"
            >
              Comparar {selectedApps.length} aplicaciones seleccionadas
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;