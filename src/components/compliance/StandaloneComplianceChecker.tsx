
import { useState } from "react";
import { ComplianceQuestionForm } from "./ComplianceQuestionForm";
import { ComplianceResults } from "./ComplianceResults";
import { SanctionCalculator } from "./SanctionCalculator";
import { complianceQuestions } from "./complianceData";
import { trackComplianceComplete } from "@/lib/analytics";
import LeadGateModal from "@/components/templates/LeadGateModal";

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
  const [showLeadGate, setShowLeadGate] = useState(false);
  const [pendingResults, setPendingResults] = useState<typeof results>(null);

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

    // If not embedded, show lead gate before results
    if (!isEmbedded) {
      setPendingResults({ level, violations, complianceScore });
      setShowLeadGate(true);
    } else {
      setResults({ level, violations, complianceScore });
    }
  };

  const handleLeadGateClose = (open: boolean) => {
    if (!open) {
      // Show results whether they submitted or dismissed
      if (pendingResults) {
        setResults(pendingResults);
        setPendingResults(null);
      }
      setShowLeadGate(false);
    }
  };

  const handleAfterSubmit = () => {
    if (pendingResults) {
      setResults(pendingResults);
      setPendingResults(null);
    }
    setShowLeadGate(false);
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
      <div className="tools-grid">
        <div className="tool-card">{mainContent}</div>
        {showCalculator && <div className="tool-card"><SanctionCalculator /></div>}
      </div>

      <LeadGateModal
        open={showLeadGate}
        onOpenChange={handleLeadGateClose}
        templateTitle="Verificador de cumplimiento normativo"
        templateSlug="verificador-cumplimiento"
        templateDescription="Desbloquea tu informe personalizado de cumplimiento con el detalle de infracciones detectadas y recomendaciones."
        templateImage="/lovable-uploads/654278fc-cbcc-4b9d-8b9a-0a7065e56d8d.png"
        onAfterSubmit={handleAfterSubmit}
      />
    </div>
  );
}
