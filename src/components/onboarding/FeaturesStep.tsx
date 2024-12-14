import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { OnboardingStepProps } from "@/types/onboarding";

const features = [
  { id: "Control Horario", label: "Control Horario" },
  { id: "Gestión de Turnos", label: "Gestión de Turnos" },
  { id: "Gestión de Ausencias", label: "Gestión de Ausencias" },
  { id: "Gestión de Vacaciones", label: "Gestión de Vacaciones" },
  { id: "Geolocalización", label: "Geolocalización" },
  { id: "Automatizaciones", label: "Automatizaciones" },
  { id: "Control de presencia", label: "Control de presencia" },
  { id: "Inteligencia Artificial", label: "Inteligencia Artificial" },
  { id: "Teletrabajo", label: "Teletrabajo" },
  { id: "Portal del Empleado", label: "Portal del Empleado" }
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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