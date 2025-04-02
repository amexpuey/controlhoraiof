
import React from "react";
import { Shield, Check, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComplianceKitHeader() {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('compliance-tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 md:py-12">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="bg-blue-100 p-3 rounded-full mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Kit Interactivo de Cumplimiento Legal
        </h1>
        
        <p className="text-xl text-gray-600 mb-6">
          Herramientas gratuitas para verificar, aprender y mejorar el cumplimiento normativo de tu empresa
        </p>
        
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {['PYMES', 'Directores RRHH', 'Asesorías', 'Autónomos'].map((audience) => (
            <div key={audience} className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
              <Check className="h-4 w-4 text-green-600 mr-1.5" />
              <span className="text-sm font-medium text-gray-700">{audience}</span>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={scrollToTools}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-lg font-medium text-lg flex items-center gap-2 transition-all hover:shadow-lg"
        >
          Acceder a Herramientas
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </Button>
      </div>
    </div>
  );
}
