
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react";

export default function UserImportCard() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-[#0BC8C1]" />
          <CardTitle>4. Importación de usuarios mediante Excel</CardTitle>
        </div>
        <CardDescription>Guía para importar usuarios masivamente a la plataforma</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-3">
            Para importar los usuarios a la plataforma, siga estos pasos:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Vaya a la sección "Usuarios" en la barra de menú</li>
            <li>Seleccione el modo de importación (Excel o manual)</li>
            <li>
              <strong>Importación mediante Excel:</strong>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Descargue el archivo XLS de ejemplo</li>
                <li>Complete la información requerida siguiendo el formato</li>
                <li>
                  En la columna "rol", use <strong>W</strong> para trabajadores y <strong>M</strong> para managers
                </li>
                <li>
                  Asigne horarios existentes a los usuarios (asegúrese de que los nombres coincidan exactamente)
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Recomendaciones para la importación:
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Verifique que cada columna del archivo corresponda con los campos del sistema</li>
            <li>Elimine la primera fila (encabezados) antes de importar para evitar errores</li>
            <li>Asegúrese de que al menos el correo electrónico y el departamento estén completos</li>
            <li>Use nombres de horarios exactamente iguales a los configurados previamente</li>
          </ul>
        </div>

        <div className="flex justify-center mt-4">
          <img 
            src="/lovable-uploads/51648fa6-7d30-49c6-b244-334922c2a671.png" 
            alt="Proceso de importación de usuarios en INWOUT" 
            className="rounded-md border border-gray-200 shadow-sm max-w-full"
          />
        </div>

        <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            Importante:
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Existen 2 campos obligatorios: Correo electrónico y Nombre Departamento</li>
            <li>La opción "Editar" permite hacer coincidir las columnas con su descripción</li>
            <li>La opción "Saltar" ignora una columna completa durante la importación</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
