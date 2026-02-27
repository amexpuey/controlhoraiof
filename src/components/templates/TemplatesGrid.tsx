
import React from "react";
import TemplateCard from "./TemplateCard";
import { TemplateData } from "./types";

interface TemplatesGridProps {
  templates: (TemplateData & { _published?: boolean })[];
  publishedSlugs?: Map<string, any>;
  onLeadGate?: (template: TemplateData) => void;
}

export default function TemplatesGrid({ templates, publishedSlugs, onLeadGate }: TemplatesGridProps) {
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
              isPublished={(template as any)._published || false}
              onLeadGate={onLeadGate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
