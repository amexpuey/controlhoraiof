
import React from "react";
import { Button } from "@/components/ui/button";

interface ActionSupportCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  className?: string;
}

export default function ActionSupportCard({
  title,
  description,
  buttonText,
  buttonUrl,
  className = ""
}: ActionSupportCardProps) {
  return (
    <div className={`bg-blue-50 p-6 rounded-lg border border-blue-100 ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {title}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
        <Button 
          className="bg-[#2a3040] hover:bg-[#3a4156] text-white px-6"
          onClick={() => window.open(buttonUrl, "_blank")}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
