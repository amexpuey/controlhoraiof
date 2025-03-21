
export interface FormValues {
  [key: string]: "si" | "no";
}

export interface ComplianceResult {
  level: "compliant" | "medium-risk" | "high-risk";
  violations: { question: string; sanction: string; riskLevel: string }[];
  complianceScore: number;
}

export interface ComplianceQuestion {
  id: string;
  question: string;
  block: string;
  riskLevel: string;
  sanction: string;
  invertedLogic?: boolean;
}

export interface QuestionBlock {
  id: string;
  emoji: string;
  title: string;
}
