
import { Link, useLocation } from "react-router-dom";
import { ToolsDropdown } from "../ui/ToolsDropdown";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "./MobileMenu";

export function AppHeader() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-900 border-b flex items-center justify-between px-4 md:px-6 shadow-md z-10 relative">
      <Link to="/" className="text-lg md:text-xl font-semibold text-white hover:text-gray-200 transition-colors truncate max-w-[180px] md:max-w-none">
        Fichajes Empresas .es
      </Link>
      
      {isMobile ? (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
      ) : (
        <div className="flex items-center gap-4">
          <ToolsDropdown />
          <Link 
            to="/blog" 
            className="text-sm font-medium text-white hover:text-gray-200 transition-colors"
          >
            Blog
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-1.5 text-sm font-medium bg-yellow-100 text-gray-800 hover:bg-yellow-200 px-3 py-1.5 rounded-md transition-colors"
          >
            <img
              src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
              alt="Home"
              className="w-4 h-4"
            />
            Descubre las mejores apps
          </Link>
        </div>
      )}
    </div>
  );
}
