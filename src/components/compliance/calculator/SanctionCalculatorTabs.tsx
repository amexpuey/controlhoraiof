
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SanctionForm } from "./SanctionForm";
import { SanctionInfoContent } from "./SanctionInfoContent";
import { Calculator } from "lucide-react";

export function SanctionCalculatorTabs() {
  const [activeTab, setActiveTab] = useState("calculator");
  
  return (
    <div className="glass card-lg mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--g-brand)' }}
        >
          <Calculator className="h-5 w-5" style={{ color: 'var(--ink-900)' }} />
        </div>
        <div>
          <h3 className="text-xl font-semibold" style={{ color: 'var(--ink-900)' }}>
            Calculadora de sanciones
          </h3>
          <p className="text-sm" style={{ color: 'var(--ink-700)' }}>
            Selecciona los incumplimientos que aplican para estimar el rango de sanción
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="calculator" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="glass grid w-full grid-cols-2 p-1 mb-6">
          <TabsTrigger value="calculator" className="glass-dark">Calculadora</TabsTrigger>
          <TabsTrigger value="info" className="glass-dark">Información legal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="pt-0">
          <SanctionForm />
        </TabsContent>
        
        <TabsContent value="info" className="pt-0">
          <SanctionInfoContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
