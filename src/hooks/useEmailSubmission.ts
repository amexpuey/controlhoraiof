import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { EmailFormData } from "@/types/onboarding";

export const useEmailSubmission = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEmailSubmit = async (
    data: EmailFormData,
    companySize: string,
    selectedFeatures: string[]
  ) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          data: {
            company_size: companySize,
            selected_features: selectedFeatures,
          },
          emailRedirectTo: `${window.location.origin}/verify`
        }
      });

      if (error) throw error;

      toast({
        title: "Email enviado",
        description: "Por favor, revisa tu bandeja de entrada para verificar tu correo.",
      });

      onSuccess();
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleEmailSubmit,
  };
};