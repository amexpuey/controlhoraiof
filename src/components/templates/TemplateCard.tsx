
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Pencil } from "lucide-react";
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

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <div className="aspect-video overflow-hidden bg-gray-100">
        <img
          src={template.imageSrc}
          alt={template.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{template.title}</CardTitle>
        </div>
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
