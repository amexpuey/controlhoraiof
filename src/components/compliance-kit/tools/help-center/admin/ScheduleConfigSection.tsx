
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Settings, Calendar, Clock3, AlertCircle } from "lucide-react";

export default function ScheduleConfigSection() {
  return (
    <Accordion type="single" collapsible className="w-full mb-6">
      <AccordionItem value="schedule-config" className="border border-gray-200 rounded-lg overflow-hidden">
        <AccordionTrigger className="px-4 py-3 bg-white hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="bg-[#0BC8C1]/10 p-2 rounded-full">
              <Clock className="h-5 w-5 text-[#0BC8C1]" />
            </div>
            <div className="text-left">
              <div className="font-medium text-lg">3. Define los horarios de tus empleados</div>
              <div className="text-sm text-gray-500">Configura turnos, horas laborales y notificaciones de fichaje</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 pt-2 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <p className="text-gray-700 mb-4">
                La correcta configuración de los horarios de trabajo es esencial para el control de presencia. 
                Sigue estos pasos para configurar los horarios de forma eficiente en INWOUT:
              </p>
              
              <div className="space-y-4 mb-6">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <h4 className="flex items-center text-lg font-medium mb-2 text-blue-700">
                      <Settings className="w-5 h-5 mr-2" />
                      Acceso a la configuración
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      <li>Ve a <strong className="text-blue-700">Configuración &gt; Horarios</strong> en el panel principal</li>
                      <li>Edita el horario existente por defecto o crea uno nuevo con el botón <strong>+ Nuevo horario</strong></li>
                    </ol>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <h4 className="flex items-center text-lg font-medium mb-2 text-green-700">
                      <Calendar className="w-5 h-5 mr-2" />
                      Configuración básica
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                        <span>Asigna un <strong>nombre</strong> al horario y define los <strong>días de vacaciones disponibles</strong> al año</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                        <span>Establece las <strong>horas diarias</strong> o déjalo en blanco para usar solo los rangos obligatorios</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
                        <span>Define la <strong>fecha de inicio</strong> y, opcionalmente, la <strong>fecha de fin</strong> del horario</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">4</span>
                        <span>Configura la <strong>repetición</strong> del horario (anual, mensual, semanal o diaria)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <h4 className="flex items-center text-lg font-medium mb-2 text-purple-700">
                      <Clock3 className="w-5 h-5 mr-2" />
                      Configuración avanzada
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                        <span>Selecciona los <strong>meses</strong> en los que aplicará el horario</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                        <span>Especifica los <strong>días de la semana</strong> que se aplicará este horario</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
                        <span>Configura los <strong>rangos obligatorios</strong> (horas de trabajo de obligado cumplimiento)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">4</span>
                        <span>Añade los <strong>rangos de apertura</strong> para horarios flexibles</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">5</span>
                        <span>Crea <strong>componentes</strong> para gestionar excepciones (horarios de verano, festivos, etc.)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-1">Importante: Recordatorios de fichaje</h4>
                    <p className="text-amber-700 text-sm">
                      INWOUT enviará notificaciones push a cada usuario para recordar los fichajes de entrada y salida 
                      <strong> solo cuando hayas configurado los rangos obligatorios</strong>. Si no defines estos rangos, 
                      no se enviarán avisos automáticos.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="bg-[#0BC8C1] hover:bg-[#0AB1AB] w-full"
                onClick={() => window.open("https://app.inwout.com/settings/timetables/", "_blank")}
              >
                Configurar horarios en app.inwout.com
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="lg:w-2/5 flex-shrink-0">
              <div className="sticky top-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                  <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h4 className="font-medium text-gray-700">Interfaz de configuración de horarios</h4>
                  </div>
                  <div className="p-3">
                    <img 
                      src="/lovable-uploads/c27052b4-747f-4fff-a6f8-d59490e83cc4.png" 
                      alt="Configuración de horarios en INWOUT" 
                      className="w-full rounded"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Configuración de horarios de trabajo en la plataforma INWOUT
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
