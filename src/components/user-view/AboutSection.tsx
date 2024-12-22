import { Star, Check, X, Monitor, ThumbsUp } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import VoteButton from "@/components/VoteButton";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AboutSectionProps {
  company: Company;
}

export function AboutSection({ company }: AboutSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-4 text-left">Acerca de {company.title}</h2>
      <p className="text-gray-600 text-base mb-6 text-left">{company.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3 text-left">Valoraciones</h3>
          <div className="flex flex-col items-start gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.floor(company.rating || 4.5)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">{company.votes || 0} votos</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3 text-left">Periodo de Prueba</h3>
          <div className="flex items-center">
            {company.title === 'INWOUT' || company.free_trial === 'yes' ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <X className="w-5 h-5 text-red-500" />
            )}
            <span className="ml-2 text-sm">
              {company.title === 'INWOUT' || company.free_trial === 'yes' ? 'Disponible' : 'No disponible'}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3 text-left">Plan Gratuito</h3>
          <div className="flex items-center">
            {company.title === 'INWOUT' || company.free_plan === 'yes' ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <X className="w-5 h-5 text-red-500" />
            )}
            <span className="ml-2 text-sm">
              {company.title === 'INWOUT' || company.free_plan === 'yes' ? 'Disponible' : 'No disponible'}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3 text-left">Disponible en</h3>
          <div className="flex flex-wrap gap-2">
            {(company.platforms || ['Web', 'iOS', 'Android']).map((platform) => (
              <span
                key={platform}
                className="text-blue-600 flex items-center gap-1 text-sm"
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