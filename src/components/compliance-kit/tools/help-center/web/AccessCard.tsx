
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AccessCard() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>1. Acceso al portal web</CardTitle>
        <CardDescription>Primeros pasos en la plataforma web de INWOUT</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-disc pl-5">
          <li>Acceder a app.inwout.com</li>
          <li>Iniciar sesión con tus credenciales</li>
          <li>Navegación por el dashboard</li>
          <li>Personalizar tu perfil</li>
        </ul>
      </CardContent>
    </Card>
  );
}
