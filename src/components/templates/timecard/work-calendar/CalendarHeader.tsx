
import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, FileText, ChevronLeft, ChevronRight } from "lucide-react";

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
  return (
    <div className="flex justify-between items-center mb-4">
      <Button variant="outline" onClick={goToPreviousMonth}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <h2 className="text-xl font-semibold">
        {format(currentDate, "MMMM yyyy", { locale: es })}
      </h2>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={goToNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={downloadAsCSV}>
              <FileText className="h-4 w-4 mr-2" />
              Descargar CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
