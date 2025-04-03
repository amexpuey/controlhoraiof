
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdditionalFeaturesCard() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>3. Funciones adicionales</CardTitle>
        <CardDescription>Sacarle el máximo partido a INWOUT</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-disc pl-5">
          <li>Solicitar vacaciones y permisos</li>
          <li>Consultar calendario laboral</li>
          <li>Ver estadísticas personales</li>
          <li>Comunicación con tu equipo</li>
        </ul>
      </CardContent>
    </Card>
  );
}
