
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Pencil, Book, Clock, FileText, Users, Calendar, MessageSquare, GraduationCap, Briefcase } from "lucide-react";
import { TemplateData } from "./types";
import { Link } from "react-router-dom";

interface TemplateCardProps {
  template: TemplateData;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const renderActionButton = () => {
    if (template.action === "download") {
      return (
        <Button className="w-full" asChild>
          <a href={template.downloadUrl} download>
            <Download className="mr-2 h-4 w-4" /> {template.actionLabel}
          </a>
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
        return <FileText className="h-10 w-10 text-white" />;
      case "Control horario":
        return <Clock className="h-10 w-10 text-white" />;
      case "Formación":
        return <GraduationCap className="h-10 w-10 text-white" />;
      case "Comunicación Interna":
        return <MessageSquare className="h-10 w-10 text-white" />;
      case "Normativa Laboral":
        return <Briefcase className="h-10 w-10 text-white" />;
      case "Onboarding":
        return <Users className="h-10 w-10 text-white" />;
      case "Productividad":
        return <Calendar className="h-10 w-10 text-white" />;
      case "Documentos Legales":
        return <FileText className="h-10 w-10 text-white" />;
      case "Turnos":
        return <Clock className="h-10 w-10 text-white" />;
      default:
        return <Book className="h-10 w-10 text-white" />;
    }
  };

  // Function to get gradient style based on template category
  const getGradientStyle = () => {
    const baseStyle = "relative aspect-video overflow-hidden bg-gradient-to-r";
    
    switch (template.category) {
      case "Evaluación":
        return `${baseStyle} from-blue-500 to-blue-300`;
      case "Control horario":
        return `${baseStyle} from-violet-500 to-indigo-400`;
      case "Formación":
        return `${baseStyle} from-emerald-500 to-teal-300`;
      case "Comunicación Interna":
        return `${baseStyle} from-orange-400 to-amber-300`;
      case "Normativa Laboral":
        return `${baseStyle} from-gray-600 to-gray-400`;
      case "Onboarding":
        return `${baseStyle} from-pink-500 to-rose-300`;
      case "Productividad":
        return `${baseStyle} from-green-500 to-emerald-300`;
      case "Documentos Legales":
        return `${baseStyle} from-slate-600 to-slate-400`;
      case "Turnos":
        return `${baseStyle} from-purple-500 to-purple-300`;
      default:
        return `${baseStyle} from-emerald-500 via-green-400 to-yellow-300`;
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg border-0 shadow">
      <div className={getGradientStyle()}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center">
          <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
            {getCategoryIcon()}
          </div>
          <h3 className="text-white font-bold text-xl mt-4 px-2 py-1 drop-shadow-md">
            {template.title}
          </h3>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="mt-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {template.category}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="text-sm text-gray-600 flex-grow">
        <p>{template.description}</p>
      </CardContent>
      
      <CardFooter className="flex flex-col items-stretch gap-2 pt-0">
        {renderActionButton()}
        
        {template.exampleLink && (
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
