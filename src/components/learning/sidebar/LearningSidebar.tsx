
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  User, 
  Home, 
  Settings,
  LogOut,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  BookOpen,
  FileText,
  ListChecks,
  AlertTriangle,
  Clock,
  BarChart
} from "lucide-react";

interface LearningSidebarProps {
  learningProgress: number;
  activeModuleId?: string;
}

export default function LearningSidebar({ learningProgress, activeModuleId }: LearningSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    learning: true,
    tools: false,
    account: false
  });

  // Helper function to toggle section collapse state
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Helper function to check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path || 
           (activeModuleId && path.includes(activeModuleId));
  };

  return (
    <div className="w-64 bg-[#2a3040] text-white min-h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <img 
            src="/lovable-uploads/097bacff-123a-439c-8891-97ea5c2ff34a.png" 
            alt="INWOUT Logo" 
            className="h-8" 
          />
        </div>
        
        {/* Navigation Menu - Knowledge Base */}
        <nav className="space-y-5">
          {/* Home Section */}
          <div 
            onClick={() => navigate('/kit-legal')}
            className={`flex items-center py-2 px-3 rounded-md transition-colors cursor-pointer ${
              isActive('/kit-legal') 
                ? "bg-[#222A39] text-white" 
                : "text-gray-300 hover:bg-[#222A39] hover:text-white"
            }`}
          >
            <Home className="h-5 w-5 mr-3" />
            <span>Inicio Kit Legal</span>
          </div>
          
          {/* Learning Modules Section */}
          <div className="space-y-1">
            <div 
              onClick={() => toggleSection('learning')}
              className={`flex items-center justify-between py-2 px-3 text-gray-300 hover:bg-[#222A39] hover:text-white rounded-md transition-colors cursor-pointer ${
                expandedSections.learning ? "bg-[#222A39]" : ""
              }`}
            >
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-3" />
                <span>Módulos de Aprendizaje</span>
              </div>
              {expandedSections.learning ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
            
            {expandedSections.learning && (
              <div className="ml-8 space-y-1 mt-1">
                <div 
                  onClick={() => navigate('/kit-legal/modulo/que-es-control-horario')}
                  className={`flex items-center py-2 px-3 rounded-md transition-colors cursor-pointer ${
                    activeModuleId === 'que-es-control-horario'
                      ? "bg-[#222A39] text-white" 
                      : "text-gray-300 hover:bg-[#222A39] hover:text-white"
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
                  className={`flex items-center py-2 px-3 rounded-md transition-colors cursor-pointer ${
                    activeModuleId === 'es-obligatorio'
                      ? "bg-[#222A39] text-white" 
                      : "text-gray-300 hover:bg-[#222A39] hover:text-white"
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
                  className={`flex items-center py-2 px-3 rounded-md transition-colors cursor-pointer ${
                    activeModuleId === 'como-implementar'
                      ? "bg-[#222A39] text-white" 
                      : "text-gray-300 hover:bg-[#222A39] hover:text-white"
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
            )}
          </div>
          
          {/* Tools Section */}
          <div className="space-y-1">
            <div 
              onClick={() => toggleSection('tools')}
              className={`flex items-center justify-between py-2 px-3 text-gray-300 hover:bg-[#222A39] hover:text-white rounded-md transition-colors cursor-pointer ${
                expandedSections.tools ? "bg-[#222A39]" : ""
              }`}
            >
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-3" />
                <span>Herramientas</span>
              </div>
              {expandedSections.tools ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
            
            {expandedSections.tools && (
              <div className="ml-8 space-y-1 mt-1">
                <div 
                  onClick={() => navigate('/kit-legal/verificador')}
                  className={`flex items-center py-2 px-3 rounded-md transition-colors cursor-pointer ${
                    isActive('/kit-legal/verificador')
                      ? "bg-[#222A39] text-white" 
                      : "text-gray-300 hover:bg-[#222A39] hover:text-white"
                  }`}
                >
                  <CheckCircle className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">Verificador de Cumplimiento</span>
                </div>
                
                <div 
                  onClick={() => navigate('/kit-legal/checklist')}
                  className={`flex items-center py-2 px-3 rounded-md transition-colors cursor-pointer ${
                    isActive('/kit-legal/checklist')
                      ? "bg-[#222A39] text-white" 
                      : "text-gray-300 hover:bg-[#222A39] hover:text-white"
                  }`}
                >
                  <ListChecks className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">Checklist Interactivo</span>
                </div>
                
                <div 
                  onClick={() => navigate('/kit-legal/plantillas')}
                  className={`flex items-center py-2 px-3 rounded-md transition-colors cursor-pointer ${
                    isActive('/kit-legal/plantillas')
                      ? "bg-[#222A39] text-white" 
                      : "text-gray-300 hover:bg-[#222A39] hover:text-white"
                  }`}
                >
                  <FileText className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">Plantillas</span>
                </div>
                
                <div 
                  onClick={() => navigate('/kit-legal/simulador')}
                  className={`flex items-center py-2 px-3 rounded-md transition-colors cursor-pointer ${
                    isActive('/kit-legal/simulador')
                      ? "bg-[#222A39] text-white" 
                      : "text-gray-300 hover:bg-[#222A39] hover:text-white"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">Simulador de Riesgos</span>
                </div>
                
                <div 
                  onClick={() => navigate('/kit-legal/ayuda/admin')}
                  className={`flex items-center py-2 px-3 rounded-md transition-colors cursor-pointer ${
                    isActive('/kit-legal/ayuda/admin')
                      ? "bg-[#222A39] text-white" 
                      : "text-gray-300 hover:bg-[#222A39] hover:text-white"
                  }`}
                >
                  <HelpCircle className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">Centro de Ayuda</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Account Links Section */}
          <div className="space-y-1">
            <div 
              onClick={() => toggleSection('account')}
              className={`flex items-center justify-between py-2 px-3 text-gray-300 hover:bg-[#222A39] hover:text-white rounded-md transition-colors cursor-pointer ${
                expandedSections.account ? "bg-[#222A39]" : ""
              }`}
            >
              <div className="flex items-center">
                <User className="h-5 w-5 mr-3" />
                <span>Acceso INWOUT</span>
              </div>
              {expandedSections.account ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
            
            {expandedSections.account && (
              <div className="ml-8 space-y-1 mt-1">
                <a 
                  href="https://app.inwout.com/login" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center py-2 px-3 text-gray-300 hover:bg-[#222A39] hover:text-white rounded-md transition-colors"
                >
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">Acceder a Fichajes</span>
                </a>
                
                <a 
                  href="https://app.inwout.com/settings" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center py-2 px-3 text-gray-300 hover:bg-[#222A39] hover:text-white rounded-md transition-colors"
                >
                  <Settings className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">Configuración</span>
                </a>
                
                <a 
                  href="https://app.inwout.com/reports" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center py-2 px-3 text-gray-300 hover:bg-[#222A39] hover:text-white rounded-md transition-colors"
                >
                  <BarChart className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">Informes</span>
                </a>
              </div>
            )}
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
        </div>
        
        <div className="absolute bottom-6 left-0 w-full px-6">
          <a 
            href="https://app.inwout.com/logout"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center w-full py-2 px-3 text-gray-300 hover:bg-[#222A39] hover:text-white rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Cerrar sesión</span>
          </a>
        </div>
      </div>
    </div>
  );
}
