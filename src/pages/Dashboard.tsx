import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Panel de Control
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bienvenido a tu panel de control horario
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard cards will go here */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Registrar Entrada/Salida</h3>
            <p className="text-gray-600">Registra tus horas de trabajo diarias</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Informes</h3>
            <p className="text-gray-600">Visualiza tus registros horarios</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Configuración</h3>
            <p className="text-gray-600">Personaliza tus preferencias</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;