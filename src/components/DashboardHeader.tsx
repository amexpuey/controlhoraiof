
import { Search, Info } from "lucide-react";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

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
      {/* Top Header with Blog Link - Future Ad Placement */}
      <div className="h-10 bg-white border-b flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold text-yellow-600">
          Control Horario Electrónico
        </h1>
        <a 
          href="https://controlhorarioelectronico.webflow.io" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-yellow-600 hover:text-yellow-700 transition-colors duration-200 flex items-center gap-1"
        >
          Visitar Blog
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="text-yellow-600"
          >
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </a>
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
