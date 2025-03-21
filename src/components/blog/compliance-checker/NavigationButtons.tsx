
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isFirstQuestion,
  isLastQuestion
}) => {
  return (
    <div className="flex justify-between pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        Anterior
      </Button>
      
      <Button 
        type="button" 
        onClick={onNext}
        className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1"
      >
        {isLastQuestion ? (
          'Finalizar Test'
        ) : (
          <>
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};
