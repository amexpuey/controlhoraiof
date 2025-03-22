
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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
          onSubmit={calculatorForm.handleSubmit(calculateSanctions)} 
          className="space-y-4"
        >
          <SanctionFormFields control={calculatorForm.control} />
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Calcular posibles sanciones
          </Button>
        </form>
      </Form>
      
      {estimatedSanctions && (
        <SanctionResults 
          estimatedSanctions={estimatedSanctions} 
          formValues={calculatorForm.getValues()} 
        />
      )}
    </>
  );
}
