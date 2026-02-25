
import { useState } from "react";
import { Mail, Phone, MessageSquare, Copyright, ExternalLink, CheckCircle, Book } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "./ui/dialog";
import ComplianceChecker from "@/components/blog/ComplianceChecker";
import LearningModules from "@/components/learning/LearningModules";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComplianceDialog, setShowComplianceDialog] = useState(false);
  const [showLearningDialog, setShowLearningDialog] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('handle-contact-form', {
        body: { email }
      });

      if (error) throw error;

      toast({
        title: "Suscripción completada",
        description: "Gracias por suscribirte a nuestro newsletter. Recibirás novedades pronto.",
      });
      
      // Reset form
      setEmail("");
    } catch (error) {
      console.error('Error submitting newsletter form:', error);
      toast({
        title: "Error",
        description: "Hubo un error al procesar tu suscripción. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 mt-20 py-12 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content - Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Column 1: Brand Statement */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
              alt="Fichajes Empresas Logo"
              className="w-16 h-16"
            />
            <h3 className="font-semibold text-lg">Fichajes Empresas .es</h3>
            <p className="text-gray-300 text-sm max-w-md">
              Encuentra tu app de registro horario de forma fácil y rápida. El directorio más completo para empresas de todos los tamaños.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-semibold text-lg">Enlaces Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <a href="/dashboard" className="text-gray-300 hover:text-white flex items-center transition-colors text-sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Directorio de Apps
              </a>
              <a href="/blog" className="text-gray-300 hover:text-white flex items-center transition-colors text-sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Blog
              </a>
              <button 
                onClick={() => setShowComplianceDialog(true)}
                className="text-gray-300 hover:text-white flex items-center transition-colors text-sm text-left"
              >
                <CheckCircle className="h-4 w-4 mr-2 text-blue-400" />
                Verificador de cumplimiento
              </button>
              <button 
                onClick={() => setShowLearningDialog(true)}
                className="text-gray-300 hover:text-white flex items-center transition-colors text-sm text-left"
              >
                <Book className="h-4 w-4 mr-2 text-blue-400" />
                Módulos de aprendizaje
              </button>
            </nav>
          </div>

          {/* Column 3: Legal Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <a href="/terminos" className="text-gray-300 hover:text-white flex items-center transition-colors text-sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Términos y Condiciones
              </a>
              <a href="/privacidad" className="text-gray-300 hover:text-white flex items-center transition-colors text-sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Política de Privacidad
              </a>
              <a href="/cookies" className="text-gray-300 hover:text-white flex items-center transition-colors text-sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Política de Cookies
              </a>
            </nav>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="py-8 border-t border-gray-700">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Suscríbete a nuestro Newsletter</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Recibe consejos y novedades sobre el control horario digital para tu empresa
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-400 h-10 text-sm"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-10"
              >
                {isSubmitting ? "Enviando..." : "Suscribirse"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="mt-8 pt-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Copyright className="h-4 w-4" />
            <span>Fichajes Empresas .es 2025</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Desarrollado con ♥ en España</span>
          </div>
        </div>
      </div>

      {/* Compliance Checker Dialog */}
      <Dialog 
        open={showComplianceDialog} 
        onOpenChange={(open) => {
          setShowComplianceDialog(open);
          if (!open) document.body.style.pointerEvents = "";
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ComplianceChecker onClose={() => setShowComplianceDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* Learning Modules Dialog */}
      <Dialog 
        open={showLearningDialog} 
        onOpenChange={(open) => {
          setShowLearningDialog(open);
          if (!open) document.body.style.pointerEvents = "";
        }}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <LearningModules />
        </DialogContent>
      </Dialog>
    </footer>
  );
}
