
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Calendar } from "lucide-react";
import HoursCalculator from "../HoursCalculator";
import WorkCalendar from "../WorkCalendar";
import { useSearchParams } from "react-router-dom";

interface TimecardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  period: string;
  setPeriod: (period: string) => void;
}

export default function TimecardTabs({ activeTab, setActiveTab, period, setPeriod }: TimecardTabsProps) {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  
  // Update active tab based on URL parameter
  useEffect(() => {
    if (tabFromUrl && (tabFromUrl === "calculator" || tabFromUrl === "calendar")) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl, setActiveTab]);
  
  return (
    <Tabs defaultValue="calculator" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="calculator" className="flex items-center gap-2 py-3">
          <Calculator className="h-5 w-5" />
          <span>Calculadora de Horas</span>
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-2 py-3">
          <Calendar className="h-5 w-5" />
          <span>Calendario Interactivo</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="calculator" className="mt-0">
        <HoursCalculator />
      </TabsContent>
      
      <TabsContent value="calendar" className="mt-0">
        <WorkCalendar />
      </TabsContent>
    </Tabs>
  );
}
