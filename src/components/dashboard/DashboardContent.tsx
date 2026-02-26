
import { useRef } from "react";
import DashboardTools from "@/components/dashboard/DashboardTools";
import DashboardApps from "@/components/dashboard/DashboardApps";
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
    console.log("Tool feature selected:", features);
  };

  return (
    <div ref={appsListRef} className="scroll-mt-4">
      <DashboardTools onFeatureSelect={handleToolFeatureSelect} />
      
      <div className="mt-8">
        <div ref={filterSectionRef} className="filter-section scroll-mt-20">
          <DashboardApps 
            selectedFeatures={selectedFeatures}
            onFeatureToggle={onFeatureToggle}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
      
      <div className="mt-16 mb-8">
        <LearningModules />
      </div>
    </div>
  );
}
