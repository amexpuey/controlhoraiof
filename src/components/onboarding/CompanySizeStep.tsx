import { Button } from "@/components/ui/button";
import { Building2, Users } from "lucide-react";
import { OnboardingStepProps } from "@/types/onboarding";

const companySize = [
  { id: "1-10", label: "1-10 empleados" },
  { id: "11-50", label: "11-50 empleados" },
  { id: "51-200", label: "51-200 empleados" },
  { id: "200+", label: "200+ empleados" },
];

interface CompanySizeStepProps extends OnboardingStepProps {
  selectedSize: string;
  onSizeSelect: (size: string) => void;
}

export function CompanySizeStep({ selectedSize, onSizeSelect }: CompanySizeStepProps) {
  const handleSizeSelect = (size: string) => {
    onSizeSelect(size);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">
          ¿Cuál es el tamaño de tu empresa?
        </h2>
        <p className="text-gray-600">
          Ayúdanos a encontrar la mejor solución para tu negocio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {companySize.map((size) => (
          <Button
            key={size.id}
            variant={selectedSize === size.id ? "default" : "outline"}
            className="h-24 text-lg"
            onClick={() => handleSizeSelect(size.id)}
          >
            <Users className="mr-2 h-5 w-5" />
            {size.label}
          </Button>
        ))}
      </div>
    </div>
  );
}