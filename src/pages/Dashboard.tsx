
import { useState, useEffect } from "react";
import { Onboarding } from "@/components/Onboarding";
import DashboardApps from "@/components/dashboard/DashboardApps";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/DashboardHeader";
import AdBanner from "@/components/ads/AdBanner";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showApps, setShowApps] = useState(false);
  const [companySize, setCompanySize] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkFiltersAndStatus = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('fromTool') === 'appfinder') {
          setShowApps(true);
          navigate(location.pathname, { replace: true });
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('onboarding_status, selected_features, company_size')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            return;
          }

          if (profile && profile.onboarding_status === 'completed') {
            setSelectedFeatures(profile.selected_features || []);
            setCompanySize(profile.company_size || "");
            setShowApps(true);
            localStorage.setItem('selectedFeatures', JSON.stringify(profile.selected_features || []));
            localStorage.setItem('showApps', 'true');
          }
        }
      } catch (error) {
        console.error('Error checking filters and status:', error);
      }
    };

    checkFiltersAndStatus();
  }, [location, navigate]);

  const handleFeatureSelect = async (features: string[]) => {
    setSelectedFeatures(features);
    setShowApps(true);
    localStorage.setItem('selectedFeatures', JSON.stringify(features));
    localStorage.setItem('showApps', 'true');
  };

  const handleSizeSelect = (size: string) => {
    setCompanySize(size);
  };

  const handleFeatureToggle = (feature: string) => {
    if (feature === "CLEAR_ALL") {
      setSelectedFeatures([]);
      localStorage.setItem('selectedFeatures', JSON.stringify([]));
      return;
    }

    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter(f => f !== feature)
      : [...selectedFeatures, feature];
    
    setSelectedFeatures(newFeatures);
    localStorage.setItem('selectedFeatures', JSON.stringify(newFeatures));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <DashboardHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isOnboarding={!showApps}
      />

      <main className="container mx-auto px-4 pb-20">
        <div className="my-4 flex justify-center">
          <AdBanner 
            position="top"
            adSize="728x90"
          />
        </div>

        {!showApps ? (
          <Onboarding
            onFeaturesSelect={handleFeatureSelect}
            onSizeSelect={handleSizeSelect}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative mt-8">
            <div className="lg:col-span-3">
              <DashboardApps 
                selectedFeatures={selectedFeatures}
                onFeatureToggle={handleFeatureToggle}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="hidden lg:block sticky top-4 h-fit">
              <AdBanner
                position="sidebar"
                adSize="300x600"
              />
            </div>
          </div>
        )}

        <div className="my-8 flex justify-center">
          <AdBanner 
            position="bottom"
            adSize="728x90"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
