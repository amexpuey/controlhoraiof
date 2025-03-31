
import React from "react";
import { Card } from "@/components/ui/card";
import { HoursCalculatorForm } from "./HoursCalculatorForm";

export default function HoursCalculator() {
  return (
    <Card className="border-2 border-blue-100">
      <HoursCalculatorForm />
    </Card>
  );
}
