import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Verify = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        if (window.location.hash) {
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          
          if (accessToken && refreshToken) {
            const { data: { session }, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            
            if (error) throw error;
            
            if (session) {
              const userEmail = session.user.email;
              
              // Check if it's the admin email
              if (userEmail === 'amexpuey@gmail.com') {
                toast({
                  title: "Verificación exitosa",
                  description: "Por favor, ingresa tu contraseña para continuar.",
                });
                navigate('/login', { replace: true });
                return;
              }
              
              // For regular users
              toast({
                title: "¡Verificación exitosa!",
                description: "Tu correo ha sido verificado correctamente.",
              });
              navigate('/dashboard', { replace: true });
              return;
            }
          }
        }

        // Check current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const userEmail = session.user.email;
          if (userEmail === 'amexpuey@gmail.com') {
            navigate('/login', { replace: true });
          } else {
            navigate('/dashboard', { replace: true });
          }
        } else {
          toast({
            title: "Error de verificación",
            description: "Por favor, intenta verificar tu correo nuevamente.",
            variant: "destructive",
          });
          navigate('/', { replace: true });
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        navigate('/', { replace: true });
      }
    };

    handleVerification();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Verificando...</h2>
        <p className="text-gray-600">Por favor, espera mientras verificamos tu correo.</p>
      </div>
    </div>
  );
};

export default Verify;