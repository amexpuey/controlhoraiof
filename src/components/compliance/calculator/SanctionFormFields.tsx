
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Calendar, AlertTriangle } from "lucide-react";
import { CalculatorFormValues } from "./SanctionForm";
import { sanctionTypes, getRiskColor } from "../complianceData";

interface SanctionFormFieldsProps {
  control: Control<CalculatorFormValues>;
}

export function SanctionFormFields({ control }: SanctionFormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="employees"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Número de empleados con riesgo de sanción para la empresa
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min={1}
                placeholder="Ej: 1"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              Duración del incumplimiento (meses)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min={1}
                placeholder="Ej: 2"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="reincidence"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-2 space-y-0 mt-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm font-normal cursor-pointer">
                Aplicar agravante por reincidencia
              </FormLabel>
              <p className="text-xs text-gray-500">
                Se aplica cuando ha habido sanciones previas por infracciones similares
              </p>
            </div>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="infractions"
        render={() => (
          <FormItem>
            <div className="mb-2">
              <FormLabel className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                Tipos de incumplimiento
              </FormLabel>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sanctionTypes.map((item) => (
                <FormField
                  key={item.id}
                  control={control}
                  name="infractions"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          {item.label}
                          <span className={`ml-1 text-xs ${getRiskColor(item.level)}`}>
                            ({item.level})
                          </span>
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
