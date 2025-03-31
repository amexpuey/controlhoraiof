
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
        return <FileText className="h-8 w-8 text-white opacity-80" />;
      case "Control horario":
        return <Clock className="h-8 w-8 text-white opacity-80" />;
      case "Formación":
        return <GraduationCap className="h-8 w-8 text-white opacity-80" />;
      case "Comunicación Interna":
        return <MessageSquare className="h-8 w-8 text-white opacity-80" />;
      case "Normativa Laboral":
        return <Briefcase className="h-8 w-8 text-white opacity-80" />;
      case "Onboarding":
        return <Users className="h-8 w-8 text-white opacity-80" />;
      case "Productividad":
        return <Calendar className="h-8 w-8 text-white opacity-80" />;
      case "Documentos Legales":
        return <FileText className="h-8 w-8 text-white opacity-80" />;
      case "Turnos":
        return <Clock className="h-8 w-8 text-white opacity-80" />;
      default:
        return <Book className="h-8 w-8 text-white opacity-80" />;
    }
  };

  // Function to get gradient style based on template category
  const getGradientStyle = () => {
    // Base gradient from emerald to yellow (like the provided image)
    return "bg-gradient-to-r from-emerald-400 via-green-300 to-yellow-300";
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <div className={`aspect-video relative overflow-hidden ${getGradientStyle()}`}>
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center">
          {getCategoryIcon()}
          <h3 className="text-white font-bold text-xl mt-3 drop-shadow-md">
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
