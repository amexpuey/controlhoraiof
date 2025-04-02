
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, BookOpen, CheckCircle, FileText, HelpCircle, ListChecks, Settings, Smartphone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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

  // Contenido específico basado en la sección activa
  const renderSectionContent = () => {
    if (isStandalone) {
      switch (activeSection) {
        case "admin":
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Manual para administradores</h2>
              <div className="grid grid-cols-1 gap-6">
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>1. Primeros pasos con INWOUT</CardTitle>
                    <CardDescription>Configure la cuenta y los ajustes básicos para empezar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Iniciar sesión como administrador</li>
                      <li>Configurar horario laboral de la empresa</li>
                      <li>Definir centros de trabajo</li>
                      <li>Configurar días festivos</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>2. Gestión de empleados</CardTitle>
                    <CardDescription>Añadir, editar y gestionar cuentas de usuario</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Añadir nuevos empleados</li>
                      <li>Importación masiva desde CSV</li>
                      <li>Gestionar perfiles y permisos</li>
                      <li>Asignar horarios por departamento</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>3. Configuración avanzada</CardTitle>
                    <CardDescription>Personalizar INWOUT para adaptarlo a las necesidades de su empresa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Configurar geofencing para fichajes automáticos</li>
                      <li>Integración con otros sistemas</li>
                      <li>Automatización de informes</li>
                      <li>Gestión de notificaciones</li>
                    </ul>
                  </CardContent>
                </Card>
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
