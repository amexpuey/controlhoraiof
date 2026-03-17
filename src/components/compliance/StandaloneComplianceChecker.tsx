import { useState } from "react";
import { ComplianceQuestionForm } from "./ComplianceQuestionForm";
import { ComplianceResults } from "./ComplianceResults";
import { EmailGate } from "./EmailGate";
import { complianceQuestions } from "./complianceData";
import { trackComplianceComplete } from "@/lib/analytics";

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
  const [pendingResults, setPendingResults] = useState<typeof results>(null);
  const [showEmailGate, setShowEmailGate] = useState(false);

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

    trackComplianceComplete(complianceScore, level);
    setPendingResults({ level, violations, complianceScore });
    setShowEmailGate(true);
  };

  const handleEmailGateComplete = () => {
    if (pendingResults) {
      setResults(pendingResults);
      setPendingResults(null);
    }
    setShowEmailGate(false);
  };

  const resetForm = () => {
    setResults(null);
    setPendingResults(null);
    setShowEmailGate(false);
  };

  if (showEmailGate && pendingResults) {
    return (
      <div className="tool-card">
        <EmailGate
          onComplete={handleEmailGateComplete}
          source="verificador"
          templateSlug="verificador-cumplimiento"
          extraData={{ nombre: pendingResults.level }}
        />
      </div>
    );
  }

  if (results) {
    return (
      <div className="tool-card">
        <ComplianceResults results={results} resetForm={resetForm} isEmbedded={isEmbedded} />
      </div>
    );
  }

  return (
    <div className="tool-card">
      <ComplianceQuestionForm onCompleted={onSubmit} isEmbedded={isEmbedded} />
    </div>
  );
}
