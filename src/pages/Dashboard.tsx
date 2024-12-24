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
  const { toast } = useToast();
  const { allApps, loading } = useDashboardData();

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
          toast({
            title: "Error",
            description: "No se pudo cargar tu perfil.",
            variant: "destructive",
          });
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
  }, [toast]);

  const handleFeatureSelect = async (features: string[]) => {
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
    }

    setSelectedFeatures(features);
    setShowApps(true);
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
            isLoading={loading}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;