
import React from "react";
import { CheckCircle } from "lucide-react";
import { QuestionBlock } from "./types";

interface CheckerHeaderProps {
  currentBlock: QuestionBlock;
  currentQuestionIndex: number;
  totalQuestionsInBlock: number;
}

export const CheckerHeader: React.FC<CheckerHeaderProps> = ({
  currentBlock,
  currentQuestionIndex,
  totalQuestionsInBlock
}) => {
  return (
    <>
      <div className="flex items-center mb-6">
        <CheckCircle className="text-blue-600 h-7 w-7 mr-3" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Verificador de cumplimiento</h2>
          <p className="text-gray-600">Comprueba si cumples con la normativa laboral</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-1">
          <span>{currentBlock.emoji}</span> 
          {currentBlock.title}
        </h3>
        <p className="text-sm text-gray-600">
          Pregunta {currentQuestionIndex + 1} de {totalQuestionsInBlock}
        </p>
      </div>
    </>
  );
};
