
import React from "react";
import { Clock, CheckCircle, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InwoutFeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  url: string;
}

function InwoutFeature({ icon: Icon, title, description, url }: InwoutFeatureProps) {
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:border-[#0BC8C1] transition-colors"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0BC8C1]/10 text-[#0BC8C1] mr-4 flex-shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-medium text-[#2a3040] mb-1">{title}</h3>
        <p className="text-sm text-gray-600">
          {description}
        </p>
      </div>
    </a>
  );
}

interface InwoutFeaturesProps {
  moduleId: string;
}

export default function InwoutFeatures({ moduleId }: InwoutFeaturesProps) {
  const features: Record<string, InwoutFeatureProps[]> = {
    "que-es-control-horario": [
      {
        icon: Clock,
        title: "Registro horario simplificado",
        description: "Sistema intuitivo de fichajes que cumple con toda la normativa explicada en este módulo.",
        url: "https://app.inwout.com/time-tracking"
      },
      {
        icon: CheckCircle,
        title: "Reportes legales automáticos",
        description: "Genera automáticamente los informes que exige la ley para cumplir con la normativa.",
        url: "https://app.inwout.com/reports"
      }
    ],
    "es-obligatorio": [
      {
        icon: Settings,
        title: "Configuración según tipo de empresa",
        description: "Adapta INWOUT a las características específicas de tu empresa y sector.",
        url: "https://app.inwout.com/settings/company"
      },
      {
        icon: CheckCircle,
        title: "Políticas de cumplimiento",
        description: "Establece políticas de registro horario adaptadas a los requisitos legales de tu negocio.",
        url: "https://app.inwout.com/settings/policies"
      }
    ],
    "como-implementar": [
      {
        icon: Clock,
        title: "Geolocalización inteligente",
        description: "Configura ubicaciones de trabajo para automatizar los fichajes por geolocalización.",
        url: "https://app.inwout.com/settings/locations"
      },
      {
        icon: User,
        title: "Gestión del equipo",
        description: "Invita a tu equipo y configura permisos para implementar el sistema de fichajes.",
        url: "https://app.inwout.com/settings/team"
      }
    ]
  };

  const currentFeatures = features[moduleId] || [];

  if (currentFeatures.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-[#EDFBFB] rounded-lg p-6 border border-[#0BC8C1]/20">
      <h2 className="text-xl font-semibold text-[#2a3040] mb-4">
        Implementa lo aprendido con INWOUT
      </h2>
      <p className="text-gray-600 mb-4">
        INWOUT te permite aplicar fácilmente los conceptos de este módulo con estas funcionalidades:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentFeatures.map((feature, index) => (
          <InwoutFeature key={index} {...feature} />
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button 
          className="bg-[#0BC8C1] hover:bg-[#0AB1AB]"
          onClick={() => window.open('https://app.inwout.com/dashboard', '_blank')}
        >
          Aplicar en INWOUT ahora
        </Button>
      </div>
    </div>
  );
}
