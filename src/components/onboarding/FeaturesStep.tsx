import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { OnboardingStepProps } from "@/types/onboarding";

const features = [
  { id: "time-tracking", label: "Control de tiempo" },
  { id: "shift-management", label: "Gestión de turnos" },
  { id: "absence-management", label: "Gestión de ausencias" },
  { id: "geolocation", label: "Geolocalización" },
  { id: "automations", label: "Automatizaciones" },
  { id: "presence-control", label: "Control de presencia" },
  { id: "ai-capabilities", label: "Capacidades de IA" },
  { id: "remote-work", label: "Trabajo remoto" },
  { id: "employee-portal", label: "Portal del empleado" },
];

interface FeaturesStepProps extends OnboardingStepProps {
  selectedFeatures: string[];
  onFeatureToggle: (featureId: string) => void;
}

export function FeaturesStep({ selectedFeatures, onFeatureToggle, onNext }: FeaturesStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">
          Selecciona las características necesarias
        </h2>
        <p className="text-gray-600">
          Marca todas las funciones que necesitas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature) => (
          <Button
            key={feature.id}
            variant={selectedFeatures.includes(feature.id) ? "default" : "outline"}
            className="h-16"
            onClick={() => onFeatureToggle(feature.id)}
          >
            {feature.label}
          </Button>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onNext}
          className="w-full md:w-auto"
          disabled={selectedFeatures.length === 0}
        >
          Continuar
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}