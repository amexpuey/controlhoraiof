
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { SanctionCalculator } from "./SanctionCalculator";

interface ComplianceResultsProps {
  results: {
    level: "compliant" | "medium-risk" | "high-risk";
    violations: { question: string; sanction: string; riskLevel: string }[];
    complianceScore: number;
  };
  resetForm: () => void;
  isEmbedded?: boolean;
}

export function ComplianceResults({ results, resetForm, isEmbedded = false }: ComplianceResultsProps) {
  return (
    <div className={`py-6 ${isEmbedded ? "bg-white p-4 rounded-lg shadow-sm" : ""}`}>
      <div className={`mb-4 flex items-center gap-2 ${
        results.level === "compliant" ? "text-green-700" : 
        results.level === "medium-risk" ? "text-yellow-700" : 
        "text-red-700"
      }`}>
        {results.level === "compliant" && (
          <>
            <CheckCircle className="text-green-600 h-6 w-6" />
            <h2 className="text-xl font-bold">Cumples con la normativa</h2>
          </>
        )}
        {results.level === "medium-risk" && (
          <>
            <AlertTriangle className="text-yellow-600 h-6 w-6" />
            <h2 className="text-xl font-bold">Riesgo Medio - Posibles sanciones leves o graves</h2>
          </>
        )}
        {results.level === "high-risk" && (
          <>
            <AlertCircle className="text-red-600 h-6 w-6" />
            <h2 className="text-xl font-bold">Alto Riesgo - Posibles sanciones muy graves</h2>
          </>
        )}
      </div>
      
      <div className="text-lg font-medium mb-4">
        Puntuación de cumplimiento: {Math.round(results.complianceScore)}%
      </div>

      <div className="py-4">
        {results.level === "compliant" ? (
          <p className="text-green-700 mb-4">
            ¡Tu empresa está en regla! Sigue así para evitar problemas legales con el registro horario. Tu sistema de control horario cumple con los requisitos establecidos por el Real Decreto-ley 8/2019.
          </p>
        ) : (
          <>
            <p className={`mb-4 ${results.level === "medium-risk" ? "text-yellow-700" : "text-red-700"}`}>
              {results.level === "medium-risk" 
                ? "Tu empresa podría enfrentar sanciones. Revisa tus prácticas laborales relacionadas con el registro horario." 
                : "Tu empresa está en alto riesgo de multas significativas. Es urgente tomar medidas correctivas inmediatas."}
            </p>
            {results.violations.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold">Incumplimientos detectados:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {results.violations.map((violation, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium">{violation.question}</span>
                      <div className="ml-2 text-xs text-gray-600">Posible sanción: <span className="font-semibold">{violation.sanction}</span> (Riesgo {violation.riskLevel})</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={resetForm}
        >
          Volver a realizar el test
        </Button>
        {!isEmbedded && (
          <a 
            href="https://inwout.com/demo-online" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
          >
            <span>Solicitar demo de INWOUT</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
