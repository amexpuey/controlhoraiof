
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, Users, Calendar, AlertTriangle } from "lucide-react";
import { sanctionTypes, getCompanySizeMultiplier, getDurationMultiplier, getRiskColor } from "./complianceData";

interface CalculatorFormValues {
  employees: number;
  sector: string;
  duration: number;
  infractions: string[];
}

export function SanctionCalculator() {
  const [activeTab, setActiveTab] = useState("calculator");
  const [estimatedSanctions, setEstimatedSanctions] = useState<{
    minEstimate: number;
    maxEstimate: number;
    selectedInfractions: typeof sanctionTypes;
  } | null>(null);
  
  const calculatorForm = useForm<CalculatorFormValues>({
    defaultValues: {
      employees: 5,
      sector: "Hostelería",
      duration: 2,
      infractions: ["no_registro"]
    }
  });

  const calculateSanctions = (data: CalculatorFormValues) => {
    const { employees, duration, infractions } = data;
    
    const companyMultiplier = getCompanySizeMultiplier(employees);
    const durationMultiplier = getDurationMultiplier(duration);
    
    const selectedInfractionTypes = sanctionTypes.filter(type => 
      infractions.includes(type.id)
    );
    
    const minEstimate = selectedInfractionTypes.reduce((total, infraction) => {
      return total + (infraction.baseAmount * companyMultiplier * durationMultiplier);
    }, 0);
    
    const maxEstimate = selectedInfractionTypes.reduce((total, infraction) => {
      return total + (infraction.maxAmount * companyMultiplier * durationMultiplier);
    }, 0);
    
    setEstimatedSanctions({
      minEstimate: Math.round(minEstimate),
      maxEstimate: Math.round(maxEstimate),
      selectedInfractions: selectedInfractionTypes
    });
  };

  return (
    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-800">Calculadora de sanciones</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Calcula una estimación de las posibles sanciones según el tamaño de tu empresa y tipo de incumplimiento.
      </p>
      
      <Tabs defaultValue="calculator" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="pt-4">
          <Form {...calculatorForm}>
            <form 
              onSubmit={calculatorForm.handleSubmit(calculateSanctions)} 
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={calculatorForm.control}
                  name="employees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        Número de empleados
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="Ej: 5"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={calculatorForm.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        Sector de la empresa
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Hostelería" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={calculatorForm.control}
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
                control={calculatorForm.control}
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
                          control={calculatorForm.control}
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
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Calcular posibles sanciones
              </Button>
            </form>
          </Form>
          
          {estimatedSanctions && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-3">Estimación de sanciones:</h4>
              <p className="text-lg font-bold text-blue-900 mb-3">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(estimatedSanctions.minEstimate)} - {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(estimatedSanctions.maxEstimate)}
              </p>
              <p className="text-sm text-blue-700 mb-4">
                Para {calculatorForm.getValues().employees} empleados con {calculatorForm.getValues().duration} {calculatorForm.getValues().duration === 1 ? 'mes' : 'meses'} de incumplimiento.
              </p>
              
              <div className="space-y-2">
                <p className="text-xs text-blue-800 font-medium">Infracciones incluidas:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {estimatedSanctions.selectedInfractions.map((infraction, index) => (
                    <li key={index} className="text-xs">
                      <span className={`font-medium ${getRiskColor(infraction.level)}`}>{infraction.label}</span>
                      <span className="text-gray-600"> - Sanción base: {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(infraction.baseAmount)} - {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(infraction.maxAmount)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
