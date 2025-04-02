
import React from "react";
import { Tool } from "../types";

interface ToolContentProps {
  activeTab: string;
  tools: Tool[];
  isStandalone?: boolean;
}

const ToolContent: React.FC<ToolContentProps> = ({ 
  activeTab, 
  tools,
  isStandalone = false
}) => {
  // Find the active tool
  const activeTool = tools.find(tool => tool.id === activeTab);
  
  console.log("ToolContent - activeTab:", activeTab);
  console.log("ToolContent - activeTool:", activeTool);
  console.log("ToolContent - isStandalone:", isStandalone);
  console.log("ToolContent - tools:", tools.map(t => t.id));

  if (!activeTool) {
    console.error("No active tool found for tab:", activeTab);
    return null;
  }

  // Dynamic component rendering - the ToolComponent is the React component from the active tool
  const ToolComponent = activeTool.component;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <ToolComponent />
    </div>
  );
};

export default ToolContent;
