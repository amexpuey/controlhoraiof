
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
      <Link 
        to="/"
        className="px-5 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg text-sm transition-colors"
      >
        Volver a inicio
      </Link>
    </div>
  );
}
