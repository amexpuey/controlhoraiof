import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
import AppsGrid from "@/components/AppsGrid";
import DashboardHeader from "@/components/DashboardHeader";
import { useReferralStatus } from "@/hooks/useReferralStatus";
import { ReferralModal } from "@/components/ReferralModal";
import { Button } from "@/components/ui/button";

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
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [searchParams] = useSearchParams();

  const { data: session } = await supabase.auth.getSession();
  const { data: referralStatus } = useReferralStatus(session?.user?.id);

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
          .select("selected_features, company_size, has_full_access")
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

        // If user has full access, show all apps, otherwise limit to top 3
        const appsToShow = profile?.has_full_access 
          ? allApps
          : allApps
              .filter(app => app.title !== 'INWOUT')
              .sort((a, b) => (b.features?.length || 0) - (a.features?.length || 0))
              .slice(0, 3);

        // If INWOUT isn't included and exists, add it at the start
        if (inwoutApp && !appsToShow.find(app => app.id === inwoutApp.id)) {
          appsToShow.unshift(inwoutApp);
        }

        // Calculate matching features
        const appsWithScore = appsToShow.map(app => ({
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
  }, [navigate, toast, searchParams]);

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
        
        {!referralStatus?.has_full_access && (
          <div className="mt-8 text-center">
            <Button 
              onClick={() => setShowReferralModal(true)}
              variant="outline"
              className="mx-auto"
            >
              Desbloquear todas las aplicaciones
            </Button>
          </div>
        )}

        <ReferralModal 
          isOpen={showReferralModal}
          onClose={() => setShowReferralModal(false)}
          referralCode={referralStatus?.referral_code}
          referralCount={referralStatus?.referral_count}
        />
      </div>
    </div>
  );
};

export default Dashboard;
