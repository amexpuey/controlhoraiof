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
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
          console.log("Session found:", session);
          toast({
            title: "¡Verificación exitosa!",
            description: "Tu correo ha sido verificado correctamente.",
          });
          navigate('/dashboard');
        } else {
          console.log("No session found");
          toast({
            title: "Error de verificación",
            description: "Por favor, intenta verificar tu correo nuevamente.",
            variant: "destructive",
          });
          navigate('/');
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        navigate('/');
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