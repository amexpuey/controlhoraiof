
import React from "react";
import { Form } from "@/components/ui/form";
import { BasicInfoFields } from "./BasicInfoFields";
import { HolidayManager } from "./HolidayManager";
import { ResultsDisplay } from "./ResultsDisplay";
import { useHoursCalculator } from "./useHoursCalculator";
import { CardContent } from "@/components/ui/card";
import { CalculatorHeader } from "./CalculatorHeader";

export function HoursCalculatorForm() {
  const {
    form,
    extraHolidays,
    holidayName,
    setHolidayName,
    addHoliday,
    removeHoliday,
    totalWorkHours
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
          </form>
        </Form>
        
        <ResultsDisplay
          totalWorkHours={totalWorkHours}
          watch={form.watch}
          extraHolidaysCount={extraHolidays.length}
        />
      </CardContent>
    </>
  );
}
