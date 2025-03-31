
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AbsenceType, absenceTypeColors, absenceTypeLabels } from "./types";
import { Briefcase, Home, Heart, Clock, Ban, Check } from "lucide-react";

interface SettingsPanelProps {
  workingHoursPerWeek: number;
  targetHours: number;
  setWorkingHoursPerWeek: (value: number) => void;
}

export default function SettingsPanel({ 
  workingHoursPerWeek, 
  targetHours, 
  setWorkingHoursPerWeek 
}: SettingsPanelProps) {
  // Define absence type icons directly here to avoid circular imports
  const absenceTypeIcons: Record<AbsenceType, React.ReactNode> = {
    work: <Briefcase className="h-4 w-4" />,
    vacation: <Home className="h-4 w-4" />,
    sick: <Heart className="h-4 w-4" />,
    personal: <Clock className="h-4 w-4" />,
    unpaid: <Ban className="h-4 w-4" />,
    holiday: <Check className="h-4 w-4" />
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <h3 className="text-lg font-medium mb-4">Ajustes de jornada</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="workingHoursPerWeek">Horas semanales</Label>
          <Select 
            value={workingHoursPerWeek.toString()} 
            onValueChange={(value) => setWorkingHoursPerWeek(Number(value))}
          >
            <SelectTrigger id="workingHoursPerWeek">
              <SelectValue placeholder="Selecciona horas semanales" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="40">40 horas (estándar)</SelectItem>
              <SelectItem value="37.5">37,5 horas (nueva regulación)</SelectItem>
              <SelectItem value="30">30 horas (jornada reducida)</SelectItem>
              <SelectItem value="20">20 horas (media jornada)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">
            Objetivo mensual: {targetHours} horas
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
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
