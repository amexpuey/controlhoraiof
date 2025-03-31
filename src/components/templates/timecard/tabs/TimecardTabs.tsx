
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Calendar, Calculator } from "lucide-react";
import DownloadSection from "../download/DownloadSection";
import HoursCalculator from "../HoursCalculator";
import WorkCalendar from "../WorkCalendar";

interface TimecardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  period: string;
  setPeriod: (period: string) => void;
}

export default function TimecardTabs({ activeTab, setActiveTab, period, setPeriod }: TimecardTabsProps) {
  return (
    <Tabs defaultValue="download" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="download" className="flex items-center gap-2 py-3">
          <Download className="h-5 w-5" />
          <span>Descargar Plantilla</span>
        </TabsTrigger>
        <TabsTrigger value="calculator" className="flex items-center gap-2 py-3">
          <Calculator className="h-5 w-5" />
          <span>Calculadora de Horas</span>
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-2 py-3">
          <Calendar className="h-5 w-5" />
          <span>Calendario Interactivo</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="download" className="mt-0">
        <DownloadSection period={period} setPeriod={setPeriod} />
      </TabsContent>
      
      <TabsContent value="calculator" className="mt-0">
        <HoursCalculator />
      </TabsContent>
      
      <TabsContent value="calendar" className="mt-0">
        <WorkCalendar />
      </TabsContent>
    </Tabs>
  );
}
