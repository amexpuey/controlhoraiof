
import React, { useState } from "react";
import { LucideIcon, ChevronDown, ChevronUp } from "lucide-react";

interface SidebarSectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: (isExpanded: boolean) => void;
}

export default function SidebarSection({ 
  icon: Icon, 
  title, 
  children, 
  isExpanded = false,
  onToggle
}: SidebarSectionProps) {
  const [expanded, setExpanded] = useState(isExpanded);
  
  const toggleExpanded = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
    if (onToggle) {
      onToggle(newExpandedState);
    }
  };
  
  return (
    <div className="space-y-1">
      <div 
        onClick={toggleExpanded}
        className={`flex items-center justify-between py-2 px-3 text-gray-300 hover:bg-[#222A39] hover:text-white rounded-md transition-colors cursor-pointer ${
          expanded ? "bg-[#222A39]" : ""
        }`}
      >
        <div className="flex items-center">
          <Icon className="h-5 w-5 mr-3" />
          <span>{title}</span>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>
      
      {expanded && (
        <div className="ml-8 space-y-1 mt-1">
          {children}
        </div>
      )}
    </div>
  );
}
