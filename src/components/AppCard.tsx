import { Check } from "lucide-react";
import VoteButton from "./VoteButton";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Database } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";
import { AppCardHeader } from "./app-card/AppCardHeader";
import { AppCardTitle } from "./app-card/AppCardTitle";
import { AppCardFeatures } from "./app-card/AppCardFeatures";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppCardProps {
  app: Company;
  onClick?: () => void;
  showCompare?: boolean;
  isSelected?: boolean;
  onCompareToggle?: () => void;
  highlightedFeatures?: string[];
}

export default function AppCard({ 
  app, 
  showCompare, 
  isSelected, 
  onCompareToggle,
  highlightedFeatures = []
}: AppCardProps) {
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

  const formatPrice = () => {
    const price = app.pricing_starting_price === 0 ? "Gratis" : `${app.pricing_starting_price}€`;
    const perUser = app.pricing_per_user ? "/usuario" : "";
    const period = app.pricing_billed_annually ? "/año" : "/mes";
    const billingNote = app.pricing_billed_annually ? " (facturado anualmente)" : "";
    
    return `${price}${perUser}${period}${billingNote}`;
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer relative"
      onClick={handleCardClick}
    >
      <AppCardHeader
        imgUrl={app.img_url}
        logoUrl={app.logo_url}
        title={app.title}
        verified={app.verified}
        isTopRated={app.is_top_rated}
      />
      
      <div className="p-6">
        <AppCardTitle
          title={app.title}
          platforms={app.platforms}
          url={app.url}
        />

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

        <AppCardFeatures 
          features={app.features || []}
          highlightedFeatures={highlightedFeatures}
        />

        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-4">
            <VoteButton companyId={app.id} votes={app.votes} />
            <div className="text-gray-700">
              {app.pricing_description && (
                <div className="text-xs text-gray-500 mb-1">ID: {app.id}</div>
              )}
              <div className="font-medium">
                {formatPrice()}
              </div>
              {app.pricing_description ? (
                <div className="text-sm text-gray-500">{app.pricing_description}</div>
              ) : app.use_case ? (
                <div className="text-sm text-gray-500">{app.use_case}</div>
              ) : null}
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