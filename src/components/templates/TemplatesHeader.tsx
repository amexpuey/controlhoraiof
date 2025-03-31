
import React from "react";

export default function TemplatesHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Plantillas Gratuitas para Gestión Laboral
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Descarga o edita plantillas prácticas para la gestión de recursos humanos, 
        control horario y cumplimiento normativo. Todas nuestras plantillas son 
        gratuitas y adaptadas a la normativa laboral española.
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          100% Gratuitas
        </span>
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Sin registro necesario
        </span>
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Adaptadas a normativa española
        </span>
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Actualizadas regularmente
        </span>
      </div>
    </div>
  );
}
