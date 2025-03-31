
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download, Star, CheckCircle, X, Plus, Trash2, AlertTriangle, ArrowUp, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TalentGuide() {
  const isMobile = useIsMobile();
  
  // Tab state
  const [activeTab, setActiveTab] = useState("datos");

  // Employee data state with default values
  const [employeeData, setEmployeeData] = useState({
    name: "Ana García Martínez",
    role: "Desarrollador Full-Stack",
    startDate: new Date(2023, 0, 15), // January 15, 2023
  });

  // Performance evaluation state with default values
  const [evaluationPeriod, setEvaluationPeriod] = useState("trimestral");
  const [competencies, setCompetencies] = useState([
    { name: "Comunicación", rating: 4, comment: "Excelente comunicación escrita y verbal. Explica conceptos técnicos de forma clara." },
    { name: "Responsabilidad", rating: 5, comment: "Siempre cumple con los plazos acordados y avisa con antelación si hay algún problema." },
    { name: "Resolución de problemas", rating: 3, comment: "Capaz de resolver problemas habituales, pero necesita apoyo en situaciones más complejas." },
    { name: "Trabajo en equipo", rating: 4, comment: "Colabora activamente con el resto del equipo, ofrece ayuda cuando es necesario." },
    { name: "Autonomía", rating: 2, comment: "Todavía requiere supervisión en varias tareas. Área para desarrollar durante el próximo trimestre." },
    { name: "Cumplimiento de objetivos", rating: 4, comment: "Ha conseguido la mayoría de los objetivos marcados para este periodo." },
  ]);

  // Goals tracking state with default values
  const [goals, setGoals] = useState([
    { 
      objective: "Completar curso de React avanzado", 
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)), // One month from today
      priority: "alta", 
      status: "en-progreso", 
      observations: "Ya ha completado el 60% del curso" 
    },
    { 
      objective: "Implementar sistema de autenticación OAuth", 
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 2)), // Two months from today
      priority: "media", 
      status: "no-iniciado", 
      observations: "Dependencia: actualización del backend" 
    },
    { 
      objective: "Documentar APIs del proyecto actual", 
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)), // One month from today
      priority: "baja", 
      status: "completado", 
      observations: "Documentación realizada y compartida con el equipo" 
    },
  ]);

  // Training planning state with default values
  const [trainingAreas, setTrainingAreas] = useState([
    { id: "comunicacion", label: "Comunicación", checked: false },
    { id: "liderazgo", label: "Liderazgo", checked: true },
    { id: "tecnicas", label: "Habilidades técnicas", checked: true },
    { id: "digitales", label: "Competencias digitales", checked: false },
    { id: "idiomas", label: "Idiomas", checked: true },
    { id: "otras", label: "Otras", checked: false },
  ]);
  const [trainingPlan, setTrainingPlan] = useState({
    description: "Curso de liderazgo técnico y gestión de proyectos ágiles. Reforzar conocimientos de inglés técnico para comunicación con clientes internacionales.",
    date: new Date(new Date().setMonth(new Date().getMonth() + 3)), // Three months from today
    resources: "LinkedIn Learning: https://www.linkedin.com/learning/paths/conviertete-en-tech-lead\nCurso de inglés técnico: https://www.coursera.org/learn/technical-english",
  });

  // Handle rating change
  const handleRatingChange = (index: number, rating: number) => {
    const updatedCompetencies = [...competencies];
    updatedCompetencies[index].rating = rating;
    setCompetencies(updatedCompetencies);
  };

  // Handle adding a new goal
  const handleAddGoal = () => {
    setGoals([
      ...goals, 
      { objective: "", deadline: null, priority: "media", status: "no-iniciado", observations: "" }
    ]);
  };

  // Handle removing a goal
  const handleRemoveGoal = (index: number) => {
    const updatedGoals = [...goals];
    updatedGoals.splice(index, 1);
    setGoals(updatedGoals);
  };

  // Handle goal changes
  const handleGoalChange = (index: number, field: string, value: any) => {
    const updatedGoals = [...goals];
    updatedGoals[index] = { ...updatedGoals[index], [field]: value };
    setGoals(updatedGoals);
  };

  // Handle training area checkbox changes
  const handleTrainingAreaChange = (id: string, checked: boolean) => {
    const updatedAreas = trainingAreas.map(area => 
      area.id === id ? { ...area, checked } : area
    );
    setTrainingAreas(updatedAreas);
  };

  // Navigation function for tabs
  const navigateToTab = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  // Calculate strengths and areas for improvement
  const getStrengths = () => {
    return competencies
      .filter(comp => comp.rating >= 4)
      .map(comp => comp.name);
  };

  const getImprovementAreas = () => {
    return competencies
      .filter(comp => comp.rating <= 2 && comp.rating > 0)
      .map(comp => comp.name);
  };

  // Handle export to PDF function (optimized)
  const handleExport = () => {
    try {
      // Prepare a clean printable version
      const printWindow = window.open('', '_blank');
      
      if (!printWindow) {
        throw new Error("Could not open print window");
      }
      
      // Create optimized HTML content for printing
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Guía de Talento: ${employeeData.name}</title>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 30px; 
              line-height: 1.5;
              color: #333;
            }
            h1 { 
              color: #1e3a8a; 
              font-size: 24px;
              margin-bottom: 20px;
            }
            h2 { 
              color: #1e3a8a; 
              font-size: 20px;
              margin-top: 30px;
              margin-bottom: 15px;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 5px;
            }
            h3 { 
              font-size: 18px;
              margin-top: 20px;
              margin-bottom: 10px;
            }
            p { margin-bottom: 10px; }
            table { 
              border-collapse: collapse; 
              width: 100%; 
              margin: 15px 0; 
            }
            th, td { 
              border: 1px solid #e5e7eb; 
              padding: 8px; 
              text-align: left;
            }
            th { 
              background-color: #f3f4f6; 
              font-weight: bold;
            }
            .info-row {
              display: flex;
              border-bottom: 1px solid #e5e7eb;
              padding: 8px 0;
            }
            .label {
              font-weight: bold;
              width: 150px;
              flex-shrink: 0;
            }
            .value {
              flex-grow: 1;
            }
            ul { 
              padding-left: 20px; 
              margin-bottom: 15px;
            }
            li { margin-bottom: 5px; }
            .section {
              margin-bottom: 30px;
            }
            .page-break { 
              page-break-after: always; 
              height: 0;
              display: block;
            }
            @media print {
              body { 
                padding: 0; 
                margin: 20px; 
              }
              .no-print { 
                display: none; 
              }
              h1 { font-size: 22px; }
              h2 { font-size: 18px; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="text-align: center; margin-bottom: 20px;">
            <button onclick="window.print()" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
              Imprimir / Guardar como PDF
            </button>
          </div>
          
          <h1>Guía de Talento y Evaluación de Desempeño</h1>
          
          <div class="section">
            <h2>Datos del colaborador</h2>
            <div class="info-row">
              <div class="label">Nombre:</div>
              <div class="value">${employeeData.name}</div>
            </div>
            <div class="info-row">
              <div class="label">Puesto:</div>
              <div class="value">${employeeData.role}</div>
            </div>
            <div class="info-row">
              <div class="label">Fecha incorporación:</div>
              <div class="value">${format(employeeData.startDate, "PPP")}</div>
            </div>
            <div class="info-row">
              <div class="label">Periodo evaluado:</div>
              <div class="value">${evaluationPeriod === "trimestral" ? "Trimestral" : evaluationPeriod === "semestral" ? "Semestral" : "Anual"}</div>
            </div>
          </div>
          
          <div class="section">
            <h2>Evaluación de competencias</h2>
            <table>
              <tr>
                <th>Competencia</th>
                <th>Puntuación</th>
                <th>Comentarios</th>
              </tr>
              ${competencies.map(comp => `
                <tr>
                  <td>${comp.name}</td>
                  <td>${comp.rating}/5</td>
                  <td>${comp.comment}</td>
                </tr>
              `).join('')}
            </table>
          </div>
          
          <div class="page-break"></div>
          
          <div class="section">
            <h2>Puntos fuertes y áreas de mejora</h2>
            
            <h3>Puntos fuertes</h3>
            <ul>
              ${getStrengths().length > 0 
                ? getStrengths().map(s => `<li>${s}</li>`).join('') 
                : '<li>No se han identificado puntos fuertes destacables.</li>'}
            </ul>
            
            <h3>Áreas de mejora</h3>
            <ul>
              ${getImprovementAreas().length > 0 
                ? getImprovementAreas().map(a => `<li>${a}</li>`).join('') 
                : '<li>No se han identificado áreas específicas de mejora.</li>'}
            </ul>
          </div>
          
          <div class="section">
            <h2>Objetivos establecidos</h2>
            <table>
              <tr>
                <th>Objetivo</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Fecha límite</th>
                <th>Observaciones</th>
              </tr>
              ${goals.filter(g => g.objective).map(goal => `
                <tr>
                  <td>${goal.objective}</td>
                  <td>${goal.priority === "alta" ? "Alta" : goal.priority === "media" ? "Media" : "Baja"}</td>
                  <td>${goal.status === "completado" ? "Completado" : goal.status === "en-progreso" ? "En progreso" : "No iniciado"}</td>
                  <td>${goal.deadline ? format(goal.deadline, "PPP") : "No definida"}</td>
                  <td>${goal.observations}</td>
                </tr>
              `).join('')}
            </table>
          </div>
          
          <div class="section">
            <h2>Plan de formación</h2>
            
            <h3>Áreas de formación recomendadas</h3>
            <ul>
              ${trainingAreas.filter(a => a.checked).map(area => `<li>${area.label}</li>`).join('')}
            </ul>
            
            <h3>Descripción del plan formativo</h3>
            <p>${trainingPlan.description}</p>
            
            <h3>Fecha estimada para la formación</h3>
            <p>${format(trainingPlan.date, "PPP")}</p>
            
            <h3>Recursos formativos</h3>
            <p style="white-space: pre-line">${trainingPlan.resources}</p>
          </div>
          
        </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Show success message
      toast.success("PDF listo para descargar", {
        description: "Utiliza la opción 'Guardar como PDF' de tu navegador"
      });
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error al generar el PDF", {
        description: "Por favor, intenta con otro navegador o contacta con soporte técnico."
      });
    }
  };

  // Priority helper function to render more informative priorities
  const renderPriorityContent = (priority: string) => {
    switch (priority) {
      case 'alta':
        return (
          <div className="flex items-center gap-1 text-red-600">
            <ArrowUp className="h-4 w-4" />
            <span>Alta - Urgente</span>
          </div>
        );
      case 'media':
        return <span className="text-amber-600">Media - Importante</span>;
      case 'baja':
        return <span className="text-green-600">Baja - Planificada</span>;
      default:
        return priority;
    }
  };

  return (
    <div className="container mx-auto py-6 px-0 md:px-6" id="talent-guide-content">
      <Card className="mb-8">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-xl md:text-2xl font-bold text-blue-900">
            Guía de Talento: Desempeño y Seguimiento
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="datos" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 gap-1 mb-4' : 'grid-cols-5 mb-6'}`}>
              <TabsTrigger value="datos" className="text-sm md:text-base">Datos</TabsTrigger>
              <TabsTrigger value="evaluacion" className="text-sm md:text-base">Evaluación</TabsTrigger>
              <TabsTrigger value="objetivos" className="text-sm md:text-base">Objetivos</TabsTrigger>
              <TabsTrigger value="formacion" className="text-sm md:text-base">Formación</TabsTrigger>
              <TabsTrigger value="resumen" className="text-sm md:text-base">Resumen</TabsTrigger>
            </TabsList>

            {/* Employee Data Section */}
            <TabsContent value="datos">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Datos del empleado/colaborador</h2>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input 
                      id="name" 
                      placeholder="Nombre y apellidos" 
                      value={employeeData.name}
                      onChange={(e) => setEmployeeData({...employeeData, name: e.target.value})}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="role">Puesto o rol</Label>
                    <Input 
                      id="role" 
                      placeholder="Ej: Desarrollador Front-end" 
                      value={employeeData.role}
                      onChange={(e) => setEmployeeData({...employeeData, role: e.target.value})}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Fecha de incorporación</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !employeeData.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {employeeData.startDate ? (
                            format(employeeData.startDate, "PPP")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={employeeData.startDate || undefined}
                          onSelect={(date) => setEmployeeData({...employeeData, startDate: date})}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button onClick={() => navigateToTab("evaluacion")}>
                    Continuar a evaluación
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Performance Evaluation Section */}
            <TabsContent value="evaluacion">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Evaluación del desempeño</h2>
                
                <div className="mb-6">
                  <Label htmlFor="period">Periodo evaluado</Label>
                  <Select 
                    value={evaluationPeriod} 
                    onValueChange={setEvaluationPeriod}
                  >
                    <SelectTrigger className="w-full md:w-[250px] mt-2">
                      <SelectValue placeholder="Selecciona un periodo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trimestral">Trimestral</SelectItem>
                      <SelectItem value="semestral">Semestral</SelectItem>
                      <SelectItem value="anual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-4">Competencias clave</h3>
                  
                  <div className="space-y-6">
                    {competencies.map((competency, index) => (
                      <div key={index} className="pb-4 border-b last:border-none">
                        <Label className="text-md font-medium">{competency.name}</Label>
                        
                        <div className="flex items-center mt-2 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={24}
                              className={cn(
                                "cursor-pointer mr-1",
                                star <= competency.rating 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "text-gray-300"
                              )}
                              onClick={() => handleRatingChange(index, star)}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">
                            {competency.rating ? `${competency.rating}/5` : "Sin evaluar"}
                          </span>
                        </div>
                        
                        <div>
                          <Label htmlFor={`comment-${index}`} className="text-sm">Comentarios (opcional)</Label>
                          <Textarea
                            id={`comment-${index}`}
                            placeholder="Añade un comentario sobre esta competencia..."
                            className="mt-2"
                            value={competency.comment}
                            onChange={(e) => {
                              const updatedCompetencies = [...competencies];
                              updatedCompetencies[index].comment = e.target.value;
                              setCompetencies(updatedCompetencies);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigateToTab("datos")}
                  >
                    Anterior
                  </Button>
                  <Button 
                    onClick={() => navigateToTab("objetivos")}
                  >
                    Continuar a objetivos
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Goals Tracking Section */}
            <TabsContent value="objetivos">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Seguimiento de objetivos</h2>
                
                <div className="bg-blue-50 p-4 rounded-md mb-4">
                  <h3 className="flex items-center text-blue-800 font-medium mb-2">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Guía sobre prioridades
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li><strong>Alta - Urgente:</strong> Objetivos críticos con fechas límite ajustadas.</li>
                    <li><strong>Media - Importante:</strong> Objetivos relevantes pero con margen de tiempo.</li>
                    <li><strong>Baja - Planificada:</strong> Objetivos a largo plazo o preparatorios.</li>
                  </ul>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Objetivo</TableHead>
                        <TableHead>Fecha límite</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Observaciones</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {goals.map((goal, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input 
                              placeholder="Describe el objetivo"
                              value={goal.objective}
                              onChange={(e) => handleGoalChange(index, 'objective', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-[150px] justify-start text-left font-normal",
                                    !goal.deadline && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {goal.deadline ? (
                                    format(goal.deadline, "P")
                                  ) : (
                                    <span>Fecha</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={goal.deadline || undefined}
                                  onSelect={(date) => handleGoalChange(index, 'deadline', date)}
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                          <TableCell>
                            <Select 
                              value={goal.priority} 
                              onValueChange={(value) => handleGoalChange(index, 'priority', value)}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Prioridad">
                                  {renderPriorityContent(goal.priority)}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="alta">Alta - Urgente</SelectItem>
                                <SelectItem value="media">Media - Importante</SelectItem>
                                <SelectItem value="baja">Baja - Planificada</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select 
                              value={goal.status} 
                              onValueChange={(value) => handleGoalChange(index, 'status', value)}
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Estado" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="no-iniciado">No iniciado</SelectItem>
                                <SelectItem value="en-progreso">En progreso</SelectItem>
                                <SelectItem value="completado">Completado</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input 
                              placeholder="Observaciones"
                              value={goal.observations}
                              onChange={(e) => handleGoalChange(index, 'observations', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleRemoveGoal(index)}
                              disabled={goals.length === 1}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <Button 
                  variant="outline" 
                  className="flex items-center" 
                  onClick={handleAddGoal}
                >
                  <Plus className="mr-2 h-4 w-4" /> Añadir objetivo
                </Button>
                
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigateToTab("evaluacion")}
                  >
                    Anterior
                  </Button>
                  <Button 
                    onClick={() => navigateToTab("formacion")}
                  >
                    Continuar a formación
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Training Planning Section */}
            <TabsContent value="formacion">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Planificación de formación</h2>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-4">Áreas de mejora</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trainingAreas.map((area) => (
                      <div key={area.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={area.id} 
                          checked={area.checked}
                          onCheckedChange={(checked) => 
                            handleTrainingAreaChange(area.id, checked === true)
                          }
                        />
                        <Label htmlFor={area.id}>{area.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid gap-4 pt-4">
                  <div>
                    <Label htmlFor="trainingDescription">Propuesta de formación</Label>
                    <Textarea
                      id="trainingDescription"
                      placeholder="Describe la formación que recomendarías..."
                      className="mt-2"
                      value={trainingPlan.description}
                      onChange={(e) => setTrainingPlan({
                        ...trainingPlan, 
                        description: e.target.value
                      })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="trainingDate">Fecha estimada para formación</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="trainingDate"
                          variant="outline"
                          className={cn(
                            "w-full mt-2 justify-start text-left font-normal",
                            !trainingPlan.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {trainingPlan.date ? (
                            format(trainingPlan.date, "PPP")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={trainingPlan.date || undefined}
                          onSelect={(date) => setTrainingPlan({...trainingPlan, date})}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="trainingResources">Enlaces o recursos formativos</Label>
                    <Textarea
                      id="trainingResources"
                      placeholder="Enlaces a cursos, libros, o material de estudio recomendado..."
                      className="mt-2"
                      value={trainingPlan.resources}
                      onChange={(e) => setTrainingPlan({
                        ...trainingPlan, 
                        resources: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigateToTab("objetivos")}
                  >
                    Anterior
                  </Button>
                  <Button 
                    onClick={() => navigateToTab("resumen")}
                  >
                    Continuar al resumen
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Summary Section */}
            <TabsContent value="resumen">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Resumen de la evaluación</h2>
                
                {/* Employee summary */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Datos del empleado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-1">
                      <div className="flex justify-between items-center py-1 border-b">
                        <span className="font-medium">Nombre:</span>
                        <span>{employeeData.name || "No especificado"}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b">
                        <span className="font-medium">Puesto:</span>
                        <span>{employeeData.role || "No especificado"}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="font-medium">Incorporación:</span>
                        <span>
                          {employeeData.startDate 
                            ? format(employeeData.startDate, "PPP") 
                            : "No especificada"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Strengths and improvement areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Puntos fuertes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {getStrengths().length > 0 ? (
                          getStrengths().map((strength, i) => (
                            <li key={i} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              {strength}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">No se han identificado puntos fuertes</li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Áreas de mejora</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {getImprovementAreas().length > 0 ? (
                          getImprovementAreas().map((area, i) => (
                            <li key={i} className="flex items-center">
                              <X className="h-4 w-4 text-orange-500 mr-2" />
                              {area}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">No se han identificado áreas de mejora</li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Objectives summary */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Objetivos propuestos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {goals.filter(g => g.objective).length > 0 ? (
                      <ul className="space-y-2">
                        {goals.filter(g => g.objective).map((goal, i) => (
                          <li key={i} className="flex items-start">
                            <div className={cn(
                              "h-2 w-2 rounded-full mt-2 mr-2",
                              goal.priority === "alta" 
                                ? "bg-red-500" 
                                : goal.priority === "media" 
                                  ? "bg-yellow-500" 
                                  : "bg-green-500"
                            )} />
                            <div>
                              <div className="font-medium">{goal.objective}</div>
                              <div className="text-sm text-gray-500">
                                {goal.deadline ? `Fecha límite: ${format(goal.deadline, "PPP")}` : "Sin fecha límite"} 
                                {goal.status === "completado" && " - Completado"}
                                {goal.status === "en-progreso" && " - En progreso"}
                                {goal.status === "no-iniciado" && " - No iniciado"}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No se han definido objetivos</p>
                    )}
                  </CardContent>
                </Card>
                
                {/* Modified export button - removed the save functionality */}
                <div className="flex justify-end mt-8">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 px-6" 
                    onClick={handleExport}
                  >
                    <Printer className="mr-2 h-4 w-4" /> Descargar en PDF
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
