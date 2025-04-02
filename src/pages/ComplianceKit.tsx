
import React, { useState } from "react";
import ComplianceKitHeader from "@/components/compliance-kit/ComplianceKitHeader";
import ComplianceKitTools from "@/components/compliance-kit/ComplianceKitTools";
import ComplianceKitFAQ from "@/components/compliance-kit/ComplianceKitFAQ";
import ComplianceKitBenefits from "@/components/compliance-kit/ComplianceKitBenefits";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export default function ComplianceKit() {
  const navigate = useNavigate();
  const [learningProgress, setLearningProgress] = useState(0);
  
  // Set document title when component mounts
  React.useEffect(() => {
    document.title = "Kit Legal - Control Horario Electrónico";
    
    // Simulate progress loading for demo purposes
    // In a real implementation, this would be based on user's actual progress
    const timer = setTimeout(() => {
      setLearningProgress(33);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to navigate to learning module pages
  const navigateToModule = (moduleId: string) => {
    navigate(`/kit-legal/modulo/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <ComplianceKitHeader />
        
        {/* Learning Progress Tracker */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-blue-800">Progreso de aprendizaje</h3>
            <span className="text-sm font-medium text-blue-600">{learningProgress}% completado</span>
          </div>
          <Progress value={learningProgress} className="h-2 bg-blue-100" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              onClick={() => navigateToModule("que-es-control-horario")}
              className="bg-white p-4 rounded border border-blue-200 cursor-pointer hover:shadow-md transition-all"
            >
              <h4 className="font-medium text-blue-800 mb-1">Módulo 1</h4>
              <p className="text-sm text-gray-600">¿Qué es el control horario?</p>
              {learningProgress >= 33 && (
                <div className="mt-2 text-xs text-green-600 font-medium">✓ Completado</div>
              )}
            </div>
            <div 
              onClick={() => navigateToModule("es-obligatorio")}
              className="bg-white p-4 rounded border border-blue-200 cursor-pointer hover:shadow-md transition-all"
            >
              <h4 className="font-medium text-blue-800 mb-1">Módulo 2</h4>
              <p className="text-sm text-gray-600">¿Es obligatorio para tu empresa?</p>
              {learningProgress >= 66 && (
                <div className="mt-2 text-xs text-green-600 font-medium">✓ Completado</div>
              )}
            </div>
            <div 
              onClick={() => navigateToModule("como-implementar")}
              className="bg-white p-4 rounded border border-blue-200 cursor-pointer hover:shadow-md transition-all"
            >
              <h4 className="font-medium text-blue-800 mb-1">Módulo 3</h4>
              <p className="text-sm text-gray-600">¿Cómo implementar un sistema de fichajes?</p>
              {learningProgress >= 100 && (
                <div className="mt-2 text-xs text-green-600 font-medium">✓ Completado</div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 my-8">
          <div className="lg:col-span-4">
            {/* Pass hideAppComparison prop to hide the app comparison tool */}
            <ComplianceKitTools hideAppComparison={true} />
            <ComplianceKitBenefits />
            <ComplianceKitFAQ />
          </div>
        </div>
      </main>
    </div>
  );
}
