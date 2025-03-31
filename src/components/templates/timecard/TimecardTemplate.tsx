
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

export default function TimecardTemplate() {
  const [period, setPeriod] = useState("month");
  
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
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Registro de horas trabajadas - Timecard para empleados</h1>
          <p className="text-gray-600 mb-6">
            Esta plantilla permite a los empleados y managers llevar un registro detallado de las horas trabajadas, 
            facilitando el control de la jornada laboral y el cumplimiento de la normativa de registro horario.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Características principales:</h3>
            <ul className="list-disc pl-5 space-y-1 text-blue-700">
              <li>Campos personalizables para información del empleado</li>
              <li>Control por semanas, meses y trimestres</li>
              <li>Diferenciación entre horas ordinarias y extraordinarias</li>
              <li>Cálculos automáticos de totales diarios, semanales y mensuales</li>
              <li>Indicadores visuales de desviaciones respecto a la jornada estándar</li>
              <li>Tablas de resumen para evaluación rápida</li>
            </ul>
          </div>
        </div>
        
        <Card className="mb-8 overflow-hidden border-2 border-blue-100">
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
                  <div className="text-center">
                    <img 
                      src="/lovable-uploads/4efc5a5e-0fc6-450c-8097-471f8f05bcd9.png" 
                      alt="Vista previa de la plantilla semanal" 
                      className="max-w-full h-auto mx-auto mb-4 rounded-lg border shadow-sm" 
                    />
                    <p className="text-gray-600 mb-4">
                      Versión semanal ideal para un control detallado día a día. Perfecto para trabajadores 
                      con horarios variables o por turnos.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="month" className="mt-0">
                  <div className="text-center">
                    <img 
                      src="/lovable-uploads/4efc5a5e-0fc6-450c-8097-471f8f05bcd9.png" 
                      alt="Vista previa de la plantilla mensual" 
                      className="max-w-full h-auto mx-auto mb-4 rounded-lg border shadow-sm" 
                    />
                    <p className="text-gray-600 mb-4">
                      Versión mensual con detalle semanal incluido. La opción más equilibrada entre 
                      detalle y visión general.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="quarter" className="mt-0">
                  <div className="text-center">
                    <img 
                      src="/lovable-uploads/4efc5a5e-0fc6-450c-8097-471f8f05bcd9.png" 
                      alt="Vista previa de la plantilla trimestral" 
                      className="max-w-full h-auto mx-auto mb-4 rounded-lg border shadow-sm" 
                    />
                    <p className="text-gray-600 mb-4">
                      Formato trimestral que permite visualizar tendencias en periodos más largos.
                      Incluye resúmenes mensuales y semanales.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="year" className="mt-0">
                  <div className="text-center">
                    <img 
                      src="/lovable-uploads/4efc5a5e-0fc6-450c-8097-471f8f05bcd9.png" 
                      alt="Vista previa de la plantilla anual" 
                      className="max-w-full h-auto mx-auto mb-4 rounded-lg border shadow-sm" 
                    />
                    <p className="text-gray-600 mb-4">
                      Versión anual completa con todos los meses integrados. Ideal para planificación 
                      y análisis de patrones de trabajo a largo plazo.
                    </p>
                  </div>
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
        
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-xl font-bold mb-4">Instrucciones de uso</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">1. Información del empleado</h4>
              <p className="text-gray-600">
                Completa los campos de cabecera con los datos del trabajador: nombre, email, teléfono y responsable.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">2. Registro diario</h4>
              <p className="text-gray-600">
                Introduce las horas trabajadas cada día, diferenciando entre horas ordinarias y extraordinarias.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">3. Control semanal</h4>
              <p className="text-gray-600">
                La plantilla calculará automáticamente los totales semanales y generará alertas visuales 
                si se superan o no se alcanzan las horas estipuladas.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">4. Resúmenes mensuales</h4>
              <p className="text-gray-600">
                Al final de cada mes, la plantilla mostrará un resumen con las horas ordinarias, 
                extraordinarias y totales trabajadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
