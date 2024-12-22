import { Button } from "@/components/ui/button";
import { CheckCircle, Award } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterSectionProps {
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  showTopRated: boolean;
  onTopRatedToggle: () => void;
}

const features = [
  "Control Horario",
  "Gestión de Turnos",
  "Gestión de Ausencias",
  "Geolocalización",
  "Portal del Empleado",
];

const types = ["free", "freemium", "premium"];

export function FilterSection({
  selectedFeatures,
  onFeatureToggle,
  selectedTypes,
  onTypeToggle,
  showTopRated,
  onTopRatedToggle,
}: FilterSectionProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>
      
      <div className="space-y-6">
        {/* Features Filter */}
        <div>
          <h3 className="text-sm font-medium mb-3">Características</h3>
          <div className="flex flex-wrap gap-3">
            {features.map((feature) => (
              <Button
                key={feature}
                variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                size="sm"
                onClick={() => onFeatureToggle(feature)}
                className="h-8"
              >
                <CheckCircle className={`w-4 h-4 mr-2 ${
                  selectedFeatures.includes(feature) ? "opacity-100" : "opacity-0"
                }`} />
                {feature}
              </Button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <h3 className="text-sm font-medium mb-3">Tipo</h3>
          <div className="flex flex-wrap gap-3">
            {types.map((type) => (
              <Button
                key={type}
                variant={selectedTypes.includes(type) ? "default" : "outline"}
                size="sm"
                onClick={() => onTypeToggle(type)}
                className="h-8 capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Top Rated Filter */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="top-rated"
            checked={showTopRated}
            onCheckedChange={onTopRatedToggle}
          />
          <Label htmlFor="top-rated" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Solo mostrar Top Rated
          </Label>
        </div>
      </div>
    </div>
  );
}