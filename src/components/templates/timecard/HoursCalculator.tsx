
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Clock, Calendar, Plus, Minus, Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HoursCalculatorFormValues {
  regularHours: number;
  vacationDays: number;
  vacationType: "business" | "natural";
  extraHolidays: number;
  workdaysPerWeek: number;
  hoursPerDay: number;
}

export default function HoursCalculator() {
  const [extraHolidays, setExtraHolidays] = useState<{id: number; name: string}[]>([]);
  const [nextHolidayId, setNextHolidayId] = useState(1);
  const [totalWorkHours, setTotalWorkHours] = useState<number | null>(null);
  const [holidayName, setHolidayName] = useState("");

  const form = useForm<HoursCalculatorFormValues>({
    defaultValues: {
      regularHours: 1782, // Valor por defecto para España
      vacationDays: 22,    // Valor estándar en España
      vacationType: "business",
      extraHolidays: 0,
      workdaysPerWeek: 5,
      hoursPerDay: 8
    }
  });

  const addHoliday = () => {
    if (holidayName.trim()) {
      setExtraHolidays([...extraHolidays, { id: nextHolidayId, name: holidayName }]);
      setNextHolidayId(nextHolidayId + 1);
      setHolidayName("");
      
      // Actualizar el formulario con el número actualizado de festivos extras
      form.setValue("extraHolidays", extraHolidays.length + 1);
    }
  };

  const removeHoliday = (id: number) => {
    const updatedHolidays = extraHolidays.filter(holiday => holiday.id !== id);
    setExtraHolidays(updatedHolidays);
    
    // Actualizar el formulario con el número actualizado de festivos extras
    form.setValue("extraHolidays", updatedHolidays.length);
  };

  const calculateTotalHours = (data: HoursCalculatorFormValues) => {
    let totalWorkingDays = 0;
    
    // Días laborables según los días de trabajo por semana
    const workdaysPerYear = data.workdaysPerWeek * 52;
    
    // Restar vacaciones según el tipo
    if (data.vacationType === "business") {
      // Si son días laborables, se restan directamente
      totalWorkingDays = workdaysPerYear - data.vacationDays;
    } else {
      // Si son días naturales, calcular cuántos días laborables equivalen
      const businessDayRatio = data.workdaysPerWeek / 7;
      totalWorkingDays = workdaysPerYear - (data.vacationDays * businessDayRatio);
    }
    
    // Restar días festivos extras (asumiendo que todos caen en días laborables)
    totalWorkingDays -= extraHolidays.length;
    
    // Calcular horas totales
    const calculatedTotalHours = totalWorkingDays * data.hoursPerDay;
    
    setTotalWorkHours(Math.round(calculatedTotalHours));
  };

  // Recalcular cuando cambien los valores
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value) {
        calculateTotalHours(value as HoursCalculatorFormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, extraHolidays]);

  return (
    <Card className="border-2 border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Calculator className="h-6 w-6" />
          Calculadora de Horas Anuales
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="regularHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      Horas regulares anuales
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Ej: 1782" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Estándar en España: 1782 horas
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hoursPerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      Horas por día
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Ej: 8" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="workdaysPerWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Días laborables por semana
                    </FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona los días" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5 días (L-V)</SelectItem>
                        <SelectItem value="6">6 días (L-S)</SelectItem>
                        <SelectItem value="7">7 días (L-D)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vacationDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Días de vacaciones anuales
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Ej: 22" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vacationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Tipo de días de vacaciones
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="business">Días hábiles</SelectItem>
                        <SelectItem value="natural">Días naturales</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Hábiles: solo días laborables. Naturales: todos los días.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            
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
          </form>
        </Form>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-bold text-blue-800 mb-3">Resultado del cálculo:</h3>
          
          {totalWorkHours !== null ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-700">Total horas laborables estimadas:</span>
                <span className="text-2xl font-bold text-blue-900">{totalWorkHours} horas</span>
              </div>
              
              <div className="text-sm text-gray-600 mt-4 pt-4 border-t border-blue-100">
                <p>Este cálculo considera:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>{form.watch("workdaysPerWeek")} días laborables por semana</li>
                  <li>{form.watch("vacationDays")} días de vacaciones ({form.watch("vacationType") === "business" ? "hábiles" : "naturales"})</li>
                  <li>{extraHolidays.length} festivos extras añadidos manualmente</li>
                  <li>{form.watch("hoursPerDay")} horas por día laboral</li>
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic">Introduce los datos para calcular las horas totales.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
