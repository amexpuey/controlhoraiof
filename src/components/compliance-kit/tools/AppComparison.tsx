
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { ExternalLink, Filter, Check, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AppComparison() {
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState([50]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [companySize, setCompanySize] = useState<string>("all");
  
  // Mock data for time tracking apps
  const apps = [
    {
      id: 1,
      name: "INWOUT",
      logo: "https://pvqbknpvkohxoftoloda.supabase.co/storage/v1/object/public/app_assets/logos/android-chrome-192x192.png",
      description: "Solución española especializada en control horario que garantiza el cumplimiento legal.",
      priceFrom: 1.99,
      priceCurrency: "EUR",
      pricePeriod: "mes/usuario",
      features: ["control_horario", "gestion_vacaciones", "informes", "app_movil", "geolocalizacion", "integracion_nominas", "multiempresa"],
      rating: 4.8,
      companySizes: ["pequena", "mediana", "grande"],
      url: "https://inwout.com/demo-online"
    },
    {
      id: 2,
      name: "Factorial HR",
      logo: "/lovable-uploads/ba53c58c-1385-4d44-85fe-bcaca97175b4.png",
      description: "Plataforma completa de recursos humanos con módulo de control horario.",
      priceFrom: 3.5,
      priceCurrency: "EUR",
      pricePeriod: "mes/usuario",
      features: ["control_horario", "gestion_vacaciones", "informes", "app_movil", "gestion_rrhh", "onboarding", "multiempresa"],
      rating: 4.6,
      companySizes: ["pequena", "mediana", "grande"],
      url: "https://factorial.es/"
    },
    {
      id: 3,
      name: "Sesame HR",
      logo: "/lovable-uploads/f9edefc2-fbcc-42f1-b37c-826997216a3e.png",
      description: "Software de gestión de RRHH todo en uno con control de presencia.",
      priceFrom: 3.0,
      priceCurrency: "EUR",
      pricePeriod: "mes/usuario",
      features: ["control_horario", "gestion_vacaciones", "informes", "app_movil", "gestion_rrhh", "evaluaciones", "multiempresa"],
      rating: 4.5,
      companySizes: ["pequena", "mediana", "grande"],
      url: "https://sesametime.com/"
    },
    {
      id: 4,
      name: "Timify",
      logo: "/lovable-uploads/dd574472-7de1-4a79-98a7-2f1bdae617ff.png",
      description: "Solución sencilla y económica de control horario para pequeños negocios.",
      priceFrom: 0.99,
      priceCurrency: "EUR",
      pricePeriod: "mes/usuario",
      features: ["control_horario", "gestion_vacaciones", "informes", "app_movil"],
      rating: 4.3,
      companySizes: ["autonomo", "pequena"],
      url: "https://timify.com/"
    },
    {
      id: 5,
      name: "Kenjo",
      logo: "/lovable-uploads/a06520e9-5e43-4c8f-9ea0-b5f7d757204d.png",
      description: "Software de RRHH diseñado para mejorar el compromiso y retención de empleados.",
      priceFrom: 6,
      priceCurrency: "EUR",
      pricePeriod: "mes/usuario",
      features: ["control_horario", "gestion_vacaciones", "informes", "app_movil", "gestion_rrhh", "evaluaciones", "objetivos", "encuestas", "multiempresa"],
      rating: 4.7,
      companySizes: ["mediana", "grande"],
      url: "https://kenjo.io/"
    }
  ];
  
  const allFeatures = [
    { id: "control_horario", label: "Control horario" },
    { id: "gestion_vacaciones", label: "Gestión de vacaciones" },
    { id: "informes", label: "Informes y analítica" },
    { id: "app_movil", label: "App móvil" },
    { id: "geolocalizacion", label: "Geolocalización" },
    { id: "integracion_nominas", label: "Integración con nóminas" },
    { id: "gestion_rrhh", label: "Gestión RRHH completa" },
    { id: "evaluaciones", label: "Evaluaciones de desempeño" },
    { id: "objetivos", label: "Gestión de objetivos" },
    { id: "encuestas", label: "Encuestas de clima" },
    { id: "onboarding", label: "Onboarding de empleados" },
    { id: "multiempresa", label: "Gestión multiempresa" }
  ];
  
  const companySizeOptions = [
    { value: "all", label: "Todos los tamaños" },
    { value: "autonomo", label: "Autónomos (1-5 empleados)" },
    { value: "pequena", label: "Pequeña empresa (6-49)" },
    { value: "mediana", label: "Mediana empresa (50-249)" },
    { value: "grande", label: "Gran empresa (250+)" }
  ];
  
  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId) 
        : [...prev, featureId]
    );
  };
  
  // Filter apps based on selected criteria
  const filteredApps = apps.filter(app => {
    // Filter by price
    if (app.priceFrom > maxPrice[0]) return false;
    
    // Filter by features
    if (selectedFeatures.length > 0) {
      if (!selectedFeatures.every(feature => app.features.includes(feature))) return false;
    }
    
    // Filter by company size
    if (companySize !== "all" && !app.companySizes.includes(companySize)) return false;
    
    return true;
  });
  
  // Sort apps by rating
  const sortedApps = [...filteredApps].sort((a, b) => b.rating - a.rating);
  
  // Count matching features for each app
  const countMatchingFeatures = (appFeatures: string[]) => {
    if (selectedFeatures.length === 0) return 0;
    return selectedFeatures.filter(feature => appFeatures.includes(feature)).length;
  };
  
  return (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Comparador de Apps de Control Horario</h2>
        <p className="text-gray-600 mb-4">
          Encuentra la solución perfecta para cumplir con la normativa de registro horario según las necesidades de tu empresa.
        </p>
        
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
        </Button>
      </div>
      
      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Filtrar por características</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {allFeatures.map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={feature.id} 
                        checked={selectedFeatures.includes(feature.id)}
                        onCheckedChange={() => toggleFeature(feature.id)}
                      />
                      <Label htmlFor={feature.id} className="text-sm cursor-pointer">
                        {feature.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Precio máximo</h3>
                  <div className="px-2">
                    <Slider
                      value={maxPrice}
                      onValueChange={setMaxPrice}
                      max={20}
                      step={0.5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>0€</span>
                      <span>{maxPrice[0]}€ por usuario/mes</span>
                      <span>20€</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tamaño de empresa</h3>
                  <Select value={companySize} onValueChange={setCompanySize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tamaño" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {sortedApps.length > 0 ? (
        <div className="space-y-4">
          {sortedApps.map((app) => (
            <Card key={app.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0 flex justify-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1 border">
                      <img 
                        src={app.logo} 
                        alt={app.name}
                        className="max-w-full max-h-full object-contain" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{app.name}</h3>
                        <div className="flex items-center text-yellow-500 mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(app.rating) ? 'fill-yellow-500' : 'fill-gray-200'}`} 
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-700">{app.rating}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          Desde {app.priceFrom}€
                        </div>
                        <div className="text-xs text-gray-500">
                          por {app.pricePeriod}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">{app.description}</p>
                    
                    {selectedFeatures.length > 0 && (
                      <div className="mb-3">
                        <span className="text-xs font-medium text-gray-500">
                          Coincidencia: {countMatchingFeatures(app.features)}/{selectedFeatures.length} características
                        </span>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full" 
                            style={{ width: `${(countMatchingFeatures(app.features) / selectedFeatures.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {app.features.slice(0, 5).map((featureId) => {
                        const feature = allFeatures.find(f => f.id === featureId);
                        return feature ? (
                          <div 
                            key={featureId} 
                            className={`text-xs py-1 px-2 rounded-full flex items-center gap-1 ${
                              selectedFeatures.includes(featureId) 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {selectedFeatures.includes(featureId) && <Check className="h-3 w-3" />}
                            {feature.label}
                          </div>
                        ) : null;
                      })}
                      {app.features.length > 5 && (
                        <div className="text-xs py-1 px-2 rounded-full bg-gray-100 text-gray-800">
                          +{app.features.length - 5} más
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <a 
                        href={app.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
                      >
                        Ver solución <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No se encontraron apps que coincidan con tus criterios.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedFeatures([]);
              setMaxPrice([50]);
              setCompanySize("all");
            }} 
            className="mt-4"
          >
            Resetear filtros
          </Button>
        </div>
      )}
    </div>
  );
}
