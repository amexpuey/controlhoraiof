
import { Search, Info } from "lucide-react";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Link } from "react-router-dom";
import MainNavigation from "./MainNavigation";

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
      <MainNavigation 
        searchQuery={searchQuery} 
        onSearchChange={onSearchChange} 
      />
      
      {/* Additional onboarding tooltip for search bar if needed */}
      {isOnboarding && (
        <div className="container max-w-4xl mx-auto px-4 mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar por nombre, características, descripción..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10 w-full bg-white/95 text-yellow-900 placeholder:text-yellow-400 border-yellow-200 focus:ring-yellow-400 opacity-70"
              disabled={true}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
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
          </div>
        </div>
      )}
    </div>
  );
}
