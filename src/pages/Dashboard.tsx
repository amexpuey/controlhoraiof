
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/DashboardHeader";
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
    <div className="min-h-screen" style={{ background: "var(--white)" }}>
      <DashboardHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isOnboarding={!showApps && enableOnboarding}
      />

      <main className="container mx-auto px-4 pb-20">
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
      </main>
    </div>
  );
};

export default Dashboard;
