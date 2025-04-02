
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  BookOpen, 
  CheckCircle, 
  Play,
  Home
} from "lucide-react";
import LearningSidebar from "@/components/learning/sidebar/LearningSidebar";
import ComplianceKitTools from "@/components/compliance-kit/ComplianceKitTools";
import ComplianceKitBenefits from "@/components/compliance-kit/ComplianceKitBenefits";
import ComplianceKitFAQ from "@/components/compliance-kit/ComplianceKitFAQ";
import ComplianceChecker from "@/components/blog/ComplianceChecker";
import ComplianceChecklist from "@/components/compliance-kit/tools/ComplianceChecklist";
import LegalRiskSimulator from "@/components/compliance-kit/tools/LegalRiskSimulator";
import ComplianceTemplates from "@/components/compliance-kit/tools/ComplianceTemplates";
import HelpCenter from "@/components/compliance-kit/tools/HelpCenter";

export default function ComplianceKit() {
  const navigate = useNavigate();
  const { section } = useParams<{ section: string }>();
  const [learningProgress, setLearningProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(section || "inicio");
  
  // Calculate overall learning progress when component mounts
  useEffect(() => {
    document.title = "INWOUT - Kit Legal | Control Horario Electrónico";
    
    // Actualizar activeTab basado en la sección URL
    if (section) {
      setActiveTab(section);
    }
    
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
  }, [section]);

  // Function to navigate to learning module pages
  const navigateToModule = (moduleId: string) => {
    navigate(`/kit-legal/modulo/${moduleId}`);
  };
  
  // Function to navigate to different sections of the Kit Legal
  const navigateToSection = (sectionId: string) => {
    navigate(`/kit-legal/${sectionId}`);
  };

  // Define quick action steps with status
  const onboardingSteps = [
    { id: 1, title: "Define los horarios de tus empleados", completed: false, url: "https://app.inwout.com/settings/schedules" },
    { id: 2, title: "Da la bienvenida a tu equipo", completed: false, url: "https://app.inwout.com/settings/team" },
    { id: 3, title: "Haz que la comunicación fluya", completed: false, url: "https://app.inwout.com/channels" },
    { id: 4, title: "Prueba a automatizar el registro horario con Geofence", completed: false, url: "https://app.inwout.com/settings/locations" }
  ];
  
  // Renderizar el contenido específico de la sección
  const renderSectionContent = () => {
    switch (section) {
      case "verificador":
        return <ComplianceChecker />;
      case "checklist":
        return <ComplianceChecklist />;
      case "simulador":
        return <LegalRiskSimulator />;
      case "plantillas":
        return <ComplianceTemplates />;
      case "normativa":
        return (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Normativa Laboral sobre Control Horario</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Real Decreto-ley 8/2019</h3>
                <p className="text-gray-700 mb-2">
                  El 12 de marzo de 2019 se aprobó el Real Decreto-ley 8/2019, de medidas urgentes de protección social y de lucha contra la precariedad laboral en la jornada de trabajo, que incluye la obligación de todas las empresas de registrar diariamente la jornada de sus trabajadores.
                </p>
                <p className="text-gray-700">
                  Esta normativa entró en vigor el 12 de mayo de 2019 y afecta a todas las empresas españolas independientemente de su tamaño o sector.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">¿Qué obligaciones establece?</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Las empresas deben registrar diariamente el horario concreto de inicio y finalización de la jornada de cada trabajador.</li>
                  <li>El registro debe incluir el horario concreto de inicio y finalización de la jornada de trabajo.</li>
                  <li>Los registros deben conservarse durante cuatro años y estar a disposición de los trabajadores, sus representantes legales y la Inspección de Trabajo.</li>
                  <li>La forma de registro debe establecerse mediante negociación colectiva o acuerdo de empresa.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Sanciones por incumplimiento</h3>
                <p className="text-gray-700 mb-2">
                  El incumplimiento de la obligación de registro horario está tipificado como infracción grave en la Ley sobre Infracciones y Sanciones en el Orden Social (LISOS).
                </p>
                <p className="text-gray-700 mb-2">
                  Las sanciones por incumplimiento pueden oscilar entre 751€ y 7.500€, dependiendo de la gravedad y otras circunstancias.
                </p>
                <p className="text-gray-700">
                  Además, la empresa podría enfrentarse a reclamaciones por horas extraordinarias no pagadas y sus correspondientes cotizaciones a la Seguridad Social.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold mb-2 text-blue-800">Verificador de Cumplimiento</h3>
                <p className="text-gray-700 mb-3">
                  ¿Quieres saber si tu empresa cumple con la normativa de control horario? Utiliza nuestro verificador interactivo.
                </p>
                <button 
                  onClick={() => navigateToSection("verificador")}
                  className="bg-[#0BC8C1] text-white px-4 py-2 rounded hover:bg-[#0AB1AB] transition-colors"
                >
                  Verificar cumplimiento
                </button>
              </div>
            </div>
          </div>
        );
      case "modulo-fichajes":
      case "define-horarios":
      case "bienvenida-equipo":
      case "comunicacion-equipo":
      case "automatiza-con-geofence":
        return (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">
              {section === "modulo-fichajes" && "Implementar sistema de fichajes"}
              {section === "define-horarios" && "Definir horarios de empleados"}
              {section === "bienvenida-equipo" && "Bienvenida a tu equipo"}
              {section === "comunicacion-equipo" && "Comunicación fluida"}
              {section === "automatiza-con-geofence" && "Automatizar con Geofence"}
            </h2>
            <p className="text-gray-700 mb-6">
              {section === "modulo-fichajes" && "Aprende a configurar el método de fichaje adecuado para tu empresa."}
              {section === "define-horarios" && "Guía completa para configurar los horarios de tus empleados."}
              {section === "bienvenida-equipo" && "Plantillas y pasos para incorporar a tu equipo."}
              {section === "comunicacion-equipo" && "Configura correctamente las notificaciones y alertas."}
              {section === "automatiza-con-geofence" && "Configura el registro horario automático por geolocalización."}
            </p>
            <div className="text-gray-500 text-center p-10 border-2 border-dashed rounded-lg">
              <p className="mb-4">Este contenido está en desarrollo. Próximamente disponible.</p>
              <button 
                onClick={() => window.open("https://app.inwout.com/login", "_blank")}
                className="bg-[#0BC8C1] text-white px-4 py-2 rounded hover:bg-[#0AB1AB] transition-colors"
              >
                Mientras tanto, configura INWOUT
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Mostrar contenido específico si estamos en una sección específica
  if (section && section !== "inicio" && section !== "herramientas" && section !== "configuracion-inwout") {
    return (
      <div className="min-h-screen bg-[#f8f9fa] text-gray-800">
        <div className="flex">
          {/* Sidebar */}
          <LearningSidebar 
            learningProgress={learningProgress} 
            activeModuleId={null}
          />
          
          {/* Main content */}
          <div className="ml-64 flex-1">
            <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <a href="/kit-legal" className="text-gray-600 hover:text-gray-900 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                Volver al Kit Legal
              </a>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Horas hoy: 0h 0m</span>
                <button className="bg-[#0BC8C1] hover:bg-[#0AB1AB] text-white px-4 py-2 rounded-md">
                  Entrada
                </button>
              </div>
            </header>
            
            <main className="container max-w-5xl mx-auto px-8 py-8">
              {renderSectionContent()}
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Contenido estándar del Kit Legal
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <LearningSidebar 
          learningProgress={learningProgress} 
          activeModuleId={null}
        />
        
        {/* Main content */}
        <div className="ml-64 flex-1">
          <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="text-gray-600 flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Kit Legal INWOUT
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Horas hoy: 0h 0m</span>
              <button className="bg-[#0BC8C1] hover:bg-[#0AB1AB] text-white px-4 py-2 rounded-md">
                Entrada
              </button>
            </div>
          </header>
          
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
                  <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#0BC8C1]" 
                      style={{ width: `${learningProgress}%` }}
                    ></div>
                  </div>
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
                
                <ComplianceKitBenefits />
              </>
            )}
            
            {activeTab === "herramientas" && (
              <>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                  Herramientas de Cumplimiento Legal
                </h1>
                <ComplianceKitTools />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
