import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Company = Database["public"]["Tables"]["companies"]["Row"];

export default function ComparisonPage() {
  const { appIds } = useParams();
  const navigate = useNavigate();
  const [apps, setApps] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        if (!appIds) {
          setError("No se proporcionaron aplicaciones para comparar");
          setLoading(false);
          return;
        }

        // Split the comma-separated string into an array and validate UUIDs
        const idsArray = appIds.split(',');
        const isValidUUID = (uuid: string) => {
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          return uuidRegex.test(uuid);
        };

        // Validate all IDs are valid UUIDs
        if (!idsArray.every(isValidUUID)) {
          setError("IDs de aplicación inválidos");
          setLoading(false);
          return;
        }

        console.log('Fetching apps with IDs:', idsArray);

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

        console.log('Fetched apps:', data);
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
  }, [appIds]);

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
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
            >
              Volver al Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container py-12">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Comparación de Aplicaciones
          </h1>
          <Button
            variant="outline"
            onClick={() => navigate('/admin')}
          >
            Volver al Dashboard
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-48">Características</TableHead>
                {apps.map((app) => (
                  <TableHead key={app.id} className="text-center">
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={app.logo_url}
                        alt={`${app.title} logo`}
                        className="w-12 h-12 rounded-lg object-contain"
                      />
                      <span className="font-bold">{app.title}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Tipo</TableCell>
                {apps.map((app) => (
                  <TableCell key={app.id} className="text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      app.type === "premium" 
                        ? "bg-purple-100 text-purple-700"
                        : app.type === "freemium"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {app.type.charAt(0).toUpperCase() + app.type.slice(1)}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Precio</TableCell>
                {apps.map((app) => (
                  <TableCell key={app.id} className="text-center">
                    {app.pricing_starting_price === 0 
                      ? "Gratis"
                      : `${app.pricing_starting_price}€/${app.pricing_billing_period}`}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Valoraciones</TableCell>
                {apps.map((app) => (
                  <TableCell key={app.id} className="text-center">
                    {app.votes} votos
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Características</TableCell>
                {apps.map((app) => (
                  <TableCell key={app.id}>
                    <ul className="list-disc list-inside">
                      {app.features?.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Enlace</TableCell>
                {apps.map((app) => (
                  <TableCell key={app.id} className="text-center">
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      Visitar <ExternalLink className="w-4 h-4" />
                    </a>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}