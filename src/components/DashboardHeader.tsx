
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
      {/* Top Header with dark background */}
      <div className="h-14 bg-gray-800 flex items-center justify-between px-6">
        <h1 className="text-lg font-medium text-white">
          Control Horario
        </h1>
        <div className="flex items-center gap-6">
          <Link 
            to="/blog" 
            className="text-sm text-gray-200 hover:text-white transition-colors duration-200"
          >
            Blog
          </Link>
          <Link 
            to="/dashboard" 
            className="text-sm text-gray-200 hover:text-white transition-colors duration-200"
          >
            Directorio
          </Link>
        </div>
      </div>

      {/* Hero Section with Minimal Design */}
      <div className="relative bg-gray-100">
        <div className="container mx-auto px-4 py-14">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-col items-center gap-3">
              <img
                src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
                alt="Control Horario Logo"
                className="w-16 h-16"
              />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                Directorio de Control Horario Digital en 2025
              </h1>
              <p className="text-base text-gray-600 text-center max-w-xl">
                Encuentra la solución de control horario adecuada para tu empresa
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar soluciones de control horario..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className={`pl-10 w-full bg-white text-gray-800 border-gray-200 focus:ring-gray-400 h-11 ${isOnboarding ? 'opacity-70' : ''}`}
                  disabled={isOnboarding}
                />
                {isOnboarding && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-pulse">
                          <Info className="h-5 w-5 text-gray-500" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white border border-gray-200 text-gray-700 p-3 max-w-xs">
                        <p className="text-center">
                          Completa el proceso de filtrado para activar la búsqueda.
                        </p>
                        <div className="mt-2 text-xs text-center">
                          <span className="animate-bounce inline-block">↓</span> Indica el tamaño de tu empresa <span className="animate-bounce inline-block">↓</span>
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
