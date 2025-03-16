
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/ads/AdBanner";
import RelatedAppCard from "./RelatedAppCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Onboarding } from "@/components/Onboarding";
import { useNavigate } from "react-router-dom";

interface BlogPostSidebarProps {
  relatedApps?: string[];
}

export default function BlogPostSidebar({ relatedApps }: BlogPostSidebarProps) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sticky top-4">
      {/* Sidebar Ad */}
      <AdBanner position="sidebar" adSize="300x250" />
      
      {/* Related Apps */}
      {relatedApps && relatedApps.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-bold mb-4">Aplicaciones relacionadas</h3>
          <div className="space-y-4">
            {relatedApps.map((appId) => (
              <RelatedAppCard key={appId} appId={appId} />
            ))}
          </div>
        </div>
      )}
      
      {/* Interactive Tool Teaser */}
      <div className="bg-yellow-50 rounded-lg shadow-sm p-4 border border-yellow-200">
        <h3 className="text-lg font-bold mb-2 text-yellow-800">¿Cuál es la mejor app para ti?</h3>
        <p className="text-sm text-yellow-700 mb-4">Nuestro asistente inteligente te ayudará a encontrar la herramienta de control horario ideal para tu empresa.</p>
        <Button 
          className="w-full bg-yellow-500 hover:bg-yellow-600"
          onClick={() => setIsQuizOpen(true)}
        >
          Encuentra tu app de control horario
        </Button>
      </div>
      
      {/* Quiz Dialog */}
      <Dialog open={isQuizOpen} onOpenChange={setIsQuizOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-yellow-800">
              Encuentra tu app de control horario ideal
            </DialogTitle>
            <DialogDescription className="text-yellow-700">
              En solo dos pasos, te recomendaremos las mejores aplicaciones
            </DialogDescription>
          </DialogHeader>
          <Onboarding 
            onFeaturesSelect={(features) => {
              // Close dialog first
              setIsQuizOpen(false);
              // Then navigate to dashboard with selected features as URL parameters
              const featuresQuery = features.join(',');
              navigate(`/mejores-apps-control-horario?features=${featuresQuery}`);
            }}
            onSizeSelect={() => {}}
          />
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
