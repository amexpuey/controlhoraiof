
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Award } from "lucide-react";

interface TopRatedFilterProps {
  checked: boolean;
  onToggle: () => void;
}

export function TopRatedFilter({ checked, onToggle }: TopRatedFilterProps) {
  const handleTopRatedToggle = () => {
    console.log('Top rated toggled in TopRatedFilter');
    onToggle();
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="top-rated"
        checked={checked}
        onCheckedChange={handleTopRatedToggle}
      />
      <Label htmlFor="top-rated" className="flex items-center gap-2 cursor-pointer">
        <Award className="w-4 h-4" />
        Solo mostrar Top Rated
      </Label>
    </div>
  );
}
