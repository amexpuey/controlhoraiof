
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/ads/AdBanner";
import RelatedAppCard from "./RelatedAppCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Onboarding } from "@/components/Onboarding";

interface BlogPostSidebarProps {
  relatedApps?: string[];
}

export default function BlogPostSidebar({ relatedApps }: BlogPostSidebarProps) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

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
          </DialogHeader>
          <Onboarding 
            onFeaturesSelect={(features) => {
              // Handle features selection
              setIsQuizOpen(false);
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
            onClick={() => {}}
          >
            🆓 Soluciones gratuitas
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start bg-gray-50 hover:bg-gray-100"
            onClick={() => {}}
          >
            🇪🇸 Software español
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start bg-gray-50 hover:bg-gray-100"
            onClick={() => {}}
          >
            🔝 Top 10 más valoradas
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start bg-gray-50 hover:bg-gray-100"
            onClick={() => {}}
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
