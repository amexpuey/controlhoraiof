
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, AlertCircle, ExternalLink } from "lucide-react";
import { ComplianceResult } from "./types";

interface ResultsDisplayProps {
  results: ComplianceResult;
  resetForm: () => void;
  closeDialog: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  resetForm,
  closeDialog
}) => {
  return (
    <div className="py-6">
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

      <div className="bg-gray-50 border border-gray-200 rounded-md p-3 relative mb-4">
        <div className="flex items-center">
          <div className="absolute top-1 right-1 bg-yellow-100 text-yellow-800 text-xs px-1 rounded flex items-center">
            <div className="flex items-center justify-center" style={{ width: "16px", height: "16px" }}>
              <img 
                src="/lovable-uploads/d48380f9-f5c9-4f3f-8184-8ef27150846d.png" 
                alt="Ad" 
                className="w-auto h-auto max-w-full max-h-full object-contain" 
              />
            </div>
            <span className="ml-1">Anuncio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex-shrink-0">
              <img 
                src="https://pvqbknpvkohxoftoloda.supabase.co/storage/v1/object/public/app_assets/logos/android-chrome-192x192.png" 
                alt="INWOUT Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Solución Recomendada:</p>
              <p className="text-sm text-gray-600 mb-2">INWOUT - Plataforma de control horario que garantiza el cumplimiento normativo</p>
            </div>
          </div>
          <a 
            href="https://inwout.com/demo-online" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
          >
            Solicitar Demo
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={resetForm}
        >
          Volver a realizar el test
        </Button>
        <Button 
          onClick={closeDialog}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Cerrar
        </Button>
      </div>
    </div>
  );
};
