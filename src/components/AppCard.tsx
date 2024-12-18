import { ExternalLink, Award, CheckCircle } from "lucide-react";
import VoteButton from "./VoteButton";
import { Card } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppCardProps {
  app: Company;
  onClick: () => void;
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
}

export default function AppCard({ app, onClick, matchingFeaturesCount = 0, totalSelectedFeatures = 0 }: AppCardProps) {
  if (!app) return null;

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(app.url, '_blank');
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={app.img_url}
          alt={app.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {app.verified && (
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Verificado
            </span>
          )}
          {app.is_top_rated && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Award className="w-4 h-4" />
              Top Rated
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={app.logo_url}
              alt={`${app.title} logo`}
              className="w-12 h-12 rounded-lg object-contain"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{app.title}</h3>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                app.type === "premium" 
                  ? "bg-purple-100 text-purple-700"
                  : app.type === "freemium"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}>
                {app.type.charAt(0).toUpperCase() + app.type.slice(1)}
              </span>
            </div>
          </div>
          
          <button
            onClick={handleExternalLinkClick}
            className="text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-4 text-gray-600 line-clamp-2">{app.description}</p>

        {totalSelectedFeatures > 0 && (
          <div className="mt-4 bg-primary-50 text-primary-700 px-3 py-2 rounded-lg text-sm font-medium">
            {matchingFeaturesCount} de {totalSelectedFeatures} características seleccionadas
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {app.features?.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {feature}
            </span>
          ))}
          {app.features && app.features.length > 3 && (
            <span className="text-gray-500 text-sm">
              +{app.features.length - 3} más
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <VoteButton companyId={app.id} votes={app.votes} />
          <div className="text-gray-700">
            {app.pricing_starting_price === 0 
              ? "Gratis"
              : `Desde ${app.pricing_starting_price}€/${app.pricing_billing_period}`}
          </div>
        </div>
      </div>
    </Card>
  );
}