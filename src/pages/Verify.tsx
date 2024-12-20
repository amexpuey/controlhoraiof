import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerification = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.email === "amexpuey@gmail.com") {
        // For admin user, redirect to admin dashboard
        navigate('/admin/companies');
      } else {
        // For regular users, redirect to user dashboard
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