
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useWorkCalendar } from "./useWorkCalendar";
import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";
import StatisticsPanel from "./StatisticsPanel";
import SettingsPanel from "./SettingsPanel";
import DayEditPanel from "./DayEditPanel";
import { useSearchParams } from "react-router-dom";

export default function WorkCalendar() {
  const [searchParams] = useSearchParams();
  const calculatedHours = searchParams.get('calculatedHours');
  const workdaysPerWeek = searchParams.get('workdaysPerWeek');
  const hoursPerDay = searchParams.get('hoursPerDay');
  
  const { 
    currentDate,
    selectedDate,
    hoursForDay,
    absenceType,
    notes,
    workingHoursPerWeek,
    monthlyHours,
    targetHours,
    hoursDifference,
    yearlyHoursTarget,
    setHoursForDay,
    setAbsenceType,
    setNotes,
    setWorkingHoursPerWeek,
    goToPreviousMonth,
    goToNextMonth,
    saveDayData,
    getDayData,
    handleDateSelect,
    calculateYearlyHours,
    dayClassName,
    downloadAsCSV,
    initializeCalendarFromCalculation,
    bulkSetWorkDays
  } = useWorkCalendar();
  
  // Use the data from URL params if available
  useEffect(() => {
    if (calculatedHours && workdaysPerWeek && hoursPerDay) {
      initializeCalendarFromCalculation(
        Number(calculatedHours),
        Number(workdaysPerWeek),
        Number(hoursPerDay)
      );
    }
  }, [calculatedHours, workdaysPerWeek, hoursPerDay, initializeCalendarFromCalculation]);
  
  return (
    <Card className="border-2 border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <CardTitle className="text-2xl flex items-center gap-2">
          <CalendarIcon className="h-6 w-6" />
          Calendario de Jornada Laboral
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <CalendarHeader 
              currentDate={currentDate}
              goToPreviousMonth={goToPreviousMonth}
              goToNextMonth={goToNextMonth}
              downloadAsCSV={downloadAsCSV}
            />
            
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
                  DayContent: ({ date }) => (
                    <CalendarDay 
                      date={date} 
                      dayData={getDayData(date)} 
                      className={dayClassName(date)} 
                    />
                  ),
                }}
              />
            </div>
            
            <StatisticsPanel 
              monthlyHours={monthlyHours}
              hoursDifference={hoursDifference}
              yearlyHours={calculateYearlyHours()}
              yearlyHoursTarget={yearlyHoursTarget}
            />
          </div>
          
          <div className="space-y-6">
            <SettingsPanel 
              workingHoursPerWeek={workingHoursPerWeek}
              targetHours={targetHours}
              setWorkingHoursPerWeek={setWorkingHoursPerWeek}
              bulkSetWorkDays={bulkSetWorkDays}
            />
            
            {selectedDate && (
              <DayEditPanel 
                selectedDate={selectedDate}
                absenceType={absenceType}
                hoursForDay={hoursForDay}
                notes={notes}
                setAbsenceType={setAbsenceType}
                setHoursForDay={setHoursForDay}
                setNotes={setNotes}
                saveDayData={saveDayData}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
