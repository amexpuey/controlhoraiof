
import { useState } from "react";
import { ComplianceQuestionForm } from "./ComplianceQuestionForm";
import { ComplianceResults } from "./ComplianceResults";
import { complianceQuestions } from "./complianceData";

interface FormValues {
  [key: string]: "si" | "no";
}

interface StandaloneComplianceCheckerProps {
  isEmbedded?: boolean;
}

export default function StandaloneComplianceChecker({ isEmbedded = false }: StandaloneComplianceCheckerProps) {
  const [results, setResults] = useState<{
    level: "compliant" | "medium-risk" | "high-risk";
    violations: { question: string; sanction: string; riskLevel: string }[];
    complianceScore: number;
  } | null>(null);

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
  };

  const resetForm = () => {
    setResults(null);
  };

  if (results) {
    return <ComplianceResults results={results} resetForm={resetForm} isEmbedded={isEmbedded} />;
  }

  return <ComplianceQuestionForm onCompleted={onSubmit} isEmbedded={isEmbedded} />;
}
