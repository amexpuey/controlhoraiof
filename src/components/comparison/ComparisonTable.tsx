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
            className={`w-5 h-5 ${
              star <= Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : star <= rating
                ? "text-yellow-400 fill-yellow-400 opacity-50"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-2xl font-bold text-gray-900">{rating}</span>
    </div>
  );
};

const PlatformList = ({ platforms }: { platforms: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
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
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-4 px-6 text-left text-gray-600 font-medium">Características</th>
            {apps.map((app) => (
              <th key={app.id} className="py-4 px-6">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={app.logo_url}
                    alt={`${app.title} logo`}
                    className="w-32 h-12 object-contain"
                  />
                  <span className="text-base font-medium text-gray-900">{app.title}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="py-4 px-6 font-medium text-gray-900">Valoraciones</td>
            {apps.map((app) => (
              <td key={app.id} className="py-4 px-6">
                <div className="flex flex-col items-center gap-2">
                  <StarRating rating={app.rating || 4.5} />
                  <VoteButton companyId={app.id} votes={app.votes} />
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-4 px-6 font-medium text-gray-900">Periodo de Prueba</td>
            {apps.map((app) => (
              <td key={app.id} className="py-4 px-6">
                <div className="flex justify-center">
                  {app.title === 'INWOUT' || app.free_trial === 'yes' ? (
                    <Check className="w-8 h-8 text-green-500" />
                  ) : (
                    <X className="w-8 h-8 text-red-500" />
                  )}
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-4 px-6 font-medium text-gray-900">Plan Gratuito</td>
            {apps.map((app) => (
              <td key={app.id} className="py-4 px-6">
                <div className="flex justify-center">
                  {app.title === 'INWOUT' || app.free_plan === 'yes' ? (
                    <Check className="w-8 h-8 text-green-500" />
                  ) : (
                    <X className="w-8 h-8 text-red-500" />
                  )}
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-4 px-6 font-medium text-gray-900">Disponible en</td>
            {apps.map((app) => (
              <td key={app.id} className="py-4 px-6">
                <PlatformList platforms={app.platforms || ['Web', 'iOS', 'Android']} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}