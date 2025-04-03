
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CheckInCard() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>2. Fichar entrada y salida</CardTitle>
        <CardDescription>Registrar tu jornada laboral</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-disc pl-5">
          <li>Hacer check-in desde la app</li>
          <li>Hacer check-out al finalizar</li>
          <li>Registrar pausas</li>
          <li>Ver el tiempo acumulado</li>
        </ul>
      </CardContent>
    </Card>
  );
}
