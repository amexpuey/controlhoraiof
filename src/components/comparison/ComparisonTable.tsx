import { Check, X, Monitor } from "lucide-react";
import { isOwnProduct } from "@/components/OwnProductBadge";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface ComparisonTableProps {
  apps: Company[];
}

const Availability = ({ value, own }: { value: string | null; own: boolean }) => {
  if (value === 'yes') return (<div className="flex items-center"><Check className="w-5 h-5 text-green-500" /><span className="ml-2 text-sm">Disponible</span></div>);
  if (value === 'no' && own) return (<div className="flex items-center"><X className="w-5 h-5 text-red-500" /><span className="ml-2 text-sm">No disponible</span></div>);
  return <span className="text-sm text-gray-500">Sin dato</span>;
};

const PlatformList = ({ platforms }: { platforms: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-start">
      {platforms.map((platform) => (
        <span
          key={platform}
          className="text-blue-600 flex items-center gap-1 text-sm"
        >
          <Monitor className="w-4 h-4" />
          {platform}
        </span>
      ))}
    </div>
  );
};

export default function ComparisonTable({ apps }: ComparisonTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Características</th>
            {apps.map((app) => (
              <th key={app.id} className="py-3 px-4">
                <div className="flex flex-col items-start gap-2">
                  <img
                    src={app.logo_url}
                    alt={`${app.title} logo`}
                    className="w-24 h-8 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-900">{app.title}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr>
            <td className="py-3 px-4 text-sm font-medium text-gray-900 text-left">Periodo de Prueba</td>
            {apps.map((app) => (
              <td key={app.id} className="py-3 px-4">
                <Availability value={app.free_trial} own={isOwnProduct(app.slug)} />
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-3 px-4 text-sm font-medium text-gray-900 text-left">Plan Gratuito</td>
            {apps.map((app) => (
              <td key={app.id} className="py-3 px-4">
                <Availability value={app.free_plan} own={isOwnProduct(app.slug)} />
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-3 px-4 text-sm font-medium text-gray-900 text-left">Disponible en</td>
            {apps.map((app) => (
              <td key={app.id} className="py-3 px-4">
                {app.platforms?.length ? <PlatformList platforms={app.platforms} /> : <span className="text-sm text-gray-500">Sin dato</span>}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}