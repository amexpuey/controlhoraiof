
import React from "react";
import TalentGuide from "@/components/templates/TalentGuide";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
          <h1 className="text-3xl font-bold text-blue-900">Guía de Talento: Desempeño, Formaciones y Seguimiento de Objetivos</h1>
          <p className="text-gray-600 mt-2">
            Esta herramienta interactiva te ayudará a evaluar el desempeño, planificar formaciones y realizar un seguimiento de objetivos para tus colaboradores.
          </p>
        </div>
        
        {/* Nueva sección introductoria */}
        <Card className="mb-8 border-0 shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">¿Qué puedes hacer con esta guía?</h2>
            <p className="mb-4">
              Si ya has llegado hasta aquí, es porque tu equipo te importa de verdad. Esta guía no solo te ayudará a conocer y entender a las personas de tu equipo, sino que te dará las herramientas necesarias para sacar lo mejor de ellas y llevar a tu equipo al éxito.
            </p>
          </div>
          <CardContent className="bg-white p-6">
            <h3 className="text-xl font-semibold mb-4">Dentro de esta guía encontrarás recursos para:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Ayudar a tu equipo a crecer profesionalmente</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Planificar y dar seguimiento a objetivos claros</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Evaluar el desempeño de tus colaboradores</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Estructurar planes de formación efectivos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Tomar decisiones informadas basadas en datos concretos</span>
              </li>
            </ul>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Beneficios de utilizar esta guía:</h3>
              <ul className="space-y-2 text-blue-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Ahorrar tiempo con plantillas ya estructuradas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Mejorar la experiencia de los colaboradores</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Aumentar la retención del talento en tu organización</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Fomentar el crecimiento organizacional</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 text-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" /> Comenzar a usar la guía
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <TalentGuide />
      </div>
    </div>
  );
}
