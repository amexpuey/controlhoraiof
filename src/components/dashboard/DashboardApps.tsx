import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import AppsGrid from "@/components/AppsGrid";
import { Button } from "@/components/ui/button";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppWithMatches extends Company {
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
  score?: number;
  hasMatches?: boolean;
  isSelected?: boolean;
}

interface DashboardAppsProps {
  matchingApps: AppWithMatches[];
  allApps: AppWithMatches[];
  selectedApps: AppWithMatches[];
  onCompareToggle: (appId: string) => void;
}

export default function DashboardApps({ 
  matchingApps, 
  allApps, 
  selectedApps,
  onCompareToggle 
}: DashboardAppsProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAllApps, setShowAllApps] = useState(false);

  const handleAppClick = (app: Company) => {
    console.log("App clicked:", app);
    navigate(`/admin/user-view/${app.id}`);
  };

  const handleCompareClick = () => {
    if (selectedApps.length < 2) {
      toast({
        title: "Selección insuficiente",
        description: "Selecciona al menos 2 aplicaciones para comparar.",
        variant: "destructive",
      });
      return;
    }
    
    const appIds = selectedApps.map(app => app.id).join(',');
    navigate(`/admin/compare/${appIds}`);
  };

  return (
    <>
      <AppsGrid 
        apps={showAllApps ? allApps : matchingApps} 
        onAppClick={handleAppClick}
        onCompareToggle={onCompareToggle}
        showCompare={true}
      />
      
      {!showAllApps && (
        <div className="mt-8 text-center">
          <Button 
            onClick={() => setShowAllApps(true)}
            variant="outline"
            className="mx-auto"
          >
            Ver todas las aplicaciones
          </Button>
        </div>
      )}

      {selectedApps.length > 0 && (
        <div className="mt-8 text-center">
          <Button 
            onClick={handleCompareClick}
            variant="default"
            className="mx-auto"
          >
            Comparar {selectedApps.length} aplicaciones seleccionadas
          </Button>
        </div>
      )}
    </>
  );
}