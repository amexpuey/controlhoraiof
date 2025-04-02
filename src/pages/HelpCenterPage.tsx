
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HelpCenter from "@/components/compliance-kit/tools/HelpCenter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Settings, Smartphone, BookOpen } from "lucide-react";

export default function HelpCenterPage() {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "INWOUT - Centro de Ayuda | Control Horario Electrónico";
    
    // Validar que la sección es válida
    if (!["admin", "app", "web"].includes(section || "")) {
      navigate("/kit-legal/ayuda/admin");
    }
  }, [section, navigate]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
      </div>
    </div>
  );
}
