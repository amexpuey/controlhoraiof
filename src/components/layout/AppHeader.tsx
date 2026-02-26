
import { Link } from "react-router-dom";
import { CheckCircle, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "./MobileMenu";
import logoFichajes from "@/assets/logo-fichajes.png";

export function AppHeader() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-16 border-b flex items-center justify-between px-4 md:px-6 shadow-md z-10 relative" style={{ background: "var(--dark)" }}>
      <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
        <img src={logoFichajes} alt="Fichaje Empresas" className="h-9 w-9" />
        <span className="text-lg font-semibold hidden sm:inline" style={{ color: "var(--dark-text)" }}>
          FichajeEmpresas.es
        </span>
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
            to="/directorio" 
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--dark-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--dark-text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--dark-muted)")}
          >
            Directorio
          </Link>
          <Link 
            to="/plantillas" 
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--dark-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--dark-text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--dark-muted)")}
          >
            Plantillas
          </Link>
          <Link 
            to="/blog" 
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--dark-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--dark-muted)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--dark-muted)")}
          >
            Blog
          </Link>
          <Link 
            to="/compliance-checker" 
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
            style={{ background: "var(--green)", color: "white" }}
          >
            <CheckCircle className="w-4 h-4" />
            Verificador de cumplimiento
          </Link>
        </div>
      )}
    </div>
  );
}
