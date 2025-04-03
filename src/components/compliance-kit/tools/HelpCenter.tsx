
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, BookOpen, CheckCircle, FileText, HelpCircle, ListChecks, Settings, Smartphone, Users, Download, Play, Link, MapPin, Bell, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useHelpContent } from "@/hooks/useHelpContent";
import HelpStepItems from "./HelpStepItems";

interface HelpCenterProps {
  isStandalone?: boolean;
  activeSection?: string;
}

export default function HelpCenter({ isStandalone = false, activeSection = "admin" }: HelpCenterProps) {
  const navigate = useNavigate();
  const { helpSteps, welcomeVideo, isLoading, error } = useHelpContent(activeSection);
  
  console.log("HelpCenter - isStandalone:", isStandalone);
  console.log("HelpCenter - activeSection:", activeSection);

  const manuals = [
    {
      id: "admin",
      title: "Para administradores",
      description: "Aprende a configurar y administrar INWOUT para tu empresa",
      icon: Settings,
      url: "/kit-legal/ayuda/admin"
    },
    {
      id: "app",
      title: "Para usuarios - App",
      description: "Guía de uso de la aplicación móvil de INWOUT",
      icon: Smartphone,
      url: "/kit-legal/ayuda/app"
    },
    {
      id: "web",
      title: "Para usuarios - Web",
      description: "Aprende a fichar y gestionar tu tiempo desde el navegador",
      icon: BookOpen,
      url: "/kit-legal/ayuda/web"
    }
  ];

  const modules = [
    {
      id: "fichajes",
      title: "Implementar sistema de fichajes",
      description: "Aprende a configurar el método de fichaje adecuado para tu empresa",
      icon: FileText,
      url: "/kit-legal/modulo-fichajes"
    },
    {
      id: "horarios",
      title: "Definir horarios",
      description: "Guía completa para configurar los horarios de tus empleados",
      icon: Users,
      url: "/kit-legal/define-horarios"
    },
    {
      id: "bienvenida",
      title: "Bienvenida a tu equipo",
      description: "Plantillas y pasos para incorporar a tu equipo",
      icon: Users,
      url: "/kit-legal/bienvenida-equipo"
    },
    {
      id: "comunicacion",
      title: "Comunicación fluida",
      description: "Configura correctamente las notificaciones y alertas",
      icon: HelpCircle,
      url: "/kit-legal/comunicacion-equipo"
    },
    {
      id: "geofence",
      title: "Automatizar con Geofence",
      description: "Configura el registro horario automático por geolocalización",
      icon: AlertTriangle,
      url: "/kit-legal/automatiza-con-geofence"
    }
  ];

  const handleNavigate = (url: string) => {
    console.log("Navigating to:", url);
    navigate(url);
  };

  const renderSectionContent = () => {
    if (isStandalone) {
      switch (activeSection) {
        case "admin":
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
        case "app":
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Guía para usuarios - App móvil</h2>
              <div className="grid grid-cols-1 gap-6">
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>1. Instalación y primer uso</CardTitle>
                    <CardDescription>Primeros pasos con la app móvil INWOUT</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Descargar la app desde App Store o Google Play</li>
                      <li>Iniciar sesión con tus credenciales</li>
                      <li>Configurar notificaciones</li>
                      <li>Interfaz principal</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>2. Fichar entrada y salida</CardTitle>
                    <CardDescription>Registrar tu jornada laboral</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Hacer check-in desde la app</li>
                      <li>Hacer check-out al finalizar</li>
                      <li>Registrar pausas</li>
                      <li>Ver el tiempo acumulado</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>3. Funciones adicionales</CardTitle>
                    <CardDescription>Sacarle el máximo partido a INWOUT</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Solicitar vacaciones y permisos</li>
                      <li>Consultar calendario laboral</li>
                      <li>Ver estadísticas personales</li>
                      <li>Comunicación con tu equipo</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        case "web":
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Guía para usuarios - Portal web</h2>
              <div className="grid grid-cols-1 gap-6">
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>1. Acceso al portal web</CardTitle>
                    <CardDescription>Primeros pasos en la plataforma web de INWOUT</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Acceder a app.inwout.com</li>
                      <li>Iniciar sesión con tus credenciales</li>
                      <li>Navegación por el dashboard</li>
                      <li>Personalizar tu perfil</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>2. Gestión de fichajes</CardTitle>
                    <CardDescription>Registrar y gestionar tu jornada laboral</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Fichar entrada desde el navegador</li>
                      <li>Registrar la salida</li>
                      <li>Añadir comentarios a los fichajes</li>
                      <li>Corregir fichajes incorrectos</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>3. Portal del empleado</CardTitle>
                    <CardDescription>Acceso a toda tu información laboral</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Consultar informes de horas trabajadas</li>
                      <li>Solicitar y gestionar vacaciones</li>
                      <li>Acceder a documentos laborales</li>
                      <li>Comunicación con recursos humanos</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        default:
          return null;
      }
    }
    
    return (
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Manuales de Configuración y Uso</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {manuals.map((manual) => (
              <Card key={manual.id} className="border border-gray-200 hover:border-[#0BC8C1] hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <div className="bg-[#0BC8C1]/10 p-3 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <manual.icon className="h-6 w-6 text-[#0BC8C1]" />
                  </div>
                  <CardTitle className="text-lg">{manual.title}</CardTitle>
                  <CardDescription>{manual.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#0BC8C1] hover:bg-[#0AB1AB]"
                    onClick={() => handleNavigate(manual.url)}
                  >
                    Ver manual
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Módulos de Onboarding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => (
              <Card key={module.id} className="border border-gray-200 hover:border-[#0BC8C1] hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <div className="bg-[#0BC8C1]/10 p-3 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <module.icon className="h-6 w-6 text-[#0BC8C1]" />
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#0BC8C1] hover:bg-[#0AB1AB]"
                    onClick={() => handleNavigate(module.url)}
                  >
                    Ver módulo
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Herramientas adicionales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border border-gray-200 hover:border-[#0BC8C1] hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="bg-[#0BC8C1]/10 p-3 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle className="h-6 w-6 text-[#0BC8C1]" />
                </div>
                <CardTitle className="text-lg">Verificador de Cumplimiento</CardTitle>
                <CardDescription>Evalúa el nivel de cumplimiento de tu empresa en materia laboral</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full bg-[#0BC8C1] hover:bg-[#0AB1AB]"
                  onClick={() => handleNavigate("/kit-legal/verificador")}
                >
                  Verificar cumplimiento
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border border-gray-200 hover:border-[#0BC8C1] hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="bg-[#0BC8C1]/10 p-3 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <ListChecks className="h-6 w-6 text-[#0BC8C1]" />
                </div>
                <CardTitle className="text-lg">Checklist Interactivo</CardTitle>
                <CardDescription>Lista personalizada de obligaciones legales según tu sector</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full bg-[#0BC8C1] hover:bg-[#0AB1AB]"
                  onClick={() => handleNavigate("/kit-legal/checklist")}
                >
                  Ver checklist
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border border-gray-200 hover:border-[#0BC8C1] hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="bg-[#0BC8C1]/10 p-3 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#0BC8C1]" />
                </div>
                <CardTitle className="text-lg">Plantillas Legales</CardTitle>
                <CardDescription>Descarga documentos esenciales para el cumplimiento normativo</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full bg-[#0BC8C1] hover:bg-[#0AB1AB]"
                  onClick={() => handleNavigate("/kit-legal/plantillas")}
                >
                  Ver plantillas
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                ¿Listo para empezar a usar INWOUT?
              </h3>
              <p className="text-gray-600">
                Configura tu cuenta directamente desde la plataforma y comienza a gestionar el tiempo de tu equipo.
              </p>
            </div>
            <Button 
              className="bg-[#2a3040] hover:bg-[#3a4156] text-white px-6"
              onClick={() => window.open("https://app.inwout.com/login", "_blank")}
            >
              Ir a app.inwout.com
            </Button>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div>
      {renderSectionContent()}
    </div>
  );
}
