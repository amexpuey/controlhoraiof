
import React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import ComplianceKitHeader from "@/components/compliance-kit/ComplianceKitHeader";
import ComplianceKitTools from "@/components/compliance-kit/ComplianceKitTools";
import ComplianceKitFAQ from "@/components/compliance-kit/ComplianceKitFAQ";
import ComplianceKitBenefits from "@/components/compliance-kit/ComplianceKitBenefits";
import { DashboardAdBanners } from "@/components/dashboard/DashboardAdBanners";
import AdBanner from "@/components/ads/AdBanner";

export default function ComplianceKit() {
  // Set document title when component mounts
  React.useEffect(() => {
    document.title = "Kit Legal - Control Horario Electrónico";
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <AppHeader />
      
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <DashboardAdBanners position="top" />
        
        <ComplianceKitHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 my-8">
          <div className="lg:col-span-3">
            <ComplianceKitTools />
            <ComplianceKitBenefits />
            <ComplianceKitFAQ />
          </div>
          
          <div className="hidden lg:block sticky top-4 h-fit">
            <AdBanner
              position="sidebar"
              adSize="300x600"
            />
          </div>
        </div>
        
        <DashboardAdBanners position="bottom" />
      </main>
    </div>
  );
}
