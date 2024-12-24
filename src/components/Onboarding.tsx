import { useState } from "react";
import { CompanySizeStep } from "./onboarding/CompanySizeStep";
import { FeaturesStep } from "./onboarding/FeaturesStep";
import { ProgressBar } from "./onboarding/ProgressBar";

interface OnboardingProps {
  onFeaturesSelect: (features: string[]) => void;
  onSizeSelect: (size: string) => void;
}

export function Onboarding({ onFeaturesSelect, onSizeSelect }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    onSizeSelect(size);
    setStep(2);
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleFeaturesSubmit = () => {
    onFeaturesSelect(selectedFeatures);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <ProgressBar currentStep={step} totalSteps={2} />
      
      {step === 1 && (
        <CompanySizeStep
          selectedSize={selectedSize}
          onSizeSelect={handleSizeSelect}
          onNext={() => {}}
        />
      )}

      {step === 2 && (
        <FeaturesStep
          selectedFeatures={selectedFeatures}
          onFeatureToggle={handleFeatureToggle}
          onNext={handleFeaturesSubmit}
        />
      )}
    </div>
  );
}