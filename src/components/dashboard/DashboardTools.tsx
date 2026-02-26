
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Book } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ComplianceChecker from "@/components/blog/ComplianceChecker";
import LearningModules from "@/components/learning/LearningModules";

interface DashboardToolsProps {
  onFeatureSelect?: (features: string[]) => void;
}

export default function DashboardTools({ onFeatureSelect }: DashboardToolsProps) {
  const [showComplianceDialog, setShowComplianceDialog] = useState(false);
  const [showLearningDialog, setShowLearningDialog] = useState(false);

  return (
    <>
      <section className="mb-8">
        <div className="s-label mb-4">Herramientas</div>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
          Herramientas Interactivas
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Verificador de cumplimiento */}
          <Card className="overflow-hidden border" style={{ borderColor: 'var(--border)', background: 'var(--white)' }}>
            <CardHeader style={{ background: 'var(--green-bg)' }}>
              <CardTitle className="flex items-center text-lg" style={{ color: 'var(--text)' }}>
                <CheckCircle className="mr-2 h-5 w-5" style={{ color: 'var(--green)' }} />
                Verificador de cumplimiento
              </CardTitle>
              <CardDescription style={{ color: 'var(--text-secondary)' }}>
                Comprueba si cumples con la normativa laboral
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4">
                <p className="text-sm text-left mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Verifica si tu empresa cumple con la normativa de registro horario y evita multas
                </p>
                <Button 
                  className="btn-green"
                  style={{ background: 'var(--green)', color: 'white' }}
                  onClick={() => setShowComplianceDialog(true)}
                >
                  Comprobar ahora
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Módulos de aprendizaje */}
          <Card className="overflow-hidden border" style={{ borderColor: 'var(--border)', background: 'var(--white)' }}>
            <CardHeader style={{ background: 'var(--green-bg)' }}>
              <CardTitle className="flex items-center text-lg" style={{ color: 'var(--text)' }}>
                <Book className="mr-2 h-5 w-5" style={{ color: 'var(--green)' }} />
                Módulos de aprendizaje
              </CardTitle>
              <CardDescription style={{ color: 'var(--text-secondary)' }}>
                Aprende todo sobre el control horario
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4">
                <p className="text-sm text-left mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Descubre qué es el control horario, su normativa y cómo implementarlo correctamente
                </p>
                <Button 
                  className="btn-green"
                  style={{ background: 'var(--green)', color: 'white' }}
                  onClick={() => setShowLearningDialog(true)}
                >
                  Empezar a aprender
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Dialog open={showComplianceDialog} onOpenChange={setShowComplianceDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ComplianceChecker onClose={() => setShowComplianceDialog(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showLearningDialog} onOpenChange={setShowLearningDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <LearningModules />
        </DialogContent>
      </Dialog>
    </>
  );
}
