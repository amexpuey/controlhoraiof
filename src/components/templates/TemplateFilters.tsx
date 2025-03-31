
import React from "react";
import { TemplateCategory } from "./types";
import { Button } from "@/components/ui/button";
import { 
  Book, 
  Calendar, 
  Clock, 
  FileText, 
  Briefcase, 
  Users, 
  GraduationCap, 
  RotateCw, 
  MessageSquare
} from "lucide-react";

interface TemplateFiltersProps {
  selectedCategory: TemplateCategory | "all";
  onCategoryChange: (category: TemplateCategory | "all") => void;
}

export default function TemplateFilters({ selectedCategory, onCategoryChange }: TemplateFiltersProps) {
  // Categories with their corresponding icons
  const categories: { value: TemplateCategory | "all"; label: string; icon: React.ReactNode }[] = [
    { value: "all", label: "Todas", icon: <Book className="w-4 h-4 mr-1.5" /> },
    { value: "Control horario", label: "Control horario", icon: <Clock className="w-4 h-4 mr-1.5" /> },
    { value: "Evaluación", label: "Evaluación", icon: <FileText className="w-4 h-4 mr-1.5" /> },
    { value: "Formación", label: "Formación", icon: <GraduationCap className="w-4 h-4 mr-1.5" /> },
    { value: "Turnos", label: "Turnos", icon: <RotateCw className="w-4 h-4 mr-1.5" /> },
    { value: "Comunicación Interna", label: "Comunicación", icon: <MessageSquare className="w-4 h-4 mr-1.5" /> },
    { value: "Normativa Laboral", label: "Normativa", icon: <Briefcase className="w-4 h-4 mr-1.5" /> },
    { value: "Onboarding", label: "Onboarding", icon: <Users className="w-4 h-4 mr-1.5" /> },
    { value: "Productividad", label: "Productividad", icon: <Calendar className="w-4 h-4 mr-1.5" /> },
    { value: "Documentos Legales", label: "Documentos", icon: <FileText className="w-4 h-4 mr-1.5" /> },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Categorías</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            className={`flex items-center ${selectedCategory === category.value ? "bg-blue-600" : ""}`}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.icon}
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
