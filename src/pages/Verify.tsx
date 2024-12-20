import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerification = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/user-login');
        return;
      }

      const { user } = session;
      const isUserLogin = session?.user?.user_metadata?.isUserLogin;
      const isAdmin = user?.email === "amexpuey@gmail.com";

      if (isAdmin && !isUserLogin) {
        navigate('/admin/companies');
      } else {
        navigate('/dashboard');
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