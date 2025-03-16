
import { useState } from "react";
import { CompanySizeStep } from "./onboarding/CompanySizeStep";
import { FeaturesStep } from "./onboarding/FeaturesStep";
import { ProgressBar } from "./onboarding/ProgressBar";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingProps {
  onFeaturesSelect: (features: string[]) => void;
  onSizeSelect: (size: string) => void;
}

export function Onboarding({ onFeaturesSelect, onSizeSelect }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const totalSteps = 2;

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    onSizeSelect(size);
    setStep(2);
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleFeaturesSubmit = () => {
    // Scroll to top before submitting
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onFeaturesSelect(selectedFeatures);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { when: "afterChildren" }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 onboarding-section">
      <motion.div 
        className="bg-white shadow-xl rounded-xl p-8 border border-yellow-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-3">
            ¡Encuentra la solución perfecta para tu empresa!
          </h1>
          <p className="text-yellow-700 max-w-2xl mx-auto">
            En solo dos pasos, te recomendaremos las mejores aplicaciones de control horario
            adaptadas específicamente a tus necesidades.
          </p>
        </div>
        
        <ProgressBar currentStep={step} totalSteps={totalSteps} />
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <CompanySizeStep
                selectedSize={selectedSize}
                onSizeSelect={handleSizeSelect}
                onNext={() => {}}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FeaturesStep
                selectedFeatures={selectedFeatures}
                onFeatureToggle={handleFeatureToggle}
                onNext={handleFeaturesSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
