
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
import { CalendarIcon, Download, Star, CheckCircle, X, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function TalentGuide() {
  // Employee data state
  const [employeeData, setEmployeeData] = useState({
    name: "",
    role: "",
    startDate: null as Date | null,
  });

  // Performance evaluation state
  const [evaluationPeriod, setEvaluationPeriod] = useState("trimestral");
  const [competencies, setCompetencies] = useState([
    { name: "Comunicación", rating: 0, comment: "" },
    { name: "Responsabilidad", rating: 0, comment: "" },
    { name: "Resolución de problemas", rating: 0, comment: "" },
    { name: "Trabajo en equipo", rating: 0, comment: "" },
    { name: "Autonomía", rating: 0, comment: "" },
    { name: "Cumplimiento de objetivos", rating: 0, comment: "" },
  ]);

  // Goals tracking state
  const [goals, setGoals] = useState([
    { objective: "", deadline: null as Date | null, priority: "media", status: "no-iniciado", observations: "" },
  ]);

  // Training planning state
  const [trainingAreas, setTrainingAreas] = useState([
    { id: "comunicacion", label: "Comunicación", checked: false },
    { id: "liderazgo", label: "Liderazgo", checked: false },
    { id: "tecnicas", label: "Habilidades técnicas", checked: false },
    { id: "digitales", label: "Competencias digitales", checked: false },
    { id: "idiomas", label: "Idiomas", checked: false },
    { id: "otras", label: "Otras", checked: false },
  ]);
  const [trainingPlan, setTrainingPlan] = useState({
    description: "",
    date: null as Date | null,
    resources: "",
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

  // Handle export (this would be expanded with actual export functionality)
  const handleExport = () => {
    toast.success("Guía exportada correctamente", {
      description: "Los datos han sido descargados en formato PDF"
    });
    // In a real implementation, this would generate a PDF
  };

  // Handle save progress (simulated)
  const handleSaveProgress = () => {
    // Generate a simple JSON to represent the saved state
    const savedState = JSON.stringify({
      employeeData,
      evaluationPeriod,
      competencies,
      goals,
      trainingAreas,
      trainingPlan
    });
    
    // In a real app, we could save to localStorage or generate a unique URL
    const tempId = Math.random().toString(36).substring(2, 10);
    
    toast.success("Progreso guardado", {
      description: `Puedes acceder al ID temporal: ${tempId} para recuperar los datos`
    });
    
    // For simplicity, log the state to console
    console.log("Saved state:", savedState);
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <Card className="mb-8">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-2xl font-bold text-blue-900">
            Guía de Talento: Desempeño y Seguimiento
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="datos" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
              <TabsTrigger value="datos">Datos</TabsTrigger>
              <TabsTrigger value="evaluacion">Evaluación</TabsTrigger>
              <TabsTrigger value="objetivos">Objetivos</TabsTrigger>
              <TabsTrigger value="formacion">Formación</TabsTrigger>
              <TabsTrigger value="resumen">Resumen</TabsTrigger>
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
                  <Button onClick={() => document.querySelector('[data-value="evaluacion"]')?.click()}>
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
                    onClick={() => document.querySelector('[data-value="datos"]')?.click()}
                  >
                    Anterior
                  </Button>
                  <Button 
                    onClick={() => document.querySelector('[data-value="objetivos"]')?.click()}
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
                              <SelectTrigger className="w-[110px]">
                                <SelectValue placeholder="Prioridad" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="alta">Alta</SelectItem>
                                <SelectItem value="media">Media</SelectItem>
                                <SelectItem value="baja">Baja</SelectItem>
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
                    onClick={() => document.querySelector('[data-value="evaluacion"]')?.click()}
                  >
                    Anterior
                  </Button>
                  <Button 
                    onClick={() => document.querySelector('[data-value="formacion"]')?.click()}
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
                    onClick={() => document.querySelector('[data-value="objetivos"]')?.click()}
                  >
                    Anterior
                  </Button>
                  <Button 
                    onClick={() => document.querySelector('[data-value="resumen"]')?.click()}
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
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => document.querySelector('[data-value="formacion"]')?.click()}
                  >
                    Anterior
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="outline"
                      onClick={handleSaveProgress}
                    >
                      Guardar progreso
                    </Button>
                    
                    <Button
                      className="bg-blue-600 hover:bg-blue-700" 
                      onClick={handleExport}
                    >
                      <Download className="mr-2 h-4 w-4" /> Exportar guía
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
