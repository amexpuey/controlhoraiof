
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className="mb-10">
      <div className="relative">
        <Progress value={progress} className="h-2 mb-4" />
        
        <div className="flex justify-between absolute w-full top-0 transform -translate-y-1/2">
          {steps.map(step => (
            <motion.div 
              key={step}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: currentStep >= step ? 1 : 0.8,
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-full"
            >
              {currentStep > step ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : currentStep === step ? (
                <Circle className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between text-sm">
        <div className="text-yellow-700 font-medium">Tamaño de empresa</div>
        <div className={`${currentStep >= 2 ? 'text-yellow-700 font-medium' : 'text-gray-400'}`}>
          Características
        </div>
      </div>
    </div>
  );
}
