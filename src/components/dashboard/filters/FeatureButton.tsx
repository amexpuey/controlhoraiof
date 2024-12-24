import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface FeatureButtonProps {
  id: string;
  Icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export function FeatureButton({ id, Icon, selected, onClick }: FeatureButtonProps) {
  return (
    <Button
      variant={selected ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className="h-auto py-2 px-3 justify-start"
    >
      <Icon className="w-4 h-4 mr-2 shrink-0" />
      <span className="text-sm text-left">{id}</span>
    </Button>
  );
}