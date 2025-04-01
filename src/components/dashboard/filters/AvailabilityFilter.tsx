
import { Button } from "@/components/ui/button";
import { AvailabilityOption } from "./types";

interface AvailabilityFilterProps {
  options: AvailabilityOption[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
}

export function AvailabilityFilter({
  options,
  selectedOptions,
  onToggle,
}: AvailabilityFilterProps) {
  const handleAvailabilityToggle = (option: string) => {
    console.log('Availability clicked in AvailabilityFilter:', option);
    if (onToggle) {
      onToggle(option);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Disponibilidad</h3>
      <div className="flex flex-wrap gap-3">
        {options.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={selectedOptions.includes(id) ? "default" : "outline"}
            size="sm"
            onClick={() => handleAvailabilityToggle(id)}
            className={`h-8 cursor-pointer ${
              selectedOptions.includes(id) ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"
            }`}
            type="button"
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
