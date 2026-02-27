
export type TemplateCategory = 
  | "Control horario"
  | "Evaluación"
  | "Formación"
  | "Turnos"
  | "Comunicación Interna"
  | "Normativa Laboral"
  | "Onboarding"
  | "Productividad"
  | "Documentos Legales"
  | "Vacaciones";

export type TemplateAction = "download" | "edit" | "external";

export interface TemplateData {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: TemplateCategory;
  action: TemplateAction;
  actionLabel: string;
  downloadUrl?: string;
  editUrl?: string;
  /** Simulated base download count for social proof */
  baseDownloads?: number;
  /** Meta description for individual SEO page */
  metaDescription?: string;
}
