
import React from "react";
import TemplateCard from "./TemplateCard";
import { TemplateData } from "./types";

interface TemplatesGridProps {
  templates: TemplateData[];
}

export default function TemplatesGrid({ templates }: TemplatesGridProps) {
  return (
    <div>
      {templates.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No se encontraron plantillas que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}
