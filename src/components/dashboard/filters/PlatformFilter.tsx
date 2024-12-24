import { Button } from "@/components/ui/button";
import { platforms } from "./filter-data";

interface PlatformFilterProps {
  selectedPlatforms: string[];
  onPlatformToggle: (platform: string) => void;
}

export function PlatformFilter({ selectedPlatforms, onPlatformToggle }: PlatformFilterProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Disponible en</h3>
      <div className="flex flex-wrap gap-3">
        {platforms.map(({ id, icon: Icon }) => (
          <Button
            key={id}
            variant={selectedPlatforms.includes(id) ? "default" : "outline"}
            size="sm"
            onClick={() => onPlatformToggle(id)}
            className="h-8"
          >
            <Icon className="w-4 h-4 mr-2" />
            {id}
          </Button>
        ))}
      </div>
    </div>
  );
}