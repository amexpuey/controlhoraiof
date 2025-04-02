
import { CheckCircle, ListChecks, FileText, BookOpen, AlertTriangle, BarChart2, HelpCircle } from "lucide-react";

// Tool interface
export interface Tool {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  component: React.ComponentType<any>;
  url?: string; // URL opcional para redireccionamiento externo o navegación interna
}
