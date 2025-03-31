
import React from "react";
import TalentGuide from "@/components/templates/TalentGuide";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TalentGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Simple header with navigation */}
      <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-900 border-b flex items-center justify-between px-6 shadow-md z-10 relative">
        <Link to="/" className="text-xl font-semibold text-white hover:text-gray-200 transition-colors">
          Control Horario Electrónico
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            to="/plantillas" 
            className="text-sm font-medium text-white hover:text-gray-200 transition-colors"
          >
            Plantillas
          </Link>
          <Link 
            to="/blog" 
            className="text-sm font-medium text-white hover:text-gray-200 transition-colors"
          >
            Blog
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-1.5 text-sm font-medium bg-yellow-100 text-gray-800 hover:bg-yellow-200 px-3 py-1.5 rounded-md transition-colors"
          >
            <img
              src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
              alt="Home"
              className="w-4 h-4"
            />
            Descubre las mejores apps
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/plantillas" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a plantillas
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-blue-900">Guía de Talento: Desempeño y Seguimiento</h1>
          <p className="text-gray-600 mt-2">
            Esta herramienta interactiva te ayudará a evaluar el desempeño, planificar formaciones y realizar un seguimiento de objetivos para tus colaboradores.
          </p>
        </div>
        
        <TalentGuide />
      </div>
    </div>
  );
}
