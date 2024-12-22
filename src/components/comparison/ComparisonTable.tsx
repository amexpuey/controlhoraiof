import { Star, Check, X, Monitor } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import VoteButton from "@/components/VoteButton";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface ComparisonTableProps {
  apps: Company[];
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : star <= rating
                ? "text-yellow-400 fill-yellow-400 opacity-50"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-lg font-medium text-gray-900">{rating}</span>
    </div>
  );
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
            <td className="py-3 px-4 text-sm font-medium text-gray-900 text-left">Valoraciones</td>
            {apps.map((app) => (
              <td key={app.id} className="py-3 px-4">
                <div className="flex flex-col items-start gap-2">
                  <StarRating rating={app.rating || 4.5} />
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">{app.votes || 0} votos</span>
                    <VoteButton companyId={app.id} votes={app.votes} />
                  </div>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-3 px-4 text-sm font-medium text-gray-900 text-left">Periodo de Prueba</td>
            {apps.map((app) => (
              <td key={app.id} className="py-3 px-4">
                <div className="flex items-center">
                  {app.title === 'INWOUT' || app.free_trial === 'yes' ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                  <span className="ml-2 text-sm">
                    {app.title === 'INWOUT' || app.free_trial === 'yes' ? 'Disponible' : 'No disponible'}
                  </span>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-3 px-4 text-sm font-medium text-gray-900 text-left">Plan Gratuito</td>
            {apps.map((app) => (
              <td key={app.id} className="py-3 px-4">
                <div className="flex items-center">
                  {app.title === 'INWOUT' || app.free_plan === 'yes' ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                  <span className="ml-2 text-sm">
                    {app.title === 'INWOUT' || app.free_plan === 'yes' ? 'Disponible' : 'No disponible'}
                  </span>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-3 px-4 text-sm font-medium text-gray-900 text-left">Disponible en</td>
            {apps.map((app) => (
              <td key={app.id} className="py-3 px-4">
                <PlatformList platforms={app.platforms || ['Web', 'iOS', 'Android']} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}