
import React from "react";

// Import refactored components
import HeaderSection from "./web/HeaderSection";
import AccessCard from "./web/AccessCard";
import CheckInManagementCard from "./web/CheckInManagementCard";
import EmployeePortalCard from "./web/EmployeePortalCard";
import UserImportCard from "./web/UserImportCard";

export default function WebHelpContent() {
  return (
    <div className="space-y-6">
      <HeaderSection />
      <div className="grid grid-cols-1 gap-6">
        <AccessCard />
        <CheckInManagementCard />
        <EmployeePortalCard />
        <UserImportCard />
      </div>
    </div>
  );
}
