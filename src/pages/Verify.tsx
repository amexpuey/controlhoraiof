import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerification = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.email === "amexpuey@gmail.com") {
        // For admin user, redirect to password reset
        navigate('/password-reset');
      } else {
        // For regular users, redirect to dashboard
        navigate('/dashboard');
      }
    };

    handleVerification();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Verifying...</h2>
        <p className="mt-2 text-gray-600">Please wait while we verify your account.</p>
      </div>
    </div>
  );
};

export default Verify;