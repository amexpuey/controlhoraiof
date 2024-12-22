import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Verify() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        // Get the token from URL parameters
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (token && type === 'magiclink') {
          // First try to verify the magic link
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'magiclink',
          });

          if (verifyError) {
            console.error("Verification error:", verifyError);
            throw verifyError;
          }
        }

        // After verification, get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw sessionError;
        }

        // If we have a valid session, proceed
        if (session?.user) {
          // Check if user exists in profiles
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", session.user.email)
            .single();

          if (profileError) {
            console.error("Profile error:", profileError);
            throw profileError;
          }

          console.log("Profile data:", profileData);
          
          // Always redirect to dashboard after successful verification
          navigate("/dashboard");
          return;
        }

        // If no session, redirect to login
        navigate("/user-login");

      } catch (error) {
        console.error("Verification error:", error);
        toast({
          title: "Error",
          description: "Error en la verificación. Por favor, intente de nuevo.",
          variant: "destructive",
        });
        navigate("/user-login");
      } finally {
        setVerifying(false);
      }
    };

    handleVerification();
  }, [navigate, toast, searchParams]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Verificando...</p>
      </div>
    );
  }

  return null;
}