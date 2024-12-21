import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function Verify() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (!session) {
          console.log("No session found, redirecting to login");
          navigate("/user-login");
          return;
        }

        const user = session.user;
        console.log("User session:", user);

        // Check if user exists in profiles
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", user.email)
          .single();

        if (profileError) {
          console.error("Profile error:", profileError);
          toast({
            title: "Error",
            description: "Error al verificar el perfil",
            variant: "destructive",
          });
          navigate("/user-login");
          return;
        }

        console.log("Profile data:", profileData);
        
        // Always redirect to dashboard after successful verification
        navigate("/dashboard");

      } catch (error) {
        console.error("Verification error:", error);
        toast({
          title: "Error",
          description: "Error en la verificación",
          variant: "destructive",
        });
        navigate("/user-login");
      } finally {
        setVerifying(false);
      }
    };

    handleVerification();
  }, [navigate, toast]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Verificando...</p>
      </div>
    );
  }

  return null;
}