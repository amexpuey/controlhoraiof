import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardApps from "@/components/dashboard/DashboardApps";

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
        <DashboardHeader 
          matchingFeaturesCount={matchingFeaturesCount}
          totalSelectedFeatures={totalSelectedFeatures}
        />
        
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