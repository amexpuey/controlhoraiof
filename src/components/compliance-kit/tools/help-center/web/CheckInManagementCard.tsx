
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CheckInManagementCard() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>2. Gestión de fichajes</CardTitle>
        <CardDescription>Registrar y gestionar tu jornada laboral</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-disc pl-5">
          <li>Fichar entrada desde el navegador</li>
          <li>Registrar la salida</li>
          <li>Añadir comentarios a los fichajes</li>
          <li>Corregir fichajes incorrectos</li>
        </ul>
      </CardContent>
    </Card>
  );
}
