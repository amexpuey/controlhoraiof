
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormValues, ComplianceResult } from "./types";
import { complianceQuestions } from "./complianceData";

export const useComplianceChecker = () => {
  const [results, setResults] = useState<ComplianceResult | null>(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [completedBlocks, setCompletedBlocks] = useState<string[]>([]);
  const [showResultsDialog, setShowResultsDialog] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: complianceQuestions.reduce((acc, q) => ({ ...acc, [q.id]: "si" }), {})
  });

  const onSubmit = (data: FormValues) => {
    const violations = complianceQuestions.filter(q => {
      const answer = data[q.id];
      return q.invertedLogic ? answer === "si" : answer === "no";
    }).map(q => ({
      question: q.question,
      sanction: q.sanction,
      riskLevel: q.riskLevel
    }));

    const hasVerySerious = violations.some(v => v.riskLevel === "muy grave");
    const complianceScore = ((complianceQuestions.length - violations.length) / complianceQuestions.length) * 100;
    
    let level: "compliant" | "medium-risk" | "high-risk";

    if (violations.length === 0) {
      level = "compliant";
    } else if (hasVerySerious) {
      level = "high-risk";
    } else {
      level = "medium-risk";
    }

    setResults({ level, violations, complianceScore });
    setShowResultsDialog(true);
  };

  const resetForm = () => {
    form.reset();
    setResults(null);
    setCurrentBlockIndex(0);
    setCurrentQuestionIndex(0);
    setAnsweredQuestions([]);
    setCompletedBlocks([]);
    setShowResultsDialog(false);
  };

  const handleAnswered = (questionId: string) => {
    if (!answeredQuestions.includes(questionId)) {
      setAnsweredQuestions(prev => [...prev, questionId]);
    }
  };

  return {
    form,
    results,
    currentBlockIndex,
    setCurrentBlockIndex,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    isTransitioning,
    setIsTransitioning,
    answeredQuestions,
    completedBlocks,
    setCompletedBlocks,
    showResultsDialog,
    setShowResultsDialog,
    onSubmit,
    resetForm,
    handleAnswered
  };
};
