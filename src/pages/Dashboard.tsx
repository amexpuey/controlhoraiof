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

        // Get user profile to access selected features
        const { data: profile } = await supabase
          .from("profiles")
          .select("selected_features")
          .eq("id", session.user.id)
          .single();

        console.log("User profile:", profile); // Debug log

        if (!profile?.selected_features?.length) {
          toast({
            title: "No hay características seleccionadas",
            description: "Por favor, completa el proceso de onboarding.",
          });
          return;
        }

        // Fetch matching apps based on selected features
        const { data: apps, error } = await supabase
          .from("companies")
          .select("*")
          .contains("features", profile.selected_features);

        console.log("Fetched apps:", apps); // Debug log
        console.log("Selected features:", profile.selected_features); // Debug log

        if (error) throw error;

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
                  console.log("App clicked:", app); // Debug log
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