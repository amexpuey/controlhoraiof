
import { useState } from "react";
import { ComplianceQuestionForm } from "./ComplianceQuestionForm";
import { ComplianceResults } from "./ComplianceResults";
import { SanctionCalculator } from "./SanctionCalculator";
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
  const [showCalculator, setShowCalculator] = useState(true);

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

  const mainContent = results ? (
    <ComplianceResults results={results} resetForm={resetForm} isEmbedded={isEmbedded} />
  ) : (
    <ComplianceQuestionForm onCompleted={onSubmit} isEmbedded={isEmbedded} />
  );

  return (
    <div>
      <div className="tools-section-header">
        <h2>Herramientas gratuitas</h2>
        <p>Sin registro. Sin datos personales. Resultado inmediato.</p>
      </div>
      <div className="tools-grid">
        <div className="tool-card">{mainContent}</div>
        {showCalculator && <div className="tool-card"><SanctionCalculator /></div>}
      </div>
    </div>
  );
}
