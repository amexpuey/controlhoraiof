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
      // First try to sign in if user exists
      const { data: signInData, error: signInError } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify`,
          data: {
            isUserLogin: true,
            selectedSize,
            selectedFeatures
          }
        }
      });

      // If sign in fails with user not found, proceed with sign up
      if (signInError && signInError.message.includes("User not found")) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: data.email,
          password: crypto.randomUUID(),
          options: {
            emailRedirectTo: `${window.location.origin}/verify`,
            data: {
              isUserLogin: true,
              selectedSize,
              selectedFeatures
            }
          }
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
      } else {
        // User exists, show success message for login
        toast.success("Te hemos enviado un enlace mágico a tu correo electrónico.");
      }
      
      onSuccess();
    } catch (error: any) {
      console.error("Error during submission:", error);
      toast.error(
        error.message === "User already registered"
          ? "Este correo ya está registrado. Te hemos enviado un enlace de acceso."
          : "Error al procesar tu solicitud. Por favor, intenta de nuevo."
      );
    }
  };

  return { handleEmailSubmit };
};