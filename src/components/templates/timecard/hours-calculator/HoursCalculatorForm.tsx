
import React from "react";
import { Form } from "@/components/ui/form";
import { BasicInfoFields } from "./BasicInfoFields";
import { HolidayManager } from "./HolidayManager";
import { ResultsDisplay } from "./ResultsDisplay";
import { useHoursCalculator } from "./useHoursCalculator";
import { CardContent } from "@/components/ui/card";
import { CalculatorHeader } from "./CalculatorHeader";
import { Button } from "@/components/ui/button";
import { Calculator, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function HoursCalculatorForm() {
  const navigate = useNavigate();
  
  const {
    form,
    extraHolidays,
    holidayName,
    setHolidayName,
    addHoliday,
    removeHoliday,
    totalWorkHours,
    calculateTotalHours,
    isCalculated
  } = useHoursCalculator();

  const openCalendarWithData = () => {
    if (!totalWorkHours) {
      calculateTotalHours();
      toast.warning("Primero debes calcular las horas laborables");
      return;
    }
    
    const formValues = form.getValues();
    
    // Redirigir con parámetros en la URL
    navigate({
      pathname: "/plantillas",
      search: `?tab=calendar&calculatedHours=${totalWorkHours}&workdaysPerWeek=${formValues.workdaysPerWeek}&hoursPerDay=${formValues.hoursPerDay}`
    });

    toast.success("Datos aplicados al calendario correctamente");
  };

  return (
    <>
      <CalculatorHeader />
      <CardContent className="p-6">
        <Form {...form}>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <BasicInfoFields form={form} />
            
            <HolidayManager
              extraHolidays={extraHolidays}
              holidayName={holidayName}
              setHolidayName={setHolidayName}
              addHoliday={addHoliday}
              removeHoliday={removeHoliday}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                type="button" 
                onClick={() => calculateTotalHours()}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular horas laborables
              </Button>
              
              <Button 
                type="button" 
                onClick={openCalendarWithData}
                className={`w-full ${isCalculated ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400'}`}
                disabled={!isCalculated}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Aplicar al calendario
              </Button>
            </div>
          </form>
        </Form>
        
        <ResultsDisplay
          totalWorkHours={totalWorkHours}
          watch={form.watch}
          extraHolidaysCount={extraHolidays.length}
          isCalculated={isCalculated}
        />
      </CardContent>
    </>
  );
}
