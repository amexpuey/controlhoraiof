
import React from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ComplianceQuestion } from "./types";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

interface QuestionCardProps {
  question: ComplianceQuestion;
  form: UseFormReturn<FormValues>;
  isTransitioning: boolean;
  onAnswered: (questionId: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  form,
  isTransitioning,
  onAnswered
}) => {
  return (
    <div
      className={cn(
        "transition-all duration-300",
        isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
      )}
    >
      <FormField
        key={question.id}
        control={form.control}
        name={question.id}
        render={({ field }) => (
          <FormItem className="bg-white p-5 rounded-lg shadow-sm space-y-4 border">
            <FormLabel className="text-base font-medium text-gray-800">{question.question}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  onAnswered(question.id);
                }}
                value={field.value}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id={`${question.id}-si`} />
                  <FormLabel htmlFor={`${question.id}-si`} className="cursor-pointer">Sí</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`${question.id}-no`} />
                  <FormLabel htmlFor={`${question.id}-no`} className="cursor-pointer">No</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
