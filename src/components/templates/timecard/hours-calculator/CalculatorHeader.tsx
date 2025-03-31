
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export function CalculatorHeader() {
  return (
    <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
      <CardTitle className="text-2xl flex items-center gap-2">
        <Calculator className="h-6 w-6" />
        Calculadora de Horas Anuales
      </CardTitle>
    </CardHeader>
  );
}
