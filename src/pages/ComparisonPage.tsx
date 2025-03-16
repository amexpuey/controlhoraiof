import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import ComparisonHeader from "@/components/comparison/ComparisonHeader";
import ComparisonTable from "@/components/comparison/ComparisonTable";

type Company = Database["public"]["Tables"]["companies"]["Row"];

export default function ComparisonPage() {
  const { ids } = useParams();
  const [apps, setApps] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        if (!ids) {
          setError("No se proporcionaron aplicaciones para comparar");
          setLoading(false);
          return;
        }

        const idsArray = ids.split(',');
        const isValidUUID = (uuid: string) => {
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          return uuidRegex.test(uuid);
        };

        if (!idsArray.every(isValidUUID)) {
          setError("IDs de aplicación inválidos");
          setLoading(false);
          return;
        }

        const { data, error: supabaseError } = await supabase
          .from('companies')
          .select('*')
          .in('id', idsArray);

        if (supabaseError) {
          console.error('Error fetching apps:', supabaseError);
          setError("Error al cargar las aplicaciones");
          setLoading(false);
          return;
        }

        if (!data || data.length === 0) {
          setError("No se encontraron aplicaciones");
          setLoading(false);
          return;
        }

        setApps(data);
        setError(null);
      } catch (err) {
        console.error('Error in fetchApps:', err);
        setError("Error inesperado al cargar las aplicaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [ids]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center">
        <div className="animate-pulse">Cargando comparación...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <div className="container py-12">
          <ComparisonHeader />
          <div className="text-center text-red-600 mb-4">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container py-12">
        <ComparisonHeader />
        <ComparisonTable apps={apps} />
      </div>
    </div>
  );
}