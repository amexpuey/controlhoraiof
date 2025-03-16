
import React from "react";
import { Link } from "react-router-dom";
import MainNavigation from "../MainNavigation";

export default function BlogHeader() {
  return (
    <div className="space-y-0">
      <MainNavigation />
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-900 text-center mb-4">
            Blog de Control Horario
          </h1>
          <p className="text-xl text-yellow-800 text-center max-w-2xl mx-auto">
            Recursos, guías y consejos sobre registro de jornada laboral y productividad
          </p>
          <div className="flex justify-center mt-6">
            <Link 
              to="/dashboard"
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Explorar el directorio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
