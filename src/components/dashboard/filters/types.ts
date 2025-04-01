
import { LucideIcon } from "lucide-react";

export interface FeatureOption {
  id: string;
  icon: LucideIcon;
}

export interface AvailabilityOption {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface FilterSectionProps {
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  showTopRated: boolean;
  onTopRatedToggle: () => void;
  selectedAvailability: string[];
  onAvailabilityToggle: (option: string) => void;
  onClearAllFilters?: () => void;
  autoOpenFeatures?: boolean;
}
