
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/ads/AdBanner";
import RelatedAppCard from "./RelatedAppCard";
import { useNavigate } from "react-router-dom";

interface BlogPostSidebarProps {
  relatedApps?: string[];
}

export default function BlogPostSidebar({ relatedApps }: BlogPostSidebarProps) {
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
