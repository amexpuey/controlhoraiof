
import React from "react";
import ActionSupportCard from "../ActionSupportCard";

export default function ActionSupportSection() {
  return (
    <div className="mt-10">
      <ActionSupportCard
        title="¿Necesitas ayuda personalizada?"
        description="Si tienes dudas específicas sobre la configuración, nuestro equipo de soporte estará encantado de ayudarte."
        buttonText="Contactar con soporte"
        buttonUrl="https://inwout.com/contacto"
      />
    </div>
  );
}
