import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ComparisonHeader() {
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900">
        Comparación de Aplicaciones
      </h1>
      <Button
        variant="outline"
        onClick={() => navigate('/admin')}
      >
        Volver al Dashboard
      </Button>
    </div>
  );
}