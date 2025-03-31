
import React from "react";
import TemplateCard from "./TemplateCard";
import { TemplateData } from "./types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TimecardTemplate from "./timecard/TimecardTemplate";

interface TemplatesGridProps {
  templates: TemplateData[];
}

export default function TemplatesGrid({ templates }: TemplatesGridProps) {
  const [openTemplate, setOpenTemplate] = React.useState<string | null>(null);
  
  // Función para manejar la apertura de plantillas en un modal
  const handleTemplateAction = (templateId: string, action: string) => {
    if (action === "download" && templateId === "registro-horas-trabajadas") {
      setOpenTemplate(templateId);
      return;
    }
    
    // Para otras plantillas, mantener el comportamiento predeterminado
  };
  
  const closeTemplate = () => {
    setOpenTemplate(null);
  };

  return (
    <div>
      {templates.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No se encontraron plantillas que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              onAction={() => handleTemplateAction(template.id, template.action)}
            />
          ))}
        </div>
      )}
      
      {/* Modal para la plantilla de registro de horas */}
      <Dialog open={openTemplate === "registro-horas-trabajadas"} onOpenChange={closeTemplate}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <TimecardTemplate />
        </DialogContent>
      </Dialog>
    </div>
  );
}
