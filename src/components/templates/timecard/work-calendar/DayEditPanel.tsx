
import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AbsenceType, absenceTypeLabels } from "./types";
import { Briefcase, Home, Heart, Clock, Ban, Check } from "lucide-react";

interface DayEditPanelProps {
  selectedDate: Date;
  absenceType: AbsenceType;
  hoursForDay: number;
  notes: string;
  setAbsenceType: (value: AbsenceType) => void;
  setHoursForDay: (value: number) => void;
  setNotes: (value: string) => void;
  saveDayData: () => void;
}

export default function DayEditPanel({
  selectedDate,
  absenceType,
  hoursForDay,
  notes,
  setAbsenceType,
  setHoursForDay,
  setNotes,
  saveDayData
}: DayEditPanelProps) {
  // Define absence type icons directly here to avoid circular imports
  const absenceTypeIcons: Record<AbsenceType, React.ReactNode> = {
    work: <Briefcase className="h-4 w-4" />,
    vacation: <Home className="h-4 w-4" />,
    sick: <Heart className="h-4 w-4" />,
    personal: <Clock className="h-4 w-4" />,
    unpaid: <Ban className="h-4 w-4" />,
    holiday: <Check className="h-4 w-4" />
  };

  const handleAbsenceTypeChange = (value: AbsenceType) => {
    setAbsenceType(value);
    
    // Automatically adjust hours when type changes
    if (value === 'unpaid' || value === 'holiday') {
      setHoursForDay(0);
    } else if (value === 'work') {
      setHoursForDay(8); // Default full work day
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg border">
      <h3 className="text-lg font-medium mb-4">
        {format(selectedDate, "d 'de' MMMM, yyyy", { locale: es })}
      </h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="absence-type">Tipo de día</Label>
          <Select 
            value={absenceType} 
            onValueChange={(value) => handleAbsenceTypeChange(value as AbsenceType)}
          >
            <SelectTrigger id="absence-type" className="cursor-pointer">
              <SelectValue placeholder="Selecciona el tipo" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(absenceTypeLabels).map(([type, label]) => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center">
                    <div className="mr-2">
                      {absenceTypeIcons[type as AbsenceType]}
                    </div>
                    <span>{label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="hours">Horas</Label>
          <Input 
            id="hours" 
            type="number" 
            min="0" 
            max="24" 
            value={hoursForDay}
            onChange={(e) => setHoursForDay(Number(e.target.value))}
            disabled={absenceType === 'unpaid' || absenceType === 'holiday'}
          />
          {(absenceType === 'unpaid' || absenceType === 'holiday') && (
            <p className="text-xs text-gray-500 mt-1">
              Las horas se establecen automáticamente a 0 para {absenceTypeLabels[absenceType].toLowerCase()}
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="notes">Notas</Label>
          <Input 
            id="notes" 
            placeholder="Añade observaciones si es necesario" 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        
        <Button onClick={saveDayData} className="w-full">
          Guardar
        </Button>
      </div>
    </div>
  );
}
