import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Settings2, 
  UserCircle2,
  Brain,
  Home,
  User,
  AlertCircle,
  Clock4,
  BarChart3,
  Bell,
  Fingerprint,
  MessageSquare,
  Clock3,
  FileText,
  FolderKanban,
  Users,
  UserCheck,
  UserPlus,
  Smartphone,
  DollarSign,
  Settings,
  Headphones,
  Rocket,
  Award,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Globe,
  Apple,
  Android
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface FilterSectionProps {
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  showTopRated: boolean;
  onTopRatedToggle: () => void;
  selectedPlatforms?: string[];
  onPlatformToggle?: (platform: string) => void;
  selectedAvailability?: string[];
  onAvailabilityToggle?: (option: string) => void;
}

const features = [
  { id: "Control Horario", icon: Clock },
  { id: "Gestión de Turnos", icon: Calendar },
  { id: "Gestión de Ausencias", icon: Calendar },
  { id: "Gestión de Vacaciones", icon: Calendar },
  { id: "Geolocalización", icon: MapPin },
  { id: "Automatizaciones", icon: Settings2 },
  { id: "Control de presencia", icon: UserCircle2 },
  { id: "Inteligencia Artificial", icon: Brain },
  { id: "Teletrabajo", icon: Home },
  { id: "Portal del Empleado", icon: User },
  { id: "Incidencias de fichaje", icon: AlertCircle },
  { id: "Bolsa de Horas", icon: Clock4 },
  { id: "Informes de Horas Automatizados", icon: BarChart3 },
  { id: "Alertas Recordatorio", icon: Bell },
  { id: "Integración Biométrica/RFID/Facial", icon: Fingerprint },
  { id: "Notificaciones inteligentes", icon: MessageSquare },
  { id: "Gestión de Horas Extra", icon: Clock3 },
  { id: "Gestión Documental", icon: FileText },
  { id: "Gestión de Proyectos", icon: FolderKanban },
  { id: "Gestión del Talento", icon: Users },
  { id: "Evaluación y Desempeño", icon: UserCheck },
  { id: "Selección del Personal", icon: UserPlus },
  { id: "Apps Nativas", icon: Smartphone },
  { id: "Nóminas", icon: DollarSign },
  { id: "Opciones Personalizables", icon: Settings },
  { id: "Soporte incluido", icon: Headphones },
  { id: "Implementación sin fricciones", icon: Rocket }
];

const platforms = [
  { id: "Web", icon: Globe },
  { id: "iOS", icon: Apple },
  { id: "Android", icon: Android }
];

const availability = [
  { id: "free_trial", label: "Periodo de prueba", icon: Check },
  { id: "free_plan", label: "Plan gratuito", icon: Check }
];

export function FilterSection({
  selectedFeatures,
  onFeatureToggle,
  selectedTypes,
  onTypeToggle,
  showTopRated,
  onTopRatedToggle,
  selectedPlatforms = [],
  onPlatformToggle = () => {},
  selectedAvailability = [],
  onAvailabilityToggle = () => {},
}: FilterSectionProps) {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>
      
      <div className="space-y-6">
        {/* Features Filter */}
        <div>
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center mb-3"
            onClick={() => setShowFeatures(!showFeatures)}
          >
            <span className="text-sm font-medium">
              Características ({selectedFeatures.length} seleccionadas)
            </span>
            {showFeatures ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          
          {showFeatures && (
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {features.map(({ id, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={selectedFeatures.includes(id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => onFeatureToggle(id)}
                    className="h-auto py-2 px-3 justify-start"
                  >
                    <Icon className="w-4 h-4 mr-2 shrink-0" />
                    <span className="text-sm text-left">{id}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Platforms Filter */}
        <div>
          <h3 className="text-sm font-medium mb-3">Disponible en</h3>
          <div className="flex flex-wrap gap-3">
            {platforms.map(({ id, icon: Icon }) => (
              <Button
                key={id}
                variant={selectedPlatforms.includes(id) ? "default" : "outline"}
                size="sm"
                onClick={() => onPlatformToggle(id)}
                className="h-8"
              >
                <Icon className="w-4 h-4 mr-2" />
                {id}
              </Button>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <h3 className="text-sm font-medium mb-3">Disponibilidad</h3>
          <div className="flex flex-wrap gap-3">
            {availability.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={selectedAvailability.includes(id) ? "default" : "outline"}
                size="sm"
                onClick={() => onAvailabilityToggle(id)}
                className="h-8"
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Top Rated Filter */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="top-rated"
            checked={showTopRated}
            onCheckedChange={onTopRatedToggle}
          />
          <Label htmlFor="top-rated" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Solo mostrar Top Rated
          </Label>
        </div>
      </div>
    </div>
  );
}