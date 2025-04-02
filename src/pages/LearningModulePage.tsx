
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookOpen, CheckCircle, Play } from "lucide-react";
import Module1 from "@/components/learning/Module1";
import Module2 from "@/components/learning/Module2";
import Module3 from "@/components/learning/Module3";
import LearningSidebar from "@/components/learning/sidebar/LearningSidebar";
import LearningHeader from "@/components/learning/header/LearningHeader";
import ModuleContent from "@/components/learning/content/ModuleContent";
import InwoutFeatures from "@/components/learning/features/InwoutFeatures";

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
  const [learningProgress, setLearningProgress] = useState(0);

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
      window.location.href = '/kit-legal/modulo/es-obligatorio';
    } else if (moduleId === "es-obligatorio") {
      window.location.href = '/kit-legal/modulo/como-implementar';
    } else {
      // If this is the last module, show a completion message or redirect to INWOUT setup
      window.location.href = '/kit-legal';
    }
  };

  // Check if current module is the last one
  const isLastModule = moduleId === "como-implementar";

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Módulo no encontrado</h2>
          <a href="/kit-legal" className="text-blue-600 hover:underline">
            Volver al Kit Legal
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <LearningSidebar 
          learningProgress={learningProgress} 
          activeModuleId={moduleId}
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
            {/* Module Content */}
            <ModuleContent
              title={currentModule.title}
              description={currentModule.description}
              icon={currentModule.icon}
              duration={currentModule.duration}
              videoUrl={currentModule.videoUrl}
              ModuleComponent={currentModule.component}
              onCompleteModule={handleCompleteModule}
              isLastModule={isLastModule}
            />
            
            {/* INWOUT Features */}
            {moduleId && <InwoutFeatures moduleId={moduleId} />}
          </main>
        </div>
      </div>
    </div>
  );
}
