import { Star, Check, X, Monitor, ThumbsUp } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import VoteButton from "@/components/VoteButton";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AboutSectionProps {
  company: Company;
}

export function AboutSection({ company }: AboutSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-4">Acerca de {company.title}</h2>
      <p className="text-gray-600 text-lg mb-8">{company.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Valoraciones</h3>
          <div className="flex flex-col items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.floor(company.rating || 4.5)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-blue-600" />
              <span className="text-xl font-bold">{company.votes || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Periodo de Prueba</h3>
          <div className="flex justify-center">
            {company.title === 'INWOUT' || company.free_trial === 'yes' ? (
              <Check className="w-12 h-12 text-green-500" />
            ) : (
              <X className="w-12 h-12 text-red-500" />
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Plan Gratuito</h3>
          <div className="flex justify-center">
            {company.title === 'INWOUT' || company.free_plan === 'yes' ? (
              <Check className="w-12 h-12 text-green-500" />
            ) : (
              <X className="w-12 h-12 text-red-500" />
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Disponible en</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {(company.platforms || ['Web', 'iOS', 'Android']).map((platform) => (
              <span
                key={platform}
                className="text-blue-600 flex items-center gap-1 text-base"
              >
                <Monitor className="w-5 h-5" />
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}