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
      {/* Header */}
      <div className="h-10 bg-white border-b flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold text-primary-900">
          Control Horario Electrónico
        </h1>
      </div>

      {/* Header Section */}
      <div className="bg-primary-50 p-8 rounded-lg shadow-sm">
        <div className="container max-w-4xl mx-auto">
          {/* Logo and Title Row */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary-600 p-4 rounded-xl shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-900 text-center">
                Directorio para el Control Horario
              </h1>
            </div>
            
            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a 
                href="https://controlhorarioelectronico.webflow.io" 
                target="_blank" 
                rel="noopener noreferrer"
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
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container max-w-4xl mx-auto text-center">
        <p className="text-xl text-gray-600 mb-8">
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