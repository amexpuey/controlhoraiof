
import React from "react";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import SidebarLink from "./SidebarLink";

interface LearningModulesLinksProps {
  learningProgress: number;
  activeModuleId?: string;
}

export default function LearningModulesLinks({ 
  learningProgress, 
  activeModuleId 
}: LearningModulesLinksProps) {
  return (
    <>
      <SidebarLink 
        icon={BookOpen}
        text="Qué es el control horario"
        path="/kit-legal/modulo/que-es-control-horario"
        isActive={activeModuleId === 'que-es-control-horario'}
        isCompleted={learningProgress >= 33}
      />
      
      <SidebarLink 
        icon={Clock}
        text="¿Es obligatorio?"
        path="/kit-legal/modulo/es-obligatorio"
        isActive={activeModuleId === 'es-obligatorio'}
        isCompleted={learningProgress >= 66}
      />
      
      <SidebarLink 
        icon={Clock}
        text="Cómo implementarlo"
        path="/kit-legal/modulo/como-implementar"
        isActive={activeModuleId === 'como-implementar'}
        isCompleted={learningProgress >= 100}
      />
    </>
  );
}
