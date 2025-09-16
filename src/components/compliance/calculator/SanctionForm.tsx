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
          
          <button type="submit" className="btn btn-primary w-full text-lg font-semibold">
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