import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Onboarding } from "@/components/Onboarding";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard', { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Control Horario Electrónico
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra la solución perfecta de control horario para tu empresa.
            Compara las mejores opciones del mercado y toma la decisión correcta.
          </p>
        </div>

        <Onboarding />
      </div>
    </div>
  );
};

export default Index;