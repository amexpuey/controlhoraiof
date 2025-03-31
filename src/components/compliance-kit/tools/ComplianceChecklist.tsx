
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Printer, Download } from "lucide-react";

export default function ComplianceChecklist() {
  const [sector, setSector] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [showChecklist, setShowChecklist] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const sectors = [
    { value: "comercio", label: "Comercio y retail" },
    { value: "hosteleria", label: "Hostelería y turismo" },
    { value: "construccion", label: "Construcción" },
    { value: "industria", label: "Industria y manufactura" },
    { value: "servicios", label: "Servicios profesionales" },
    { value: "tecnologia", label: "Tecnología e informática" },
    { value: "salud", label: "Salud y asistencia sanitaria" },
    { value: "educacion", label: "Educación y formación" },
    { value: "otro", label: "Otro sector" }
  ];

  const sizes = [
    { value: "autonomo", label: "Autónomo con empleados (1-5)" },
    { value: "pequena", label: "Pequeña empresa (6-49)" },
    { value: "mediana", label: "Mediana empresa (50-249)" },
    { value: "grande", label: "Gran empresa (250+)" }
  ];

  // Common obligations for all sectors and sizes
  const commonObligations = [
    { id: "registro_jornada", text: "Implementar sistema de registro horario", category: "básico" },
    { id: "contratos_legales", text: "Redactar contratos conformes a normativa vigente", category: "básico" },
    { id: "nominas_correctas", text: "Realizar nóminas y pagos respetando salario mínimo", category: "básico" },
    { id: "politica_desconexion", text: "Política de desconexión digital", category: "básico" },
    { id: "prl_basica", text: "Plan básico de prevención de riesgos laborales", category: "básico" }
  ];

  // Additional obligations based on sector and size
  const getAdditionalObligations = () => {
    const additional = [];
    
    // Size-specific obligations
    if (size === "mediana" || size === "grande") {
      additional.push(
        { id: "plan_igualdad", text: "Plan de igualdad obligatorio", category: "específico" },
        { id: "canal_denuncias", text: "Canal de denuncias interno (Ley Whistleblowing)", category: "específico" },
        { id: "comite_empresa", text: "Constitución de comité de empresa", category: "específico" }
      );
    }
    
    if (size === "pequena" || size === "mediana" || size === "grande") {
      additional.push(
        { id: "proteccion_datos", text: "Protocolo de protección de datos personales", category: "específico" },
        { id: "formacion_prl", text: "Formación en PRL para todos los empleados", category: "específico" }
      );
    }
    
    // Sector-specific obligations
    if (sector === "hosteleria" || sector === "comercio") {
      additional.push(
        { id: "horarios_comerciales", text: "Cumplimiento de horarios comerciales establecidos", category: "sectorial" },
        { id: "registro_turnos", text: "Sistema de registro y gestión de turnos", category: "sectorial" }
      );
    }
    
    if (sector === "construccion" || sector === "industria") {
      additional.push(
        { id: "epis", text: "Proporcionar equipos de protección individual (EPIs)", category: "sectorial" },
        { id: "formacion_especifica", text: "Formación específica en riesgos del sector", category: "sectorial" },
        { id: "plan_emergencia", text: "Plan de emergencia y evacuación", category: "sectorial" }
      );
    }
    
    return additional;
  };

  const handleSubmit = () => {
    if (sector && size) {
      setShowChecklist(true);
    }
  };

  const handleCheckboxChange = (id: string) => {
    setCheckedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, generate PDF using a library like jsPDF
    alert("En una implementación real, esta función generaría un PDF con tu checklist personalizado.");
  };

  const allObligations = [...commonObligations, ...getAdditionalObligations()];
  const progress = checkedItems.length > 0 ? Math.round((checkedItems.length / allObligations.length) * 100) : 0;

  return (
    <div className="py-6">
      {!showChecklist ? (
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">Personaliza tu checklist de obligaciones legales</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Sector de tu empresa</label>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un sector" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Tamaño de tu empresa</label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tamaño" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleSubmit} 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!sector || !size}
          >
            Generar checklist personalizado
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Tu checklist personalizado</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center gap-1">
                <Printer className="h-4 w-4" />
                <span>Imprimir</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Descargar PDF</span>
              </Button>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progreso de cumplimiento</span>
              <span className="text-sm">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-semibold">Obligaciones básicas</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {commonObligations.map((obligation) => (
                  <li key={obligation.id} className="p-4 flex items-start gap-3">
                    <Checkbox 
                      id={obligation.id} 
                      checked={checkedItems.includes(obligation.id)}
                      onCheckedChange={() => handleCheckboxChange(obligation.id)}
                    />
                    <label 
                      htmlFor={obligation.id} 
                      className={`text-sm ${checkedItems.includes(obligation.id) ? 'line-through text-gray-500' : ''}`}
                    >
                      {obligation.text}
                    </label>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {getAdditionalObligations().length > 0 && (
            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold">Obligaciones específicas para tu empresa</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  {getAdditionalObligations().map((obligation) => (
                    <li key={obligation.id} className="p-4 flex items-start gap-3">
                      <Checkbox 
                        id={obligation.id} 
                        checked={checkedItems.includes(obligation.id)}
                        onCheckedChange={() => handleCheckboxChange(obligation.id)}
                      />
                      <label 
                        htmlFor={obligation.id} 
                        className={`text-sm ${checkedItems.includes(obligation.id) ? 'line-through text-gray-500' : ''}`}
                      >
                        {obligation.text}
                      </label>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-6">
            <Button 
              onClick={() => setShowChecklist(false)} 
              variant="outline"
            >
              Volver a personalizar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
