
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { FeatureOption } from "./types";

interface FeaturesFilterProps {
  features: FeatureOption[];
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
  autoOpenFeatures?: boolean;
}

export function FeaturesFilter({
  features,
  selectedFeatures,
  onFeatureToggle,
  autoOpenFeatures = false,
}: FeaturesFilterProps) {
  const [showFeatures, setShowFeatures] = useState(autoOpenFeatures);
  
  useEffect(() => {
    if (autoOpenFeatures) {
      setShowFeatures(true);
    }
  }, [autoOpenFeatures]);

  const handleFeatureToggle = (featureId: string) => {
    console.log('Feature clicked in FeaturesFilter:', featureId);
    if (onFeatureToggle) {
      onFeatureToggle(featureId);
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="w-full flex justify-between items-center mb-3 features-toggle-button cursor-pointer"
        onClick={() => setShowFeatures(!showFeatures)}
        type="button"
      >
        <span className="text-sm font-medium">
          Características ({selectedFeatures.length} seleccionadas)
        </span>
        {showFeatures ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>
      
      {showFeatures && (
        <ScrollArea className="h-[400px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map(({ id, icon: Icon }) => (
              <Button
                key={id}
                variant={selectedFeatures.includes(id) ? "default" : "outline"}
                size="sm"
                onClick={() => handleFeatureToggle(id)}
                className={`h-auto py-2 px-3 justify-start cursor-pointer ${
                  selectedFeatures.includes(id) ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"
                }`}
                type="button"
              >
                <Icon className="w-4 h-4 mr-2 shrink-0" />
                <span className="text-sm text-left">{id}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
