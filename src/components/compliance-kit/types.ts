
import { CheckCircle, ListChecks, FileText, BookOpen, AlertTriangle, BarChart2 } from "lucide-react";

// Tool interface
export interface Tool {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  component: React.ComponentType<any>;
}
