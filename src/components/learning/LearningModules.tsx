import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Book, Play, CheckCircle, ChevronRight } from "lucide-react";
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
    status: "available"
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
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            Módulos de Aprendizaje Interactivo
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Descubre todo lo que necesitas saber sobre el control horario a través de estos módulos interactivos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => (
            <Card 
              key={module.id}
              className="overflow-hidden transition-all cursor-pointer"
              style={{ 
                borderColor: 'var(--border)',
                background: 'var(--white)'
              }}
              onClick={() => openModule(module.id)}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--green)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px -6px rgba(15,184,159,.08)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              <CardHeader className="pb-2" style={{ background: 'var(--green-bg)' }}>
                <div className="flex justify-between items-center">
                  <module.icon className="h-6 w-6" style={{ color: 'var(--green)' }} />
                  {module.status === "coming-soon" && (
                    <span className="text-xs px-2 py-1 rounded" style={{ background: 'var(--yellow-bg)', color: 'var(--yellow)' }}>
                      Próximamente
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg mt-2" style={{ color: 'var(--text)' }}>{module.title}</CardTitle>
                <CardDescription className="text-sm" style={{ color: 'var(--text-secondary)' }}>{module.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-4 pb-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0"
                  style={{ color: 'var(--green)' }}
                  disabled={module.status !== "available"}
                >
                  Acceder <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {activeModule && activeModule.component && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <activeModule.icon className="h-6 w-6" style={{ color: 'var(--green)' }} />
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
