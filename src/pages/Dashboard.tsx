
import { useState, useEffect } from "react";
import { Onboarding } from "@/components/Onboarding";
import DashboardApps from "@/components/dashboard/DashboardApps";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/DashboardHeader";
import AdBanner from "@/components/ads/AdBanner";
import DashboardTools from "@/components/dashboard/DashboardTools";

const Dashboard = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showApps, setShowApps] = useState(false);
  const [companySize, setCompanySize] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const checkFiltersAndStatus = async () => {
      try {
        const savedFeatures = localStorage.getItem('selectedFeatures');
        const savedShowApps = localStorage.getItem('showApps');

        if (savedFeatures && savedShowApps === 'true') {
          setSelectedFeatures(JSON.parse(savedFeatures));
          setShowApps(true);
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
  }, []);

  const handleFeatureSelect = async (features: string[]) => {
    setSelectedFeatures(features);
    setShowApps(true);
    localStorage.setItem('selectedFeatures', JSON.stringify(features));
    localStorage.setItem('showApps', 'true');
  };

  const handleToolFeatureSelect = (features: string[]) => {
    // Update selected features and ensure the apps are shown
    setSelectedFeatures(features);
    setShowApps(true);
    localStorage.setItem('selectedFeatures', JSON.stringify(features));
    localStorage.setItem('showApps', 'true');
    
    // Show a toast notification to indicate filters were applied
    toast({
      title: "Filtros aplicados",
      description: `${features.length} características seleccionadas`,
    });
  };

  const handleSizeSelect = (size: string) => {
    setCompanySize(size);
  };

  const handleFeatureToggle = (feature: string) => {
    // Special case for clearing all filters
    if (feature === "CLEAR_ALL") {
      setSelectedFeatures([]);
      localStorage.setItem('selectedFeatures', JSON.stringify([]));
      return;
    }

    // Normal toggle behavior
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
          <>
            <DashboardTools onFeatureSelect={handleToolFeatureSelect} />
            
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
          </>
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
