
import { Search, Info } from "lucide-react";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Link } from "react-router-dom";

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
  return (
    <div className="space-y-0">
      {/* Top Header with black background and yellow text */}
      <div className="h-14 bg-black border-b flex items-center justify-between px-4">
        <h1 className="text-xl font-semibold text-yellow-500">
          Control Horario Electrónico
        </h1>
        <div className="flex items-center gap-4">
          <Link 
            to="/blog" 
            className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
          >
            Blog
          </Link>
          <Link 
            to="/dashboard" 
            className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
          >
            Directorio
          </Link>
        </div>
      </div>

      {/* Hero Section with New Yellow Theme */}
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
                Encuentra la mejor solución de control horario para tu empresa
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
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className={`pl-10 w-full bg-white/95 text-yellow-900 placeholder:text-yellow-400 border-yellow-200 focus:ring-yellow-400 ${isOnboarding ? 'opacity-70' : ''}`}
                  disabled={isOnboarding}
                />
                {isOnboarding && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-pulse">
                          <Info className="h-5 w-5 text-yellow-600" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 max-w-xs">
                        <p className="text-center">
                          Completa el proceso de onboarding para activar la búsqueda y ver las aplicaciones disponibles.
                        </p>
                        <div className="mt-2 text-xs text-center">
                          <span className="animate-bounce inline-block">↓</span> ¡Empieza indicando el tamaño de tu empresa! <span className="animate-bounce inline-block">↓</span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
