
import React from "react";

interface ConfigurationGuideContentProps {
  section: string | undefined;
}

export default function ConfigurationGuideContent({ section }: ConfigurationGuideContentProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">
        {section === "modulo-fichajes" && "Implementar sistema de fichajes"}
        {section === "define-horarios" && "Definir horarios de empleados"}
        {section === "bienvenida-equipo" && "Bienvenida a tu equipo"}
        {section === "comunicacion-equipo" && "Comunicación fluida"}
        {section === "automatiza-con-geofence" && "Automatizar con Geofence"}
      </h2>
      <p className="text-gray-700 mb-6">
        {section === "modulo-fichajes" && "Aprende a configurar el método de fichaje adecuado para tu empresa."}
        {section === "define-horarios" && "Guía completa para configurar los horarios de tus empleados."}
        {section === "bienvenida-equipo" && "Plantillas y pasos para incorporar a tu equipo."}
        {section === "comunicacion-equipo" && "Configura correctamente las notificaciones y alertas."}
        {section === "automatiza-con-geofence" && "Configura el registro horario automático por geolocalización."}
      </p>
      <div className="text-gray-500 text-center p-10 border-2 border-dashed rounded-lg">
        <p className="mb-4">Este contenido está en desarrollo. Próximamente disponible.</p>
        <button 
          onClick={() => window.open("https://app.inwout.com/login", "_blank")}
          className="bg-[#0BC8C1] text-white px-4 py-2 rounded hover:bg-[#0AB1AB] transition-colors"
        >
          Mientras tanto, configura INWOUT
        </button>
      </div>
    </div>
  );
}
