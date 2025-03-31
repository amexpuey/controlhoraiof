
import React, { useState } from "react";
import TemplatesHeader from "@/components/templates/TemplatesHeader";
import TemplatesGrid from "@/components/templates/TemplatesGrid";
import TemplateFilters from "@/components/templates/TemplateFilters";
import { TemplateCategory, TemplateData } from "@/components/templates/types";
import { templateData } from "@/components/templates/templateData";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { ToolsDropdown } from "@/components/ui/ToolsDropdown";

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "all">("all");
  
  // Filter templates based on search query and selected category
  const filteredTemplates = templateData.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle scroll to templates section
  const scrollToTemplates = () => {
    const templatesSection = document.querySelector('.templates-section');
    if (templatesSection) {
      templatesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Simple header with navigation */}
      <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-900 border-b flex items-center justify-between px-6 shadow-md z-10 relative">
        <Link to="/" className="text-xl font-semibold text-white hover:text-gray-200 transition-colors">
          Control Horario Electrónico
        </Link>
        <div className="flex items-center gap-4">
          <ToolsDropdown />
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
      
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <TemplatesHeader />
        
        <div className="mt-8 text-center">
          <Button 
            onClick={scrollToTemplates}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-lg font-medium text-lg flex items-center gap-2 mx-auto transition-all hover:shadow-lg"
          >
            Ver Plantillas
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </Button>
        </div>
        
        <div className="templates-section mt-16">
          <TemplateFilters 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <div className="mt-6 mb-8">
            <input 
              type="text"
              placeholder="Buscar plantillas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          
          <TemplatesGrid templates={filteredTemplates} />
        </div>
      </main>
      
      {/* No footer here - App.tsx handles the footer */}
    </div>
  );
}
