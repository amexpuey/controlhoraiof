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
    handleCompareToggle,
    userProfile
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

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <div className="container py-12">
          <div className="text-center">
            <div className="text-red-500">
              Error al cargar el perfil. Por favor, inténtalo de nuevo.
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
        {/* Header with Logout Button */}
        <div className="relative mb-8">
          <div className="absolute right-0 top-0 z-10">
            <LogoutButton />
          </div>
          <DashboardHeader 
            matchingFeaturesCount={matchingFeaturesCount}
            totalSelectedFeatures={totalSelectedFeatures}
          />
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