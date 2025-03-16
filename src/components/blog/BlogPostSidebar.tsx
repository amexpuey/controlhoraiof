
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/ads/AdBanner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ComplianceChecker from "./ComplianceChecker";
import { useNavigate } from "react-router-dom";
import { Book } from "lucide-react";

interface BlogPostSidebarProps {
  relatedApps?: string[];
}

export default function BlogPostSidebar({ relatedApps }: BlogPostSidebarProps) {
  const [isCheckerOpen, setIsCheckerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sticky top-4">
      {/* Sidebar Ad */}
      <AdBanner position="sidebar" adSize="300x250" />
      
      {/* Featured App Banner (300x600px) */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-bold mb-4">App Destacada</h3>
        <a href="/mejores-apps-control-horario/inwout" className="block">
          <img 
            src="/lovable-uploads/d6062b36-0681-45de-b8e9-c72886e9b4eb.png" 
            alt="INWOUT - Automatiza el Control Horario con Geofence" 
            className="w-full h-auto rounded-lg hover:opacity-95 transition-opacity"
            style={{ maxWidth: "300px" }}
          />
        </a>
      </div>
      
      {/* Compliance Checker Tool Teaser */}
      <div className="bg-blue-50 rounded-lg shadow-sm p-4 border border-blue-200">
        <h3 className="text-lg font-bold mb-2 text-blue-800 text-left">Verificador de cumplimiento</h3>
        <p className="text-sm text-blue-700 mb-4 text-left">Comprueba si cumples con la normativa laboral de registro horario y evita multas</p>
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600"
          onClick={() => setIsCheckerOpen(true)}
        >
          Comprobar ahora
        </Button>
      </div>
      
      {/* Compliance Checker Dialog */}
      <Dialog open={isCheckerOpen} onOpenChange={setIsCheckerOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-800">
              Verificador de Cumplimiento Normativo
            </DialogTitle>
            <DialogDescription className="text-blue-700">
              Comprueba si tu empresa cumple con la normativa de registro horario en España
            </DialogDescription>
          </DialogHeader>
          <ComplianceChecker onClose={() => setIsCheckerOpen(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Additional Filter Options Box */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h3 className="text-lg font-bold mb-3">Filtros rápidos</h3>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start bg-gray-50 hover:bg-gray-100"
            onClick={() => navigate("/mejores-apps-control-horario?filter=free")}
          >
            🆓 Soluciones gratuitas
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start bg-gray-50 hover:bg-gray-100"
            onClick={() => navigate("/mejores-apps-control-horario?filter=spanish")}
          >
            🇪🇸 Software español
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start bg-gray-50 hover:bg-gray-100"
            onClick={() => navigate("/mejores-apps-control-horario?filter=top")}
          >
            🔝 Top 10 más valoradas
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start bg-gray-50 hover:bg-gray-100"
            onClick={() => navigate("/mejores-apps-control-horario?filter=mobile")}
          >
            📱 Con apps móviles
          </Button>
        </div>
      </div>
      
      {/* Another Sidebar Ad */}
      <AdBanner position="sidebar" adSize="300x250" />
    </div>
  );
}
