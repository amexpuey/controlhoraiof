
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
        <TabsList className="inline-flex p-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-xl mb-6 shadow-lg">
          <TabsTrigger 
            value="calculator"
            className={`px-6 py-3 rounded-full transition-all duration-300 ease-in-out relative overflow-hidden ${
              activeTab === 'calculator' 
                ? 'bg-gradient-to-r from-[#57BFAD] to-[#5fd1c3] text-white font-semibold shadow-[0_0_20px_rgba(87,191,173,0.4)] transform scale-105' 
                : 'text-[color:var(--text)] hover:bg-white/12 hover:scale-102 hover:shadow-md'
            }`}
            onClick={() => setActiveTab('calculator')}
          >
            <span className="relative z-10">Calculadora</span>
            {activeTab === 'calculator' && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#57BFAD] to-[#5fd1c3] animate-pulse opacity-20 rounded-full"></div>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="info"
            className={`px-6 py-3 rounded-full transition-all duration-300 ease-in-out relative overflow-hidden ${
              activeTab === 'info' 
                ? 'bg-gradient-to-r from-[#57BFAD] to-[#5fd1c3] text-white font-semibold shadow-[0_0_20px_rgba(87,191,173,0.4)] transform scale-105' 
                : 'text-[color:var(--text)] hover:bg-white/12 hover:scale-102 hover:shadow-md'
            }`}
            onClick={() => setActiveTab('info')}
          >
            <span className="relative z-10">Información legal</span>
            {activeTab === 'info' && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#57BFAD] to-[#5fd1c3] animate-pulse opacity-20 rounded-full"></div>
            )}
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
