
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import StandaloneComplianceChecker from "@/components/compliance/StandaloneComplianceChecker";

export default function ComplianceCheckerPage() {
  const [searchParams] = useSearchParams();
  const isEmbedded = searchParams.get("embed") === "true";
  
  useEffect(() => {
    // Set body styles for embedded mode
    if (isEmbedded) {
      document.body.style.background = "transparent";
      document.body.style.margin = "0";
      document.body.style.padding = "0";
    }
    
    return () => {
      // Reset styles when component unmounts
      document.body.style.background = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, [isEmbedded]);

  return (
    <div className={`${isEmbedded ? "" : "p-6 max-w-4xl mx-auto"}`}>
      {!isEmbedded && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Verificador de Cumplimiento Normativo</h1>
          <p className="text-gray-600">
            Comprueba si tu empresa cumple con la normativa laboral de registro horario en España y evita posibles sanciones.
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">¿Quieres integrar este verificador en tu web?</h2>
            <p className="text-sm text-blue-700 mb-3">
              Puedes integrar este verificador en tu página web utilizando el siguiente código iframe:
            </p>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto text-sm">
              <code>{`<iframe src="${window.location.origin}/compliance-checker?embed=true" width="100%" height="700px" frameborder="0"></iframe>`}</code>
            </div>
          </div>
        </div>
      )}
      <StandaloneComplianceChecker isEmbedded={isEmbedded} />
    </div>
  );
}
