
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
            <FormLabel className="flex items-center gap-3 text-[color:var(--text-strong)] font-medium mb-2">
              <div className="p-2 rounded-full bg-white/14 border border-white/55">
                <Users className="h-4 w-4 text-[#36AF9A]" />
              </div>
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
            <FormLabel className="flex items-center gap-3 text-[color:var(--text-strong)] font-medium mb-2">
              <div className="p-2 rounded-full bg-white/14 border border-white/55">
                <Calendar className="h-4 w-4 text-[#36AF9A]" />
              </div>
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
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-2xl bg-white/10 border border-white/30 backdrop-blur-[10px]">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm font-medium cursor-pointer text-[color:var(--text-strong)]">
                Aplicar agravante por reincidencia
              </FormLabel>
              <p className="text-xs text-[color:var(--muted)] leading-relaxed">
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
            <div className="mb-4">
              <FormLabel className="flex items-center gap-3 text-[color:var(--text-strong)] font-medium mb-3">
                <div className="p-2 rounded-full bg-white/14 border border-white/55">
                  <AlertTriangle className="h-4 w-4 text-[#F4B957]" />
                </div>
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
                        className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-2xl bg-white/10 border border-white/30 backdrop-blur-[10px] hover:bg-white/14 transition-colors duration-200"
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
                        <FormLabel className="text-sm font-medium cursor-pointer text-[color:var(--text-strong)] leading-relaxed">
                          {item.label}
                          <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${
                            item.level === 'leve' ? 'bg-[#F4B957]/20 text-[#F4B957]' :
                            item.level === 'grave' ? 'bg-orange-500/20 text-orange-500' :
                            'bg-red-500/20 text-red-500'
                          }`}>
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
