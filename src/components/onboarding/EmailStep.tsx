import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { EmailFormData, OnboardingStepProps } from "@/types/onboarding";

interface EmailStepProps extends OnboardingStepProps {
  onEmailSubmit: (data: EmailFormData) => Promise<void>;
}

export function EmailStep({ onEmailSubmit }: EmailStepProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<EmailFormData>();

  return (
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

      <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4">
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
  );
}