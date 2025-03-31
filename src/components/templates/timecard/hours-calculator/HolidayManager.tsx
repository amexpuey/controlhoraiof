
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Minus } from "lucide-react";
import { Holiday } from "./types";

interface HolidayManagerProps {
  extraHolidays: Holiday[];
  holidayName: string;
  setHolidayName: (name: string) => void;
  addHoliday: () => void;
  removeHoliday: (id: number) => void;
}

export function HolidayManager({ 
  extraHolidays, 
  holidayName, 
  setHolidayName, 
  addHoliday, 
  removeHoliday 
}: HolidayManagerProps) {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-blue-600" />
        Festivos extras (opcionales)
      </Label>
      
      <div className="flex gap-2">
        <Input
          placeholder="Nombre del festivo"
          value={holidayName}
          onChange={(e) => setHolidayName(e.target.value)}
          className="flex-grow"
        />
        <Button 
          type="button" 
          variant="outline" 
          className="flex-shrink-0"
          onClick={addHoliday}
        >
          <Plus className="h-4 w-4" />
          Añadir
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {extraHolidays.map(holiday => (
          <Badge key={holiday.id} className="flex items-center gap-1 py-1 px-3 bg-blue-100 text-blue-800 hover:bg-blue-200">
            {holiday.name}
            <Button 
              type="button" 
              variant="ghost" 
              className="h-5 w-5 p-0 ml-1" 
              onClick={() => removeHoliday(holiday.id)}
            >
              <Minus className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        {extraHolidays.length === 0 && (
          <p className="text-sm text-gray-500 italic">No has añadido ningún festivo extra.</p>
        )}
      </div>
    </div>
  );
}
