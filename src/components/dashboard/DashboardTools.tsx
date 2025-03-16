
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, CheckCircle, Calculator, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ComplianceChecker from "@/components/blog/ComplianceChecker";

interface DashboardToolsProps {
  onFeatureSelect?: (features: string[]) => void;
}

export default function DashboardTools({ onFeatureSelect }: DashboardToolsProps) {
  const navigate = useNavigate();
  const [activeToolIndex, setActiveToolIndex] = useState<number | null>(null);
  
  const handleToolClick = (index: number) => {
    setActiveToolIndex(activeToolIndex === index ? null : index);
  };

  const handleFeatureSelect = (features: string[]) => {
    if (onFeatureSelect) {
      onFeatureSelect(features);
    }
    setActiveToolIndex(null);
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        Herramientas Interactivas
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Verificador de cumplimiento */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center text-lg">
              <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
              Verificador de cumplimiento
            </CardTitle>
            <CardDescription>
              Comprueba si cumples con la normativa laboral
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {activeToolIndex === 0 ? (
              <div className="p-4">
                <ComplianceChecker onClose={() => setActiveToolIndex(null)} />
              </div>
            ) : (
              <div className="p-4 flex flex-col items-center">
                <p className="text-sm text-center text-gray-600 mb-4">
                  Verifica si tu empresa cumple con la normativa de registro horario y evita multas
                </p>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleToolClick(0)}
                >
                  Comprobar ahora
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Encuentra tu app de control horario */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center text-lg">
              <Search className="mr-2 h-5 w-5 text-blue-600" />
              Encuentra tu app de control horario
            </CardTitle>
            <CardDescription>
              Ayuda para encontrar la app perfecta para ti
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {activeToolIndex === 1 ? (
              <ScrollArea className="h-96 p-4">
                <FeatureSelector onSelect={handleFeatureSelect} />
              </ScrollArea>
            ) : (
              <div className="p-4 flex flex-col items-center">
                <p className="text-sm text-center text-gray-600 mb-4">
                  Selecciona las características que necesitas para tu empresa
                </p>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleToolClick(1)}
                >
                  Buscar ahora
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Calculadora */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center text-lg">
              <Calculator className="mr-2 h-5 w-5 text-blue-600" />
              Calculadora de ahorro
            </CardTitle>
            <CardDescription>
              Calcula cuánto puedes ahorrar con una app de control horario
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {activeToolIndex === 2 ? (
              <div className="p-4">
                <p>Calculadora en desarrollo</p>
                <Button 
                  className="mt-4"
                  variant="outline"
                  onClick={() => setActiveToolIndex(null)}
                >
                  Cerrar
                </Button>
              </div>
            ) : (
              <div className="p-4 flex flex-col items-center">
                <p className="text-sm text-center text-gray-600 mb-4">
                  Estima cuánto tiempo y dinero puedes ahorrar con una solución de control horario
                </p>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleToolClick(2)}
                >
                  Calcular ahorro
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

interface FeatureSelectorProps {
  onSelect: (features: string[]) => void;
}

function FeatureSelector({ onSelect }: FeatureSelectorProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSubmit = () => {
    onSelect(selectedFeatures);
  };

  const features = [
    "Control Horario",
    "Gestión de Turnos",
    "Gestión de Ausencias",
    "Gestión de Vacaciones",
    "Geolocalización",
    "Automatizaciones",
    "Control de presencia",
    "Inteligencia Artificial",
    "Teletrabajo",
    "Portal del Empleado",
    "Incidencias de fichaje",
    "Bolsa de Horas",
    "Informes de Horas Automatizados",
    "Alertas Recordatorio"
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm">Selecciona las características que necesitas:</h3>
      <div className="grid grid-cols-1 gap-2">
        {features.map(feature => (
          <Button
            key={feature}
            variant={selectedFeatures.includes(feature) ? "default" : "outline"}
            size="sm"
            className={selectedFeatures.includes(feature) 
              ? "justify-start bg-blue-500 hover:bg-blue-600" 
              : "justify-start"}
            onClick={() => handleToggle(feature)}
          >
            {selectedFeatures.includes(feature) && (
              <Check className="mr-2 h-4 w-4" />
            )}
            {feature}
          </Button>
        ))}
      </div>
      <div className="pt-4 flex justify-end">
        <Button 
          className="bg-blue-500 hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={selectedFeatures.length === 0}
        >
          Aplicar filtros ({selectedFeatures.length})
        </Button>
      </div>
    </div>
  );
}
