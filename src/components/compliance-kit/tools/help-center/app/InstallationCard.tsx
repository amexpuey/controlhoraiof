
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function InstallationCard() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>1. Instalación y primer uso</CardTitle>
        <CardDescription>Primeros pasos con la app móvil INWOUT</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-disc pl-5">
          <li>Descargar la app desde App Store o Google Play</li>
          <li>Iniciar sesión con tus credenciales</li>
          <li>Configurar notificaciones</li>
          <li>Interfaz principal</li>
        </ul>
      </CardContent>
    </Card>
  );
}
