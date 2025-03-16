
import { Search, Info, ArrowDown } from "lucide-react";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ToolsDropdown } from "./ui/ToolsDropdown";

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
  const handleEmpezarAhora = () => {
    // If in onboarding mode, scroll to onboarding section
    if (isOnboarding) {
      const onboardingElement = document.querySelector('.onboarding-section');
      if (onboardingElement) {
        onboardingElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If in dashboard mode, scroll to filter section
      const filterElement = document.querySelector('.filter-section');
      if (filterElement) {
        filterElement.scrollIntoView({ behavior: 'smooth' });
        
        // Also automatically open the features section if it's closed
        const featuresButton = document.querySelector('.features-toggle-button');
        if (featuresButton) {
          // Use click() to simulate a user click on the features toggle button
          (featuresButton as HTMLElement).click();
        }
      }
    }
  };

  return (
    <div className="space-y-0">
      {/* Top Header with dark gradient background and white text */}
      <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-900 border-b flex items-center justify-between px-6 shadow-md">
        <Link to="/" className="text-xl font-semibold text-white hover:text-gray-200 transition-colors">
          Control Horario Electrónico
        </Link>
        <div className="flex items-center gap-6">
          <ToolsDropdown />
          <Link 
            to="/blog" 
            className="text-sm font-medium text-white hover:text-gray-200 transition-colors"
          >
            Blog
          </Link>
        </div>
      </div>

      {/* Hero Section with Light Background */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute inset-0 mix-blend-multiply opacity-10">
          <img
            src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
                Directorio de Control Horario Digital en 2025
              </h1>
              <p className="text-xl text-gray-600 text-center max-w-2xl">
                Encuentra la mejor solución de control horario para tu empresa
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre, características, descripción..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className={`pl-10 w-full bg-white/95 text-gray-800 placeholder:text-gray-400 border-gray-200 focus:ring-blue-400 ${isOnboarding ? 'opacity-70' : ''}`}
                  disabled={isOnboarding}
                />
                {isOnboarding && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-pulse">
                          <Info className="h-5 w-5 text-blue-600" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white border border-gray-200 text-gray-800 p-4 max-w-xs">
                        <p className="text-center">
                          Completa el proceso de onboarding para activar la búsqueda y ver las aplicaciones disponibles.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            {/* Start Now Button */}
            <Button 
              onClick={handleEmpezarAhora}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-lg font-medium text-lg flex items-center gap-2 transition-all hover:shadow-lg"
            >
              Empezar ahora
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
