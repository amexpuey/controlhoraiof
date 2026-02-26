
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
  
  const handleTemplateAction = (templateId: string, action: string) => {
    if (action === "download" && templateId === "registro-horas-trabajadas") {
      setOpenTemplate(templateId);
    }
  };
  
  const closeTemplate = () => setOpenTemplate(null);

  return (
    <div>
      {templates.length === 0 ? (
        <div className="glass" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <p style={{ color: 'var(--text-muted)' }}>No se encontraron plantillas que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {templates.map((template) => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              onAction={() => handleTemplateAction(template.id, template.action)}
            />
          ))}
        </div>
      )}
      
      <Dialog open={openTemplate === "registro-horas-trabajadas"} onOpenChange={closeTemplate}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <TimecardTemplate />
        </DialogContent>
      </Dialog>
    </div>
  );
}
