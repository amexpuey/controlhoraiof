
import React from "react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title?: string;
  backLink?: string;
  backText?: string;
}

export default function SectionHeader({ title, backLink = "/kit-legal", backText = "Volver al Kit Legal" }: SectionHeaderProps) {
  return (
    <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
      <Link to={backLink} className="text-gray-600 hover:text-gray-900 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        {backText}
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Horas hoy: 0h 0m</span>
        <button className="bg-[#0BC8C1] hover:bg-[#0AB1AB] text-white px-4 py-2 rounded-md">
          Entrada
        </button>
      </div>
    </header>
  );
}
