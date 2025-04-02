
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  ListChecks, 
  FileText, 
  BookOpen,
  AlertTriangle, 
  Home,
  Settings,
  Users,
  Clock
} from "lucide-react";
import ComplianceKitHeader from "@/components/compliance-kit/ComplianceKitHeader";
import ComplianceKitTools from "@/components/compliance-kit/ComplianceKitTools";
import ComplianceKitFAQ from "@/components/compliance-kit/ComplianceKitFAQ";
import ComplianceKitBenefits from "@/components/compliance-kit/ComplianceKitBenefits";

export default function ComplianceKit() {
  const navigate = useNavigate();
  const [learningProgress, setLearningProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("inicio");
  
  // Get completed modules from localStorage
  useEffect(() => {
    document.title = "INWOUT - Kit Legal | Control Horario Electrónico";
    
    // Get completed modules from localStorage
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    
    // Calculate progress based on completed modules
    if (completedModules.length > 0) {
      const progress = (completedModules.length / 3) * 100;
      setLearningProgress(progress);
    } else {
      // Set a default progress for new users
      setLearningProgress(0);
    }
  }, []);

  // Function to navigate to learning module pages
  const navigateToModule = (moduleId: string) => {
    navigate(`/kit-legal/modulo/${moduleId}`);
  };

  // Navigation menu items
  const navItems = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "herramientas", label: "Herramientas", icon: CheckCircle },
    { id: "configuracion-inwout", label: "Configurar INWOUT", icon: Settings }
  ];

  // Define quick action steps with status
  const onboardingSteps = [
    { id: 1, title: "Define los horarios de tus empleados", completed: false, url: "https://app.inwout.com/settings/schedules" },
    { id: 2, title: "Da la bienvenida a tu equipo", completed: false, url: "https://app.inwout.com/settings/team" },
    { id: 3, title: "Haz que la comunicación fluya", completed: false, url: "https://app.inwout.com/channels" },
    { id: 4, title: "Prueba a automatizar el registro horario con Geofence", completed: false, url: "https://app.inwout.com/settings/locations" }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-blue-800 text-white min-h-screen fixed left-0 top-0">
          <div className="p-6">
            <div className="text-2xl font-bold mb-8">INWOUT Kit</div>
            
            {/* Navigation Menu */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === item.id 
                      ? "bg-blue-700 text-white" 
                      : "text-blue-100 hover:bg-blue-700/50"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              ))}
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
                  onClick={() => navigateToModule("que-es-control-horario")}
                  className="flex items-center p-2 rounded hover:bg-blue-700/50 cursor-pointer"
                >
                  {learningProgress >= 33 ? (
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  ) : (
                    <Clock className="h-4 w-4 text-blue-300 mr-2" />
                  )}
                  <span className="text-sm">Qué es el control horario</span>
                </div>
                
                <div 
                  onClick={() => navigateToModule("es-obligatorio")}
                  className="flex items-center p-2 rounded hover:bg-blue-700/50 cursor-pointer"
                >
                  {learningProgress >= 66 ? (
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  ) : (
                    <Clock className="h-4 w-4 text-blue-300 mr-2" />
                  )}
                  <span className="text-sm">¿Es obligatorio?</span>
                </div>
                
                <div 
                  onClick={() => navigateToModule("como-implementar")}
                  className="flex items-center p-2 rounded hover:bg-blue-700/50 cursor-pointer"
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
          <main className="container max-w-6xl mx-auto px-8 py-8">
            {activeTab === "inicio" && (
              <>
                <div className="mb-10">
                  <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Bienvenido a tu Kit Interactivo de Cumplimiento Legal
                  </h1>
                  <p className="text-xl text-gray-600">
                    Fichajes simples, rápidos y adaptados a tu empresa
                  </p>
                  <p className="mt-2 text-gray-600">
                    Deja de perseguir a tu equipo para que fiche. Con INWOUT, todo queda registrado automáticamente, sin estrés y sin perder tiempo.
                  </p>
                </div>
                
                {/* Quick Action Cards - Next Steps */}
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Próximos pasos para configurar INWOUT
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {onboardingSteps.map((step) => (
                      <a 
                        key={step.id}
                        href={step.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
                          step.completed ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <span className="font-semibold">{step.id}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{step.title}</p>
                          <p className="text-sm text-gray-500">
                            {step.completed ? "Completado" : "Pendiente"}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Learning Progress Tracker Cards */}
                <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-blue-800">Progreso de aprendizaje</h3>
                    <span className="text-sm font-medium text-blue-600">{learningProgress}% completado</span>
                  </div>
                  <Progress value={learningProgress} className="h-2 bg-blue-100" />
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                      onClick={() => navigateToModule("que-es-control-horario")}
                      className="bg-white p-4 rounded border border-blue-200 cursor-pointer hover:shadow-md transition-all"
                    >
                      <h4 className="font-medium text-blue-800 mb-1">Módulo 1</h4>
                      <p className="text-sm text-gray-600">¿Qué es el control horario?</p>
                      {learningProgress >= 33 && (
                        <div className="mt-2 text-xs text-green-600 font-medium">✓ Completado</div>
                      )}
                    </div>
                    <div 
                      onClick={() => navigateToModule("es-obligatorio")}
                      className="bg-white p-4 rounded border border-blue-200 cursor-pointer hover:shadow-md transition-all"
                    >
                      <h4 className="font-medium text-blue-800 mb-1">Módulo 2</h4>
                      <p className="text-sm text-gray-600">¿Es obligatorio para tu empresa?</p>
                      {learningProgress >= 66 && (
                        <div className="mt-2 text-xs text-green-600 font-medium">✓ Completado</div>
                      )}
                    </div>
                    <div 
                      onClick={() => navigateToModule("como-implementar")}
                      className="bg-white p-4 rounded border border-blue-200 cursor-pointer hover:shadow-md transition-all"
                    >
                      <h4 className="font-medium text-blue-800 mb-1">Módulo 3</h4>
                      <p className="text-sm text-gray-600">¿Cómo implementar un sistema de fichajes?</p>
                      {learningProgress >= 100 && (
                        <div className="mt-2 text-xs text-green-600 font-medium">✓ Completado</div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Testimonials */}
                <div className="my-12">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Lo que dicen nuestros clientes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">María López</h4>
                          <p className="text-sm text-gray-500">Directora RRHH, Tecnomed</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">
                        "Con INWOUT y su Kit Legal, pasamos de tener problemas de cumplimiento a estar totalmente preparados para cualquier inspección. La formación y las herramientas son excelentes."
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Carlos Rodríguez</h4>
                          <p className="text-sm text-gray-500">CEO, Distribuciones Rápidas</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">
                        "Increíble la diferencia que ha supuesto para nuestra empresa. Antes gastábamos horas persiguiendo a los empleados para que ficharan, ahora todo es automático."
                      </p>
                    </div>
                  </div>
                </div>
                
                <ComplianceKitBenefits />
              </>
            )}
            
            {activeTab === "herramientas" && (
              <>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                  Herramientas de Cumplimiento Legal
                </h1>
                
                <Tabs defaultValue="verificador" className="w-full">
                  <TabsList className="grid grid-cols-5 mb-8">
                    <TabsTrigger value="verificador" className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Verificador</span>
                    </TabsTrigger>
                    <TabsTrigger value="checklist" className="flex items-center gap-2">
                      <ListChecks className="h-4 w-4" />
                      <span>Checklist</span>
                    </TabsTrigger>
                    <TabsTrigger value="aprendizaje" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Aprendizaje</span>
                    </TabsTrigger>
                    <TabsTrigger value="plantillas" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Plantillas</span>
                    </TabsTrigger>
                    <TabsTrigger value="simulador" className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Simulador</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="verificador" className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <CheckCircle className="h-8 w-8 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Verificador de Cumplimiento</h3>
                        <p className="text-gray-600">Evalúa el nivel de cumplimiento de tu empresa en materia laboral</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      <ComplianceKitTools hideAppComparison={true} />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="checklist" className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <ListChecks className="h-8 w-8 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Checklist Interactivo</h3>
                        <p className="text-gray-600">Obten una lista personalizada de obligaciones legales según tu sector y tamaño</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      {/* Checklist content */}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="aprendizaje" className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <BookOpen className="h-8 w-8 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Módulos de Aprendizaje</h3>
                        <p className="text-gray-600">Aprende conceptos clave sobre normativas laborales en formato micro-lecciones</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div 
                          onClick={() => navigateToModule("que-es-control-horario")}
                          className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition-all"
                        >
                          <div className="bg-blue-50 p-4 border-b border-gray-200">
                            <h4 className="font-semibold text-blue-800">¿Qué es el control horario?</h4>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-600 mb-4">
                              Aprende todo lo relativo a la normativa de control horario y cómo afecta a tu empresa.
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-blue-600 font-medium">Duración: 10 min</span>
                              {learningProgress >= 33 ? (
                                <span className="text-sm text-green-600 font-medium flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-1" /> Completado
                                </span>
                              ) : (
                                <span className="text-sm text-blue-600 font-medium">Empezar →</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          onClick={() => navigateToModule("es-obligatorio")}
                          className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition-all"
                        >
                          <div className="bg-blue-50 p-4 border-b border-gray-200">
                            <h4 className="font-semibold text-blue-800">¿Es obligatorio para tu empresa?</h4>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-600 mb-4">
                              Descubre si tu empresa está obligada a implementar un sistema de fichaje.
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-blue-600 font-medium">Duración: 8 min</span>
                              {learningProgress >= 66 ? (
                                <span className="text-sm text-green-600 font-medium flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-1" /> Completado
                                </span>
                              ) : (
                                <span className="text-sm text-blue-600 font-medium">Empezar →</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          onClick={() => navigateToModule("como-implementar")}
                          className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition-all"
                        >
                          <div className="bg-blue-50 p-4 border-b border-gray-200">
                            <h4 className="font-semibold text-blue-800">¿Cómo implementar un sistema de fichajes?</h4>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-600 mb-4">
                              Conoce las diferentes opciones y encuentra la mejor para tu empresa.
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-blue-600 font-medium">Duración: 12 min</span>
                              {learningProgress >= 100 ? (
                                <span className="text-sm text-green-600 font-medium flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-1" /> Completado
                                </span>
                              ) : (
                                <span className="text-sm text-blue-600 font-medium">Empezar →</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="plantillas" className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <FileText className="h-8 w-8 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Plantillas Interactivas</h3>
                        <p className="text-gray-600">Completa y descarga documentos esenciales para el cumplimiento normativo</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      {/* Plantillas content */}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="simulador" className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <AlertTriangle className="h-8 w-8 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Simulador de Riesgos</h3>
                        <p className="text-gray-600">Calcula las posibles sanciones y consecuencias de no cumplir con la normativa</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      {/* Simulador content */}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <ComplianceKitFAQ />
              </>
            )}
            
            {activeTab === "configuracion-inwout" && (
              <>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                  Configuración de INWOUT
                </h1>
                
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
                  <h2 className="text-xl font-semibold text-blue-800 mb-4">
                    Configura tu cuenta en unos sencillos pasos
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Para sacar el máximo partido a INWOUT, completa estos pasos de configuración.
                    Cada paso te ayudará a adaptar la herramienta a las necesidades específicas de tu empresa.
                  </p>
                  
                  <div className="space-y-4">
                    {onboardingSteps.map((step, index) => (
                      <a 
                        key={step.id}
                        href={step.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-4 flex-shrink-0">
                          <span className="font-semibold">{step.id}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-800 mb-1">{step.title}</h3>
                          <p className="text-sm text-gray-600">
                            {index === 0 && "Establece los horarios de trabajo para cada departamento o equipo."}
                            {index === 1 && "Invita a tus compañeros a unirse a INWOUT para empezar a registrar su jornada."}
                            {index === 2 && "Crea canales de comunicación para mantener a todos informados y conectados."}
                            {index === 3 && "Configura ubicaciones de trabajo para automatizar los fichajes por geolocalización."}
                          </p>
                          <div className="mt-2">
                            <span className="text-blue-600 text-sm font-medium">Configurar ahora →</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Recursos adicionales
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a 
                      href="https://help.inwout.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                      <span>Centro de ayuda</span>
                    </a>
                    <a 
                      href="https://www.inwout.com/contacto"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Users className="h-5 w-5 text-blue-600 mr-3" />
                      <span>Contactar con soporte</span>
                    </a>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
