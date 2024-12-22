import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface HighlightsSectionProps {
  company: Company;
}

export function HighlightsSection({ company }: HighlightsSectionProps) {
  if (!Array.isArray(company.highlights) || company.highlights.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Destacados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {company.highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-green-500 mt-1" />
            <span className="text-gray-700">{highlight}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}