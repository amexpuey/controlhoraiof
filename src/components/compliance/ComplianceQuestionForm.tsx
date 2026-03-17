
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ArrowRight, ArrowLeft, CheckCircle, Info, Clock, Timer, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { complianceQuestions, questionBlocks } from "./complianceData";
import { StepProgress } from "./StepProgress";

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
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const form = useForm<FormValues>({
    defaultValues: complianceQuestions.reduce((acc, q) => ({ ...acc, [q.id]: undefined }), {} as any)
  });

  const currentBlockId = questionBlocks[currentBlockIndex]?.id;
  const questionsInCurrentBlock = complianceQuestions.filter(q => q.block === currentBlockId);
  const currentQuestion = questionsInCurrentBlock[currentQuestionIndex];
  const currentBlock = questionBlocks[currentBlockIndex];
  const blockColor = (currentBlock as any)?.color || "#0fb89f";

  const totalQuestions = complianceQuestions.length;

  // Calculate global index
  let globalIndex = 0;
  for (let b = 0; b < currentBlockIndex; b++) {
    globalIndex += complianceQuestions.filter(q => q.block === questionBlocks[b].id).length;
  }
  globalIndex += currentQuestionIndex;

  const handleAnswerChange = (questionId: string, value: "si" | "no") => {
    form.setValue(questionId, value);
    setAnsweredQuestions(prev => new Set([...prev, questionId]));

    // Auto-advance after a short delay
    setTimeout(() => {
      handleNext();
    }, 400);
  };

  const handleNext = () => {
    if (!currentQuestion) return;

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
    }, 250);
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
    }, 250);
  };

  const isLastQuestionAndBlock = () => {
    return (
      currentBlockIndex === questionBlocks.length - 1 &&
      currentQuestionIndex === questionsInCurrentBlock.length - 1
    );
  };

  const currentValue = form.watch(currentQuestion?.id);

  return (
    <div className={`py-4 ${isEmbedded ? "p-6" : ""}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          style={{ background: '#0fb89f15', border: '2px solid #0fb89f30' }}
        >
          <CheckCircle className="h-7 w-7" style={{ color: '#0fb89f' }} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>
          Verificador de cumplimiento
        </h2>
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          Comprueba si cumples con la normativa vigente
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-0">
          {/* Step progress dots */}
          <StepProgress
            currentGlobalIndex={globalIndex}
            totalQuestions={totalQuestions}
            answeredQuestions={answeredQuestions}
          />

          {/* Section header with colored left border */}
          <div
            className="rounded-xl px-5 py-4 mb-6"
            style={{
              background: `${blockColor}08`,
              borderLeft: `4px solid ${blockColor}`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{currentBlock.emoji}</span>
                <span className="font-semibold text-base" style={{ color: 'var(--text)' }}>
                  {currentBlock.title}
                </span>
              </div>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: `${blockColor}18`,
                  color: blockColor,
                }}
              >
                {currentQuestionIndex + 1} / {questionsInCurrentBlock.length}
              </span>
            </div>
          </div>

          {/* Question card */}
          <div className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          )}>
            <FormField
              key={currentQuestion?.id}
              control={form.control}
              name={currentQuestion?.id}
              render={({ field }) => (
                <FormItem
                  className="rounded-2xl p-6 md:p-8 mb-6"
                  style={{
                    background: 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <FormLabel
                    className="block text-xl md:text-[22px] font-semibold leading-relaxed mb-2"
                    style={{ color: 'var(--text)' }}
                  >
                    {currentQuestion?.question}
                  </FormLabel>

                  {/* Hint text if available */}
                  {(currentQuestion as any)?.hint && (
                    <div className="flex items-start gap-2 mt-2 mb-4 p-3 rounded-lg" style={{ background: '#fef3c7' }}>
                      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#d97706' }} />
                      <span className="text-sm" style={{ color: '#92400e' }}>
                        {(currentQuestion as any).hint}
                      </span>
                    </div>
                  )}

                  <FormControl>
                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => handleAnswerChange(currentQuestion.id, 'si')}
                        className={cn(
                          "flex-1 py-4 px-6 rounded-full text-lg font-semibold transition-all duration-200 border-2",
                          "hover:scale-[1.02] active:scale-[0.98]"
                        )}
                        style={{
                          background: currentValue === 'si' ? '#0fb89f' : 'white',
                          color: currentValue === 'si' ? 'white' : 'var(--text)',
                          borderColor: currentValue === 'si' ? '#0fb89f' : 'var(--border)',
                          boxShadow: currentValue === 'si' ? '0 4px 14px rgba(15,184,159,0.3)' : 'none',
                        }}
                      >
                        ✓ Sí
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAnswerChange(currentQuestion.id, 'no')}
                        className={cn(
                          "flex-1 py-4 px-6 rounded-full text-lg font-semibold transition-all duration-200 border-2",
                          "hover:scale-[1.02] active:scale-[0.98]"
                        )}
                        style={{
                          background: currentValue === 'no' ? '#f97316' : 'white',
                          color: currentValue === 'no' ? 'white' : 'var(--text)',
                          borderColor: currentValue === 'no' ? '#f97316' : 'var(--border)',
                          boxShadow: currentValue === 'no' ? '0 4px 14px rgba(249,115,22,0.3)' : 'none',
                        }}
                      >
                        ✗ No
                      </button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentBlockIndex === 0 && currentQuestionIndex === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all disabled:opacity-30"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </button>

            {isLastQuestionAndBlock() && currentValue ? (
              <button
                type="button"
                onClick={() => form.handleSubmit(onCompleted)()}
                className="flex items-center gap-2 px-7 py-3 rounded-full text-base font-semibold transition-all hover:scale-[1.02]"
                style={{
                  background: '#0fb89f',
                  color: 'white',
                  boxShadow: '0 4px 14px rgba(15,184,159,0.3)',
                }}
              >
                Ver resultados
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!currentValue}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all disabled:opacity-30"
                style={{ color: 'var(--text-secondary)' }}
              >
                Siguiente
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
