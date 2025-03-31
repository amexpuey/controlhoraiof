
import React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/Footer";
import ComplianceKitHeader from "@/components/compliance-kit/ComplianceKitHeader";
import ComplianceKitTools from "@/components/compliance-kit/ComplianceKitTools";
import ComplianceKitFAQ from "@/components/compliance-kit/ComplianceKitFAQ";
import ComplianceKitBenefits from "@/components/compliance-kit/ComplianceKitBenefits";

export default function ComplianceKit() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <AppHeader />
      
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <ComplianceKitHeader />
        <ComplianceKitTools />
        <ComplianceKitBenefits />
        <ComplianceKitFAQ />
      </main>
      
      {/* Footer is rendered in App.tsx */}
    </div>
  );
}
