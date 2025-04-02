
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HelpCenter from "@/components/compliance-kit/tools/HelpCenter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Settings, Smartphone, BookOpen } from "lucide-react";
import LearningSidebar from "@/components/learning/sidebar/LearningSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function HelpCenterPage() {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const [learningProgress, setLearningProgress] = React.useState(0);
  
  useEffect(() => {
    document.title = "INWOUT - Centro de Ayuda | Control Horario Electrónico";
    
    // Validate that section is valid
    if (!["admin", "app", "web"].includes(section || "")) {
      navigate("/kit-legal/ayuda/admin");
    }
    
    // Get completed modules from localStorage to calculate progress
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    
    // Calculate progress based on completed modules
    if (completedModules.length > 0) {
      const progress = (completedModules.length / 3) * 100;
      setLearningProgress(progress);
    } else {
      // Set a default progress for new users
      setLearningProgress(0);
    }
  }, [section, navigate]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <LearningSidebar 
          learningProgress={learningProgress} 
          activeModuleId={null}
        />
        
        {/* Main content */}
        <div className="ml-64 flex-1">
          <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/kit-legal">Kit Legal</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/kit-legal/ayuda/admin">Centro de Ayuda</BreadcrumbLink>
                  </BreadcrumbItem>
                  {section && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink>
                          {section === "admin" && "Para administradores"}
                          {section === "app" && "App móvil"}
                          {section === "web" && "Portal web"}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Horas hoy: 0h 0m</span>
              <button className="bg-[#0BC8C1] hover:bg-[#0AB1AB] text-white px-4 py-2 rounded-md">
                Entrada
              </button>
            </div>
          </header>
          
          <main className="container max-w-7xl mx-auto px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                Centro de Ayuda y Manuales
              </h1>
              <p className="text-xl text-gray-600">
                Todo lo que necesitas saber para configurar y usar INWOUT correctamente
              </p>
            </div>

            <Tabs defaultValue={section || "admin"} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger 
                  value="admin" 
                  className="flex items-center gap-2"
                  onClick={() => navigate("/kit-legal/ayuda/admin")}
                >
                  <Settings className="h-4 w-4" />
                  <span>Para administradores</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="app" 
                  className="flex items-center gap-2"
                  onClick={() => navigate("/kit-legal/ayuda/app")}
                >
                  <Smartphone className="h-4 w-4" />
                  <span>App móvil</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="web" 
                  className="flex items-center gap-2"
                  onClick={() => navigate("/kit-legal/ayuda/web")}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Portal web</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value={section || "admin"} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-100 p-3 rounded-full">
                    {section === "admin" && <Settings className="h-8 w-8 text-blue-700" />}
                    {section === "app" && <Smartphone className="h-8 w-8 text-blue-700" />}
                    {section === "web" && <BookOpen className="h-8 w-8 text-blue-700" />}
                    {!section && <HelpCircle className="h-8 w-8 text-blue-700" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {section === "admin" && "Manual para administradores"}
                      {section === "app" && "Manual para usuarios - App móvil"}
                      {section === "web" && "Manual para usuarios - Portal web"}
                      {!section && "Centro de ayuda INWOUT"}
                    </h3>
                    <p className="text-gray-600">
                      {section === "admin" && "Aprende a configurar y administrar INWOUT para tu empresa"}
                      {section === "app" && "Guía de uso de la aplicación móvil de INWOUT"}
                      {section === "web" && "Aprende a fichar y gestionar tu tiempo desde el navegador"}
                      {!section && "Selecciona una sección para empezar"}
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <HelpCenter isStandalone={true} activeSection={section || "admin"} />
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
