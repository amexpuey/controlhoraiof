import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CompanySizeStep } from "./onboarding/CompanySizeStep";
import { FeaturesStep } from "./onboarding/FeaturesStep";
import { EmailStep } from "./onboarding/EmailStep";
import { SuccessStep } from "./onboarding/SuccessStep";
import { EmailFormData } from "@/types/onboarding";

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const { toast } = useToast();

  const progress = ((step - 1) / 3) * 100;

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

  const handleEmailSubmit = async (data: EmailFormData) => {
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: crypto.randomUUID(),
        options: {
          data: {
            company_size: selectedSize,
            selected_features: selectedFeatures,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Send custom email using our Edge Function
      const { error: emailError } = await supabase.functions.invoke('send-verification-email', {
        body: {
          to: [data.email],
          verificationLink: `${window.location.origin}/verify?token=${authData?.user?.confirmation_token}`,
        },
      });

      if (emailError) throw emailError;

      toast({
        title: "¡Correo enviado!",
        description: "Por favor, verifica tu correo electrónico para continuar.",
      });
      
      setStep(4);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Progress value={progress} className="mb-8" />

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
          onEmailSubmit={handleEmailSubmit}
          onNext={() => {}}
        />
      )}

      {step === 4 && <SuccessStep />}
    </div>
  );
}