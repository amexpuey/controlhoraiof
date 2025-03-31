
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, FileText, FilePlus, Edit } from "lucide-react";

export default function ComplianceTemplates() {
  const [activeTab, setActiveTab] = useState("desconexion");
  const [formData, setFormData] = useState({
    desconexion: {
      companyName: "",
      effectiveDate: "",
      workingHours: "",
      exceptions: "",
      contactMethods: ""
    },
    declaracion: {
      companyName: "",
      cif: "",
      representativeName: "",
      position: "",
      date: ""
    },
    prl: {
      companyName: "",
      address: "",
      sector: "",
      employeeCount: "",
      responsiblePerson: "",
      emergencyContact: ""
    },
    manual: {
      companyName: "",
      welcomeMessage: "",
      workingHours: "",
      vacationPolicy: "",
      conductRules: ""
    }
  });

  const handleInputChange = (template: string, field: string, value: string) => {
    setFormData({
      ...formData,
      [template]: {
        ...formData[template as keyof typeof formData],
        [field]: value
      }
    });
  };

  const handleDownload = (template: string) => {
    // In a real implementation, generate PDF with the form data
    alert(`En una implementación real, se generaría un PDF de ${template} con los datos introducidos.`);
  };

  const templates = [
    {
      id: "desconexion",
      title: "Política de Desconexión Digital",
      description: "Documento obligatorio para garantizar el derecho al descanso de los trabajadores",
      icon: FileText
    },
    {
      id: "declaracion",
      title: "Declaración de Cumplimiento",
      description: "Certifica que tu empresa cumple con la normativa laboral vigente",
      icon: FilePlus
    },
    {
      id: "prl",
      title: "Protocolo Básico de PRL",
      description: "Plan básico de prevención de riesgos laborales",
      icon: FileText
    },
    {
      id: "manual",
      title: "Manual del Empleado",
      description: "Documento que recoge normas, políticas y procedimientos para tus trabajadores",
      icon: Edit
    }
  ];

  return (
    <div className="py-6">
      <Tabs 
        defaultValue="desconexion" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          {templates.map((template) => (
            <TabsTrigger 
              key={template.id} 
              value={template.id}
              className="flex flex-col items-center gap-1 py-3 px-3"
            >
              <template.icon className="h-5 w-5" />
              <span className="text-xs md:text-sm text-center font-medium">{template.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Política de Desconexión Digital */}
        <TabsContent value="desconexion">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Política de Desconexión Digital</h3>
                <p className="text-gray-600">
                  Completa los campos para generar una política de desconexión digital para tu empresa, conforme a la Ley Orgánica 3/2018 de Protección de Datos y garantía de los derechos digitales.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="desconexion-company">Nombre de la empresa</Label>
                  <Input 
                    id="desconexion-company" 
                    value={formData.desconexion.companyName}
                    onChange={(e) => handleInputChange("desconexion", "companyName", e.target.value)}
                    placeholder="Ej. Empresa XYZ, S.L."
                  />
                </div>
                
                <div>
                  <Label htmlFor="desconexion-date">Fecha de entrada en vigor</Label>
                  <Input 
                    id="desconexion-date" 
                    type="date"
                    value={formData.desconexion.effectiveDate}
                    onChange={(e) => handleInputChange("desconexion", "effectiveDate", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="desconexion-hours">Horario laboral ordinario</Label>
                  <Input 
                    id="desconexion-hours" 
                    value={formData.desconexion.workingHours}
                    onChange={(e) => handleInputChange("desconexion", "workingHours", e.target.value)}
                    placeholder="Ej. De lunes a viernes, de 9:00 a 18:00"
                  />
                </div>
                
                <div>
                  <Label htmlFor="desconexion-exceptions">Excepciones permitidas (si aplica)</Label>
                  <Textarea 
                    id="desconexion-exceptions" 
                    value={formData.desconexion.exceptions}
                    onChange={(e) => handleInputChange("desconexion", "exceptions", e.target.value)}
                    placeholder="Ej. Situaciones de emergencia, guardias programadas, etc."
                  />
                </div>
                
                <div>
                  <Label htmlFor="desconexion-methods">Métodos de contacto fuera del horario</Label>
                  <Textarea 
                    id="desconexion-methods" 
                    value={formData.desconexion.contactMethods}
                    onChange={(e) => handleInputChange("desconexion", "contactMethods", e.target.value)}
                    placeholder="Ej. Email prioritario para emergencias, canal de Slack específico, etc."
                  />
                </div>
                
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 w-full mt-4"
                  onClick={() => handleDownload("politica_desconexion")}
                  disabled={!formData.desconexion.companyName || !formData.desconexion.effectiveDate}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar documento PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Declaración de Cumplimiento */}
        <TabsContent value="declaracion">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Declaración de Cumplimiento Normativo</h3>
                <p className="text-gray-600">
                  Genera una declaración responsable que certifica el cumplimiento de la normativa laboral vigente por parte de tu empresa.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="declaracion-company">Nombre de la empresa</Label>
                  <Input 
                    id="declaracion-company" 
                    value={formData.declaracion.companyName}
                    onChange={(e) => handleInputChange("declaracion", "companyName", e.target.value)}
                    placeholder="Ej. Empresa XYZ, S.L."
                  />
                </div>
                
                <div>
                  <Label htmlFor="declaracion-cif">CIF / NIF</Label>
                  <Input 
                    id="declaracion-cif" 
                    value={formData.declaracion.cif}
                    onChange={(e) => handleInputChange("declaracion", "cif", e.target.value)}
                    placeholder="Ej. B12345678"
                  />
                </div>
                
                <div>
                  <Label htmlFor="declaracion-representative">Nombre del representante legal</Label>
                  <Input 
                    id="declaracion-representative" 
                    value={formData.declaracion.representativeName}
                    onChange={(e) => handleInputChange("declaracion", "representativeName", e.target.value)}
                    placeholder="Ej. Juan Pérez García"
                  />
                </div>
                
                <div>
                  <Label htmlFor="declaracion-position">Cargo</Label>
                  <Input 
                    id="declaracion-position" 
                    value={formData.declaracion.position}
                    onChange={(e) => handleInputChange("declaracion", "position", e.target.value)}
                    placeholder="Ej. Administrador Único, Director General"
                  />
                </div>
                
                <div>
                  <Label htmlFor="declaracion-date">Fecha de la declaración</Label>
                  <Input 
                    id="declaracion-date" 
                    type="date"
                    value={formData.declaracion.date}
                    onChange={(e) => handleInputChange("declaracion", "date", e.target.value)}
                  />
                </div>
                
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 w-full mt-4"
                  onClick={() => handleDownload("declaracion_cumplimiento")}
                  disabled={!formData.declaracion.companyName || !formData.declaracion.representativeName}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar documento PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Protocolo Básico PRL */}
        <TabsContent value="prl">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Protocolo Básico de Prevención de Riesgos Laborales</h3>
                <p className="text-gray-600">
                  Genera un documento base para tu plan de prevención de riesgos laborales, adaptado a las características de tu empresa.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="prl-company">Nombre de la empresa</Label>
                  <Input 
                    id="prl-company" 
                    value={formData.prl.companyName}
                    onChange={(e) => handleInputChange("prl", "companyName", e.target.value)}
                    placeholder="Ej. Empresa XYZ, S.L."
                  />
                </div>
                
                <div>
                  <Label htmlFor="prl-address">Dirección del centro/s de trabajo</Label>
                  <Input 
                    id="prl-address" 
                    value={formData.prl.address}
                    onChange={(e) => handleInputChange("prl", "address", e.target.value)}
                    placeholder="Ej. Calle Principal 123, 28001 Madrid"
                  />
                </div>
                
                <div>
                  <Label htmlFor="prl-sector">Sector de actividad</Label>
                  <Input 
                    id="prl-sector" 
                    value={formData.prl.sector}
                    onChange={(e) => handleInputChange("prl", "sector", e.target.value)}
                    placeholder="Ej. Hostelería, Construcción, Servicios"
                  />
                </div>
                
                <div>
                  <Label htmlFor="prl-employees">Número de trabajadores</Label>
                  <Input 
                    id="prl-employees" 
                    type="number"
                    value={formData.prl.employeeCount}
                    onChange={(e) => handleInputChange("prl", "employeeCount", e.target.value)}
                    placeholder="Ej. 15"
                  />
                </div>
                
                <div>
                  <Label htmlFor="prl-responsible">Responsable de prevención</Label>
                  <Input 
                    id="prl-responsible" 
                    value={formData.prl.responsiblePerson}
                    onChange={(e) => handleInputChange("prl", "responsiblePerson", e.target.value)}
                    placeholder="Ej. Ana López Martínez"
                  />
                </div>
                
                <div>
                  <Label htmlFor="prl-emergency">Contacto en caso de emergencia</Label>
                  <Input 
                    id="prl-emergency" 
                    value={formData.prl.emergencyContact}
                    onChange={(e) => handleInputChange("prl", "emergencyContact", e.target.value)}
                    placeholder="Ej. 600123456"
                  />
                </div>
                
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 w-full mt-4"
                  onClick={() => handleDownload("protocolo_prl")}
                  disabled={!formData.prl.companyName || !formData.prl.sector}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar documento PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manual del Empleado */}
        <TabsContent value="manual">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Manual del Empleado</h3>
                <p className="text-gray-600">
                  Crea un manual básico para tus empleados que incluya las normas, políticas y procedimientos más importantes de tu empresa.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="manual-company">Nombre de la empresa</Label>
                  <Input 
                    id="manual-company" 
                    value={formData.manual.companyName}
                    onChange={(e) => handleInputChange("manual", "companyName", e.target.value)}
                    placeholder="Ej. Empresa XYZ, S.L."
                  />
                </div>
                
                <div>
                  <Label htmlFor="manual-welcome">Mensaje de bienvenida</Label>
                  <Textarea 
                    id="manual-welcome" 
                    value={formData.manual.welcomeMessage}
                    onChange={(e) => handleInputChange("manual", "welcomeMessage", e.target.value)}
                    placeholder="Ej. Bienvenido/a a nuestra empresa. Estamos encantados de que te hayas unido a nuestro equipo..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="manual-hours">Horario y jornada laboral</Label>
                  <Textarea 
                    id="manual-hours" 
                    value={formData.manual.workingHours}
                    onChange={(e) => handleInputChange("manual", "workingHours", e.target.value)}
                    placeholder="Ej. El horario general es de 9:00 a 18:00 con una hora para comer..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="manual-vacation">Política de vacaciones</Label>
                  <Textarea 
                    id="manual-vacation" 
                    value={formData.manual.vacationPolicy}
                    onChange={(e) => handleInputChange("manual", "vacationPolicy", e.target.value)}
                    placeholder="Ej. Los empleados disponen de 23 días laborables de vacaciones al año..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="manual-rules">Normas de conducta</Label>
                  <Textarea 
                    id="manual-rules" 
                    value={formData.manual.conductRules}
                    onChange={(e) => handleInputChange("manual", "conductRules", e.target.value)}
                    placeholder="Ej. Esperamos que todos los empleados mantengan un comportamiento profesional..."
                  />
                </div>
                
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 w-full mt-4"
                  onClick={() => handleDownload("manual_empleado")}
                  disabled={!formData.manual.companyName}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar documento PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
