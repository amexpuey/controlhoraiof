
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

  // Check saved filters and onboarding status on component mount
  useEffect(() => {
    const checkFiltersAndStatus = async () => {
      try {
        // First check if we have saved filters
        const savedFeatures = localStorage.getItem('selectedFeatures');
        const savedShowApps = localStorage.getItem('showApps');

        if (savedFeatures && savedShowApps === 'true') {
          // If we have saved filters, use them and show apps immediately
          setSelectedFeatures(JSON.parse(savedFeatures));
          setShowApps(true);
          return; // Skip checking onboarding status if we have saved filters
        }

        // If no saved filters, check onboarding status
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
            // Save to localStorage for future returns
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

  const handleSizeSelect = (size: string) => {
    setCompanySize(size);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <DashboardHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto px-4 pb-20">
        {/* Top Ad Container */}
        <div className="w-full h-24 bg-gray-100 flex items-center justify-center my-4 rounded-lg border border-gray-200 overflow-hidden">
          <p className="text-gray-400 text-sm">Espacio Reservado para Anuncios</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - 3/4 width on desktop */}
          <div className="lg:col-span-3">
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
          </div>

          {/* Side Ad Container - 1/4 width, only visible on desktop */}
          <div className="hidden lg:block h-[600px] bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-400 text-sm">Espacio Reservado para Anuncios</p>
            </div>
          </div>
        </div>

        {/* Bottom Ad Container */}
        <div className="w-full h-24 bg-gray-100 flex items-center justify-center my-8 rounded-lg border border-gray-200 overflow-hidden">
          <p className="text-gray-400 text-sm">Espacio Reservado para Anuncios</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
