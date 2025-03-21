
import React from "react";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
      <div 
        className="bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-in-out" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
