
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, CheckCircle, Play } from "lucide-react";
import Module1 from "@/components/learning/Module1";
import Module2 from "@/components/learning/Module2";
import Module3 from "@/components/learning/Module3";

interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  component: React.ComponentType<any>;
}

export default function LearningModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  const modules: Record<string, ModuleInfo> = {
    "que-es-control-horario": {
      id: "que-es-control-horario",
      title: "¿Qué es el control horario?",
      description: "Aprende sobre la normativa de control horario y cómo afecta a tu empresa",
      icon: BookOpen,
      component: Module1
    },
    "es-obligatorio": {
      id: "es-obligatorio",
      title: "¿Es obligatorio para tu empresa?",
      description: "Descubre si tu empresa está obligada a implementar un sistema de fichaje",
      icon: CheckCircle,
      component: Module2
    },
    "como-implementar": {
      id: "como-implementar",
      title: "Cómo implementar un sistema de fichajes",
      description: "Conoce las diferentes opciones y encuentra la mejor para tu empresa",
      icon: Play,
      component: Module3
    }
  };

  const currentModule = moduleId ? modules[moduleId] : null;

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

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="container max-w-5xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="flex items-center mb-6 text-blue-600"
          onClick={() => navigate('/kit-legal')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Kit Legal
        </Button>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-blue-50 p-6 border-b border-blue-100">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Icon className="h-8 w-8 text-blue-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-800">{currentModule.title}</h1>
                <p className="text-gray-600">{currentModule.description}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
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
                className="bg-blue-600 hover:bg-blue-700" 
                onClick={() => {
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
                    navigate('/kit-legal');
                  }
                }}
              >
                {moduleId === "como-implementar" ? "Finalizar" : "Siguiente módulo"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
