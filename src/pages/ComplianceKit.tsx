
import React from "react";
import ComplianceKitHeader from "@/components/compliance-kit/ComplianceKitHeader";
import ComplianceKitTools from "@/components/compliance-kit/ComplianceKitTools";
import ComplianceKitFAQ from "@/components/compliance-kit/ComplianceKitFAQ";
import ComplianceKitBenefits from "@/components/compliance-kit/ComplianceKitBenefits";

export default function ComplianceKit() {
  // Set document title when component mounts
  React.useEffect(() => {
    document.title = "Kit Legal - Control Horario Electrónico";
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <ComplianceKitHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 my-8">
          <div className="lg:col-span-4">
            <ComplianceKitTools />
            <ComplianceKitBenefits />
            <ComplianceKitFAQ />
          </div>
        </div>
      </main>
    </div>
  );
}
