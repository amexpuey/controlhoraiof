
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, PenTool } from "lucide-react";
import { TemplateData } from "./types";

interface TemplateCardProps {
  template: TemplateData;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={template.imageSrc} 
          alt={template.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="pt-4 pb-2 flex-grow">
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {template.category}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{template.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{template.description}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4 flex flex-col items-start gap-2">
        <Button 
          className={`w-full ${template.action === 'download' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {template.action === 'download' ? (
            <>
              <Download className="w-4 h-4 mr-2" />
              {template.actionLabel}
            </>
          ) : (
            <>
              <PenTool className="w-4 h-4 mr-2" />
              {template.actionLabel}
            </>
          )}
        </Button>
        {template.exampleLink && (
          <Link 
            to={template.exampleLink} 
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center mt-1"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Ver ejemplo de uso
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
