
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Settings, Users, ListChecks, MapPin, Bell, FileText, Calendar, Link, Video } from "lucide-react";
import { HelpStep } from "@/hooks/useHelpContent";
import HelpStepItems from "../HelpStepItems";

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
