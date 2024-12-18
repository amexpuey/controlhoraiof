import { Card } from "@/components/ui/card";
import { Globe, Users } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface SidebarProps {
  company: Company;
}

export function Sidebar({ company }: SidebarProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Pricing</h3>
        <div className="space-y-4">
          <div className="text-3xl font-bold text-blue-600">
            {company.pricing_starting_price === 0 
              ? "Free"
              : `${company.pricing_starting_price}${company.pricing_currency}/${company.pricing_billing_period}`}
          </div>
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Globe className="w-5 h-5" />
            Visit Website
          </a>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 text-gray-600">
          <Users className="w-5 h-5" />
          <span>{company.votes} users have voted</span>
        </div>
      </Card>
    </div>
  );
}