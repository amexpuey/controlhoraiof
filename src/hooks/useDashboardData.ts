import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppWithMatches extends Company {
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
  score?: number;
  hasMatches?: boolean;
  isSelected?: boolean;
}

export function useDashboardData() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matchingApps, setMatchingApps] = useState<AppWithMatches[]>([]);
  const [allApps, setAllApps] = useState<AppWithMatches[]>([]);
  const [selectedApps, setSelectedApps] = useState<AppWithMatches[]>([]);
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

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("selected_features, company_size")
          .eq("id", session.user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          throw profileError;
        }

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

        const sortedApps = [...appsWithScore].sort((a, b) => {
          if (a.title === 'INWOUT') return -1;
          if (b.title === 'INWOUT') return 1;
          return (b.matchingFeaturesCount || 0) - (a.matchingFeaturesCount || 0);
        });

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
  }, [navigate, toast]);

  const handleCompareToggle = (appId: string) => {
    setAllApps(prevApps => {
      const updatedApps = prevApps.map(app => {
        if (app.id === appId) {
          return { ...app, isSelected: !app.isSelected };
        }
        return app;
      });
      
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

  return {
    matchingApps,
    allApps,
    selectedApps,
    loading,
    handleCompareToggle
  };
}