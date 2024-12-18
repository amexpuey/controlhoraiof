import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
import AppsGrid from "@/components/AppsGrid";
import DashboardHeader from "@/components/DashboardHeader";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppWithMatches extends Company {
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
  score?: number;
  hasMatches?: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matchingApps, setMatchingApps] = useState<AppWithMatches[]>([]);
  const [loading, setLoading] = useState(true);

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
          return;
        }

        // Find INWOUT app
        const inwoutApp = allApps.find(app => app.title === 'INWOUT');

        // If there are no selected features, show all apps with INWOUT first
        if (!profile?.selected_features?.length) {
          const sortedApps = [...allApps].sort((a, b) => {
            if (a.title === 'INWOUT') return -1;
            if (b.title === 'INWOUT') return 1;
            return 0;
          });
          setMatchingApps(sortedApps.map(app => ({
            ...app,
            matchingFeaturesCount: 0,
            totalSelectedFeatures: 0,
            score: 0,
            hasMatches: false
          })));
          return;
        }

        // Calculate matching features for each app
        let appsWithScore = allApps.map(app => {
          const matchingFeatures = profile.selected_features.filter(
            selectedFeature => app.features?.includes(selectedFeature)
          );
          
          return {
            ...app,
            matchingFeaturesCount: matchingFeatures.length,
            totalSelectedFeatures: profile.selected_features.length,
            score: matchingFeatures.length,
            hasMatches: matchingFeatures.length > 0
          };
        });

        // Filter apps that have at least one matching feature
        const appsWithMatches = appsWithScore.filter(item => item.hasMatches);

        // If we have matching apps, sort them by score
        if (appsWithMatches.length > 0) {
          // Sort by score in descending order
          appsWithMatches.sort((a, b) => (b.score || 0) - (a.score || 0));
          
          let filteredApps = appsWithMatches;
          
          // If INWOUT isn't in the filtered list, add it at the start
          if (inwoutApp && !filteredApps.find(app => app.id === inwoutApp.id)) {
            filteredApps.unshift({
              ...inwoutApp,
              matchingFeaturesCount: 0,
              totalSelectedFeatures: profile.selected_features.length,
              score: 0,
              hasMatches: false
            });
          }
          
          setMatchingApps(filteredApps);
        } else {
          // If no matches, show only INWOUT if it exists
          setMatchingApps(inwoutApp ? [{
            ...inwoutApp,
            matchingFeaturesCount: 0,
            totalSelectedFeatures: profile.selected_features.length,
            score: 0,
            hasMatches: false
          }] : []);
        }

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
  }, [navigate, toast]);

  const handleAppClick = (app: Company) => {
    console.log("App clicked:", app);
    navigate(`/admin/user-view/${app.id}`);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container py-12">
        <DashboardHeader />
        <AppsGrid apps={matchingApps} onAppClick={handleAppClick} />
      </div>
    </div>
  );
};

export default Dashboard;