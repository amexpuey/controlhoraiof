
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Check } from "lucide-react";
import { OnboardingStepProps } from "@/types/onboarding";
import { motion } from "framer-motion";

const features = [
  { id: "Control Horario", label: "Control Horario" },
  { id: "Gestión de Turnos", label: "Gestión de Turnos" },
  { id: "Gestión de Ausencias", label: "Gestión de Ausencias" },
  { id: "Gestión de Vacaciones", label: "Gestión de Vacaciones" },
  { id: "Geolocalización", label: "Geolocalización" },
  { id: "Automatizaciones", label: "Automatizaciones" },
  { id: "Control de presencia", label: "Control de presencia" },
  { id: "Inteligencia Artificial", label: "Inteligencia Artificial" },
  { id: "Teletrabajo", label: "Teletrabajo" },
  { id: "Portal del Empleado", label: "Portal del Empleado" },
  { id: "Incidencias de fichaje", label: "Incidencias de fichaje" },
  { id: "Bolsa de Horas", label: "Bolsa de Horas" },
  { id: "Informes de Horas Automatizados", label: "Informes de Horas Automatizados" },
  { id: "Alertas Recordatorio", label: "Alertas Recordatorio" },
  { id: "Integración Biométrica/RFID/Facial", label: "Integración Biométrica/RFID/Facial" },
  { id: "Notificaciones inteligentes", label: "Notificaciones inteligentes" },
  { id: "Gestión de Horas Extra", label: "Gestión de Horas Extra" },
  { id: "Gestión Documental", label: "Gestión Documental" },
  { id: "Gestión de Proyectos", label: "Gestión de Proyectos" },
  { id: "Gestión del Talento", label: "Gestión del Talento" },
  { id: "Evaluación y Desempeño", label: "Evaluación y Desempeño" },
  { id: "Selección del Personal", label: "Selección del Personal" },
  { id: "Apps Nativas", label: "Apps Nativas" },
  { id: "Nóminas", label: "Nóminas" },
  { id: "Opciones Personalizables", label: "Opciones Personalizables" },
  { id: "Soporte incluido", label: "Soporte incluido" },
  { id: "Implementación sin fricciones", label: "Implementación sin fricciones" }
];

interface FeaturesStepProps extends OnboardingStepProps {
  selectedFeatures: string[];
  onFeatureToggle: (featureId: string) => void;
}

export function FeaturesStep({ selectedFeatures, onFeatureToggle, onNext }: FeaturesStepProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold mb-2 text-yellow-800">
          ¿Qué características necesitas?
        </h2>
        <p className="text-yellow-700 max-w-md mx-auto">
          Selecciona todas las funcionalidades que son importantes para tu empresa
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature) => (
          <motion.div key={feature.id} variants={itemVariants}>
            <Button
              variant="outline"
              className={`h-16 text-sm justify-start w-full ${
                selectedFeatures.includes(feature.id) 
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500' 
                  : 'hover:border-yellow-400 hover:bg-yellow-50 border-yellow-100'
              }`}
              onClick={() => onFeatureToggle(feature.id)}
            >
              {selectedFeatures.includes(feature.id) && (
                <Check className="mr-2 h-4 w-4 flex-shrink-0" />
              )}
              <span className="truncate">{feature.label}</span>
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={onNext}
          className={`w-full md:w-auto ${selectedFeatures.length > 0 ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
          disabled={selectedFeatures.length === 0}
        >
          Ver soluciones recomendadas
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>

      <motion.div 
        className="text-center text-yellow-700 mt-2 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>
          {selectedFeatures.length === 0 
            ? "Selecciona al menos una característica para continuar" 
            : `${selectedFeatures.length} características seleccionadas`}
        </p>
      </motion.div>
    </div>
  );
}
