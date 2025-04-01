
import { useRef } from "react";
import DashboardTools from "@/components/dashboard/DashboardTools";
import DashboardApps from "@/components/dashboard/DashboardApps";
import AdBanner from "@/components/ads/AdBanner";
import LearningModules from "@/components/learning/LearningModules";

interface DashboardContentProps {
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function DashboardContent({
  selectedFeatures,
  onFeatureToggle,
  searchQuery,
  setSearchQuery
}: DashboardContentProps) {
  const appsListRef = useRef<HTMLDivElement>(null);
  const filterSectionRef = useRef<HTMLDivElement>(null);

  const handleToolFeatureSelect = (features: string[]) => {
    // This would need to move back up to Dashboard.tsx if it uses navigate
    console.log("Tool feature selected:", features);
  };

  return (
    <div ref={appsListRef} className="scroll-mt-4">
      <DashboardTools onFeatureSelect={handleToolFeatureSelect} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative mt-8">
        <div ref={filterSectionRef} className="lg:col-span-3 filter-section scroll-mt-20">
          <DashboardApps 
            selectedFeatures={selectedFeatures}
            onFeatureToggle={onFeatureToggle}
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
      
      {/* Learning Modules Section - Added below the app grid */}
      <div className="mt-16 mb-8">
        <LearningModules />
      </div>
    </div>
  );
}
