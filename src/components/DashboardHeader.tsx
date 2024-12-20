import { Clock } from "lucide-react";
import FeatureMatchCount from "./FeatureMatchCount";
import { Button } from "./ui/button";

interface DashboardHeaderProps {
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
}

export default function DashboardHeader({ matchingFeaturesCount = 0, totalSelectedFeatures = 0 }: DashboardHeaderProps) {
  return (
    <div className="space-y-8">
      {/* New Header Section */}
      <div className="flex flex-col items-center justify-center space-y-6 bg-primary-50 py-12 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-primary-600 p-4 rounded-xl shadow-lg">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-primary-900">
            Directorio para el Control Horario
          </h1>
        </div>
        
        <a 
          href="https://controlhorarioelectronico.webflow.io" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center"
        >
          <Button variant="outline" className="gap-2">
            <span>Visitar nuestro Blog</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Button>
        </a>
      </div>

      {/* Original Content */}
      <div className="text-center">
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Basado en tus necesidades, estas son las mejores soluciones para tu empresa
        </p>
        <FeatureMatchCount 
          matchingFeaturesCount={matchingFeaturesCount}
          totalSelectedFeatures={totalSelectedFeatures}
        />
      </div>
    </div>
  );
}