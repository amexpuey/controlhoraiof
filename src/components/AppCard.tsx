import { ExternalLink, Award, CheckCircle, Check, X, Globe, Apple, Android } from "lucide-react";
import VoteButton from "./VoteButton";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Database } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppCardProps {
  app: Company;
  onClick?: () => void;
  showCompare?: boolean;
  isSelected?: boolean;
  onCompareToggle?: () => void;
}

export default function AppCard({ app, showCompare, isSelected, onCompareToggle }: AppCardProps) {
  const navigate = useNavigate();
  
  if (!app) return null;

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/mejores-apps-control-horario/${app.slug}`);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCompareToggle?.();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'web':
        return <Globe className="w-4 h-4" />;
      case 'ios':
        return <Apple className="w-4 h-4" />;
      case 'android':
        return <Android className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer relative"
      onClick={handleCardClick}
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
              <div className="flex flex-wrap gap-2 mt-1">
                {app.platforms?.map((platform) => (
                  <span key={platform} className="text-gray-600">
                    {getPlatformIcon(platform)}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <a
            href={app.url}
            onClick={(e) => e.stopPropagation()}
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {app.free_trial === 'yes' && (
            <span className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <Check className="w-4 h-4" />
              Periodo de prueba
            </span>
          )}
          {app.free_plan === 'yes' && (
            <span className="flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              <Check className="w-4 h-4" />
              Plan gratuito
            </span>
          )}
        </div>

        <p className="mt-4 text-gray-600 line-clamp-2">{app.description}</p>

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

        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-4">
            <VoteButton companyId={app.id} votes={app.votes} />
            <div className="text-gray-700">
              <div className="font-medium">
                {app.pricing_starting_price === 0 
                  ? "Gratis"
                  : `Desde ${app.pricing_starting_price}€/${app.pricing_billing_period}`}
              </div>
              {app.use_case && (
                <div className="text-sm text-gray-500">{app.use_case}</div>
              )}
            </div>
          </div>

          {showCompare && (
            <div 
              className="flex items-center gap-2"
              onClick={handleCompareClick}
            >
              <Checkbox
                checked={isSelected}
                id={`compare-${app.id}`}
                className="border-blue-500"
              />
              <label
                htmlFor={`compare-${app.id}`}
                className="text-sm font-medium text-blue-700 cursor-pointer"
              >
                Comparar
              </label>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}