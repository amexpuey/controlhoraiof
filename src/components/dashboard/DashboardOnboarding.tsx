
import { Onboarding } from "@/components/Onboarding";

interface DashboardOnboardingProps {
  onFeaturesSelect: (features: string[]) => void;
  onSizeSelect: (size: string) => void;
}

export function DashboardOnboarding({ onFeaturesSelect, onSizeSelect }: DashboardOnboardingProps) {
  return (
    <div className="onboarding-section">
      <Onboarding
        onFeaturesSelect={onFeaturesSelect}
        onSizeSelect={onSizeSelect}
      />
    </div>
  );
}
