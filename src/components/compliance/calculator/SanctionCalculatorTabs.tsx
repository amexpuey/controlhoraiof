
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
          <h3 className="text-xl font-semibold" style={{ color: 'var(--text-strong)' }}>
            Calculadora de sanciones
          </h3>
          <p className="text-sm" style={{ color: 'var(--text)' }}>
            Selecciona los incumplimientos que aplican para estimar el rango de sanción
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="calculator" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="inline-flex p-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-xl mb-6">
          <TabsTrigger 
            value="calculator"
            className={`px-4 py-2 rounded-full transition-all ${
              activeTab === 'calculator' 
                ? 'bg-white/16 border border-white/30 text-[color:var(--text-strong)] font-semibold' 
                : 'text-[color:var(--text)] hover:bg-white/12'
            }`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculadora
          </TabsTrigger>
          <TabsTrigger 
            value="info"
            className={`px-4 py-2 rounded-full transition-all ${
              activeTab === 'info' 
                ? 'bg-white/16 border border-white/30 text-[color:var(--text-strong)] font-semibold' 
                : 'text-[color:var(--text)] hover:bg-white/12'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Información legal
          </TabsTrigger>
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
