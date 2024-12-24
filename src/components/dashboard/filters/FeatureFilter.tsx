import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FeatureButton } from "./FeatureButton";
import { features } from "./filter-data";

interface FeatureFilterProps {
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
  showFeatures: boolean;
  setShowFeatures: (show: boolean) => void;
}

export function FeatureFilter({
  selectedFeatures,
  onFeatureToggle,
  showFeatures,
  setShowFeatures,
}: FeatureFilterProps) {
  return (
    <div>
      <Button
        variant="ghost"
        className="w-full flex justify-between items-center mb-3"
        onClick={() => setShowFeatures(!showFeatures)}
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
              <FeatureButton
                key={id}
                id={id}
                Icon={Icon}
                selected={selectedFeatures.includes(id)}
                onClick={() => onFeatureToggle(id)}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}