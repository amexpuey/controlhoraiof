import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { SanctionFormFields } from "./SanctionFormFields";
import { SanctionResults } from "./SanctionResults";
import { 
  sanctionTypes, 
  getCompanySizeMultiplier, 
  getDurationMultiplier 
} from "../complianceData";

export interface CalculatorFormValues {
  employees: number;
  duration: number;
  infractions: string[];
  reincidence: boolean;
}

export interface EstimatedSanctions {
  minEstimate: number;
  maxEstimate: number;
  selectedInfractions: typeof sanctionTypes;
  reincidenceApplied: boolean;
}

export function SanctionForm() {
  const [estimatedSanctions, setEstimatedSanctions] = useState<EstimatedSanctions | null>(null);
  
  const calculatorForm = useForm<CalculatorFormValues>({
    defaultValues: {
      employees: 1,
      duration: 2,
      infractions: ["no_registro"],
      reincidence: false
    }
  });

  const calculateSanctions = (data: CalculatorFormValues) => {
    const { employees, duration, infractions, reincidence } = data;
    
    const companyMultiplier = getCompanySizeMultiplier(employees);
    const durationMultiplier = getDurationMultiplier(duration);
    const reincidenceMultiplier = reincidence ? 1.5 : 1;
    
    const selectedInfractionTypes = sanctionTypes.filter(type => 
      infractions.includes(type.id)
    );
    
    const minEstimate = selectedInfractionTypes.reduce((total, infraction) => {
      return total + (infraction.baseAmount * companyMultiplier * durationMultiplier * reincidenceMultiplier);
    }, 0);
    
    const maxEstimate = selectedInfractionTypes.reduce((total, infraction) => {
      return total + (infraction.maxAmount * companyMultiplier * durationMultiplier * reincidenceMultiplier);
    }, 0);
    
    setEstimatedSanctions({
      minEstimate: Math.round(minEstimate),
      maxEstimate: Math.round(maxEstimate),
      selectedInfractions: selectedInfractionTypes,
      reincidenceApplied: reincidence
    });
  };

  return (
    <>
      <Form {...calculatorForm}>
        <form 
          id="sanction-calculator-form"
          onSubmit={calculatorForm.handleSubmit(calculateSanctions)} 
          className="space-y-6"
        >
          <SanctionFormFields control={calculatorForm.control} />
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-b from-[#3DC6B0] to-[#36AF9A] text-white border border-white/55 rounded-full py-4 px-6 font-bold flex items-center justify-center gap-3 shadow-[0_8px_22px_rgba(54,175,154,0.35)] transition-all duration-200 ease-out hover:transform hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(54,175,154,0.4)] hover:brightness-105 active:transform active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DC6B0]/35"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="3" width="14" height="18" rx="2"></rect>
              <line x1="8" y1="7" x2="16" y2="7"></line>
              <circle cx="9" cy="12" r="1.5"></circle>
              <circle cx="13" cy="12" r="1.5"></circle>
              <circle cx="9" cy="16" r="1.5"></circle>
              <circle cx="13" cy="16" r="1.5"></circle>
            </svg>
            Calcular posibles sanciones
          </button>
        </form>
      </Form>
      
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 p-4">
        <button 
          type="submit"
          form="sanction-calculator-form"
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#57BFAD] to-[#5fd1c3] shadow-[0_10px_30px_rgba(4,43,39,.18)] text-[color:var(--text-strong)] font-semibold flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calcular posibles sanciones
        </button>
      </div>
      
      {estimatedSanctions && (
        <div className="glass card-lg mt-6">
          <h4 className="font-semibold text-xl mb-4" style={{ color: 'var(--text-strong)' }}>
            Estimación de sanciones:
          </h4>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--danger)' }}>
              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(estimatedSanctions.minEstimate)} - {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(estimatedSanctions.maxEstimate)}
            </div>
            <p style={{ color: 'var(--text)' }}>
              Para {calculatorForm.getValues().employees} {calculatorForm.getValues().employees === 1 ? 'empleado' : 'empleados'} con {calculatorForm.getValues().duration} {calculatorForm.getValues().duration === 1 ? 'mes' : 'meses'} de incumplimiento.
            </p>
          </div>
          
          <p className="text-xs italic text-center" style={{ color: 'var(--muted)' }}>
            Esta es una estimación orientativa. Te mostramos cómo arreglarlo paso a paso.
          </p>
        </div>
      )}
    </>
  );
}