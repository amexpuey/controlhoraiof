
export type TemplateCategory = 
  | "Control horario"
  | "Evaluación"
  | "Formación"
  | "Turnos"
  | "Comunicación Interna"
  | "Normativa Laboral"
  | "Onboarding"
  | "Productividad"
  | "Documentos Legales";

export type TemplateAction = "download" | "edit";

export interface TemplateData {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: TemplateCategory;
  action: TemplateAction;
  actionLabel: string;
  exampleLink?: string;
  downloadUrl?: string;
  editUrl?: string;
}
