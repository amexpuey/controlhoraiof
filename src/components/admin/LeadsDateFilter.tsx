import { useState } from "react";
import { format, startOfDay, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

interface LeadsDateFilterProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

const presets = [
  { label: "Todos", value: "all" },
  { label: "Hoy", value: "today" },
  { label: "Últimos 7 días", value: "7d" },
  { label: "Últimos 30 días", value: "30d" },
  { label: "Últimos 90 días", value: "90d" },
  { label: "Rango personalizado", value: "custom" },
];

export function LeadsDateFilter({ dateRange, onDateRangeChange }: LeadsDateFilterProps) {
  const [preset, setPreset] = useState("all");
  const [showCustom, setShowCustom] = useState(false);

  const handlePresetChange = (value: string) => {
    setPreset(value);
    const today = startOfDay(new Date());

    switch (value) {
      case "all":
        setShowCustom(false);
        onDateRangeChange({ from: undefined, to: undefined });
        break;
      case "today":
        setShowCustom(false);
        onDateRangeChange({ from: today, to: new Date() });
        break;
      case "7d":
        setShowCustom(false);
        onDateRangeChange({ from: subDays(today, 7), to: new Date() });
        break;
      case "30d":
        setShowCustom(false);
        onDateRangeChange({ from: subDays(today, 30), to: new Date() });
        break;
      case "90d":
        setShowCustom(false);
        onDateRangeChange({ from: subDays(today, 90), to: new Date() });
        break;
      case "custom":
        setShowCustom(true);
        break;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Select value={preset} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[200px]">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          {presets.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showCustom && (
        <div className="flex gap-2 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[150px] justify-start text-left font-normal",
                  !dateRange.from && "text-muted-foreground"
                )}
              >
                {dateRange.from
                  ? format(dateRange.from, "dd MMM yyyy", { locale: es })
                  : "Desde"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.from}
                onSelect={(date) =>
                  onDateRangeChange({ ...dateRange, from: date })
                }
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          <span className="text-muted-foreground">→</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[150px] justify-start text-left font-normal",
                  !dateRange.to && "text-muted-foreground"
                )}
              >
                {dateRange.to
                  ? format(dateRange.to, "dd MMM yyyy", { locale: es })
                  : "Hasta"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.to}
                onSelect={(date) =>
                  onDateRangeChange({ ...dateRange, to: date })
                }
                disabled={(date) =>
                  dateRange.from ? date < dateRange.from : false
                }
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
