
import React from "react";
import { Tool } from "../types";

interface ToolContentProps {
  activeTab: string;
  tools: Tool[];
  isStandalone: boolean;
}

export default function ToolContent({ activeTab, tools, isStandalone }: ToolContentProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      {tools.map((tool) => (
        activeTab === tool.id && (
          <div key={tool.id}>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                {React.createElement(tool.icon, { className: "h-8 w-8 text-blue-700" })}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{tool.title}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
              {React.createElement(tool.component, {
                isStandalone: isStandalone
              })}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
