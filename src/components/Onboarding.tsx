import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Building2, Users, CheckCircle2, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const companySize = [
  { id: "1-10", label: "1-10 empleados" },
  { id: "11-50", label: "11-50 empleados" },
  { id: "51-200", label: "51-200 empleados" },
  { id: "200+", label: "200+ empleados" },
];

const features = [
  { id: "time-tracking", label: "Control de tiempo" },
  { id: "shift-management", label: "Gestión de turnos" },
  { id: "absence-management", label: "Gestión de ausencias" },
  { id: "geolocation", label: "Geolocalización" },
  { id: "automations", label: "Automatizaciones" },
  { id: "presence-control", label: "Control de presencia" },
  { id: "ai-capabilities", label: "Capacidades de IA" },
  { id: "remote-work", label: "Trabajo remoto" },
  { id: "employee-portal", label: "Portal del empleado" },
];

interface EmailFormData {
  email: string;
}

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<EmailFormData>();

  const progress = ((step - 1) / 3) * 100;

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setStep(2);
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleEmailSubmit = async (data: EmailFormData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: crypto.randomUUID(), // Generate a random password initially
        options: {
          data: {
            company_size: selectedSize,
            selected_features: selectedFeatures,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "¡Correo enviado!",
        description: "Por favor, verifica tu correo electrónico para continuar.",
      });
      
      setStep(4);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Progress value={progress} className="mb-8" />

      {step === 1 && (
        <div className="space-y-8">
          <div className="text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">
              ¿Cuál es el tamaño de tu empresa?
            </h2>
            <p className="text-gray-600">
              Ayúdanos a encontrar la mejor solución para tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companySize.map((size) => (
              <Button
                key={size.id}
                variant={selectedSize === size.id ? "default" : "outline"}
                className="h-24 text-lg"
                onClick={() => handleSizeSelect(size.id)}
              >
                <Users className="mr-2 h-5 w-5" />
                {size.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">
              Selecciona las características necesarias
            </h2>
            <p className="text-gray-600">
              Marca todas las funciones que necesitas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature) => (
              <Button
                key={feature.id}
                variant={
                  selectedFeatures.includes(feature.id) ? "default" : "outline"
                }
                className="h-16"
                onClick={() => handleFeatureToggle(feature.id)}
              >
                {feature.label}
              </Button>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => setStep(3)}
              className="w-full md:w-auto"
              disabled={selectedFeatures.length === 0}
            >
              Continuar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-8">
          <div className="text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">
              Ingresa tu correo electrónico
            </h2>
            <p className="text-gray-600">
              Te enviaremos las mejores soluciones para tu empresa
            </p>
          </div>

          <form onSubmit={handleSubmit(handleEmailSubmit)} className="space-y-4">
            <Input
              type="email"
              placeholder="tu@email.com"
              {...register("email", { 
                required: "El correo electrónico es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo electrónico inválido"
                }
              })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <Button type="submit" className="w-full">
              Ver soluciones recomendadas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {step === 4 && (
        <div className="text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
          <h2 className="text-2xl font-bold">¡Gracias por tu tiempo!</h2>
          <p className="text-gray-600">
            Hemos enviado un correo electrónico de verificación.
            Por favor, revisa tu bandeja de entrada y sigue las instrucciones
            para ver las soluciones recomendadas para tu empresa.
          </p>
        </div>
      )}
    </div>
  );
}