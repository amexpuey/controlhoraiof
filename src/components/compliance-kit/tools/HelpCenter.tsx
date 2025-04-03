
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, BookOpen, CheckCircle, FileText, HelpCircle, ListChecks, Settings, Smartphone, Users, Download, Play, Link, MapPin, Bell, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface HelpCenterProps {
  isStandalone?: boolean;
  activeSection?: string;
}

export default function HelpCenter({ isStandalone = false, activeSection = "admin" }: HelpCenterProps) {
  const navigate = useNavigate();
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

  const adminSections = [
    {
      id: "primeros-pasos",
      title: "Primeros pasos con INWOUT",
      description: "Configura la cuenta y los ajustes básicos para empezar",
      icon: Settings,
      items: [
        "Iniciar sesión como administrador",
        "Configurar horario laboral de la empresa",
        "Definir centros de trabajo",
        "Configurar días festivos"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "gestion-empleados",
      title: "Gestión de empleados",
      description: "Añadir, editar y gestionar cuentas de usuario",
      icon: Users,
      items: [
        "Añadir nuevos empleados",
        "Importación masiva desde Excel (CSV)",
        "Gestión de perfiles y permisos",
        "Asignación de horarios por departamento"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "permisos-jerarquia",
      title: "Tipos de permisos y jerarquía de departamentos",
      description: "Gestiona permisos y estructura organizativa",
      icon: Users,
      items: [
        "Crear y asignar permisos personalizados",
        "Configurar límites y requisitos",
        "Establecer jerarquía entre departamentos"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "automatizacion-fichaje",
      title: "Automatización y métodos de fichaje",
      description: "Configura diferentes métodos de control horario",
      icon: MapPin,
      items: [
        "Activar Geolocalización y Geofence",
        "Crear keypads (teclado numérico)",
        "Configurar el fichaje vía app, web y dispositivos"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "alertas-notificaciones",
      title: "Alertas, notificaciones y check-out automático",
      description: "Configura el sistema de avisos y automatizaciones",
      icon: Bell,
      items: [
        "Definir rangos obligatorios y recibir alertas push",
        "Activar el check-out automático al finalizar la jornada",
        "Configurar recordatorios por mail a empleados y managers"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "gestion-fichajes",
      title: "Gestión de fichajes",
      description: "Administra los registros horarios de tu equipo",
      icon: FileText,
      items: [
        "Añadir, editar y eliminar registros",
        "Cargar fichajes por Excel",
        "Exportar informes mensuales de horas trabajadas, vacaciones y permisos"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "calendario-laboral",
      title: "Exportar Calendario Laboral",
      description: "Genera y comparte el calendario de tu empresa",
      icon: Calendar,
      items: [
        "Exportación por año completo a .xls",
        "Visualización por colores según tipo de permiso"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "recursos-enlaces",
      title: "Recursos y enlaces importantes",
      description: "Accesos rápidos a herramientas y recursos",
      icon: Link,
      items: [
        "Acceso directo a INWOUT Cloud",
        "Recuperación de contraseña",
        "Enlaces a la app iOS / Android",
        "Tutoriales y vídeos para cada paso"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  // Contenido específico basado en la sección activa
  const renderSectionContent = () => {
    if (isStandalone) {
      switch (activeSection) {
        case "admin":
          return (
            <div className="space-y-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Centro de Ayuda y Manual de Configuración</h2>
                <p className="text-gray-600">
                  Bienvenido al <strong>Centro de Ayuda y Manual para Administradores</strong> de INWOUT. 
                  Aquí aprenderás paso a paso cómo configurar correctamente tu plataforma, automatizar el control 
                  horario y garantizar el cumplimiento legal desde el primer día.
                </p>
              </div>

              <div className="mb-8">
                <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img 
                    src="/public/lovable-uploads/856aa11b-7db5-4318-928c-b81b1127a2c4.png" 
                    alt="Tutorial INWOUT para administradores" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Vista general de secciones</h3>
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
                {adminSections.map((section, index) => (
                  <AccordionItem key={section.id} value={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <AccordionTrigger className="px-4 py-3 bg-white hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#0BC8C1]/10 p-2 rounded-full">
                          <section.icon className="h-5 w-5 text-[#0BC8C1]" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-lg">{index + 1}. {section.title}</div>
                          <div className="text-sm text-gray-500">{section.description}</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-2 border-t border-gray-100">
                      <div className="mb-4">
                        <div className="mb-3">
                          <div className="text-md font-medium mb-2">Acciones</div>
                          <div className="space-y-2">
                            {section.items.map((item, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <Checkbox id={`${section.id}-item-${i}`} />
                                <label
                                  htmlFor={`${section.id}-item-${i}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {item}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        {section.videoUrl && (
                          <div className="mt-4">
                            <div className="flex items-center text-md font-medium mb-2">
                              <Play className="w-4 h-4 mr-1" />
                              <span>Tutorial en vídeo</span>
                            </div>
                            <div className="aspect-video w-full rounded-md overflow-hidden bg-gray-100">
                              <iframe 
                                className="w-full h-full"
                                src={section.videoUrl} 
                                title={`Tutorial - ${section.title}`}
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                              ></iframe>
                            </div>
                          </div>
                        )}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Button 
                            className="bg-[#0BC8C1] hover:bg-[#0AB1AB] w-full"
                            onClick={() => window.open("https://app.inwout.com/login", "_blank")}
                          >
                            Configurar esta sección en app.inwout.com
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
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
              <h2 className="text-xl font-semibold text-gray-800">Manual para usuarios - App móvil</h2>
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
              <h2 className="text-xl font-semibold text-gray-800">Manual para usuarios - Portal web</h2>
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
    
    // Contenido estándar para cuando no es standalone
    return (
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Centro de Ayuda y Manuales</h3>
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
