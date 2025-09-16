
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
    <div className="glass card mb-6 !bg-glass-bg/60">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal to-lime animate-pulse"></div>
          <span className="text-sm font-medium text-ink-700">
            Progreso del cuestionario
          </span>
        </div>
        <div className="text-sm font-semibold text-ink-900">
          {animatedCount} de {totalQuestions}
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full h-3 bg-glass-bg rounded-full border border-glass-stroke/50 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-teal to-lime rounded-full transition-all duration-700 ease-out shadow-sm relative"
            style={{ width: `${animatedProgress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <span className="text-xs font-medium text-ink-600">
            {Math.round(animatedProgress)}% completado
          </span>
        </div>
      </div>
    </div>
  );
};
