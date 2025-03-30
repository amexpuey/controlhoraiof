import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        
        <Link to="/admin/import-blog-posts" className="block">
          <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 h-full">
            <h2 className="text-xl font-semibold mb-2">Importar Artículos del Blog</h2>
            <p className="text-gray-600">
              Importa artículos de prueba a la base de datos para tener contenido real de ejemplo.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
