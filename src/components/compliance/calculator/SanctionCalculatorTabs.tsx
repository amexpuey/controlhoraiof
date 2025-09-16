
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
        <TabsList className="grid grid-cols-2 gap-2 p-0 bg-transparent mb-6 h-auto">
          <TabsTrigger 
            value="calculator"
            className={`px-4 py-3 rounded-full transition-all duration-200 ease-[cubic-bezier(.2,.8,.2,1)] text-center border backdrop-blur-[10px] font-semibold ${
              activeTab === 'calculator' 
                ? 'bg-gradient-to-b from-white/22 to-white/12 text-[color:var(--text-strong)] border-white/60 shadow-[0_8px_24px_rgba(0,0,0,0.16),0_0_0_1px_rgba(255,255,255,0.6)_inset]' 
                : 'bg-white/14 text-[color:var(--text)] border-white/55 hover:bg-white/18'
            }`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculadora
          </TabsTrigger>
          <TabsTrigger 
            value="info"
            className={`px-4 py-3 rounded-full transition-all duration-200 ease-[cubic-bezier(.2,.8,.2,1)] text-center border backdrop-blur-[10px] font-semibold ${
              activeTab === 'info' 
                ? 'bg-gradient-to-b from-white/22 to-white/12 text-[color:var(--text-strong)] border-white/60 shadow-[0_8px_24px_rgba(0,0,0,0.16),0_0_0_1px_rgba(255,255,255,0.6)_inset]' 
                : 'bg-white/14 text-[color:var(--text)] border-white/55 hover:bg-white/18'
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
