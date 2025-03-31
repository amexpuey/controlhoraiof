
import React from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DownloadButtonProps {
  downloadAttempted: boolean;
  handleDownload: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  downloadAttempted, 
  handleDownload 
}) => {
  return (
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
  );
};
