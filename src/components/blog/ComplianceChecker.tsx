
import { useState } from "react";
import { ComplianceQuestionForm } from "../compliance/ComplianceQuestionForm";
import { ComplianceResults } from "../compliance/ComplianceResults";
import { SanctionCalculator } from "../compliance/SanctionCalculator";
import { complianceQuestions } from "../compliance/complianceData";
import { ComplianceResult, FormValues } from "./compliance-checker/types";

interface ComplianceCheckerProps {
  onClose?: () => void;
}

export default function ComplianceChecker({ onClose }: ComplianceCheckerProps) {
  const [results, setResults] = useState<ComplianceResult | null>(null);

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
    return (
      <div className="space-y-6">
        <ComplianceResults results={results} resetForm={resetForm} isEmbedded={false} />
        <SanctionCalculator />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ComplianceQuestionForm onCompleted={onSubmit} isEmbedded={false} />
      <SanctionCalculator />
    </div>
  );
}
