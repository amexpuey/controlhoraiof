import { useState } from "react";
import { CompanySizeStep } from "./onboarding/CompanySizeStep";
import { FeaturesStep } from "./onboarding/FeaturesStep";
import { EmailStep } from "./onboarding/EmailStep";
import { SuccessStep } from "./onboarding/SuccessStep";
import { ProgressBar } from "./onboarding/ProgressBar";
import { useEmailSubmission } from "@/hooks/useEmailSubmission";
import { useSearchParams } from "react-router-dom";

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref');
  
  const { handleEmailSubmit } = useEmailSubmission(() => setStep(4));

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setStep(2);
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const onEmailSubmit = async (data: { email: string }) => {
    await handleEmailSubmit(data, selectedSize, selectedFeatures, referralCode);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <ProgressBar currentStep={step} totalSteps={4} />

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
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <EmailStep
          onEmailSubmit={onEmailSubmit}
          onNext={() => {}}
        />
      )}

      {step === 4 && <SuccessStep />}
    </div>
  );
}