
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function WebHelpContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Guía para usuarios - Portal web</h2>
      <div className="grid grid-cols-1 gap-6">
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
      </div>
    </div>
  );
}
