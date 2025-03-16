
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  
  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to dashboard with search query
    if (searchQuery.trim()) {
      window.location.href = `/dashboard?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className={cn(
      "w-full transition-all duration-300 z-50 border-b",
      isScrolled ? "bg-white shadow-md sticky top-0" : "bg-gradient-to-r from-blue-50 to-indigo-50"
    )}>
      {/* Top bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
              alt="Control Horario Logo"
              className="w-10 h-10"
            />
            <span className="font-bold text-lg text-blue-800 hidden sm:inline-block">
              Control Horario
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <Button variant="ghost">Inicio</Button>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Herramientas</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      <Link
                        to="/blog/calculadora-horas-trabajo"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50"
                      >
                        <div className="text-blue-800 font-medium leading-none">Calculadora de Horas</div>
                        <p className="text-sm leading-snug text-gray-500">
                          Calcula jornadas, descansos y horas extra fácilmente
                        </p>
                      </Link>
                      <Link
                        to="/blog/compliance-checker"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50"
                      >
                        <div className="text-blue-800 font-medium leading-none">Verificador de Cumplimiento</div>
                        <p className="text-sm leading-snug text-gray-500">
                          Comprueba si cumples con la normativa de registro horario
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/blog">
                    <Button variant="ghost">Blog</Button>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/dashboard">
                    <Button variant="ghost">Directorio</Button>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/#contacto">
                    <Button variant="ghost">Contacto</Button>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link to="/" className="py-2 px-4 hover:bg-blue-50 rounded-md">Inicio</Link>
            
            <div className="relative">
              <button 
                className="flex items-center justify-between w-full py-2 px-4 hover:bg-blue-50 rounded-md"
                onClick={(e) => {
                  e.currentTarget.nextElementSibling?.classList.toggle('hidden');
                }}
              >
                <span>Herramientas</span>
                <ChevronDown size={16} />
              </button>
              <div className="hidden pl-4 mt-1 border-l-2 border-blue-100 ml-4">
                <Link to="/blog/calculadora-horas-trabajo" className="block py-2 px-4 hover:bg-blue-50 rounded-md">
                  Calculadora de Horas
                </Link>
                <Link to="/blog/compliance-checker" className="block py-2 px-4 hover:bg-blue-50 rounded-md">
                  Verificador de Cumplimiento
                </Link>
              </div>
            </div>
            
            <Link to="/blog" className="py-2 px-4 hover:bg-blue-50 rounded-md">Blog</Link>
            <Link to="/dashboard" className="py-2 px-4 hover:bg-blue-50 rounded-md">Directorio</Link>
            <Link to="/#contacto" className="py-2 px-4 hover:bg-blue-50 rounded-md">Contacto</Link>
          </nav>
        </div>
      )}
      
      {/* Hero/Search Section - only show on homepage or other main pages */}
      {(location.pathname === "/" || location.pathname === "/dashboard") && (
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">
              Directorio de Control Horario
            </h1>
            <p className="text-lg text-blue-600 max-w-2xl mx-auto mb-8">
              Encuentra y compara soluciones de control horario en un solo lugar, adaptadas a tu empresa
            </p>
            
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative mb-8">
              <Input
                type="text"
                placeholder="Busca tu software de control horario..."
                className="pl-10 pr-20 py-6 text-base rounded-full shadow-md border-blue-200 focus:border-blue-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-blue-500" />
              </div>
              <button 
                type="submit"
                className="absolute right-2 inset-y-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Buscar
              </button>
            </form>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="rounded-full px-6 bg-blue-600 hover:bg-blue-700">
                  Ver todas las herramientas
                </Button>
              </Link>
              <Link to="/#empezar">
                <Button size="lg" variant="outline" className="rounded-full px-6 border-blue-600 text-blue-600">
                  Empieza aquí
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
