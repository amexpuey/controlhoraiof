
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

export default function HeaderActionsSection() {
  return (
    <div className="mb-4 flex justify-between items-center">
      <h3 className="text-xl font-semibold text-gray-800">Secciones de configuración</h3>
      <div className="flex gap-3">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span>Descargar PDF</span>
        </Button>
        <Button 
          className="bg-[#0BC8C1] hover:bg-[#0AB1AB] text-white"
          onClick={() => window.open("https://app.inwout.com/login", "_blank")}
        >
          <span>Ir a app.inwout.com</span>
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
