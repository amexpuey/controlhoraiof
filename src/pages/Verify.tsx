import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Verify = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.error("No session found");
          toast({
            title: "Error de verificación",
            description: "No se pudo verificar tu sesión",
            variant: "destructive",
          });
          navigate('/user-login');
          return;
        }

        const { user } = session;
        console.log("User session:", user);

        // Check if user is admin
        if (user?.email === "amexpuey@gmail.com") {
          navigate('/admin/companies');
          return;
        }

        // For regular users, check if they exist in profiles
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', user.email)
          .single();

        if (profileError) {
          console.error("Profile error:", profileError);
          toast({
            title: "Error",
            description: "Usuario no encontrado",
            variant: "destructive",
          });
          navigate('/user-login');
          return;
        }

        // If we get here, the user exists and is verified
        navigate('/dashboard');
        
      } catch (error) {
        console.error('Verification error:', error);
        toast({
          title: "Error",
          description: "Error al verificar tu cuenta",
          variant: "destructive",
        });
        navigate('/user-login');
      }
    };

    handleVerification();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900">Verificando...</h2>
        <p className="mt-2 text-gray-600">Por favor, espera mientras verificamos tu cuenta.</p>
      </div>
    </div>
  );
};

export default Verify;