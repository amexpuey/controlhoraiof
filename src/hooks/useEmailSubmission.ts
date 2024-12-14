import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EmailFormData } from "@/types/onboarding";

export const useEmailSubmission = (onSuccess: () => void) => {
  const { toast } = useToast();

  const handleEmailSubmit = async (
    data: EmailFormData,
    companySize: string,
    selectedFeatures: string[]
  ) => {
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: crypto.randomUUID(),
        options: {
          data: {
            company_size: companySize,
            selected_features: selectedFeatures,
          },
        },
      });

      if (signUpError) throw signUpError;

      const { error: emailError } = await supabase.functions.invoke(
        "send-verification-email",
        {
          body: {
            to: [data.email],
            verificationLink: `${window.location.origin}/verify`,
          },
        }
      );

      if (emailError) throw emailError;

      toast({
        title: "¡Correo enviado!",
        description: "Por favor, verifica tu correo electrónico para continuar.",
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return { handleEmailSubmit };
};