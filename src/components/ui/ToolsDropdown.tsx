
import { useState } from "react";
import { Button } from "./button";
import { Book, Calculator, CheckCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Dialog, DialogContent } from "./dialog";
import ComplianceChecker from "@/components/blog/ComplianceChecker";
import LearningModules from "@/components/learning/LearningModules";

export function ToolsDropdown() {
  const [showComplianceDialog, setShowComplianceDialog] = useState(false);
  const [showLearningDialog, setShowLearningDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-white">
            Tools
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white">
          <DropdownMenuItem
            className="flex items-center gap-2 py-2 cursor-pointer"
            onClick={() => setShowComplianceDialog(true)}
          >
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Verificador de cumplimiento</p>
              <p className="text-xs text-gray-500">Comprueba tu normativa laboral</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 py-2 cursor-pointer opacity-75">
            <Calculator className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Calculadora de ahorro</p>
              <p className="text-xs text-gray-500">Próximamente</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 py-2 cursor-pointer"
            onClick={() => setShowLearningDialog(true)}
          >
            <Book className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Módulos de aprendizaje</p>
              <p className="text-xs text-gray-500">Todo sobre control horario</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Compliance Checker Dialog */}
      <Dialog open={showComplianceDialog} onOpenChange={setShowComplianceDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ComplianceChecker onClose={() => setShowComplianceDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* Learning Modules Dialog */}
      <Dialog open={showLearningDialog} onOpenChange={setShowLearningDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <LearningModules />
        </DialogContent>
      </Dialog>
    </>
  );
}
