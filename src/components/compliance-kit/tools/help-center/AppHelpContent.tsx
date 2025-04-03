
import React from "react";

// Import refactored components
import HeaderSection from "./app/HeaderSection";
import InstallationCard from "./app/InstallationCard";
import CheckInCard from "./app/CheckInCard";
import AdditionalFeaturesCard from "./app/AdditionalFeaturesCard";

export default function AppHelpContent() {
  return (
    <div className="space-y-6">
      <HeaderSection />
      <div className="grid grid-cols-1 gap-6">
        <InstallationCard />
        <CheckInCard />
        <AdditionalFeaturesCard />
      </div>
    </div>
  );
}
