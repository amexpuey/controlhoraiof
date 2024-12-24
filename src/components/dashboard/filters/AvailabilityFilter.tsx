import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { availability } from "./filter-data";

interface AvailabilityFilterProps {
  selectedAvailability: string[];
  onAvailabilityToggle: (option: string) => void;
}

export function AvailabilityFilter({
  selectedAvailability,
  onAvailabilityToggle,
}: AvailabilityFilterProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Disponibilidad</h3>
      <div className="flex flex-wrap gap-3">
        {availability.map(({ id, label }) => (
          <Button
            key={id}
            variant={selectedAvailability.includes(id) ? "default" : "outline"}
            size="sm"
            onClick={() => onAvailabilityToggle(id)}
            className="h-8"
          >
            <Check className="w-4 h-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}