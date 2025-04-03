
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VideoTutorial from "./VideoTutorial";

export default function IntroSection() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Guía de Configuración para Administradores</h2>
        <p className="text-gray-600">
          Bienvenido a la <strong>Guía de Configuración INWOUT</strong>. 
          Aquí aprenderás paso a paso cómo configurar correctamente tu plataforma, automatizar el control 
          horario y garantizar el cumplimiento legal desde el primer día.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full mb-8">
        <AccordionItem value="intro-welcome" className="border border-gray-200 rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-white hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-700">1</span>
              </div>
              <div className="text-left">
                <div className="font-medium text-lg">Primeros pasos</div>
                <div className="text-sm text-gray-500">Alta, registro y verificación de email</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-2 border-t border-gray-100">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-100 text-blue-700 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mt-1">
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
                  <div className="bg-blue-100 text-blue-700 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mt-1">
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
                
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-100 text-blue-700 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Accede a INWOUT para configurar tu cuenta</h4>
                    <div className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm mt-2">
                      <div style={{ padding:"56.31% 0 0 0", position:"relative" }}>
                        <iframe 
                          src="https://player.vimeo.com/video/1072074433?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                          frameBorder="0" 
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                          style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%" }} 
                          title="Accede a INWOUT para configurar tu cuenta">
                        </iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
