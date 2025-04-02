
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  Play, 
  ArrowRight,
  Home,
  Clock 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Module1 from "@/components/learning/Module1";
import Module2 from "@/components/learning/Module2";
import Module3 from "@/components/learning/Module3";

interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  component: React.ComponentType<any>;
  duration: string;
  videoUrl?: string;
}

export default function LearningModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [learningProgress, setLearningProgress] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  // Calculate overall learning progress when component mounts
  useEffect(() => {
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    const progress = (completedModules.length / 3) * 100;
    setLearningProgress(progress);
  }, []);

  const modules: Record<string, ModuleInfo> = {
    "que-es-control-horario": {
      id: "que-es-control-horario",
      title: "¿Qué es el control horario?",
      description: "Aprende sobre la normativa de control horario y cómo afecta a tu empresa",
      icon: BookOpen,
      component: Module1,
      duration: "10 min",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder - replace with actual video
    },
    "es-obligatorio": {
      id: "es-obligatorio",
      title: "¿Es obligatorio para tu empresa?",
      description: "Descubre si tu empresa está obligada a implementar un sistema de fichaje",
      icon: CheckCircle,
      component: Module2,
      duration: "8 min",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder - replace with actual video
    },
    "como-implementar": {
      id: "como-implementar",
      title: "Cómo implementar un sistema de fichajes",
      description: "Conoce las diferentes opciones y encuentra la mejor para tu empresa",
      icon: Play,
      component: Module3,
      duration: "12 min",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder - replace with actual video
    }
  };

  const currentModule = moduleId ? modules[moduleId] : null;

  // Handle module completion and next steps
  const handleCompleteModule = () => {
    // Mark module as completed in local storage
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    if (!completedModules.includes(moduleId)) {
      completedModules.push(moduleId);
      localStorage.setItem('completedModules', JSON.stringify(completedModules));
    }
    
    // Navigate to next module or back to kit if this is the last one
    if (moduleId === "que-es-control-horario") {
      navigate('/kit-legal/modulo/es-obligatorio');
    } else if (moduleId === "es-obligatorio") {
      navigate('/kit-legal/modulo/como-implementar');
    } else {
      // If this is the last module, show a completion message or redirect to INWOUT setup
      navigate('/kit-legal');
    }
  };

  // Get module index for progress tracking
  const getModuleIndex = () => {
    if (moduleId === "que-es-control-horario") return 1;
    if (moduleId === "es-obligatorio") return 2;
    if (moduleId === "como-implementar") return 3;
    return 1;
  };

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Módulo no encontrado</h2>
          <Button onClick={() => navigate('/kit-legal')}>
            Volver al Kit Legal
          </Button>
        </div>
      </div>
    );
  }

  const ModuleComponent = currentModule.component;
  const Icon = currentModule.icon;
  const moduleIndex = getModuleIndex();
  const isCompleted = learningProgress >= (moduleIndex * 33.33);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-blue-800 text-white min-h-screen fixed left-0 top-0">
          <div className="p-6">
            <div className="text-2xl font-bold mb-8">INWOUT Kit</div>
            
            {/* Navigation Menu */}
            <nav className="space-y-1">
              <button
                onClick={() => navigate('/kit-legal')}
                className="flex items-center w-full p-3 rounded-lg transition-colors text-blue-100 hover:bg-blue-700/50"
              >
                <Home className="h-5 w-5 mr-3" />
                <span>Inicio</span>
              </button>
            </nav>
            
            {/* Learning Progress Section */}
            <div className="mt-8 border-t border-blue-700 pt-6">
              <h3 className="text-lg font-medium mb-3">Progreso de aprendizaje</h3>
              <Progress value={learningProgress} className="h-2 bg-blue-900" />
              <div className="mt-2 text-sm text-blue-200">
                {learningProgress}% completado
              </div>
              
              <div className="mt-4 space-y-2">
                <div 
                  onClick={() => navigate('/kit-legal/modulo/que-es-control-horario')}
                  className={`flex items-center p-2 rounded hover:bg-blue-700/50 cursor-pointer ${
                    moduleId === 'que-es-control-horario' ? 'bg-blue-700' : ''
                  }`}
                >
                  {learningProgress >= 33 ? (
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  ) : (
                    <Clock className="h-4 w-4 text-blue-300 mr-2" />
                  )}
                  <span className="text-sm">Qué es el control horario</span>
                </div>
                
                <div 
                  onClick={() => navigate('/kit-legal/modulo/es-obligatorio')}
                  className={`flex items-center p-2 rounded hover:bg-blue-700/50 cursor-pointer ${
                    moduleId === 'es-obligatorio' ? 'bg-blue-700' : ''
                  }`}
                >
                  {learningProgress >= 66 ? (
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  ) : (
                    <Clock className="h-4 w-4 text-blue-300 mr-2" />
                  )}
                  <span className="text-sm">¿Es obligatorio?</span>
                </div>
                
                <div 
                  onClick={() => navigate('/kit-legal/modulo/como-implementar')}
                  className={`flex items-center p-2 rounded hover:bg-blue-700/50 cursor-pointer ${
                    moduleId === 'como-implementar' ? 'bg-blue-700' : ''
                  }`}
                >
                  {learningProgress >= 100 ? (
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  ) : (
                    <Clock className="h-4 w-4 text-blue-300 mr-2" />
                  )}
                  <span className="text-sm">Cómo implementarlo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="ml-64 flex-1">
          <main className="container max-w-5xl mx-auto px-8 py-8">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                className="text-blue-600 mr-auto"
                onClick={() => navigate('/kit-legal')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Kit Legal
              </Button>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Módulo {moduleIndex} de 3</span>
                <div className="w-32 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${(moduleIndex / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-blue-50 p-6 border-b border-blue-100">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Icon className="h-8 w-8 text-blue-700" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-blue-800">{currentModule.title}</h1>
                    <p className="text-gray-600">{currentModule.description}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Duración: {currentModule.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {showVideo && currentModule.videoUrl ? (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Video explicativo</h2>
                    <div className="relative pb-[56.25%] h-0">
                      <iframe 
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={currentModule.videoUrl} 
                        title={currentModule.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 flex justify-center">
                    <Button 
                      className="flex items-center gap-2"
                      onClick={() => setShowVideo(true)}
                    >
                      <Play className="h-4 w-4" />
                      Ver video explicativo
                    </Button>
                  </div>
                )}
                
                <ModuleComponent standalone={true} />
              </div>
              
              <div className="bg-gray-50 p-6 border-t border-gray-200">
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/kit-legal')}
                  >
                    Volver al Kit Legal
                  </Button>
                  
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2" 
                    onClick={handleCompleteModule}
                  >
                    {moduleId === "como-implementar" ? (
                      <>
                        Finalizar y volver al Kit
                        <Home className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Siguiente módulo
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Related INWOUT features */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Implementa lo aprendido con INWOUT
              </h2>
              <p className="text-gray-600 mb-4">
                INWOUT te permite aplicar fácilmente los conceptos de este módulo con estas funcionalidades:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {moduleId === "que-es-control-horario" && (
                  <>
                    <a 
                      href="https://app.inwout.com/time-tracking"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4 flex-shrink-0">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-800 mb-1">Registro horario simplificado</h3>
                        <p className="text-sm text-gray-600">
                          Sistema intuitivo de fichajes que cumple con toda la normativa explicada en este módulo.
                        </p>
                      </div>
                    </a>
                    
                    <a 
                      href="https://app.inwout.com/reports"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4 flex-shrink-0">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-800 mb-1">Reportes legales automáticos</h3>
                        <p className="text-sm text-gray-600">
                          Genera automáticamente los informes que exige la ley para cumplir con la normativa.
                        </p>
                      </div>
                    </a>
                  </>
                )}
                
                {moduleId === "es-obligatorio" && (
                  <>
                    <a 
                      href="https://app.inwout.com/settings/company"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4 flex-shrink-0">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-800 mb-1">Configuración según tipo de empresa</h3>
                        <p className="text-sm text-gray-600">
                          Adapta INWOUT a las características específicas de tu empresa y sector.
                        </p>
                      </div>
                    </a>
                    
                    <a 
                      href="https://app.inwout.com/settings/policies"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4 flex-shrink-0">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-800 mb-1">Políticas de cumplimiento</h3>
                        <p className="text-sm text-gray-600">
                          Establece políticas de registro horario adaptadas a los requisitos legales de tu negocio.
                        </p>
                      </div>
                    </a>
                  </>
                )}
                
                {moduleId === "como-implementar" && (
                  <>
                    <a 
                      href="https://app.inwout.com/settings/locations"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4 flex-shrink-0">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-800 mb-1">Geolocalización inteligente</h3>
                        <p className="text-sm text-gray-600">
                          Configura ubicaciones de trabajo para automatizar los fichajes por geolocalización.
                        </p>
                      </div>
                    </a>
                    
                    <a 
                      href="https://app.inwout.com/settings/team"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4 flex-shrink-0">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-800 mb-1">Gestión del equipo</h3>
                        <p className="text-sm text-gray-600">
                          Invita a tu equipo y configura permisos para implementar el sistema de fichajes.
                        </p>
                      </div>
                    </a>
                  </>
                )}
              </div>
              
              <div className="mt-6 text-center">
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => window.open('https://app.inwout.com/dashboard', '_blank')}
                >
                  Aplicar en INWOUT ahora
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
