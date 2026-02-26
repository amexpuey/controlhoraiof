
import React from "react";
import { TemplateCategory } from "./types";
import { 
  Clock, 
  FileText, 
  Briefcase, 
  Users, 
  GraduationCap, 
  RotateCw, 
  MessageSquare,
  Calendar,
  Filter
} from "lucide-react";

interface TemplateFiltersProps {
  selectedCategory: TemplateCategory | "all";
  onCategoryChange: (category: TemplateCategory | "all") => void;
}

export default function TemplateFilters({ selectedCategory, onCategoryChange }: TemplateFiltersProps) {
  const categories: { value: TemplateCategory | "all"; label: string; icon: React.ReactNode }[] = [
    { value: "all", label: "Todas", icon: <Filter className="w-4 h-4" /> },
    { value: "Control horario", label: "Control horario", icon: <Clock className="w-4 h-4" /> },
    { value: "Evaluación", label: "Evaluación", icon: <FileText className="w-4 h-4" /> },
    { value: "Formación", label: "Formación", icon: <GraduationCap className="w-4 h-4" /> },
    { value: "Turnos", label: "Turnos", icon: <RotateCw className="w-4 h-4" /> },
    { value: "Comunicación Interna", label: "Comunicación", icon: <MessageSquare className="w-4 h-4" /> },
    { value: "Normativa Laboral", label: "Normativa", icon: <Briefcase className="w-4 h-4" /> },
    { value: "Onboarding", label: "Onboarding", icon: <Users className="w-4 h-4" /> },
    { value: "Productividad", label: "Productividad", icon: <Calendar className="w-4 h-4" /> },
    { value: "Documentos Legales", label: "Documentos", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="mb-8">
      <div className="s-head" style={{ marginBottom: '16px' }}>
        <p className="s-label">Categorías</p>
      </div>
      <div className="chips" style={{ gap: '8px' }}>
        {categories.map((category) => {
          const isActive = selectedCategory === category.value;
          return (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className="chip"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                background: isActive ? 'var(--green)' : undefined,
                borderColor: isActive ? 'var(--green)' : undefined,
                color: isActive ? 'white' : undefined,
                fontWeight: isActive ? 600 : undefined,
              }}
            >
              {category.icon}
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
