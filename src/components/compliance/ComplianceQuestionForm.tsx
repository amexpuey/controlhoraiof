
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { complianceQuestions, questionBlocks } from "./complianceData";

interface FormValues {
  [key: string]: "si" | "no";
}

interface ComplianceQuestionFormProps {
  onCompleted: (data: FormValues) => void;
  isEmbedded?: boolean;
}

export function ComplianceQuestionForm({ onCompleted, isEmbedded = false }: ComplianceQuestionFormProps) {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [completedBlocks, setCompletedBlocks] = useState<string[]>([]);

  const form = useForm<FormValues>({
    defaultValues: complianceQuestions.reduce((acc, q) => ({ ...acc, [q.id]: "si" }), {})
  });

  const currentBlockId = questionBlocks[currentBlockIndex]?.id;
  const questionsInCurrentBlock = complianceQuestions.filter(q => q.block === currentBlockId);
  const currentQuestion = questionsInCurrentBlock[currentQuestionIndex];
  
  const totalQuestions = complianceQuestions.length;
  const answeredCount = answeredQuestions.length;
  const progress = (answeredCount / totalQuestions) * 100;

  const handleNext = () => {
    if (!answeredQuestions.includes(currentQuestion.id)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
    }
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < questionsInCurrentBlock.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        if (!completedBlocks.includes(currentBlockId)) {
          setCompletedBlocks([...completedBlocks, currentBlockId]);
        }
        
        if (currentBlockIndex < questionBlocks.length - 1) {
          setCurrentBlockIndex(currentBlockIndex + 1);
          setCurrentQuestionIndex(0);
        } else {
          form.handleSubmit(onCompleted)();
          return;
        }
      }
      
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else if (currentBlockIndex > 0) {
        setCurrentBlockIndex(currentBlockIndex - 1);
        const prevBlockQuestions = complianceQuestions.filter(
          q => q.block === questionBlocks[currentBlockIndex - 1].id
        );
        setCurrentQuestionIndex(prevBlockQuestions.length - 1);
      }
      
      setIsTransitioning(false);
    }, 300);
  };

  const isLastQuestionAndBlock = () => {
    return (
      currentBlockIndex === questionBlocks.length - 1 && 
      currentQuestionIndex === questionsInCurrentBlock.length - 1
    );
  };

  return (
    <div className={`py-6 ${isEmbedded ? "bg-white p-4 rounded-lg shadow-sm" : ""}`}>
      <div className="flex items-center mb-6">
        <CheckCircle className="text-blue-600 h-7 w-7 mr-3" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Verificador de cumplimiento</h2>
          <p className="text-gray-600">Comprueba si cumples con la normativa laboral</p>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-1">
              <span>{questionBlocks[currentBlockIndex].emoji}</span> 
              {questionBlocks[currentBlockIndex].title}
            </h3>
            <p className="text-sm text-gray-600">
              Pregunta {currentQuestionIndex + 1} de {questionsInCurrentBlock.length}
            </p>
          </div>
          
          <div className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
          )}>
            <FormField
              key={currentQuestion.id}
              control={form.control}
              name={currentQuestion.id}
              render={({ field }) => (
                <FormItem className="bg-white p-5 rounded-lg shadow-sm space-y-4 border">
                  <FormLabel className="text-base font-medium text-gray-800">{currentQuestion.question}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (!answeredQuestions.includes(currentQuestion.id)) {
                          setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
                        }
                      }}
                      value={field.value}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="si" id={`${currentQuestion.id}-si`} />
                        <FormLabel htmlFor={`${currentQuestion.id}-si`} className="cursor-pointer">Sí</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`${currentQuestion.id}-no`} />
                        <FormLabel htmlFor={`${currentQuestion.id}-no`} className="cursor-pointer">No</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentBlockIndex === 0 && currentQuestionIndex === 0}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </Button>
            
            <Button 
              type="button" 
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1"
            >
              {isLastQuestionAndBlock() ? (
                'Finalizar Test'
              ) : (
                <>
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
