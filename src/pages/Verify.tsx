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
        // First check if we have a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw sessionError;
        }

        // If we don't have a session but have token params, try to set up the session
        if (!session) {
          const refreshToken = searchParams.get('refresh_token');
          const accessToken = searchParams.get('access_token');

          if (refreshToken && accessToken) {
            const { data: { session: newSession }, error: setSessionError } = await supabase.auth.setSession({
              refresh_token: refreshToken,
              access_token: accessToken,
            });

            if (setSessionError) {
              console.error("Set session error:", setSessionError);
              throw setSessionError;
            }

            if (!newSession) {
              console.log("No session could be established");
              navigate("/user-login");
              return;
            }
          } else {
            console.log("No session or tokens found, redirecting to login");
            navigate("/user-login");
            return;
          }
        }

        // Now we should have a valid session, get the user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.error("User error:", userError);
          throw userError || new Error("No user found");
        }

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