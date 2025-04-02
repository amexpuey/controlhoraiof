
import React from "react";
import { FileText, CheckCircle, BookOpen } from "lucide-react";

interface LearningModulesSectionProps {
  visible: boolean;
  isStandalonePage: boolean;
}

export default function LearningModulesSection({ visible, isStandalonePage }: LearningModulesSectionProps) {
  if (!visible || isStandalonePage) {
    return null;
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold text-blue-700 mb-4">Módulos de Aprendizaje Interactivo</h3>
      <p className="text-gray-600 mb-6">
        Descubre todo lo que necesitas saber sobre el control horario a través de estos módulos interactivos
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Module 1 */}
        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <div className="p-5">
            <div className="bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <FileText className="h-5 w-5 text-blue-700" />
            </div>
            <h4 className="text-gray-800 font-medium mb-2">¿Qué es el control horario?</h4>
            <p className="text-gray-600 text-sm mb-4">
              Aprende todo lo relativo a la normativa de control horario y cómo afecta a tu empresa.
            </p>
            <a href="#" className="text-blue-600 flex items-center text-sm hover:underline">
              Acceder
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Module 2 */}
        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <div className="p-5">
            <div className="bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <CheckCircle className="h-5 w-5 text-blue-700" />
            </div>
            <h4 className="text-gray-800 font-medium mb-2">¿Es obligatorio para tu empresa?</h4>
            <p className="text-gray-600 text-sm mb-4">
              Descubre si tu empresa está obligada a implementar un sistema de fichaje.
            </p>
            <a href="#" className="text-blue-600 flex items-center text-sm hover:underline">
              Acceder
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Module 3 */}
        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <div className="p-5">
            <div className="bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <BookOpen className="h-5 w-5 text-blue-700" />
            </div>
            <h4 className="text-gray-800 font-medium mb-2">Cómo implementar un sistema de fichajes</h4>
            <p className="text-gray-600 text-sm mb-4">
              Conoce las diferentes opciones y encuentra la mejor para tu empresa.
            </p>
            <a href="#" className="text-blue-600 flex items-center text-sm hover:underline">
              Acceder
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
