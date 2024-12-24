import { useState, useEffect } from "react";
import { Onboarding } from "@/components/Onboarding";
import DashboardApps from "@/components/dashboard/DashboardApps";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/DashboardHeader";

const Dashboard = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showApps, setShowApps] = useState(false);
  const [companySize, setCompanySize] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Check onboarding status on component mount
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
            return;
          }

          if (profile) {
            console.log('Profile data:', profile);
            
            // Check if we have saved filters in localStorage
            const savedFeatures = localStorage.getItem('selectedFeatures');
            const savedShowApps = localStorage.getItem('showApps');
            
            if (savedFeatures && savedShowApps === 'true') {
              // If we have saved filters, use them
              setSelectedFeatures(JSON.parse(savedFeatures));
              setShowApps(true);
            } else if (profile.onboarding_status === 'completed') {
              // If no saved filters but onboarding is completed, use profile data
              setSelectedFeatures(profile.selected_features || []);
              setCompanySize(profile.company_size || "");
              setShowApps(true);
            }
          }
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleFeatureSelect = async (features: string[]) => {
    setSelectedFeatures(features);
    setShowApps(true);
    localStorage.setItem('selectedFeatures', JSON.stringify(features));
    localStorage.setItem('companySize', companySize);
    localStorage.setItem('showApps', 'true');
  };

  const handleSizeSelect = (size: string) => {
    setCompanySize(size);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <DashboardHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto px-4">
        {!showApps ? (
          <Onboarding
            onFeaturesSelect={handleFeatureSelect}
            onSizeSelect={handleSizeSelect}
          />
        ) : (
          <DashboardApps 
            selectedFeatures={selectedFeatures}
            onFeatureToggle={(feature) => {
              const newFeatures = selectedFeatures.includes(feature)
                ? selectedFeatures.filter(f => f !== feature)
                : [...selectedFeatures, feature];
              setSelectedFeatures(newFeatures);
              localStorage.setItem('selectedFeatures', JSON.stringify(newFeatures));
            }}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;