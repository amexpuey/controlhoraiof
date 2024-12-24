import { useState, useEffect } from "react";
import { Onboarding } from "@/components/Onboarding";
import DashboardApps from "@/components/dashboard/DashboardApps";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/DashboardHeader";
import { useDashboardData } from "@/hooks/useDashboardData";

const Dashboard = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showApps, setShowApps] = useState(false);
  const [companySize, setCompanySize] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { allApps, loading: appsLoading } = useDashboardData();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('onboarding_status, selected_features, company_size')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            setShowApps(true);
            setIsLoading(false);
            return;
          }

          if (profile) {
            console.log('Profile data:', profile);
            if (profile.onboarding_status === 'completed') {
              setSelectedFeatures(profile.selected_features || []);
              setCompanySize(profile.company_size || "");
              setShowApps(true);
            }
          }
        } else {
          // If no session, show apps without filters
          setShowApps(true);
        }
      } catch (error) {
        console.error('Error in checkOnboardingStatus:', error);
        setShowApps(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleFeatureSelect = async (features: string[]) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { error } = await supabase
          .from('profiles')
          .update({
            selected_features: features,
            company_size: companySize,
            onboarding_status: 'completed'
          })
          .eq('id', session.user.id);

        if (error) {
          console.error('Error updating profile:', error);
          toast({
            title: "Error",
            description: "No se pudieron guardar tus preferencias.",
            variant: "destructive",
          });
          return;
        }

        setSelectedFeatures(features);
        setShowApps(true);
      } else {
        // If no session, just update local state
        setSelectedFeatures(features);
        setShowApps(true);
      }
    } catch (error) {
      console.error('Error in handleFeatureSelect:', error);
      // On error, still show apps
      setShowApps(true);
    }
  };

  const handleSizeSelect = (size: string) => {
    setCompanySize(size);
  };

  if (isLoading || appsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <DashboardHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <DashboardHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto px-4 py-8">
        {!showApps ? (
          <Onboarding
            onFeaturesSelect={handleFeatureSelect}
            onSizeSelect={handleSizeSelect}
          />
        ) : (
          <DashboardApps 
            apps={allApps || []}
            selectedFeatures={selectedFeatures}
            isLoading={appsLoading}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;