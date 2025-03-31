
import React from "react";
import TalentGuide from "@/components/templates/TalentGuide";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle, Menu, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

export default function TalentGuidePage() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [downloadAttempted, setDownloadAttempted] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDownload = () => {
    // Instead of using window.open which can be blocked, we'll create a more reliable method
    setDownloadAttempted(true);
    
    try {
      // Create a new printing iframe that won't be blocked by popup blockers
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Get the content to print
      const content = document.getElementById('talent-guide-content');
      
      if (!content) {
        throw new Error("Content not found");
      }
      
      // Write the HTML to the iframe
      const iframeDocument = iframe.contentWindow?.document;
      if (!iframeDocument) {
        throw new Error("Could not access iframe document");
      }
      
      iframeDocument.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Guía de Talento: Desempeño y Formación</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1e3a8a; }
            table { border-collapse: collapse; width: 100%; margin: 15px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f0f7ff; }
            .page-break { page-break-after: always; }
            @media print {
              .no-print { display: none; }
              body { margin: 0; padding: 0 15px; }
            }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
        </html>
      `);
      
      iframeDocument.close();
      
      // Wait for content to load and then print
      setTimeout(() => {
        iframe.contentWindow?.print();
        
        // Remove the iframe after printing
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
        
        toast.success("Descarga iniciada", {
          description: "Se ha iniciado la descarga de la guía como PDF"
        });
      }, 500);
    } catch (error) {
      console.error("Error during PDF generation:", error);
      toast.error("Error al generar el PDF", {
        description: "Intenta nuevamente con otro navegador"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Responsive header with navigation */}
      <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-900 border-b flex items-center justify-between px-4 md:px-6 shadow-md z-20 relative">
        <Link to="/" className="text-lg md:text-xl font-semibold text-white hover:text-gray-200 transition-colors truncate max-w-[180px] md:max-w-none">
          Control Horario Electrónico
        </Link>
        
        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white"
              onClick={toggleMenu}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {menuOpen && (
              <div className="absolute top-16 right-0 w-full bg-gray-800 z-30 shadow-lg">
                <div className="flex flex-col p-2">
                  <Link 
                    to="/plantillas" 
                    className="text-sm font-medium text-white hover:bg-gray-700 p-2 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Plantillas
                  </Link>
                  <Link 
                    to="/blog" 
                    className="text-sm font-medium text-white hover:bg-gray-700 p-2 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link 
                    to="/" 
                    className="flex items-center gap-1.5 text-sm font-medium bg-yellow-100 text-gray-800 hover:bg-yellow-200 p-2 rounded mt-2"
                    onClick={() => setMenuOpen(false)}
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
            )}
          </>
        ) : (
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
        )}
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/plantillas" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a plantillas
            </Link>
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Guía de Talento: Desempeño, Formaciones y Seguimiento de Objetivos</h1>
          <p className="text-gray-600 mt-2">
            Esta herramienta interactiva te ayudará a evaluar el desempeño, planificar formaciones y realizar un seguimiento de objetivos para tus colaboradores.
          </p>
        </div>
        
        {/* Nueva sección introductoria */}
        <Card className="mb-8 border-0 shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 md:p-6 text-white">
            <h2 className="text-xl md:text-2xl font-bold mb-4">¿Qué puedes hacer con esta guía?</h2>
            <p className="mb-4">
              Si ya has llegado hasta aquí, es porque tu equipo te importa de verdad. Esta guía no solo te ayudará a conocer y entender a las personas de tu equipo, sino que te dará las herramientas necesarias para sacar lo mejor de ellas y llevar a tu equipo al éxito.
            </p>
          </div>
          <CardContent className="bg-white p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Dentro de esta guía encontrarás recursos para:</h3>
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
              {!downloadAttempted ? (
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" /> Descargar Guía en PDF
                </Button>
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Guía interactiva disponible a continuación</span>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleDownload}
                    className="border-blue-300 hover:bg-blue-50"
                  >
                    <Download className="mr-2 h-4 w-4" /> Intentar descargar nuevamente
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div id="talent-guide-content">
          <TalentGuide />
        </div>
      </div>
    </div>
  );
}
