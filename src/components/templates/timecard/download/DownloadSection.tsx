
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { toast } from "sonner";

interface DownloadSectionProps {
  period: string;
  setPeriod: (period: string) => void;
}

export default function DownloadSection({ period, setPeriod }: DownloadSectionProps) {
  const handleDownload = (periodType: string) => {
    // En una implementación real, aquí se generaría el archivo Excel dinámicamente
    // Por ahora, simularemos la descarga con un mensaje de toast
    toast.success(`Plantilla de ${getPeriodName(periodType)} descargada correctamente`);
  };
  
  const getPeriodName = (periodType: string) => {
    switch (periodType) {
      case "week": return "semana";
      case "month": return "mes";
      case "quarter": return "trimestre";
      case "year": return "año";
      default: return "mes";
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-blue-100">
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Descarga tu plantilla</h2>
        <p>Selecciona el periodo que mejor se adapte a tus necesidades de registro horario</p>
      </div>
      <CardContent className="p-6">
        <Tabs defaultValue="month" value={period} onValueChange={setPeriod} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="week" className="flex flex-col items-center gap-1 py-3">
              <Calendar className="h-5 w-5" />
              <span>Semanal</span>
            </TabsTrigger>
            <TabsTrigger value="month" className="flex flex-col items-center gap-1 py-3">
              <Calendar className="h-5 w-5" />
              <span>Mensual</span>
            </TabsTrigger>
            <TabsTrigger value="quarter" className="flex flex-col items-center gap-1 py-3">
              <Calendar className="h-5 w-5" />
              <span>Trimestral</span>
            </TabsTrigger>
            <TabsTrigger value="year" className="flex flex-col items-center gap-1 py-3">
              <Calendar className="h-5 w-5" />
              <span>Anual</span>
            </TabsTrigger>
          </TabsList>

          <div className="mb-6">
            <TabsContent value="week" className="mt-0">
              <TemplatePreview 
                imageSrc="/lovable-uploads/4efc5a5e-0fc6-450c-8097-471f8f05bcd9.png"
                description="Versión semanal ideal para un control detallado día a día. Perfecto para trabajadores con horarios variables o por turnos."
              />
            </TabsContent>
            
            <TabsContent value="month" className="mt-0">
              <TemplatePreview 
                imageSrc="/lovable-uploads/4efc5a5e-0fc6-450c-8097-471f8f05bcd9.png"
                description="Versión mensual con detalle semanal incluido. La opción más equilibrada entre detalle y visión general."
              />
            </TabsContent>
            
            <TabsContent value="quarter" className="mt-0">
              <TemplatePreview 
                imageSrc="/lovable-uploads/4efc5a5e-0fc6-450c-8097-471f8f05bcd9.png"
                description="Formato trimestral que permite visualizar tendencias en periodos más largos. Incluye resúmenes mensuales y semanales."
              />
            </TabsContent>
            
            <TabsContent value="year" className="mt-0">
              <TemplatePreview 
                imageSrc="/lovable-uploads/4efc5a5e-0fc6-450c-8097-471f8f05bcd9.png"
                description="Versión anual completa con todos los meses integrados. Ideal para planificación y análisis de patrones de trabajo a largo plazo."
              />
            </TabsContent>
          </div>
          
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
            onClick={() => handleDownload(period)}
          >
            <Download className="mr-2 h-5 w-5" /> 
            Descargar plantilla {period === "week" ? "semanal" : period === "month" ? "mensual" : period === "quarter" ? "trimestral" : "anual"}
          </Button>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface TemplatePreviewProps {
  imageSrc: string;
  description: string;
}

function TemplatePreview({ imageSrc, description }: TemplatePreviewProps) {
  return (
    <div className="text-center">
      <img 
        src={imageSrc} 
        alt="Vista previa de la plantilla" 
        className="max-w-full h-auto mx-auto mb-4 rounded-lg border shadow-sm" 
      />
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  );
}
