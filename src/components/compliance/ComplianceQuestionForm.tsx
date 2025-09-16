
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { complianceQuestions, questionBlocks } from "./complianceData";
import { ProgressBar } from "@/components/blog/compliance-checker/ProgressBar";

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
  const [completedBlocks, setCompletedBlocks] = useState<string[]>([]);

  const form = useForm<FormValues>({
    defaultValues: complianceQuestions.reduce((acc, q) => ({ ...acc, [q.id]: "si" }), {})
  });

  const currentBlockId = questionBlocks[currentBlockIndex]?.id;
  const questionsInCurrentBlock = complianceQuestions.filter(q => q.block === currentBlockId);
  const currentQuestion = questionsInCurrentBlock[currentQuestionIndex];
  
  const totalQuestions = complianceQuestions.length;
  
  // Calculate progress based on form values instead of separate state
  const formValues = form.getValues();
  const answeredCount = complianceQuestions.filter(q => 
    formValues[q.id] !== undefined && formValues[q.id] !== form.formState.defaultValues?.[q.id]
  ).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const handleNext = () => {
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
    <div className={`py-6 ${isEmbedded ? "glass p-6 rounded-[var(--radius-lg)]" : ""}`}>
      <div className="flex items-center mb-6">
        <div 
          className="w-10 h-10 rounded-full mr-4 flex items-center justify-center"
          style={{ background: 'var(--g-brand)' }}
        >
          <CheckCircle className="h-6 w-6" style={{ color: 'var(--ink-900)' }} />
        </div>
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--ink-900)' }}>
            Verificador de cumplimiento
          </h2>
          <p style={{ color: 'var(--ink-700)' }}>
            Comprueba si cumples con la normativa laboral
          </p>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <ProgressBar 
            progress={progress}
            answeredCount={answeredCount}
            totalQuestions={totalQuestions}
          />
          
          <div className="glass card mb-6">
            <h3 className="font-semibold text-xl flex items-center gap-3 mb-2" style={{ color: 'var(--ink-900)' }}>
              <span className="text-2xl">{questionBlocks[currentBlockIndex].emoji}</span> 
              {questionBlocks[currentBlockIndex].title}
            </h3>
            <p className="text-sm" style={{ color: 'var(--ink-400)' }}>
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
                <FormItem className="glass card-lg space-y-6">
                  <FormLabel className="text-lg font-medium leading-relaxed" style={{ color: 'var(--ink-900)' }}>
                    {currentQuestion.question}
                  </FormLabel>
                  <FormControl>
                    <div className="choice">
                      <label className={`pill ${field.value === 'si' ? 'is-active' : ''}`}>
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value="si"
                          checked={field.value === 'si'}
                          onChange={() => field.onChange('si')}
                        />
                        <span className="font-medium">Sí</span>
                      </label>
                      <label className={`pill ${field.value === 'no' ? 'is-active' : ''}`}>
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value="no"
                          checked={field.value === 'no'}
                          onChange={() => field.onChange('no')}
                        />
                        <span className="font-medium">No</span>
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className="sticky-actions">
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={handlePrevious}
                disabled={currentBlockIndex === 0 && currentQuestionIndex === 0}
                className="btn btn-ghost"
              >
                <ArrowLeft className="h-4 w-4" />
                Anterior
              </button>
              
              <button 
                type="button" 
                onClick={handleNext}
                className="btn btn-primary"
              >
                {isLastQuestionAndBlock() ? (
                  'Finalizar Test'
                ) : (
                  <>
                    Siguiente
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
