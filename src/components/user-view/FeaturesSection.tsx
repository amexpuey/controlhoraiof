import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface FeaturesSectionProps {
  company: Company;
}

export function FeaturesSection({ company }: FeaturesSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {company.features?.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-500 mt-1" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}