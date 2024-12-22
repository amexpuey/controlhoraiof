import { Star, Check, X, Monitor } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

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
    <div className="flex flex-wrap gap-2">
      {platforms.map((platform) => (
        <span
          key={platform}
          className="text-blue-600 flex items-center gap-1"
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
            <th className="py-4 px-6 text-left text-gray-600 font-medium">Features</th>
            {apps.map((app) => (
              <th key={app.id} className="py-4 px-6">
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={app.logo_url}
                    alt={`${app.title} logo`}
                    className="w-32 h-12 object-contain"
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="py-4 px-6 font-medium text-gray-900">Reviews</td>
            {apps.map((app) => (
              <td key={app.id} className="py-4 px-6">
                <div className="flex justify-center">
                  <StarRating rating={app.rating || 4.5} />
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-4 px-6 font-medium text-gray-900">Pricing</td>
            {apps.map((app) => (
              <td key={app.id} className="py-4 px-6 text-center">
                <p className="font-medium text-gray-900">
                  Starts at {app.pricing_currency}{app.pricing_starting_price}/{app.pricing_billing_period}
                </p>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-4 px-6 font-medium text-gray-900">Free Trial</td>
            {apps.map((app) => (
              <td key={app.id} className="py-4 px-6">
                <div className="flex justify-center items-center">
                  {app.free_trial === 'yes' ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    <X className="w-6 h-6 text-red-500" />
                  )}
                  <span className="ml-2">{app.free_trial !== 'yes' && app.free_trial !== 'no' ? app.free_trial : ''}</span>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-4 px-6 font-medium text-gray-900">Free Plan</td>
            {apps.map((app) => (
              <td key={app.id} className="py-4 px-6">
                <div className="flex justify-center items-center">
                  {app.free_plan === 'yes' ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    <X className="w-6 h-6 text-red-500" />
                  )}
                  <span className="ml-2">{app.free_plan !== 'yes' && app.free_plan !== 'no' ? app.free_plan : ''}</span>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-4 px-6 font-medium text-gray-900">Use cases</td>
            {apps.map((app) => (
              <td key={app.id} className="py-4 px-6 text-center">
                <p className="text-gray-600">{app.use_case}</p>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-4 px-6 font-medium text-gray-900">Available on</td>
            {apps.map((app) => (
              <td key={app.id} className="py-4 px-6">
                <div className="flex justify-center">
                  <PlatformList platforms={app.platforms || ['Web', 'iOS', 'Android']} />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}