
import React from "react";
import { Clock, Calendar } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { HoursCalculatorFormValues } from "./types";

interface BasicInfoFieldsProps {
  form: UseFormReturn<HoursCalculatorFormValues>;
}

export function BasicInfoFields({ form }: BasicInfoFieldsProps) {
  return (
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
              value={field.value.toString()}
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
              value={field.value}
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
  );
}
