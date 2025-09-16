
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SanctionForm } from "./SanctionForm";
import { SanctionInfoContent } from "./SanctionInfoContent";
import { Calculator } from "lucide-react";

export function SanctionCalculatorTabs() {
  const [activeTab, setActiveTab] = useState("calculator");
  
  return (
    <div className="calculator">
      <div className="flex items-center gap-3 mb-4">
        <div className="icon">
          <Calculator className="h-5 w-5" style={{ color: 'var(--brand)' }} />
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
        <div className="tabbar">
          <div 
            className={`tab ${activeTab === 'calculator' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculadora
          </div>
          <div 
            className={`tab ${activeTab === 'info' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Información legal
          </div>
        </div>
        
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
