import { Check } from "lucide-react";
import VoteButton from "./VoteButton";
import { Card } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";
import { AppCardHeader } from "./app-card/AppCardHeader";
import { AppCardTitle } from "./app-card/AppCardTitle";
import { AppCardFeatures } from "./app-card/AppCardFeatures";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppCardProps {
  app: Company;
  onClick?: () => void;
  highlightedFeatures?: string[];
  isSelected?: boolean;
  onCompareToggle?: () => void;
}

export default function AppCard({ 
  app, 
  highlightedFeatures = [],
  isSelected = false,
  onCompareToggle
}: AppCardProps) {
  const navigate = useNavigate();
  
  if (!app) return null;

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/mejores-apps-control-horario/${app.slug}`);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCompareToggle) {
      onCompareToggle();
    }
  };

  const displayDescription = app.use_case || "En revisión";

  const formatPrice = () => {
    const price = app.pricing_starting_price === 0 ? "Gratis" : `${app.pricing_starting_price}€`;
    const perUser = app.pricing_per_user ? "/usuario" : "";
    const period = app.pricing_billing_period === 'mensual' ? '/mes' : `/${app.pricing_billing_period}`;
    const billingNote = app.pricing_billed_annually ? " (facturado anualmente)" : "";
    const prefix = app.pricing_starting_price === 0 ? "" : "";
    
    return `${prefix}${price}${perUser}${period}${billingNote}`;
  };

  return (
    <Card 
      className={`overflow-hidden transition-all hover:shadow-lg cursor-pointer relative ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
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
        <div className="flex justify-between items-start">
          <AppCardTitle
            title={app.title}
            platforms={app.platforms}
            url={app.url}
          />
          <div className="flex gap-2">
            {onCompareToggle && (
              <button
                onClick={handleCompareClick}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {isSelected ? 'Selected' : 'Compare'}
              </button>
            )}
            <VoteButton companyId={app.id} votes={app.votes} />
          </div>
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

        <p className="mt-4 text-gray-600 line-clamp-2 text-sm">{app.description}</p>

        <AppCardFeatures 
          features={app.features || []}
          highlightedFeatures={highlightedFeatures}
        />

        <div className="mt-6 border-t pt-4">
          <div className="text-gray-700">
            {app.pricing_starting_price !== 0 && (
              <div className="text-sm text-gray-500 mb-1">Desde</div>
            )}
            <div className="font-medium text-sm">
              {formatPrice()}
            </div>
            {displayDescription && (
              <div className="text-sm text-gray-500 mt-1">{displayDescription}</div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}