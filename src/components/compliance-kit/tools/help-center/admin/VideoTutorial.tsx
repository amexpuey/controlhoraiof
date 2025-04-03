
import React from "react";
import { Video } from "lucide-react";

export default function VideoTutorial() {
  return (
    <div className="flex gap-4 items-start">
      <div className="bg-blue-100 text-blue-700 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-lg font-bold">3</span>
      </div>
      <div className="w-full">
        <h4 className="text-lg font-medium mb-1">Accede a INWOUT para configurar tu cuenta</h4>
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
      </div>
    </div>
  );
}
