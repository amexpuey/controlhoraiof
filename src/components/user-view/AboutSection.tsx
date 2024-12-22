import { Star, Check, X, Monitor } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import VoteButton from "@/components/VoteButton";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AboutSectionProps {
  company: Company;
}

export function AboutSection({ company }: AboutSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Acerca de {company.title}</h2>
      <p className="text-gray-600 mb-6">{company.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Valoraciones</h3>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.floor(company.rating || 4.5)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <VoteButton companyId={company.id} votes={company.votes} />
          </div>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Periodo de Prueba</h3>
          {company.title === 'INWOUT' || company.free_trial === 'yes' ? (
            <Check className="w-8 h-8 text-green-500" />
          ) : (
            <X className="w-8 h-8 text-red-500" />
          )}
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Plan Gratuito</h3>
          {company.title === 'INWOUT' || company.free_plan === 'yes' ? (
            <Check className="w-8 h-8 text-green-500" />
          ) : (
            <X className="w-8 h-8 text-red-500" />
          )}
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Disponible en</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {(company.platforms || ['Web', 'iOS', 'Android']).map((platform) => (
              <span
                key={platform}
                className="text-blue-600 flex items-center gap-1"
              >
                <Monitor className="w-4 h-4" />
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}