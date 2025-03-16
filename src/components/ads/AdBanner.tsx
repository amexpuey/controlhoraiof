
import React, { useEffect, useState } from "react";

interface AdBannerProps {
  className?: string;
  position: "top" | "bottom" | "sidebar" | "app-page";
  adSize: "728x90" | "300x600" | "300x250" | "320x50" | "970x250";
}

// Ad data with images and URLs
const adData = [
  {
    id: 1,
    imageUrl: "/lovable-uploads/6d049c91-e42a-40fa-b2c1-e2d8073439a8.png",
    targetUrl: "https://www.inwout.com/notificaciones-y-alertas-inteligentes-para-el-control-horario-digital-inwout",
    altText: "Cumple con el Registro Horario Digital, Gratis"
  },
  {
    id: 2,
    imageUrl: "/lovable-uploads/aa51e388-b7c9-43cc-8cdb-e08f5f98ee35.png",
    targetUrl: "https://www.inwout.com/geofence-registro-horario-automatizado",
    altText: "Automatiza el Control Horario con Geofence"
  },
  {
    id: 3,
    imageUrl: "/lovable-uploads/7854110b-e580-48c5-896c-f83416062128.png",
    targetUrl: "https://app.inwout.com/registrer",
    altText: "¿Cansado de Fichajes Olvidados?"
  }
];

/**
 * AdBanner Component
 * 
 * Standard ad unit sizes (width x height in pixels):
 * - 728x90: Leaderboard (top/bottom of page)
 * - 300x600: Half Page or Large Skyscraper (sidebar)
 * - 300x250: Medium Rectangle (in-content)
 * - 320x50: Mobile Banner (mobile devices)
 * - 970x250: Billboard (large top banner)
 */
const AdBanner: React.FC<AdBannerProps> = ({ className = "", position, adSize }) => {
  // Parse dimensions from the adSize prop
  const [width, height] = adSize.split('x').map(Number);
  
  // State to store the selected ad
  const [selectedAd, setSelectedAd] = useState<typeof adData[0] | null>(null);
  
  // Select a random ad when component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * adData.length);
    setSelectedAd(adData[randomIndex]);
  }, []);
  
  // If no ad is selected yet, show placeholder
  if (!selectedAd) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg overflow-hidden ${className}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100%',
          margin: '0 auto'
        }}
      >
        <div className="text-center">
          <p className="text-gray-400 text-sm">Cargando anuncio...</p>
        </div>
      </div>
    );
  }
  
  return (
    <a 
      href={selectedAd.targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block overflow-hidden ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: '100%',
        margin: '0 auto'
      }}
    >
      <img 
        src={selectedAd.imageUrl} 
        alt={selectedAd.altText}
        className="w-full h-full object-cover rounded-lg"
        style={{ 
          width: `${width}px`,
          height: `${height}px`
        }}
      />
    </a>
  );
};

export default AdBanner;
