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

        // Get user profile to access selected features and company size
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("selected_features, company_size")
          .eq("id", session.user.id)
          .single();

        if (profileError) throw profileError;

        console.log("User profile:", profile);

        // Build the query based on user preferences
        let query = supabase
          .from("companies")
          .select("*");

        if (profile?.selected_features?.length) {
          // Filter companies that have at least one matching feature
          query = query.contains('features', profile.selected_features);
        }

        // Add company size filtering logic if needed
        if (profile?.company_size) {
          // You might want to add specific logic based on company size
          // This is just an example:
          if (profile.company_size === "1-10") {
            query = query.eq('type', 'freemium');
          }
        }

        // Limit to 10 most relevant results
        query = query.limit(10);

        const { data: apps, error: appsError } = await query;

        if (appsError) throw appsError;

        console.log("Filtered apps:", apps);
        setMatchingApps(apps || []);
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