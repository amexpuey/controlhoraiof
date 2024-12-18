import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
          return;
        }

        // Find INWOUT app
        const inwoutApp = allApps.find(app => app.title === 'INWOUT');

        // Sort apps by number of features (descending)
        const sortedApps = allApps
          .map(app => ({
            ...app,
            featureCount: app.features?.length || 0
          }))
          .sort((a, b) => b.featureCount - a.featureCount)
          .slice(0, 3); // Get only top 3 apps

        // If INWOUT isn't in top 3, add it at the start
        if (inwoutApp && !sortedApps.find(app => app.id === inwoutApp.id)) {
          sortedApps.unshift({
            ...inwoutApp,
            featureCount: inwoutApp.features?.length || 0
          });
        }

        // Calculate matching features for filtered apps
        const appsWithScore = sortedApps.map(app => ({
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
          ) || false
        }));

        setMatchingApps(appsWithScore);

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
  }, [navigate, toast, searchParams]); // Added searchParams to dependencies

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

  // Get the first app's counts to pass to the header (they all have the same totalSelectedFeatures)
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
        <AppsGrid apps={matchingApps} onAppClick={handleAppClick} />
      </div>
    </div>
  );
};

export default Dashboard;