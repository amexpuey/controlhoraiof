import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AppCard from "@/components/AppCard";
import type { Database } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";

type Company = Database["public"]["Tables"]["companies"]["Row"];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matchingApps, setMatchingApps] = useState<Company[]>([]);
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

        console.log("User profile:", profile);

        // Fetch all companies
        const { data: allApps, error: appsError } = await supabase
          .from("companies")
          .select("*")
          .order('created_at', { ascending: false });

        if (appsError) {
          console.error("Apps fetch error:", appsError);
          throw appsError;
        }

        console.log("All apps:", allApps);
        console.log("Selected features:", profile?.selected_features);

        if (!allApps || allApps.length === 0) {
          setMatchingApps([]);
          return;
        }

        // Find INWOUT app
        const inwoutApp = allApps.find(app => app.title === 'INWOUT');

        // Calculate matching features for each app
        let appsWithScore = allApps.map(app => {
          const matchingFeatures = profile?.selected_features?.filter(
            selectedFeature => app.features?.includes(selectedFeature)
          ) || [];
          
          return {
            app,
            score: matchingFeatures.length
          };
        });

        // Sort by score (number of matching features) in descending order
        appsWithScore.sort((a, b) => b.score - a.score);

        // Get apps with the highest scores
        let filteredApps = appsWithScore
          .filter(item => item.score > 0) // Only include apps with at least one matching feature
          .map(item => item.app);

        // If no apps match or there are no selected features, ensure INWOUT is included
        if ((filteredApps.length === 0 || !profile?.selected_features?.length) && inwoutApp) {
          filteredApps = [inwoutApp];
        } else if (filteredApps.length === 0 && !inwoutApp) {
          // If no matches and no INWOUT, show all apps
          filteredApps = allApps;
        }

        console.log("Filtered apps:", filteredApps);
        setMatchingApps(filteredApps);
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Aplicaciones Recomendadas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Basado en tus necesidades, estas son las mejores soluciones para tu empresa
          </p>
        </div>

        {matchingApps.length === 0 ? (
          <div className="text-center text-gray-600">
            No se encontraron aplicaciones que coincidan con tus criterios.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onClick={() => {
                  console.log("App clicked:", app);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;