import { Card } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AboutSectionProps {
  company: Company;
}

export function AboutSection({ company }: AboutSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <p className="text-gray-600 leading-relaxed">{company.description}</p>
    </Card>
  );
}