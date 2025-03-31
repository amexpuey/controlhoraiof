
import React from "react";
import { Form } from "@/components/ui/form";
import { BasicInfoFields } from "./BasicInfoFields";
import { HolidayManager } from "./HolidayManager";
import { ResultsDisplay } from "./ResultsDisplay";
import { useHoursCalculator } from "./useHoursCalculator";
import { CardContent } from "@/components/ui/card";
import { CalculatorHeader } from "./CalculatorHeader";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

export function HoursCalculatorForm() {
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

  return (
    <>
      <CalculatorHeader />
      <CardContent className="p-6">
        <Form {...form}>
          <form className="space-y-6">
            <BasicInfoFields form={form} />
            
            <HolidayManager
              extraHolidays={extraHolidays}
              holidayName={holidayName}
              setHolidayName={setHolidayName}
              addHoliday={addHoliday}
              removeHoliday={removeHoliday}
            />
            
            <div className="mt-6">
              <Button 
                type="button" 
                onClick={() => calculateTotalHours()}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular horas laborables
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
