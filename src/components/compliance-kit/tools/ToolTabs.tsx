
import React from "react";
import { Tool } from "../types";

interface ToolTabsProps {
  tools: Tool[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function ToolTabs({ tools, activeTab, onTabChange }: ToolTabsProps) {
  const splitTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length <= 2) return title;
    
    const firstLine = words.slice(0, 1).join(' ');
    const secondLine = words.slice(1).join(' ');
    
    return (
      <>
        <span className="block">{firstLine}</span>
        <span className="block">{secondLine}</span>
      </>
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onTabChange(tool.id)}
          className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
            activeTab === tool.id 
              ? "bg-blue-100 text-blue-800" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <div className={`p-3 rounded-full mb-2 ${
            activeTab === tool.id ? "bg-blue-200" : "bg-white"
          }`}>
            {React.createElement(tool.icon, { 
              className: `w-6 h-6 ${activeTab === tool.id ? "text-blue-700" : "text-gray-700"}`
            })}
          </div>
          <span className="text-center font-medium text-sm leading-tight">
            {splitTitle(tool.title)}
          </span>
        </button>
      ))}
    </div>
  );
}
