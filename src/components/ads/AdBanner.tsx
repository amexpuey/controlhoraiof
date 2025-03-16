
import React from "react";

interface AdBannerProps {
  className?: string;
  position: "top" | "bottom" | "sidebar" | "in-content" | "app-page";
  adSize: "728x90" | "300x600" | "300x250" | "320x50" | "970x250";
}

/**
 * AdBanner Component
 * 
 * Dimensions reference:
 * - 728x90: Leaderboard (top/bottom of page)
 * - 300x600: Half Page or Large Skyscraper (sidebar)
 * - 300x250: Medium Rectangle (in-content)
 * - 320x50: Mobile Banner (mobile devices)
 * - 970x250: Billboard (large top banner)
 */
const AdBanner: React.FC<AdBannerProps> = ({ className = "", position, adSize }) => {
  return (
    <div className={`flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <div className="text-center">
        <p className="text-gray-400 text-sm">Espacio Reservado para Anuncios</p>
        <p className="text-gray-300 text-xs">{adSize} - {position}</p>
      </div>
    </div>
  );
};

export default AdBanner;
