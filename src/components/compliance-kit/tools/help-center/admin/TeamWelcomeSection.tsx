
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, UserPlus, Users, Mail, Shield } from "lucide-react";

export default function TeamWelcomeSection() {
  return (
    <Accordion type="single" collapsible className="w-full mb-6">
      <AccordionItem value="team-welcome" className="border border-gray-200 rounded-lg overflow-hidden">
        <AccordionTrigger className="px-4 py-3 bg-white hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="bg-[#0BC8C1]/10 p-2 rounded-full">
              <UserPlus className="h-5 w-5 text-[#0BC8C1]" />
            </div>
            <div className="text-left">
              <div className="font-medium text-lg">4. Da la bienvenida a tu equipo</div>
              <div className="text-sm text-gray-500">Invita a tus empleados y gestiona sus roles en la plataforma</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 pt-2 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <p className="text-gray-700 mb-4">
                Para que tus empleados puedan empezar a registrar su jornada laboral, necesitas darles 
                de alta en la plataforma. INWOUT ofrece varias formas de añadir a tu equipo:
              </p>
              
              <div className="space-y-4 mb-6">
                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <h4 className="flex items-center text-lg font-medium mb-2 text-purple-700">
                      <Mail className="w-5 h-5 mr-2" />
                      Invitación por email
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      <li>Ve a <strong className="text-purple-700">Usuarios</strong> en el menú lateral izquierdo</li>
                      <li>Haz clic en <strong>+ Añadir usuario</strong> en la esquina superior derecha</li>
                      <li>Introduce el correo electrónico, nombre, apellidos y departamento del empleado</li>
                      <li>Selecciona un <strong>rol</strong> (trabajador o manager) y asigna un <strong>horario</strong></li>
                      <li>Elige <strong>Enviar invitación</strong> para que el empleado reciba instrucciones de acceso</li>
                    </ol>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <h4 className="flex items-center text-lg font-medium mb-2 text-green-700">
                      <Users className="w-5 h-5 mr-2" />
                      Importación masiva
                    </h4>
                    <p className="mb-3 text-gray-700">
                      Para empresas con muchos empleados, es recomendable utilizar la importación mediante Excel:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      <li>Ve a <strong className="text-green-700">Usuarios</strong> y haz clic en <strong>Importar Excel</strong></li>
                      <li>Descarga la plantilla "Rellenar Empleados" desde el enlace proporcionado</li>
                      <li>En la columna "rol", usa <strong>W</strong> para trabajadores y <strong>M</strong> para managers</li>
                      <li>Sube el archivo y verifica la correcta asignación de columnas</li>
                      <li>Elimina la fila de encabezados antes de finalizar la importación</li>
                    </ol>
                    <div className="mt-3">
                      <a 
                        href="https://docs.google.com/spreadsheets/d/1_JewhrBgVJTEYzeF1AS2cxn_m7MxHNTV/edit?usp=sharing&ouid=103999337277921296480&rtpof=true&sd=true" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-700 flex items-center hover:underline font-medium"
                      >
                        <FileSpreadsheet className="w-4 h-4 mr-1" /> Descargar plantilla "Rellenar Empleados"
                      </a>
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                      <span className="font-medium text-green-700">Nota:</span> Asegúrate de que los nombres de los 
                      horarios en el Excel coincidan exactamente con los configurados en la plataforma.
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <h4 className="flex items-center text-lg font-medium mb-2 text-blue-700">
                      <Shield className="w-5 h-5 mr-2" />
                      Gestión de roles y permisos
                    </h4>
                    <p className="mb-3 text-gray-700">
                      INWOUT ofrece dos roles principales para gestionar adecuadamente tu equipo:
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                        <div>
                          <strong className="text-blue-700">Trabajador (Worker):</strong> 
                          <ul className="list-disc list-inside ml-2 mt-1 text-sm">
                            <li>Puede registrar entradas y salidas</li>
                            <li>Consultar su historial de fichajes</li>
                            <li>Solicitar vacaciones y ausencias</li>
                            <li>Ver sus propias estadísticas</li>
                          </ul>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                        <div>
                          <strong className="text-blue-700">Manager:</strong>
                          <ul className="list-disc list-inside ml-2 mt-1 text-sm">
                            <li>Todas las funciones de un trabajador</li>
                            <li>Acceso a los fichajes de su equipo</li>
                            <li>Aprobación de solicitudes de ausencia</li>
                            <li>Gestión de horarios y turnos</li>
                            <li>Visualización de estadísticas y reportes</li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-3 text-sm text-gray-500">
                      <span className="font-medium text-blue-700">Consejo:</span> Asigna el rol de Manager únicamente 
                      a personas con responsabilidad sobre equipos para mantener la jerarquía adecuada.
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Button 
                className="bg-[#0BC8C1] hover:bg-[#0AB1AB] w-full"
                onClick={() => window.open("https://app.inwout.com/users", "_blank")}
              >
                Gestionar mi equipo en app.inwout.com
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="lg:w-2/5 flex-shrink-0">
              <div className="sticky top-4 space-y-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                  <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h4 className="font-medium text-gray-700">Panel de importación de empleados</h4>
                  </div>
                  <div className="p-3">
                    <img 
                      src="/lovable-uploads/acb228f6-cfc6-4e2f-a631-584c0fefe7aa.png" 
                      alt="Importación masiva de empleados en INWOUT" 
                      className="w-full rounded"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Importador de Empleados en Bulk (Importación Masiva de Empleados)
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                  <div className="p-3 bg-gray-50 border-b border-gray-200">
                    <h4 className="font-medium text-gray-700">Email de activación de cuenta</h4>
                  </div>
                  <div className="p-3">
                    <img 
                      src="/lovable-uploads/539e2a1d-63e4-42da-a69a-814cb6de8dd0.png" 
                      alt="Email de bienvenida y activación de cuenta INWOUT" 
                      className="w-full rounded border border-gray-200"
                    />
                    <p className="text-sm text-gray-700 mt-3">
                      Una vez se ha enviado la invitación, los empleados recibirán un email como este para:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                      <li>Activar su cuenta a través del enlace proporcionado</li>
                      <li>Crear su propia contraseña de acceso</li>
                      <li>Descargar la aplicación móvil desde App Store o Google Play</li>
                    </ul>
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
