import { Clock } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface DashboardHeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export default function DashboardHeader({ 
  searchQuery = "",
  onSearchChange
}: DashboardHeaderProps) {
  return (
    <div className="space-y-0">
      {/* Top Header with Blog Link */}
      <div className="h-10 bg-white border-b flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold text-primary-900">
          Control Horario Electrónico
        </h1>
        <a 
          href="https://controlhorarioelectronico.webflow.io" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-primary-600 hover:text-primary-900 transition-colors duration-200 flex items-center gap-1"
        >
          Visitar Blog
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary-600"
          >
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </a>
      </div>

      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container max-w-4xl mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary-600 p-4 rounded-xl shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
                Directorio para el Control Horario
              </h1>
              <p className="text-xl text-blue-100 text-center max-w-2xl">
                Encuentra la mejor solución de control horario para tu empresa
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre, características, descripción..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="pl-10 w-full bg-white/95 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}