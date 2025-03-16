
import React from "react";
import AdBanner from "./AdBanner";

interface SquareAdBannerProps {
  className?: string;
}

/**
 * Square Ad Banner Component
 * 
 * Displays a square ad banner (300x250) at the top of modals
 */
const SquareAdBanner: React.FC<SquareAdBannerProps> = ({ className = "" }) => {
  return (
    <div className={`w-full flex justify-center my-2 ${className}`}>
      <AdBanner position="in-content" adSize="300x250" />
    </div>
  );
};

export default SquareAdBanner;
