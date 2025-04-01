
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
  Globe,
  Apple,
  Check,
} from "lucide-react";
import { FeatureOption, AvailabilityOption } from "./filters/types";

export const featureOptions: FeatureOption[] = [
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

export const platformOptions = [
  { id: "Web", icon: Globe },
  { id: "iOS", icon: Apple },
  { id: "Android", icon: Smartphone }
];

export const availabilityOptions: AvailabilityOption[] = [
  { id: "free_trial", label: "Periodo de prueba", icon: Check },
  { id: "free_plan", label: "Plan gratuito", icon: Check }
];
