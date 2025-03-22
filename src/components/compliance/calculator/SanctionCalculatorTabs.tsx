
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SanctionForm } from "./SanctionForm";
import { SanctionInfoContent } from "./SanctionInfoContent";
import { Calculator } from "lucide-react";

export function SanctionCalculatorTabs() {
  const [activeTab, setActiveTab] = useState("calculator");
  
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
          <TabsTrigger value="info">Información legal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="pt-4">
          <SanctionForm />
        </TabsContent>
        
        <TabsContent value="info" className="pt-4">
          <SanctionInfoContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
