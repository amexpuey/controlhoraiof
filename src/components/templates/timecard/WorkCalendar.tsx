
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { format, getDaysInMonth, getMonth, getYear, addMonths, subMonths, isWeekend } from "date-fns";
import { es } from "date-fns/locale";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  PieChart, 
  Clock,
  FileText,
  MoreHorizontal,
  Check,
  Briefcase,
  Home,
  Ban,
  Heart
} from "lucide-react";
import { toast } from "sonner";

// Tipos de ausencia
type AbsenceType = 
  | "work" 
  | "vacation" 
  | "sick" 
  | "personal" 
  | "unpaid" 
  | "holiday";

interface DayData {
  date: Date;
  hours: number;
  absenceType: AbsenceType;
  notes: string;
}

interface MonthData {
  [key: string]: DayData;
}

interface YearData {
  [key: string]: MonthData;
}

const absenceTypeLabels: Record<AbsenceType, string> = {
  work: "Trabajo",
  vacation: "Vacaciones",
  sick: "Baja por enfermedad",
  personal: "Ausencia justificada",
  unpaid: "Ausencia no remunerada",
  holiday: "Festivo"
};

const absenceTypeColors: Record<AbsenceType, string> = {
  work: "bg-blue-100 text-blue-800",
  vacation: "bg-green-100 text-green-800",
  sick: "bg-red-100 text-red-800",
  personal: "bg-yellow-100 text-yellow-800",
  unpaid: "bg-gray-100 text-gray-800",
  holiday: "bg-purple-100 text-purple-800"
};

const absenceTypeIcons: Record<AbsenceType, React.ReactNode> = {
  work: <Briefcase className="h-4 w-4" />,
  vacation: <Home className="h-4 w-4" />,
  sick: <Heart className="h-4 w-4" />,
  personal: <Clock className="h-4 w-4" />,
  unpaid: <Ban className="h-4 w-4" />,
  holiday: <Check className="h-4 w-4" />
};

