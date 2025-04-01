
import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface CalendarHeaderProps {
  currentDate: Date;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  downloadAsCSV: () => void;
}

export default function CalendarHeader({ 
  currentDate, 
  goToPreviousMonth, 
  goToNextMonth, 
  downloadAsCSV 
}: CalendarHeaderProps) {
  const handleDownloadCSV = () => {
    try {
      downloadAsCSV();
      toast.success("Calendario descargado correctamente");
    } catch (error) {
      console.error("Error al descargar CSV:", error);
      toast.error("Error al descargar el calendario");
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <Button variant="outline" onClick={goToPreviousMonth} type="button">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <h2 className="text-xl font-semibold">
        {format(currentDate, "MMMM yyyy", { locale: es })}
      </h2>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={goToNextMonth} type="button">
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2 relative z-10" type="button">
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-lg z-50">
            <DropdownMenuItem onClick={handleDownloadCSV} className="cursor-pointer">
              <FileText className="h-4 w-4 mr-2" />
              Descargar CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
