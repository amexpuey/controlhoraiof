
import React, { useState, useEffect } from "react";
import LearningSidebar from "@/components/learning/sidebar/LearningSidebar";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface KitLegalLayoutProps {
  children: React.ReactNode;
  learningProgress: number;
  activeModuleId: string | null;
  showHeader?: boolean;
}

export default function KitLegalLayout({ 
  children, 
  learningProgress, 
  activeModuleId, 
  showHeader = true 
}: KitLegalLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <LearningSidebar 
          learningProgress={learningProgress} 
          activeModuleId={activeModuleId}
        />
        
        {/* Main content */}
        <div className="ml-64 flex-1">
          {showHeader && (
            <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="text-gray-600 flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Kit Legal INWOUT
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Horas hoy: 0h 0m</span>
                <button className="bg-[#0BC8C1] hover:bg-[#0AB1AB] text-white px-4 py-2 rounded-md">
                  Entrada
                </button>
              </div>
            </header>
          )}
          
          <main className="container max-w-6xl mx-auto px-8 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
