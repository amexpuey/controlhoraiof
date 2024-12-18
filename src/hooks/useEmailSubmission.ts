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
      // Send email to support@inwoutapp.com with user details
      const { error: functionError } = await supabase.functions.invoke('send-verification-email', {
        body: {
          to: ["support@inwoutapp.com"],
          verificationLink: window.location.origin + '/verify',
          companySize: companySize,
          selectedFeatures: selectedFeatures,
          userEmail: data.email
        }
      });

      if (functionError) throw functionError;

      // Still create the user auth session but without sending another email
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          data: {
            company_size: companySize,
            selected_features: selectedFeatures,
          },
          // Don't send another email
          emailRedirectTo: window.location.origin + '/verify',
          shouldCreateUser: true
        }
      });

      if (error) throw error;

      toast({
        title: "Solicitud enviada",
        description: "Nos pondremos en contacto contigo pronto.",
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