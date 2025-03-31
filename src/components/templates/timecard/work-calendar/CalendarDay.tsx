
import React from "react";
import { DayData } from "./types";

interface CalendarDayProps {
  date: Date;
  dayData?: DayData;
  className?: string;
}

export default function CalendarDay({ date, dayData, className }: CalendarDayProps) {
  return (
    <div className={`h-full w-full flex flex-col justify-center items-center ${className}`}>
      <div>{date.getDate()}</div>
      {dayData && (
        <div className="text-xs mt-1 font-medium">
          {dayData.hours}h
        </div>
      )}
    </div>
  );
}
