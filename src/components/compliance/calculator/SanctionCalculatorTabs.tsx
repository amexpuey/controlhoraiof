
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StepByStepCalculator } from "./StepByStepCalculator";
import { StepByStepLegalInfo } from "./StepByStepLegalInfo";
import { EstimatedSanctions } from "./SanctionForm";
import { Calculator } from "lucide-react";

interface SanctionCalculatorTabsProps {
  onResultCalculated?: (result: EstimatedSanctions) => void;
}

export function SanctionCalculatorTabs({ onResultCalculated }: SanctionCalculatorTabsProps = {}) {
  const [activeTab, setActiveTab] = useState("calculator");
  
  return (
    <div className="calculator">
      <Tabs defaultValue="calculator" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 gap-2 p-0 bg-transparent mb-6 h-auto">
          <TabsTrigger 
            value="calculator"
            className={`px-4 py-3 rounded-full transition-all duration-200 text-center border font-semibold ${
              activeTab === 'calculator' 
                ? 'bg-white text-[var(--text)] border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]' 
                : 'bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--green-bg)]'
            }`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculadora
          </TabsTrigger>
          <TabsTrigger 
            value="info"
            className={`px-4 py-3 rounded-full transition-all duration-200 text-center border font-semibold ${
              activeTab === 'info' 
                ? 'bg-white text-[var(--text)] border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]' 
                : 'bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--green-bg)]'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Información legal
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="pt-0">
          <StepByStepCalculator onResultCalculated={onResultCalculated} />
        </TabsContent>
        
        <TabsContent value="info" className="pt-0">
          <StepByStepLegalInfo />
        </TabsContent>
      </Tabs>
    </div>
  );
}
