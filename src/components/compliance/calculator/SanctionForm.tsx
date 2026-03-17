import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Calculator } from "lucide-react";
import { SanctionFormFields } from "./SanctionFormFields";
import { SanctionResults } from "./SanctionResults";
import { sanctionTypes } from "../complianceData";

export interface CalculatorFormValues {
  workCenters: number;
  employees: number;
  monthsWithoutRecord: number;
  infractions: string[];
  reincidence: boolean;
}

export interface ITSSSanction {
  label: string;
  level: string;
  minPerCenter: number;
  maxPerCenter: number;
  totalMin: number;
  totalMax: number;
}

export interface EstimatedSanctions {
  // Section A: ITSS administrative
  itssMin: number;
  itssMax: number;
  itssSanctions: ITSSSanction[];
  workCenters: number;
  // Section B: Judicial risk
  judicialMin: number;
  judicialMax: number;
  employeesAffected: number;
  monthsWithoutRecord: number;
  // Combined
  totalMin: number;
  totalMax: number;
  reincidenceApplied: boolean;
}

interface SanctionFormProps {
  onResultCalculated?: (result: EstimatedSanctions) => void;
}

const JUDICIAL_MIN_PER_WORKER = 6000;
const JUDICIAL_MAX_PER_WORKER = 18000;

export function SanctionForm({ onResultCalculated }: SanctionFormProps) {
  const [estimatedSanctions, setEstimatedSanctions] = useState<EstimatedSanctions | null>(null);
  
  const calculatorForm = useForm<CalculatorFormValues>({
    defaultValues: {
      workCenters: 1,
      employees: 10,
      monthsWithoutRecord: 6,
      infractions: ["no_registro"],
      reincidence: false
    }
  });

  const calculateSanctions = (data: CalculatorFormValues) => {
    const { workCenters, employees, monthsWithoutRecord, infractions, reincidence } = data;
    
    const reincidenceMultiplier = reincidence ? 1.5 : 1;
    
    const selectedInfractionTypes = sanctionTypes.filter(type => 
      infractions.includes(type.id)
    );
    
    // Section A: ITSS administrative sanctions
    // Leve/Grave → per work center; Muy grave → per worker affected
    const itssSanctions: ITSSSanction[] = selectedInfractionTypes.map(infraction => {
      const isMuyGrave = infraction.level === "muy grave";
      const multiplier = isMuyGrave ? employees : workCenters;
      
      return {
        label: infraction.label,
        level: infraction.level,
        minPerCenter: infraction.baseAmount,
        maxPerCenter: infraction.maxAmount,
        totalMin: Math.round(infraction.baseAmount * multiplier * reincidenceMultiplier),
        totalMax: Math.round(infraction.maxAmount * multiplier * reincidenceMultiplier),
      };
    });

    const itssMin = itssSanctions.reduce((sum, s) => sum + s.totalMin, 0);
    const itssMax = itssSanctions.reduce((sum, s) => sum + s.totalMax, 0);

    // Section B: Judicial risk — fixed per worker, no months factor
    const judicialMin = Math.round(employees * JUDICIAL_MIN_PER_WORKER);
    const judicialMax = Math.round(employees * JUDICIAL_MAX_PER_WORKER);

    const result: EstimatedSanctions = {
      itssMin,
      itssMax,
      itssSanctions,
      workCenters,
      judicialMin,
      judicialMax,
      employeesAffected: employees,
      monthsWithoutRecord,
      totalMin: itssMin + judicialMin,
      totalMax: itssMax + judicialMax,
      reincidenceApplied: reincidence,
    };
    
    setEstimatedSanctions(result);
    onResultCalculated?.(result);
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
        <SanctionResults estimatedSanctions={estimatedSanctions} />
      )}
    </>
  );
}
