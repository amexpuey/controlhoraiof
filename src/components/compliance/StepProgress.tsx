
import React from "react";
import { complianceQuestions, questionBlocks } from "@/components/compliance/complianceData";

interface StepProgressProps {
  currentGlobalIndex: number;
  totalQuestions: number;
  answeredQuestions: Set<string>;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentGlobalIndex,
  totalQuestions,
  answeredQuestions,
}) => {
  // Build segments per block
  const blocks = questionBlocks.map((block) => {
    const questions = complianceQuestions.filter((q) => q.block === block.id);
    return { ...block, questions };
  });

  let globalIdx = 0;

  return (
    <div className="mb-8">
      {/* Step dots grouped by section */}
      <div className="flex items-center gap-1.5 justify-center flex-wrap">
        {blocks.map((block, blockIdx) => (
          <React.Fragment key={block.id}>
            {blockIdx > 0 && (
              <div className="w-4 h-px mx-1" style={{ background: "var(--border)" }} />
            )}
            {block.questions.map((q, qIdx) => {
              const idx = globalIdx++;
              const isActive = idx === currentGlobalIndex;
              const isAnswered = answeredQuestions.has(q.id);
              const isPast = idx < currentGlobalIndex;

              return (
                <div
                  key={q.id}
                  className="relative flex items-center justify-center transition-all duration-300"
                  style={{
                    width: isActive ? 32 : 12,
                    height: 12,
                    borderRadius: isActive ? 6 : 6,
                    background: isActive
                      ? (block as any).color || "#0fb89f"
                      : isAnswered || isPast
                      ? `${(block as any).color || "#0fb89f"}80`
                      : "var(--border)",
                    boxShadow: isActive
                      ? `0 0 0 3px ${(block as any).color || "#0fb89f"}30`
                      : "none",
                  }}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
      {/* Counter text */}
      <p className="text-center mt-3 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
        Pregunta {currentGlobalIndex + 1} de {totalQuestions}
      </p>
    </div>
  );
};
