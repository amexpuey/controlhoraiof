import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppCard from "../AppCard";
import { Button } from "../ui/button";
import { GitCompareIcon } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppWithMatches extends Company {
  matchingFeaturesCount: number;
  totalSelectedFeatures: number;
  score: number;
  hasMatches: boolean;
  isSelected: boolean;
}

interface DashboardAppsProps {
  apps: Company[];
  selectedFeatures: string[];
}

export default function DashboardApps({ apps, selectedFeatures }: DashboardAppsProps) {
  const navigate = useNavigate();
  const [selectedApps, setSelectedApps] = useState<AppWithMatches[]>([]);

  const handleCompareToggle = (appId: string) => {
    setSelectedApps((prev) => {
      const isSelected = prev.some(app => app.id === appId);
      if (isSelected) {
        return prev.filter(app => app.id !== appId);
      } else {
        const appToAdd = apps.find(app => app.id === appId);
        if (!appToAdd) return prev;
        
        const appWithMatches: AppWithMatches = {
          ...appToAdd,
          matchingFeaturesCount: 0,
          totalSelectedFeatures: selectedFeatures.length,
          score: 0,
          hasMatches: false,
          isSelected: true
        };
        return [...prev, appWithMatches];
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Aplicaciones</h2>
        <Button onClick={() => navigate('/admin/app-add')} className="flex items-center">
          <GitCompareIcon className="mr-2" />
          Comparar
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            showCompare
            isSelected={selectedApps.some(selectedApp => selectedApp.id === app.id)}
            onCompareToggle={() => handleCompareToggle(app.id)}
          />
        ))}
      </div>
    </div>
  );
}