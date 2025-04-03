
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HelpStep } from "@/hooks/useHelpContent";

interface HelpStepItemsProps {
  step: HelpStep;
}

export default function HelpStepItems({ step }: HelpStepItemsProps) {
  return (
    <div className="mb-4">
      {step.items && step.items.length > 0 && (
        <div className="mb-3">
          <div className="text-md font-medium mb-2">Acciones</div>
          <div className="space-y-2">
            {step.items.map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox id={`${step.id}-item-${i}`} />
                <label
                  htmlFor={`${step.id}-item-${i}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {step.video_url && (
        <div className="mt-4">
          <div className="flex items-center text-md font-medium mb-2">
            <Play className="w-4 h-4 mr-1" />
            <span>Tutorial en vídeo</span>
            {step.estimated_time && (
              <span className="ml-2 text-sm text-gray-500">
                ({step.estimated_time})
              </span>
            )}
          </div>
          <div className="aspect-video w-full rounded-md overflow-hidden bg-gray-100">
            <iframe 
              className="w-full h-full"
              src={step.video_url} 
              title={`Tutorial - ${step.title}`}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      
      {step.pdf_url && (
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.open(step.pdf_url!, "_blank")}
          >
            Descargar documentación
          </Button>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Button 
          className="bg-[#0BC8C1] hover:bg-[#0AB1AB] w-full"
          onClick={() => window.open("https://app.inwout.com/login", "_blank")}
        >
          Configurar esta sección en app.inwout.com
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
