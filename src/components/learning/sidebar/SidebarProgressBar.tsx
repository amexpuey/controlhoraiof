
import React from "react";

interface SidebarProgressBarProps {
  progress: number;
}

export default function SidebarProgressBar({ progress }: SidebarProgressBarProps) {
  return (
    <div className="mt-8 border-t border-gray-700 pt-6">
      <h3 className="text-md font-medium mb-3">Progreso de aprendizaje</h3>
      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#0BC8C1]" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-2 text-sm text-gray-300">
        {progress}% completado
      </div>
    </div>
  );
}
