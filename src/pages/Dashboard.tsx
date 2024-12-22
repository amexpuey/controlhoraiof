import { useState, useEffect } from "react";
import { Onboarding } from "@/components/Onboarding";
import { DashboardApps } from "@/components/dashboard/DashboardApps";
import { Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showApps, setShowApps] = useState(false);
  const [companySize, setCompanySize] = useState("");
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
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // Update profile with selected features and mark onboarding as completed
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
          description: "No se pudieron guardar tus preferencias",
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
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <Building2 className="mx-auto h-16 w-16 text-blue-200 mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Directorio para el Control Horario Electrónico
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Encuentra la mejor solución de control horario para tu empresa
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
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