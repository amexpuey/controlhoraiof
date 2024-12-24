import { useState, useEffect } from "react";
import { Onboarding } from "@/components/Onboarding";
import { DashboardApps } from "@/components/dashboard/DashboardApps";
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
          if (profile.onboarding_status === 'completed') {
            setSelectedFeatures(profile.selected_features || []);
            setCompanySize(profile.company_size || "");
            setShowApps(true);
          }
        }
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleFeatureSelect = async (features: string[]) => {
    setSelectedFeatures(features);
    setShowApps(true);
    // Store in localStorage to persist the selection
    localStorage.setItem('selectedFeatures', JSON.stringify(features));
    localStorage.setItem('companySize', companySize);
    localStorage.setItem('showApps', 'true');
  };

  const handleSizeSelect = (size: string) => {
    setCompanySize(size);
  };

  // Load state from localStorage on back navigation
  useEffect(() => {
    const savedFeatures = localStorage.getItem('selectedFeatures');
    const savedSize = localStorage.getItem('companySize');
    const savedShowApps = localStorage.getItem('showApps');

    if (savedFeatures) {
      setSelectedFeatures(JSON.parse(savedFeatures));
    }
    if (savedSize) {
      setCompanySize(savedSize);
    }
    if (savedShowApps === 'true') {
      setShowApps(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <DashboardHeader 
        matchingFeaturesCount={selectedFeatures.length} 
        totalSelectedFeatures={selectedFeatures.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {!showApps ? (
          <Onboarding
            onFeaturesSelect={handleFeatureSelect}
            onSizeSelect={handleSizeSelect}
          />
        ) : (
          <DashboardApps 
            userFeatures={selectedFeatures} 
            companySize={companySize}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;