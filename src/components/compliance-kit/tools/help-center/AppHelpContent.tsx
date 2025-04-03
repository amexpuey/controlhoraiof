
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AppHelpContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Guía para usuarios - App móvil</h2>
      <div className="grid grid-cols-1 gap-6">
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
      </div>
    </div>
  );
}
