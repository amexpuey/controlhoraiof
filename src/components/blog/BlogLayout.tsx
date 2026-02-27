
import { Link } from "react-router-dom";
import logoIcon from "@/assets/logofichajes-3.png";
import logoText from "@/assets/fichajeempresas-text.png";
import { LayoutGrid } from "lucide-react";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "../layout/MobileMenu";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--white)" }}>
      {/* Header with INWOUT dark background */}
      <div
        className="h-16 border-b flex items-center justify-between px-4 md:px-6 shadow-md z-10 relative"
        style={{ background: "var(--dark)" }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src={logoIcon} alt="FichajeEmpresas.es" className="h-8 w-8" />
          <img src={logoText} alt="FichajeEmpresas.es" className="h-5 hidden sm:inline" />
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
            
            <Link
              to="/blog"
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--dark-text)" }}
            >
              Blog
            </Link>
            <Link
              to="/directorio"
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all hover:opacity-90 shadow-sm"
              style={{ background: "var(--green)", color: "var(--white)" }}
            >
              <LayoutGrid className="w-4 h-4" />
              Descubre las mejores apps
            </Link>
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
