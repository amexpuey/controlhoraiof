
import React from "react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface ProgressBarProps {
  progress: number;
  answeredCount: number;
  totalQuestions: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  answeredCount, 
  totalQuestions 
}) => {
  const { currentValue: animatedProgress } = useAnimatedCounter(progress, 600, 100);
  const { currentValue: animatedCount } = useAnimatedCounter(answeredCount, 400, 150);

  return (
    <div className="card mb-6" style={{ background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--green)' }}></div>
          <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
            Progreso del cuestionario
          </span>
        </div>
        <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          {animatedCount} de {totalQuestions}
        </div>
      </div>
      
      <div className="relative">
        <div className="progress">
          <div 
            className="progress__bar"
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
        
        <div className="flex justify-end mt-2">
          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            {Math.round(animatedProgress)}% completado
          </span>
        </div>
      </div>
    </div>
  );
};
