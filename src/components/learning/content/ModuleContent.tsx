
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Play, Icon } from "lucide-react";

interface ModuleContentProps {
  title: string;
  description: string;
  icon: React.ElementType;
  duration: string;
  videoUrl?: string;
  ModuleComponent: React.ComponentType<any>;
  onCompleteModule: () => void;
  isLastModule: boolean;
}

export default function ModuleContent({
  title,
  description,
  icon: Icon,
  duration,
  videoUrl,
  ModuleComponent,
  onCompleteModule,
  isLastModule
}: ModuleContentProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#2a3040] to-[#3a4156] p-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#0BC8C1]/10 p-3 rounded-full">
            <Icon className="h-8 w-8 text-[#0BC8C1]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-gray-300">{description}</p>
            <div className="flex items-center mt-2 text-sm text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Duración: {duration}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {showVideo && videoUrl ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Video explicativo</h2>
            <div className="relative pb-[56.25%] h-0">
              <iframe 
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={videoUrl} 
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="mb-4 flex justify-center">
            <Button 
              className="flex items-center gap-2 bg-[#0BC8C1] hover:bg-[#0AB1AB]"
              onClick={() => setShowVideo(true)}
            >
              <Play className="h-4 w-4" />
              Ver video explicativo
            </Button>
          </div>
        )}
        
        <ModuleComponent standalone={true} />
      </div>
      
      <div className="bg-gray-50 p-6 border-t border-gray-200">
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/kit-legal'}
          >
            Volver al Kit Legal
          </Button>
          
          <Button 
            className="bg-[#0BC8C1] hover:bg-[#0AB1AB] flex items-center gap-2" 
            onClick={onCompleteModule}
          >
            {isLastModule ? (
              <>
                Finalizar y volver al Kit
                <Home className="h-4 w-4" />
              </>
            ) : (
              <>
                Siguiente módulo
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
