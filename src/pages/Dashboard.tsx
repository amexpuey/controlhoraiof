import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { DashboardApps } from "@/components/dashboard/DashboardApps";

const Dashboard = () => {
  // Initialize with empty features since we're making it public
  const [userFeatures] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <DashboardHeader />
      <main className="container py-8">
        <DashboardApps userFeatures={userFeatures} />
      </main>
    </div>
  );
};

export default Dashboard;