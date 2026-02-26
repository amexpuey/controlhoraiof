
import { Search, ArrowDown, Menu } from "lucide-react";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ToolsDropdown } from "./ui/ToolsDropdown";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "./layout/MobileMenu";
import { useState } from "react";

interface DashboardHeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  isOnboarding?: boolean;
}

export default function DashboardHeader({ 
  searchQuery = "",
  onSearchChange,
  isOnboarding = false
}: DashboardHeaderProps) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleEmpezarAhora = () => {
    if (isOnboarding) {
      const onboardingElement = document.querySelector('.onboarding-section');
      if (onboardingElement) {
        onboardingElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const filterElement = document.querySelector('.filter-section');
      if (filterElement) {
        filterElement.scrollIntoView({ behavior: 'smooth' });
        
        const featuresButton = document.querySelector('.features-toggle-button');
        if (featuresButton) {
          (featuresButton as HTMLElement).click();
        }
      }
    }
  };

  return (
    <div className="space-y-0">
      {/* Top Header */}
      <div className="h-16 border-b flex items-center justify-between px-4 md:px-6 shadow-md" style={{ background: "var(--dark)" }}>
        <Link to="/" className="text-lg md:text-xl font-semibold hover:opacity-80 transition-opacity" style={{ color: "var(--dark-text)" }}>
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
              className="text-sm font-medium transition-colors" 
              style={{ color: "var(--dark-muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--dark-text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--dark-muted)")}
            >
              Blog
            </Link>
            <Link 
              to="/" 
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
              style={{ background: "var(--green)", color: "white" }}
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

      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 50% 120%, rgba(15,184,159,.12) 0%, transparent 60%), var(--dark)",
        }}
      >
        <div className="absolute inset-0 mix-blend-multiply opacity-10">
          <img
            src="/lovable-uploads/bfe02090-bf42-4aa1-a40b-853d59bbf5e7.png"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container max-w-4xl mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="flex flex-col items-center gap-4">
              <img
                src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
                alt="Control Horario Logo"
                className="w-20 h-20"
              />
              <h1 className="text-3xl md:text-4xl font-bold text-center" style={{ color: "var(--dark-text)" }}>
                Directorio de Control Horario Digital en 2026
              </h1>
              <p className="text-xl text-center max-w-2xl" style={{ color: "var(--dark-muted)" }}>
                Encuentra la mejor solución de control horario para tu empresa
              </p>
            </div>

            <div className="w-full max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: "var(--green)" }} />
                <Input
                  type="text"
                  placeholder="Buscar por nombre, características, descripción..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="pl-10 w-full bg-white/10 border-white/20 placeholder:text-white/40 focus:ring-[var(--green)]"
                  style={{ color: "var(--dark-text)" }}
                />
              </div>
            </div>

            <Button 
              onClick={handleEmpezarAhora}
              className="px-6 py-6 rounded-lg font-medium text-lg flex items-center gap-2 transition-all hover:shadow-lg"
              style={{ background: "var(--green)", color: "white" }}
            >
              Ver soluciones de control horario
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