export default function WorkCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [yearData, setYearData] = useState<YearData>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [hoursForDay, setHoursForDay] = useState<number>(8);
  const [absenceType, setAbsenceType] = useState<AbsenceType>("work");
  const [notes, setNotes] = useState<string>("");
  const [workingHoursPerWeek, setWorkingHoursPerWeek] = useState<number>(40);
  
  const currentMonth = getMonth(currentDate);
  const currentYear = getYear(currentDate);
  
  // Inicializar los datos del mes actual si no existen
  useEffect(() => {
    const monthKey = `${currentYear}-${currentMonth + 1}`;
    
    if (!yearData[monthKey]) {
      const newYearData = { ...yearData };
      newYearData[monthKey] = {};
      setYearData(newYearData);
    }
  }, [currentDate, yearData]);
  
  // Navegar al mes anterior
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  // Navegar al mes siguiente
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  // Guardar los datos del día seleccionado
  const saveDayData = () => {
    if (!selectedDate) return;
    
    const monthKey = `${getYear(selectedDate)}-${getMonth(selectedDate) + 1}`;
    const dayKey = format(selectedDate, "yyyy-MM-dd");
    
    const newYearData = { ...yearData };
    if (!newYearData[monthKey]) {
      newYearData[monthKey] = {};
    }
    
    newYearData[monthKey][dayKey] = {
      date: selectedDate,
      hours: hoursForDay,
      absenceType: absenceType,
      notes: notes
    };
    
    setYearData(newYearData);
    toast.success(`Datos guardados para ${format(selectedDate, "d 'de' MMMM", { locale: es })}`);
  };
  
  // Obtener los datos para un día específico
  const getDayData = (date: Date): DayData | undefined => {
    const monthKey = `${getYear(date)}-${getMonth(date) + 1}`;
    const dayKey = format(date, "yyyy-MM-dd");
    
    return yearData[monthKey]?.[dayKey];
  };
  
  // Preparar los datos para un día cuando se selecciona
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    const dayData = getDayData(date);
    if (dayData) {
      setHoursForDay(dayData.hours);
      setAbsenceType(dayData.absenceType);
      setNotes(dayData.notes);
    } else {
      setHoursForDay(isWeekend(date) ? 0 : 8);
      setAbsenceType(isWeekend(date) ? "holiday" : "work");
      setNotes("");
    }
  };
  
  // Calcular las horas totales del mes
  const calculateMonthlyHours = (): number => {
    const monthKey = `${currentYear}-${currentMonth + 1}`;
    const monthData = yearData[monthKey];
    
    if (!monthData) return 0;
    
    return Object.values(monthData).reduce((total, day) => {
      return total + (day.absenceType === "unpaid" ? 0 : day.hours);
    }, 0);
  };
  
  // Calcular las horas anuales hasta la fecha
  const calculateYearlyHours = (): number => {
    return Object.values(yearData).reduce((total, monthData) => {
      return total + Object.values(monthData).reduce((monthTotal, day) => {
        return monthTotal + (day.absenceType === "unpaid" ? 0 : day.hours);
      }, 0);
    }, 0);
  };
  
  // Colorear los días en el calendario según su tipo
  const dayClassName = (date: Date): string => {
    const dayData = getDayData(date);
    if (!dayData) return isWeekend(date) ? "bg-gray-50" : "";
    
    return absenceTypeColors[dayData.absenceType];
  };
  
  // Descargar los datos como CSV
  const downloadAsCSV = () => {
    let csvContent = "Fecha,Horas,Tipo,Notas\n";
    
    Object.values(yearData).forEach(monthData => {
      Object.values(monthData).forEach(day => {
        csvContent += `${format(day.date, "yyyy-MM-dd")},${day.hours},${absenceTypeLabels[day.absenceType]},"${day.notes}"\n`;
      });
    });
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `registro_horas_${currentYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Registro de horas descargado correctamente");
  };
  
  // Calcular las horas objetivo para el mes (en función de jornada de 37.5 o 40 horas)
  const calculateTargetHours = (): number => {
    const daysInMonth = getDaysInMonth(currentDate);
    let workDays = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      if (!isWeekend(date)) {
        workDays++;
      }
    }
    
    // Horas por día en función de la jornada semanal
    const hoursPerDay = workingHoursPerWeek / 5;
    return Math.round(workDays * hoursPerDay);
  };
  
  const monthlyHours = calculateMonthlyHours();
  const targetHours = calculateTargetHours();
  const hoursDifference = monthlyHours - targetHours;
  
  return (
    <Card className="border-2 border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-600 text-white flex flex-row justify-between items-center">
        <CardTitle className="text-2xl flex items-center gap-2">
          <CalendarIcon className="h-6 w-6" />
          Calendario de Jornada Laboral
        </CardTitle>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white text-blue-800 hover:bg-blue-50">
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
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <h2 className="text-xl font-semibold">
                {format(currentDate, "MMMM yyyy", { locale: es })}
              </h2>
              
              <Button variant="outline" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                month={currentDate}
                className="rounded-md border"
                modifiers={{
                  booked: (date) => getDayData(date)?.absenceType !== "work" && getDayData(date)?.absenceType !== undefined,
                }}
                modifiersClassNames={{
                  booked: "font-bold",
                }}
                components={{
                  DayContent: ({ date }) => {
                    const dayData = getDayData(date);
                    return (
                      <div className={`h-full w-full flex flex-col justify-center items-center ${dayClassName(date)}`}>
                        <div>{date.getDate()}</div>
                        {dayData && (
                          <div className="text-xs mt-1 font-medium">
                            {dayData.hours}h
                          </div>
                        )}
                      </div>
                    );
                  },
                }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-sm text-blue-600 mb-1">Este mes:</div>
                <div className="text-xl font-bold text-blue-800">{monthlyHours} horas</div>
                <div className={`text-sm ${hoursDifference > 0 ? 'text-green-600' : hoursDifference < 0 ? 'text-red-600' : 'text-blue-600'} mt-1`}>
                  {hoursDifference > 0 ? `+${hoursDifference} horas extra` : 
                   hoursDifference < 0 ? `${hoursDifference} horas pendientes` : 'Horas completas'}
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-sm text-blue-600 mb-1">Total anual:</div>
                <div className="text-xl font-bold text-blue-800">{calculateYearlyHours()} horas</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
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
            
            {selectedDate && (
              <div className="p-4 bg-white rounded-lg border">
                <h3 className="text-lg font-medium mb-4">
                  {format(selectedDate, "d 'de' MMMM, yyyy", { locale: es })}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="absence-type">Tipo de día</Label>
                    <Select 
                      value={absenceType} 
                      onValueChange={(value) => setAbsenceType(value as AbsenceType)}
                    >
                      <SelectTrigger id="absence-type">
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
                    />
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
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
