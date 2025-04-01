
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/DashboardHeader";
import { DashboardAdBanners } from "@/components/dashboard/DashboardAdBanners";
import { DashboardOnboarding } from "@/components/dashboard/DashboardOnboarding";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useDashboardFeatures } from "@/hooks/useDashboardFeatures";

const Dashboard = () => {
  const {
    selectedFeatures,
    showApps,
    companySize,
    handleFeatureSelect,
    handleSizeSelect,
    handleFeatureToggle
  } = useDashboardFeatures();
  
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  // For future use, if we want to re-enable onboarding
  const [enableOnboarding, setEnableOnboarding] = useState(false);
  const appsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkToolSource = () => {
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.get('fromTool') === 'appfinder') {
        navigate(location.pathname, { replace: true });
      }
    };

    checkToolSource();
  }, [location, navigate]);

  // Scroll to the top of the apps list when transitioning from onboarding to apps
  useEffect(() => {
    if (showApps && appsListRef.current) {
      setTimeout(() => {
        appsListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showApps]);

  const handleToolFeatureSelect = (features: string[]) => {
    handleFeatureSelect(features);
    
    toast({
      title: "Filtros aplicados",
      description: `${features.length} características seleccionadas`,
    });

    navigate(`${location.pathname}?fromTool=appfinder`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <DashboardHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isOnboarding={!showApps && enableOnboarding}
      />

      <main className="container mx-auto px-4 pb-20">
        <DashboardAdBanners position="top" />

        {/* Only show onboarding if explicitly enabled and showApps is false */}
        {!showApps && enableOnboarding ? (
          <DashboardOnboarding
            onFeaturesSelect={handleFeatureSelect}
            onSizeSelect={handleSizeSelect}
          />
        ) : (
          <DashboardContent 
            selectedFeatures={selectedFeatures}
            onFeatureToggle={handleFeatureToggle}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        <DashboardAdBanners position="bottom" />
      </main>
    </div>
  );
};

export default Dashboard;
