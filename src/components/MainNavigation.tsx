
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MainNavigationProps {
  onSearchChange?: (value: string) => void;
  searchQuery?: string;
}

export default function MainNavigation({ onSearchChange, searchQuery = "" }: MainNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Top black navigation bar */}
      <div className="h-14 bg-black border-b flex items-center justify-between px-4 md:px-8">
        <Link to="/" className="text-xl font-semibold text-yellow-500 flex items-center gap-2">
          <img
            src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
            alt="Control Horario Logo"
            className="w-8 h-8"
          />
          <span className="hidden sm:inline">Control Horario Electrónico</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200">
            Inicio
          </Link>
          <Link to="/dashboard" className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200">
            Directorio
          </Link>
          <Link to="/blog" className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200">
            Blog
          </Link>
          <Link to="/" className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200">
            Herramientas
          </Link>
          <Link to="/" className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200">
            Contacto
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-yellow-500 hover:text-yellow-400"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-yellow-500 py-4 px-6 flex flex-col space-y-4 border-b border-yellow-900/30 animate-in slide-in-from-top">
          <Link to="/" className="hover:text-yellow-400 transition-colors duration-200 py-2" onClick={toggleMenu}>
            Inicio
          </Link>
          <Link to="/dashboard" className="hover:text-yellow-400 transition-colors duration-200 py-2" onClick={toggleMenu}>
            Directorio
          </Link>
          <Link to="/blog" className="hover:text-yellow-400 transition-colors duration-200 py-2" onClick={toggleMenu}>
            Blog
          </Link>
          <Link to="/" className="hover:text-yellow-400 transition-colors duration-200 py-2" onClick={toggleMenu}>
            Herramientas
          </Link>
          <Link to="/" className="hover:text-yellow-400 transition-colors duration-200 py-2" onClick={toggleMenu}>
            Contacto
          </Link>
        </div>
      )}

      {/* Search Bar Hero Section */}
      {onSearchChange && (
        <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500">
          <div className="absolute inset-0 bg-[#FEF7CD] mix-blend-multiply opacity-30">
            <img
              src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
              alt="Hero background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative container max-w-4xl mx-auto px-4 py-20">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="flex flex-col items-center gap-4">
                <img
                  src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
                  alt="Control Horario Logo"
                  className="w-24 h-24"
                />
                <h1 className="text-3xl md:text-4xl font-bold text-yellow-900 text-center">
                  Directorio para el Control Horario
                </h1>
                <p className="text-xl text-yellow-800 text-center max-w-2xl">
                  Encuentra y compara soluciones de control horario en un solo lugar
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Buscar por nombre, características, descripción..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 w-full bg-white/95 text-yellow-900 placeholder:text-yellow-400 border-yellow-200 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Call to action button */}
              <Link 
                to="/dashboard"
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Ver todas las herramientas
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
