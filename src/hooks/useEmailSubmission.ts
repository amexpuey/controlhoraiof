import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useEmailSubmission = (onSuccess: () => void) => {
  const handleEmailSubmit = async (
    data: { email: string },
    selectedSize: string,
    selectedFeatures: string[],
    referralCode?: string | null
  ) => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: crypto.randomUUID(),
      });

      if (signUpError) throw signUpError;

      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user.id) throw new Error("No user ID found");

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: session.session.user.id,
          email: data.email,
          company_size: selectedSize,
          selected_features: selectedFeatures,
          referred_by: referralCode,
        });

      if (profileError) throw profileError;

      toast.success("¡Registro exitoso! Revisa tu correo para verificar tu cuenta.");
      onSuccess();
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Error al registrar. Por favor, intenta de nuevo.");
    }
  };

  return { handleEmailSubmit };
};