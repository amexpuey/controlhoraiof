
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  FileText, 
  Calendar, 
  Clock, 
  Briefcase, 
  BarChart, 
  Home, 
  Settings,
  LogOut,
  CheckCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LearningSidebarProps {
  learningProgress: number;
  activeModuleId?: string;
}

export default function LearningSidebar({ learningProgress, activeModuleId }: LearningSidebarProps) {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-[#222A39] text-white min-h-screen fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <img 
            src="/lovable-uploads/ffc4e9e3-d03e-4242-9967-6906e57f4da9.png" 
            alt="INWOUT Logo" 
            className="h-10" 
          />
        </div>
        
        {/* Navigation Menu - matching design from screenshot */}
        <nav className="space-y-1">
          <div className="flex items-center py-2 px-3 text-gray-300 hover:bg-[#2d3748] hover:text-white rounded-md transition-colors">
            <User className="h-5 w-5 mr-3" />
            <span>Mi equipo</span>
          </div>
          
          <div className="flex items-center py-2 px-3 text-gray-300 hover:bg-[#2d3748] hover:text-white rounded-md transition-colors">
            <FileText className="h-5 w-5 mr-3" />
            <span>Solicitar Permisos</span>
          </div>
          
          <div className="flex items-center py-2 px-3 text-gray-300 hover:bg-[#2d3748] hover:text-white rounded-md transition-colors">
            <Calendar className="h-5 w-5 mr-3" />
            <span>Calendario</span>
          </div>
          
          <div className="flex items-center py-2 px-3 text-gray-300 hover:bg-[#2d3748] hover:text-white rounded-md transition-colors">
            <Clock className="h-5 w-5 mr-3" />
            <span>Fichajes</span>
          </div>
          
          <div className="flex items-center py-2 px-3 text-gray-300 hover:bg-[#2d3748] hover:text-white rounded-md transition-colors">
            <Briefcase className="h-5 w-5 mr-3" />
            <span>Control Vacaciones</span>
          </div>
          
          <div className="flex items-center py-2 px-3 text-gray-300 hover:bg-[#2d3748] hover:text-white rounded-md transition-colors">
            <BarChart className="h-5 w-5 mr-3" />
            <span>Informes</span>
          </div>
          
          <button
            onClick={() => navigate('/kit-legal')}
            className="flex items-center w-full py-2 px-3 rounded-md transition-colors text-white bg-[#2d3748]"
          >
            <Home className="h-5 w-5 mr-3" />
            <span>Kit Legal</span>
          </button>
          
          <div className="flex items-center py-2 px-3 text-gray-300 hover:bg-[#2d3748] hover:text-white rounded-md transition-colors">
            <Settings className="h-5 w-5 mr-3" />
            <span>Configuración</span>
          </div>
        </nav>
        
        {/* Learning Progress Section */}
        <div className="mt-8 border-t border-gray-700 pt-6">
          <h3 className="text-md font-medium mb-3">Progreso de aprendizaje</h3>
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#0BC8C1]" 
              style={{ width: `${learningProgress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-300">
            {learningProgress}% completado
          </div>
          
          <div className="mt-4 space-y-2">
            <div 
              onClick={() => navigate('/kit-legal/modulo/que-es-control-horario')}
              className={`flex items-center p-2 rounded hover:bg-[#2d3748] cursor-pointer ${
                activeModuleId === 'que-es-control-horario' ? 'bg-[#2d3748]' : ''
              }`}
            >
              {learningProgress >= 33 ? (
                <CheckCircle className="h-4 w-4 text-[#0BC8C1] mr-2" />
              ) : (
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
              )}
              <span className="text-sm">Qué es el control horario</span>
            </div>
            
            <div 
              onClick={() => navigate('/kit-legal/modulo/es-obligatorio')}
              className={`flex items-center p-2 rounded hover:bg-[#2d3748] cursor-pointer ${
                activeModuleId === 'es-obligatorio' ? 'bg-[#2d3748]' : ''
              }`}
            >
              {learningProgress >= 66 ? (
                <CheckCircle className="h-4 w-4 text-[#0BC8C1] mr-2" />
              ) : (
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
              )}
              <span className="text-sm">¿Es obligatorio?</span>
            </div>
            
            <div 
              onClick={() => navigate('/kit-legal/modulo/como-implementar')}
              className={`flex items-center p-2 rounded hover:bg-[#2d3748] cursor-pointer ${
                activeModuleId === 'como-implementar' ? 'bg-[#2d3748]' : ''
              }`}
            >
              {learningProgress >= 100 ? (
                <CheckCircle className="h-4 w-4 text-[#0BC8C1] mr-2" />
              ) : (
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
              )}
              <span className="text-sm">Cómo implementarlo</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-0 w-full px-6">
          <button className="flex items-center w-full py-2 px-3 text-gray-300 hover:bg-[#2d3748] hover:text-white rounded-md transition-colors">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}
