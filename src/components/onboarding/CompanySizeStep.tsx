
import { Button } from "@/components/ui/button";
import { Building2, Users, ChevronRight } from "lucide-react";
import { OnboardingStepProps } from "@/types/onboarding";
import { motion } from "framer-motion";

const companySize = [
  { id: "1-10", label: "1-10 empleados", icon: "👨‍💼" },
  { id: "11-50", label: "11-50 empleados", icon: "👥" },
  { id: "51-200", label: "51-200 empleados", icon: "🏢" },
  { id: "200+", label: "200+ empleados", icon: "🏙️" },
];

interface CompanySizeStepProps extends OnboardingStepProps {
  selectedSize: string;
  onSizeSelect: (size: string) => void;
}

export function CompanySizeStep({ selectedSize, onSizeSelect }: CompanySizeStepProps) {
  const handleSizeSelect = (size: string) => {
    onSizeSelect(size);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Building2 className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold mb-2 text-yellow-800">
          ¿Cuál es el tamaño de tu empresa?
        </h2>
        <p className="text-yellow-700 max-w-md mx-auto">
          El tamaño de tu empresa nos ayuda a encontrar soluciones adaptadas a tus necesidades específicas
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {companySize.map((size, index) => (
          <motion.div
            key={size.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant={selectedSize === size.id ? "default" : "outline"}
              className={`h-24 text-lg w-full ${
                selectedSize === size.id 
                  ? 'bg-yellow-500 hover:bg-yellow-600' 
                  : 'hover:border-yellow-300 hover:bg-yellow-50'
              }`}
              onClick={() => handleSizeSelect(size.id)}
            >
              <div className="flex items-center justify-center w-full">
                <span className="text-2xl mr-2">{size.icon}</span>
                <span>{size.label}</span>
                {selectedSize === size.id && (
                  <ChevronRight className="ml-2 h-5 w-5 animate-pulse" />
                )}
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="text-center text-yellow-700 mt-6 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>Selecciona una opción para continuar</p>
      </motion.div>
    </div>
  );
}
