
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Settings, Users, ListChecks, MapPin, Bell, FileText, Calendar, Link, Video, Clock, CalendarDays, Clock3, AlertCircle } from "lucide-react";
import { HelpStep } from "@/hooks/useHelpContent";
import HelpStepItems from "../HelpStepItems";
import { Card, CardContent } from "@/components/ui/card";

interface AdminHelpContentProps {
  helpSteps: HelpStep[];
  isLoading: boolean;
  error: string | null;
}

export default function AdminHelpContent({ helpSteps, isLoading, error }: AdminHelpContentProps) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Guía de Configuración para Administradores</h2>
        <p className="text-gray-600">
          Bienvenido a la <strong>Guía de Configuración INWOUT</strong>. 
          Aquí aprenderás paso a paso cómo configurar correctamente tu plataforma, automatizar el control 
          horario y garantizar el cumplimiento legal desde el primer día.
        </p>
      </div>

      <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Primeros pasos</h3>
        
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-100 text-blue-700 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-lg font-bold">1</span>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-1">Alta y registro</h4>
              <p className="text-gray-600 mb-2">
                Para empezar a configurar INWOUT, lo primero que haremos será darnos de alta en la plataforma.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => window.open("https://app.inwout.com/register", "_blank")}
              >
                Registrarse
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="bg-blue-100 text-blue-700 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-lg font-bold">2</span>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-1">Verificación de email</h4>
              <p className="text-gray-600 mb-2">
                Tras registrarte y proporcionar los datos de tu empresa, recibirás un email de 
                <a href="mailto:hi@inwout.com" className="text-blue-600 hover:underline mx-1">hi@inwout.com</a>
                para verificar tu cuenta.
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={() => window.open("https://app.inwout.com/password_reset/", "_blank")}
                >
                  Recuperar contraseña
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="video-tutorial" className="border border-gray-200 rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-white hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <Video className="h-5 w-5 text-red-600" />
                </div>
                <div className="text-left">
                  <span className="font-medium text-lg">Accede a INWOUT para configurar tu cuenta</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-2 border-t border-gray-100">
              <div className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <div style={{ padding:"56.31% 0 0 0", position:"relative" }}>
                  <iframe 
                    src="https://player.vimeo.com/video/1072074433?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                    style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%" }} 
                    title="Accede a INWOUT para configurar tu cuenta">
                  </iframe>
                </div>
                <script src="https://player.vimeo.com/api/player.js"></script>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

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

      {/* Special Schedule Configuration Section */}
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
                        <CalendarDays className="w-5 h-5 mr-2" />
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

      <Accordion type="single" collapsible className="w-full space-y-4">
        {isLoading ? (
          <div className="py-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0BC8C1] border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Cargando contenido...</p>
          </div>
        ) : (
          helpSteps.length > 0 ? (
            helpSteps.map((section, index) => (
              <AccordionItem key={section.id} value={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 bg-white hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#0BC8C1]/10 p-2 rounded-full">
                      {section.step_order === 1 && <Settings className="h-5 w-5 text-[#0BC8C1]" />}
                      {section.step_order === 2 && <Users className="h-5 w-5 text-[#0BC8C1]" />}
                      {section.step_order === 3 && <ListChecks className="h-5 w-5 text-[#0BC8C1]" />}
                      {section.step_order === 4 && <MapPin className="h-5 w-5 text-[#0BC8C1]" />}
                      {section.step_order === 5 && <Bell className="h-5 w-5 text-[#0BC8C1]" />}
                      {section.step_order === 6 && <FileText className="h-5 w-5 text-[#0BC8C1]" />}
                      {section.step_order === 7 && <Calendar className="h-5 w-5 text-[#0BC8C1]" />}
                      {section.step_order === 8 && <Link className="h-5 w-5 text-[#0BC8C1]" />}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-lg">{index + 1}. {section.title}</div>
                      <div className="text-sm text-gray-500">{section.description}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2 border-t border-gray-100">
                  <HelpStepItems step={section} />
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-600">No hay contenido disponible en este momento.</p>
            </div>
          )
        )}
      </Accordion>

      <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              ¿Necesitas ayuda personalizada?
            </h3>
            <p className="text-gray-600">
              Si tienes dudas específicas sobre la configuración, nuestro equipo de soporte estará encantado de ayudarte.
            </p>
          </div>
          <Button 
            className="bg-[#2a3040] hover:bg-[#3a4156] text-white px-6"
            onClick={() => window.open("https://inwout.com/contacto", "_blank")}
          >
            Contactar con soporte
          </Button>
        </div>
      </div>
    </div>
  );
}
