import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardApps from "@/components/dashboard/DashboardApps";
import { LogoutButton } from "@/components/LogoutButton";

export default function Dashboard() {
  const {
    matchingApps,
    allApps,
    selectedApps,
    loading,
    handleCompareToggle
  } = useDashboardData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <div className="container py-12">
          <div className="text-center">
            <div className="animate-pulse">
              Cargando aplicaciones...
            </div>
          </div>
        </div>
      </div>
    );
  }

  const firstApp = matchingApps[0];
  const matchingFeaturesCount = firstApp?.matchingFeaturesCount || 0;
  const totalSelectedFeatures = firstApp?.totalSelectedFeatures || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <DashboardHeader 
            matchingFeaturesCount={matchingFeaturesCount}
            totalSelectedFeatures={totalSelectedFeatures}
          />
          <LogoutButton />
        </div>
        
        <DashboardApps
          matchingApps={matchingApps}
          allApps={allApps}
          selectedApps={selectedApps}
          onCompareToggle={handleCompareToggle}
        />
      </div>
    </div>
  );
}