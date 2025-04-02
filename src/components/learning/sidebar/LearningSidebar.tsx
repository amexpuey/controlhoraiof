
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
    <div className="w-64 bg-[#2a3040] text-white min-h-screen fixed left-0 top-0">
      <div className="p-6">
        <div className="text-2xl font-bold mb-8 flex items-center">
          <img 
            src="/lovable-uploads/ed59e80d-aeae-40c0-b018-dd0e5faa3560.png" 
            alt="INWOUT Logo" 
            className="h-8 mr-2" 
          />
          <span>INWOUT</span>
        </div>
        
        {/* Navigation Menu - matching INWOUT style */}
        <nav className="space-y-1">
          <div className="flex items-center py-2 px-3 mb-5 text-gray-300">
            <User className="h-5 w-5 mr-3" />
            <span>Mi equipo</span>
          </div>
          
          <div className="flex items-center py-2 px-3 mb-5 text-gray-300">
            <FileText className="h-5 w-5 mr-3" />
            <span>Solicitar Permisos</span>
          </div>
          
          <div className="flex items-center py-2 px-3 mb-5 text-gray-300">
            <Calendar className="h-5 w-5 mr-3" />
            <span>Calendario</span>
          </div>
          
          <div className="flex items-center py-2 px-3 mb-5 text-gray-300">
            <Clock className="h-5 w-5 mr-3" />
            <span>Fichajes</span>
          </div>
          
          <div className="flex items-center py-2 px-3 mb-5 text-gray-300">
            <Briefcase className="h-5 w-5 mr-3" />
            <span>Control Vacaciones</span>
          </div>
          
          <div className="flex items-center py-2 px-3 mb-5 text-gray-300">
            <BarChart className="h-5 w-5 mr-3" />
            <span>Informes</span>
          </div>
          
          <button
            onClick={() => navigate('/kit-legal')}
            className="flex items-center w-full p-3 rounded-lg transition-colors text-white hover:bg-[#3a4156] bg-[#3a4156]"
          >
            <Home className="h-5 w-5 mr-3" />
            <span>Kit Legal</span>
          </button>
          
          <div className="flex items-center py-2 px-3 mt-5 text-gray-300">
            <Settings className="h-5 w-5 mr-3" />
            <span>Configuración</span>
          </div>
        </nav>
        
        {/* Learning Progress Section */}
        <div className="mt-8 border-t border-gray-700 pt-6">
          <h3 className="text-lg font-medium mb-3">Progreso de aprendizaje</h3>
          <Progress value={learningProgress} className="h-2 bg-gray-700" />
          <div className="mt-2 text-sm text-gray-300">
            {learningProgress}% completado
          </div>
          
          <div className="mt-4 space-y-2">
            <div 
              onClick={() => navigate('/kit-legal/modulo/que-es-control-horario')}
              className={`flex items-center p-2 rounded hover:bg-[#3a4156] cursor-pointer ${
                activeModuleId === 'que-es-control-horario' ? 'bg-[#3a4156]' : ''
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
              className={`flex items-center p-2 rounded hover:bg-[#3a4156] cursor-pointer ${
                activeModuleId === 'es-obligatorio' ? 'bg-[#3a4156]' : ''
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
              className={`flex items-center p-2 rounded hover:bg-[#3a4156] cursor-pointer ${
                activeModuleId === 'como-implementar' ? 'bg-[#3a4156]' : ''
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
          <button className="flex items-center w-full text-gray-300 hover:text-white">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}
