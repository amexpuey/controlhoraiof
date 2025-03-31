
import React, { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Footer } from "@/components/Footer";
import TemplatesHeader from "@/components/templates/TemplatesHeader";
import TemplatesGrid from "@/components/templates/TemplatesGrid";
import TemplateFilters from "@/components/templates/TemplateFilters";
import { TemplateCategory, TemplateData } from "@/components/templates/types";
import { templateData } from "@/components/templates/templateData";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

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
      <DashboardHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
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
          
          <TemplatesGrid templates={filteredTemplates} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
