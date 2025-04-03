
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EmployeePortalCard() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>3. Portal del empleado</CardTitle>
        <CardDescription>Acceso a toda tu información laboral</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-disc pl-5">
          <li>Consultar informes de horas trabajadas</li>
          <li>Solicitar y gestionar vacaciones</li>
          <li>Acceder a documentos laborales</li>
          <li>Comunicación con recursos humanos</li>
        </ul>
      </CardContent>
    </Card>
  );
}
