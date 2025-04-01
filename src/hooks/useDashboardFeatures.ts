
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Default features for all users (without onboarding)
export const defaultFeatures = [
  "Control Horario", 
  "Gestión de Turnos", 
  "Gestión de Ausencias", 
  "Gestión de Vacaciones", 
  "Portal del Empleado"
];

export function useDashboardFeatures() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(defaultFeatures);
  const [showApps, setShowApps] = useState(true);
  const [companySize, setCompanySize] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const loadFeatures = async () => {
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

          if (profile && profile.onboarding_status === 'completed') {
            setSelectedFeatures(profile.selected_features || defaultFeatures);
            setCompanySize(profile.company_size || "");
            setShowApps(true);
            localStorage.setItem('selectedFeatures', JSON.stringify(profile.selected_features || defaultFeatures));
            localStorage.setItem('showApps', 'true');
          } else {
            // Even if onboarding is not completed, show apps with default features
            setSelectedFeatures(defaultFeatures);
            localStorage.setItem('selectedFeatures', JSON.stringify(defaultFeatures));
            localStorage.setItem('showApps', 'true');
          }
        } else {
          // For non-authenticated users, use default features
          setSelectedFeatures(defaultFeatures);
          localStorage.setItem('selectedFeatures', JSON.stringify(defaultFeatures));
          localStorage.setItem('showApps', 'true');
        }
      } catch (error) {
        console.error('Error loading features:', error);
        // Fallback to default features on error
        setSelectedFeatures(defaultFeatures);
        localStorage.setItem('selectedFeatures', JSON.stringify(defaultFeatures));
        localStorage.setItem('showApps', 'true');
      }
    };

    loadFeatures();
  }, []);

  const handleFeatureSelect = (features: string[]) => {
    setSelectedFeatures(features);
    setShowApps(true);
    localStorage.setItem('selectedFeatures', JSON.stringify(features));
    localStorage.setItem('showApps', 'true');
  };

  const handleSizeSelect = (size: string) => {
    setCompanySize(size);
  };

  const handleFeatureToggle = (feature: string) => {
    console.log('Feature toggle in useDashboardFeatures:', feature);
    if (feature === "CLEAR_ALL") {
      console.log('Clearing all features');
      setSelectedFeatures([]);
      localStorage.setItem('selectedFeatures', JSON.stringify([]));
      return;
    }

    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter(f => f !== feature)
      : [...selectedFeatures, feature];
    
    console.log('New selected features:', newFeatures);
    setSelectedFeatures(newFeatures);
    localStorage.setItem('selectedFeatures', JSON.stringify(newFeatures));
  };

  return {
    selectedFeatures,
    showApps,
    companySize,
    handleFeatureSelect,
    handleSizeSelect,
    handleFeatureToggle
  };
}
