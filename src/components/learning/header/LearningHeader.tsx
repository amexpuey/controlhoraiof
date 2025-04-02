
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LearningHeaderProps {
  title: string;
}

export default function LearningHeader({ title }: LearningHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        variant="ghost"
        className="text-gray-600"
        onClick={() => navigate('/kit-legal')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al Kit Legal
      </Button>
      
      <div className="flex items-center text-sm text-gray-500">
        <span className="mr-2">Horas hoy: 0h 0m</span>
        <Button 
          variant="outline" 
          className="ml-2 border-[#0BC8C1] text-[#0BC8C1] hover:bg-[#0BC8C1] hover:text-white"
        >
          Entrada
        </Button>
      </div>
    </div>
  );
}
