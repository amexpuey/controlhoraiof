
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Video } from "lucide-react";

export default function VideoTutorial() {
  return (
    <div className="mb-8">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="video-tutorial" className="border border-gray-200 rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-white hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <Video className="h-5 w-5 text-red-600" />
              </div>
              <div className="text-left">
                <span className="font-medium text-lg">Accede a INWOUT para configurar tu cuenta</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-2 border-t border-gray-100">
            <div className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <div style={{ padding:"56.31% 0 0 0", position:"relative" }}>
                <iframe 
                  src="https://player.vimeo.com/video/1072074433?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                  style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%" }} 
                  title="Accede a INWOUT para configurar tu cuenta">
                </iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
