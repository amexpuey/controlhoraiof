
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Smartphone, 
  Globe, 
  Fingerprint, 
  CreditCard, 
  Phone, 
  QrCode, 
  Hash, 
  FileX, 
  AlertTriangle, 
  Info,
  Check,
  X,
  ChevronRight
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface MethodProps {
  icon: React.ElementType;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  isDisabled?: boolean;
  warningMessage?: string;
}

const TrackingMethod = ({ 
  icon: Icon, 
  title, 
  description, 
  pros, 
  cons, 
  isDisabled = false,
  warningMessage
}: MethodProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card className={`border ${isDisabled ? 'border-red-200 bg-red-50' : 'border-blue-200'} h-full`}>
      <CardHeader className={`${isDisabled ? 'bg-red-50' : 'bg-blue-50'} pb-2`}>
        <div className="flex justify-between items-center">
          <Icon className={`h-6 w-6 ${isDisabled ? 'text-red-600' : 'text-blue-600'}`} />
          {isDisabled && (
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" /> No recomendado
            </span>
          )}
        </div>
        <CardTitle className={`text-lg ${isDisabled ? 'text-red-800' : 'text-blue-800'} mt-2`}>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {isDisabled && warningMessage && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-md mb-4 text-sm">
            <div className="flex gap-2 items-start">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <p>{warningMessage}</p>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Ventajas:</h4>
            <ul className="space-y-1">
              {pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Desventajas:</h4>
            <ul className="space-y-1">
              {cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <X className="h-4 w-4 text-red-600 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className={`w-full ${isDisabled 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-300' 
                : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300'}`}
              disabled={isDisabled}
            >
              Ver detalles <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center text-blue-800">
                <Icon className="h-5 w-5 text-blue-600 mr-2" />
                {title}
              </DialogTitle>
              <DialogDescription>
                {description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border border-blue-100 bg-blue-50 rounded-md p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Cómo funciona</h3>
                <p className="text-sm text-blue-700">
                  {/* Cada método tendría una explicación específica aquí */}
                  {title === "Geofence (Ubicación GPS)" && 
                    "Define un perímetro alrededor del centro de trabajo. Cuando un empleado entra o sale, el sistema registra automáticamente el fichaje."}
                  {title === "App Nativa / Web App (Móvil)" && 
                    "Los empleados abren la app y registran su entrada o salida manualmente desde su móvil."}
                  {title === "Web / Portal de Acceso" && 
                    "El fichaje se realiza a través de un navegador web, accediendo a un portal en la nube."}
                  {title === "Sistemas Biométricos" && 
                    "El empleado coloca su dedo en un lector biométrico para registrar su entrada o salida."}
                  {title === "Tarjeta RFID / NFC" && 
                    "Los empleados pasan una tarjeta o pulsera RFID sobre un lector para fichar."}
                  {title === "Llamada Telefónica" && 
                    "El empleado llama a un número específico y marca un código para registrar su fichaje."}
                  {title === "Photo QR" && 
                    "Los empleados escanean un código QR con la app, que puede incluir una foto de validación."}
                  {title === "PIN Personalizado" && 
                    "El empleado introduce un PIN en un terminal de fichaje para registrar su entrada o salida."}
                  {title === "Método Manual (Excel)" && 
                    "El registro se realiza manualmente en hojas de cálculo Excel."}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-md p-4 border border-gray-100">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Caso de uso ideal</h3>
                <p className="text-sm text-gray-700">
                  {title === "Geofence (Ubicación GPS)" && 
                    "Empresas con empleados que trabajan en ubicaciones fijas pero que necesitan movilidad dentro del centro de trabajo."}
                  {title === "App Nativa / Web App (Móvil)" && 
                    "Empresas con personal en movilidad o teletrabajo, ideal para equipos distribuidos."}
                  {title === "Web / Portal de Acceso" && 
                    "Empresas con personal de oficina que tiene acceso a ordenadores durante su jornada."}
                  {title === "Sistemas Biométricos" && 
                    "Entornos que requieren alta seguridad o donde la verificación de identidad es crítica."}
                  {title === "Tarjeta RFID / NFC" && 
                    "Fábricas y centros de producción con gran número de trabajadores y turnos."}
                  {title === "Llamada Telefónica" && 
                    "Empleados sin fácil acceso a internet o para empresas con personal en zonas remotas."}
                  {title === "Photo QR" && 
                    "Empresas con varios centros de trabajo o que necesitan verificación visual de los empleados."}
                  {title === "PIN Personalizado" && 
                    "Pequeñas empresas o ambientes donde se prioriza la facilidad de uso sobre la seguridad."}
                  {title === "Método Manual (Excel)" && 
                    "No recomendado para ningún caso de uso actual debido a riesgos legales."}
                </p>
              </div>
              
              {/* Aquí iría el contenido interactivo específico para cada método */}
              <div className="rounded-md border border-blue-200 p-4 bg-blue-50">
                <div className="text-center text-sm text-blue-700">
                  <Info className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                  La simulación interactiva estará disponible próximamente
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

interface Module3Props {
  onComplete?: () => void;
}

export default function Module3({ onComplete }: Module3Props) {
  const methods = [
    {
      icon: MapPin,
      title: "Geofence (Ubicación GPS)",
      description: "Fichaje automático basado en la ubicación del empleado",
      pros: [
        "Automatización total del registro",
        "Ideal para trabajos en planta o en oficina",
        "Sin necesidad de intervención del usuario"
      ],
      cons: [
        "No apto para empleados en movilidad",
        "Puede requerir permisos de ubicación en los dispositivos"
      ]
    },
    {
      icon: Smartphone,
      title: "App Nativa",
      description: "Fichaje manual desde el smartphone del empleado",
      pros: [
        "Funciona en cualquier lugar",
        "Integración con notificaciones inteligentes",
        "Puede incluir reconocimiento facial para más seguridad"
      ],
      cons: [
        "Depende del uso responsable del empleado",
        "Requiere conexión a internet"
      ]
    },
    {
      icon: Globe,
      title: "Web / Portal de Acceso",
      description: "Fichaje a través de una plataforma web",
      pros: [
        "Fácil acceso desde cualquier dispositivo con conexión a internet",
        "No requiere instalación de software",
        "Integración con otros sistemas de RRHH"
      ],
      cons: [
        "No es ideal para trabajos en movilidad",
        "Puede generar errores si los empleados olvidan fichar manualmente"
      ]
    },
    {
      icon: Fingerprint,
      title: "Sistemas Biométricos",
      description: "Fichaje mediante reconocimiento biométrico (huella, facial)",
      pros: [
        "Máxima seguridad y evita fraudes",
        "Ideal para oficinas con acceso físico controlado"
      ],
      cons: [
        "Requiere hardware específico",
        "No es ideal para trabajos remotos"
      ]
    },
    {
      icon: CreditCard,
      title: "Tarjeta RFID / NFC",
      description: "Fichaje con tarjetas o pulseras inteligentes",
      pros: [
        "Rápido y sin contacto",
        "Ideal para fábricas y entornos de producción"
      ],
      cons: [
        "Posible pérdida o intercambio de tarjetas",
        "Requiere instalación de hardware"
      ]
    },
    {
      icon: Phone,
      title: "Llamada Telefónica",
      description: "Fichaje mediante llamada a un número específico",
      pros: [
        "Funciona sin internet",
        "Ideal para empleados sin acceso a smartphones o computadoras"
      ],
      cons: [
        "Requiere una central telefónica activa",
        "No permite ubicación en tiempo real"
      ]
    },
    {
      icon: QrCode,
      title: "Photo QR",
      description: "Fichaje escaneando códigos QR con verificación fotográfica",
      pros: [
        "Verificación visual para evitar fraudes",
        "Implementación sencilla en cualquier oficina"
      ],
      cons: [
        "Depende de la cámara del dispositivo",
        "No es ideal para fichajes masivos"
      ]
    },
    {
      icon: Hash,
      title: "PIN Personalizado",
      description: "Fichaje mediante código numérico personal",
      pros: [
        "No requiere hardware costoso",
        "Puede usarse en múltiples ubicaciones"
      ],
      cons: [
        "Menos seguro que biometría o tarjetas",
        "Puede generar problemas si los empleados olvidan su PIN"
      ]
    },
    {
      icon: FileX,
      title: "Método Manual (Excel)",
      description: "Registro manual de horas en hojas de cálculo",
      pros: [
        "Fácil de implementar inicialmente",
        "No requiere inversión tecnológica"
      ],
      cons: [
        "Alto riesgo de manipulación",
        "No cumple con los requisitos de inviolabilidad",
        "Difícil de auditar y verificar"
      ],
      isDisabled: true,
      warningMessage: "El método manual (Excel) dejará de ser viable debido a los nuevos requisitos de auditoría digital. No se recomienda utilizar esta opción para cumplir con la normativa actual."
    }
  ];

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="methods">Métodos de Fichaje</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Cómo Implementar un Sistema de Fichajes</h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-md p-4 border border-blue-100">
                <h3 className="font-medium text-blue-700 mb-2 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-600" />
                  Objetivo del módulo
                </h3>
                <p className="text-gray-700">
                  En este módulo conocerás las diferentes opciones disponibles para implementar un sistema de fichaje en tu empresa, 
                  sus ventajas, desventajas y en qué casos es más recomendable cada una.
                </p>
              </div>
              
              <div className="bg-white rounded-md p-4 border border-blue-100">
                <h3 className="font-medium text-blue-700 mb-2">¿Qué aprenderás?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Los diferentes métodos de fichaje disponibles en el mercado</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Ventajas y desventajas de cada método</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Qué método es más adecuado según el tipo de empresa</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Por qué algunos métodos tradicionales ya no son viables</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center mt-6">
                <Button 
                  onClick={() => setActiveTab("methods")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Explorar métodos de fichaje
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-medium text-yellow-800 mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
              Importante
            </h3>
            <p className="text-gray-700">
              Aunque existen múltiples opciones, es fundamental elegir un sistema que garantice:
            </p>
            <ul className="mt-2 space-y-1">
              <li className="flex items-start text-sm">
                <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                <span>Inviolabilidad de los registros</span>
              </li>
              <li className="flex items-start text-sm">
                <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                <span>Conservación de datos durante 4 años</span>
              </li>
              <li className="flex items-start text-sm">
                <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                <span>Accesibilidad para inspecciones laborales</span>
              </li>
              <li className="flex items-start text-sm">
                <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                <span>Cumplimiento con la normativa RGPD</span>
              </li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="methods" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {methods.map((method, index) => (
              <TrackingMethod 
                key={index}
                icon={method.icon}
                title={method.title}
                description={method.description}
                pros={method.pros}
                cons={method.cons}
                isDisabled={method.isDisabled}
                warningMessage={method.warningMessage}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              onClick={onComplete} 
              variant="outline"
              className="bg-green-100 hover:bg-green-200 text-green-800 border-green-300"
            >
              Completar módulo
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
