
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Play, CheckCircle, AlertTriangle, Info, ChevronRight } from "lucide-react";
import Module1 from "./Module1";
import Module2 from "./Module2";
import Module3 from "./Module3";

const modules = [
  {
    id: "module1",
    title: "¿Qué es el control horario?",
    description: "Aprende sobre la normativa de control horario y cómo afecta a tu empresa",
    icon: Book,
    component: Module1,
    status: "available" // available, coming-soon, completed
  },
  {
    id: "module2",
    title: "¿Es obligatorio para tu empresa?",
    description: "Descubre si tu empresa está obligada a implementar un sistema de fichaje",
    icon: CheckCircle,
    component: Module2,
    status: "available"
  },
  {
    id: "module3",
    title: "Cómo implementar un sistema de fichajes",
    description: "Conoce las diferentes opciones y encuentra la mejor para tu empresa",
    icon: Play,
    component: Module3,
    status: "available"
  },
  {
    id: "module4",
    title: "Consecuencias del incumplimiento",
    description: "Sanciones y cómo evitarlas",
    icon: AlertTriangle,
    component: null,
    status: "coming-soon"
  }
];

interface LearningModulesProps {
  initialModule?: string;
}

export default function LearningModules({ initialModule }: LearningModulesProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(initialModule || null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(!!initialModule);
  
  const openModule = (moduleId: string) => {
    if (modules.find(m => m.id === moduleId)?.status === "available") {
      setSelectedModule(moduleId);
      setIsDialogOpen(true);
    }
  };

  const closeModule = () => {
    setIsDialogOpen(false);
  };

  const activeModule = modules.find(m => m.id === selectedModule);

  return (
    <>
      <section className="py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            Módulos de Aprendizaje Interactivo
          </h2>
          <p className="text-gray-600">
            Descubre todo lo que necesitas saber sobre el control horario a través de estos módulos interactivos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((module) => (
            <Card 
              key={module.id}
              className={`overflow-hidden transition-all ${
                module.status === "available" 
                  ? "border-blue-200 hover:shadow-md cursor-pointer" 
                  : "border-gray-200 opacity-75"
              }`}
              onClick={() => openModule(module.id)}
            >
              <CardHeader className="bg-blue-50 pb-2">
                <div className="flex justify-between items-center">
                  <module.icon className="h-6 w-6 text-blue-600" />
                  {module.status === "coming-soon" && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Próximamente
                    </span>
                  )}
                  {module.status === "completed" && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Completado
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg text-blue-800 mt-2">{module.title}</CardTitle>
                <CardDescription className="text-sm">{module.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-4 pb-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-blue-600 p-0 ${module.status !== "available" && "opacity-50 cursor-not-allowed"}`}
                  disabled={module.status !== "available"}
                >
                  Acceder <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Module Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {activeModule && activeModule.component && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                  <activeModule.icon className="h-6 w-6 text-blue-600" />
                  {activeModule.title}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <activeModule.component onComplete={closeModule} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
