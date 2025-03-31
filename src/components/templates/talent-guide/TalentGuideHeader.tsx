
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TalentGuideHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <Button variant="ghost" className="mb-4" asChild>
        <Link to="/plantillas" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver a plantillas
        </Link>
      </Button>
      <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Guía de Talento: Desempeño, Formaciones y Seguimiento de Objetivos</h1>
      <p className="text-gray-600 mt-2">
        Esta herramienta interactiva te ayudará a evaluar el desempeño, planificar formaciones y realizar un seguimiento de objetivos para tus colaboradores.
      </p>
    </div>
  );
};
