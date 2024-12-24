import { Card } from "@/components/ui/card";
import { Globe, Users } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import ReactMarkdown from 'react-markdown';

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface SidebarProps {
  company: Company;
}

export function Sidebar({ company }: SidebarProps) {
  const formatPrice = () => {
    const price = company.pricing_starting_price === 0 ? "Gratis" : `${company.pricing_starting_price}€`;
    const perUser = company.pricing_per_user ? "/usuario" : "";
    const period = company.pricing_billing_period === 'mensual' ? '/mes' : `/${company.pricing_billing_period}`;
    const billingNote = company.pricing_billed_annually ? " (facturado anualmente)" : "";
    const prefix = company.pricing_starting_price === 0 ? "" : "";
    
    return `${prefix}${price}${perUser}${period}${billingNote}`;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Precios</h3>
        <div className="space-y-4">
          {company.pricing_description ? (
            <div className="text-gray-600 text-sm">
              <ReactMarkdown>{company.pricing_description}</ReactMarkdown>
            </div>
          ) : (
            <div>
              {company.pricing_starting_price !== 0 && (
                <div className="text-sm text-gray-500 mb-1">Desde</div>
              )}
              <div className="font-medium text-gray-900">
                {formatPrice()}
              </div>
            </div>
          )}
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Globe className="w-5 h-5" />
            Visitar Sitio Web
          </a>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <Users className="w-5 h-5" />
          <span>{company.votes} usuarios han votado</span>
        </div>
        
        {company.use_case && (
          <div className="pt-2 border-t border-gray-200">
            <p className="text-sm text-gray-600">{company.use_case}</p>
          </div>
        )}
      </Card>
    </div>
  );
}