
import { toast } from "sonner";

export const usePdfGenerator = () => {
  const generatePdf = (contentId: string) => {
    try {
      // Create a new printing iframe that won't be blocked by popup blockers
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Get the content to print
      const content = document.getElementById(contentId);
      
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

  return { generatePdf };
};
