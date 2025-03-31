
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AbsenceType, absenceTypeColors, absenceTypeLabels } from "./types";
import { Briefcase, Home, Heart, Clock, Ban, Check, CalendarDays } from "lucide-react";
import { toast } from "sonner";

interface SettingsPanelProps {
  workingHoursPerWeek: number;
  targetHours: number;
  setWorkingHoursPerWeek: (value: number) => void;
  bulkSetWorkDays: () => void;
}

export default function SettingsPanel({ 
  workingHoursPerWeek, 
  targetHours, 
  setWorkingHoursPerWeek,
  bulkSetWorkDays
}: SettingsPanelProps) {
  const [customHours, setCustomHours] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>(workingHoursPerWeek.toString());
  
  // Define absence type icons directly here to avoid circular imports
  const absenceTypeIcons: Record<AbsenceType, React.ReactNode> = {
    work: <Briefcase className="h-4 w-4" />,
    vacation: <Home className="h-4 w-4" />,
    sick: <Heart className="h-4 w-4" />,
    personal: <Clock className="h-4 w-4" />,
    unpaid: <Ban className="h-4 w-4" />,
    holiday: <Check className="h-4 w-4" />
  };

  // Update selected option when workingHoursPerWeek changes
  useEffect(() => {
    const standardOptions = ["40", "37.5", "30", "20"];
    if (standardOptions.includes(workingHoursPerWeek.toString())) {
      setSelectedOption(workingHoursPerWeek.toString());
    } else {
      setSelectedOption("custom");
      setCustomHours(workingHoursPerWeek.toString());
    }
  }, [workingHoursPerWeek]);

  const handleHoursChange = (value: string) => {
    setSelectedOption(value);
    
    if (value === "custom") {
      // If custom is selected, don't update working hours yet
      // It will be updated when the input field is used
    } else {
      setWorkingHoursPerWeek(Number(value));
      toast.success(`Horas semanales ajustadas a ${value}`);
    }
  };

  const handleCustomHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomHours(value);
    
    // Only update if it's a valid number
    if (value && !isNaN(Number(value))) {
      setWorkingHoursPerWeek(Number(value));
    }
  };

  const handleBulkSetWorkDays = () => {
    bulkSetWorkDays();
    toast.success("Días laborables rellenos automáticamente");
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <h3 className="text-lg font-medium mb-4">Ajustes de jornada</h3>
      <div className="space-y-4">
        <div className="relative">
          <Label htmlFor="workingHoursPerWeek">Horas semanales</Label>
          <Select 
            value={selectedOption} 
            onValueChange={handleHoursChange}
            defaultOpen={false}
          >
            <SelectTrigger id="workingHoursPerWeek" className="cursor-pointer relative z-20 bg-white">
              <SelectValue placeholder="Selecciona horas semanales" />
            </SelectTrigger>
            <SelectContent 
              className="bg-white shadow-lg z-50" 
              sideOffset={5} 
              position="popper" 
              align="start"
            >
              <SelectItem value="40" className="cursor-pointer">40 horas (estándar)</SelectItem>
              <SelectItem value="37.5" className="cursor-pointer">37,5 horas (nueva regulación)</SelectItem>
              <SelectItem value="30" className="cursor-pointer">30 horas (jornada reducida)</SelectItem>
              <SelectItem value="20" className="cursor-pointer">20 horas (media jornada)</SelectItem>
              <SelectItem value="custom" className="cursor-pointer">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          
          {selectedOption === "custom" && (
            <div className="mt-2">
              <Input
                type="number"
                placeholder="Introduce horas semanales"
                value={customHours}
                onChange={handleCustomHoursChange}
                min="1"
                max="60"
                step="0.5"
                className="mt-1"
              />
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-1">
            Objetivo mensual: {targetHours} horas
          </p>
        </div>
        
        <Button 
          type="button" 
          variant="default" 
          className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
          onClick={handleBulkSetWorkDays}
        >
          <CalendarDays className="h-4 w-4" />
          Auto-rellenar días laborables
        </Button>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          {Object.entries(absenceTypeLabels).map(([type, label]) => (
            <div 
              key={type} 
              className={`flex items-center p-2 rounded-md ${absenceTypeColors[type as AbsenceType]}`}
            >
              <div className="mr-2">
                {absenceTypeIcons[type as AbsenceType]}
              </div>
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
