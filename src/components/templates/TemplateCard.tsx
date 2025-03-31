import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Pencil, Book, Clock, FileText, Users, Calendar, MessageSquare, GraduationCap, Briefcase } from "lucide-react";
import { TemplateData } from "./types";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface TemplateCardProps {
  template: TemplateData;
  onAction?: () => void;
}

export default function TemplateCard({ template, onAction }: TemplateCardProps) {
  const renderActionButton = () => {
    if (template.action === "download") {
      return (
        <Button 
          className="w-full" 
          onClick={onAction ? onAction : undefined}
          asChild={!onAction}
        >
          {onAction ? (
            <>
              <Download className="mr-2 h-4 w-4" /> {template.actionLabel}
            </>
          ) : (
            <a href={template.downloadUrl} download>
              <Download className="mr-2 h-4 w-4" /> {template.actionLabel}
            </a>
          )}
        </Button>
      );
    } else if (template.action === "edit") {
      return (
        <Button className="w-full" asChild>
          <Link to={template.editUrl || "#"}>
            <Pencil className="mr-2 h-4 w-4" /> {template.actionLabel}
          </Link>
        </Button>
      );
    }
  };

  // Function to get the appropriate icon based on template category
  const getCategoryIcon = () => {
    switch (template.category) {
      case "Evaluación":
        return <FileText className="h-8 w-8 text-white" />;
      case "Control horario":
        return <Clock className="h-8 w-8 text-white" />;
      case "Formación":
        return <GraduationCap className="h-8 w-8 text-white" />;
      case "Comunicación Interna":
        return <MessageSquare className="h-8 w-8 text-white" />;
      case "Normativa Laboral":
        return <Briefcase className="h-8 w-8 text-white" />;
      case "Onboarding":
        return <Users className="h-8 w-8 text-white" />;
      case "Productividad":
        return <Calendar className="h-8 w-8 text-white" />;
      case "Documentos Legales":
        return <FileText className="h-8 w-8 text-white" />;
      case "Turnos":
        return <Clock className="h-8 w-8 text-white" />;
      default:
        return <Book className="h-8 w-8 text-white" />;
    }
  };

  // Function to get gradient style based on template category
  const getGradientStyle = () => {
    const baseStyle = "relative aspect-video overflow-hidden bg-gradient-to-r";
    
    switch (template.category) {
      case "Evaluación":
        return `${baseStyle} from-blue-800 to-blue-600`;
      case "Control horario":
        return `${baseStyle} from-indigo-800 to-indigo-600`;
      case "Formación":
        return `${baseStyle} from-teal-800 to-teal-600`;
      case "Comunicación Interna":
        return `${baseStyle} from-amber-800 to-amber-600`;
      case "Normativa Laboral":
        return `${baseStyle} from-gray-800 to-gray-600`;
      case "Onboarding":
        return `${baseStyle} from-rose-800 to-rose-600`;
      case "Productividad":
        return `${baseStyle} from-emerald-800 to-emerald-600`;
      case "Documentos Legales":
        return `${baseStyle} from-slate-800 to-slate-600`;
      case "Turnos":
        return `${baseStyle} from-purple-800 to-purple-600`;
      default:
        return `${baseStyle} from-emerald-800 to-green-600`;
    }
  };

  // Function to get the category badge color
  const getCategoryBadgeStyle = () => {
    switch (template.category) {
      case "Evaluación":
        return "bg-blue-600 text-white";
      case "Control horario":
        return "bg-indigo-600 text-white";
      case "Formación":
        return "bg-teal-600 text-white";
      case "Comunicación Interna":
        return "bg-amber-600 text-white";
      case "Normativa Laboral":
        return "bg-gray-600 text-white";
      case "Onboarding":
        return "bg-rose-600 text-white";
      case "Productividad":
        return "bg-emerald-600 text-white";
      case "Documentos Legales":
        return "bg-slate-600 text-white";
      case "Turnos":
        return "bg-purple-600 text-white";
      default:
        return "bg-emerald-600 text-white";
    }
  };

  // Check if template is coming soon (some downloads are considered coming soon)
  const isComingSoon = template.action === "download" && template.id !== "registro-horas-trabajadas";

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg border-0 shadow relative">
      <div className={getGradientStyle()}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-left">
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm mb-3">
            {getCategoryIcon()}
          </div>
          <h3 className="text-white font-bold text-xl drop-shadow-md">
            {template.title}
          </h3>
        </div>
        
        {isComingSoon && (
          <div className="absolute top-0 right-0 m-3">
            <Badge className="bg-yellow-600 text-white py-1 px-3 font-medium">
              <Clock className="mr-1 h-3 w-3" /> Próximamente
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="mt-1">
          <Badge className={`font-medium ${getCategoryBadgeStyle()}`}>
            {template.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="text-sm text-gray-600 flex-grow">
        <p>{template.description}</p>
      </CardContent>
      
      <CardFooter className="flex flex-col items-stretch gap-2 pt-0">
        {isComingSoon ? (
          <Button variant="outline" className="w-full" disabled>
            <Clock className="mr-2 h-4 w-4" /> Próximamente
          </Button>
        ) : (
          renderActionButton()
        )}
        
        {template.exampleLink && !isComingSoon && template.id !== "registro-horas-trabajadas" && (
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href={template.exampleLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-3 w-3" /> Ver ejemplo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
