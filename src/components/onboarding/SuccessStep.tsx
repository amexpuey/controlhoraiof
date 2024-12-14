import { CheckCircle2 } from "lucide-react";

export function SuccessStep() {
  return (
    <div className="text-center space-y-4">
      <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
      <h2 className="text-2xl font-bold">¡Gracias por tu tiempo!</h2>
      <p className="text-gray-600">
        Hemos enviado un correo electrónico de verificación.
        Por favor, revisa tu bandeja de entrada y sigue las instrucciones
        para ver las soluciones recomendadas para tu empresa.
      </p>
    </div>
  );
}