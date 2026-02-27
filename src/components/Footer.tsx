
import { useState } from "react";
import { Mail, Copyright, ExternalLink } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoIcon from "@/assets/logofichajes-3.png";
import logoText from "@/assets/fichajeempresas-text.png";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        description: "Gracias por suscribirte a nuestro newsletter.",
      });
      setEmail("");
    } catch (error) {
      console.error('Error submitting newsletter form:', error);
      toast({
        title: "Error",
        description: "Hubo un error al procesar tu suscripción.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer style={{ background: "var(--dark)" }} className="mt-20 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoIcon} alt="FichajeEmpresas.es" className="w-12 h-12" />
              <img src={logoText} alt="FichajeEmpresas.es" className="h-6" />
            </div>
            <p className="text-sm max-w-md" style={{ color: "var(--dark-muted)" }}>
              Encuentra tu app de registro horario de forma fácil y rápida. El directorio más completo para empresas de todos los tamaños.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-semibold text-lg" style={{ color: "var(--dark-text)" }}>Enlaces Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <a href="/directorio" className="flex items-center transition-colors text-sm hover:opacity-80" style={{ color: "var(--dark-muted)" }}>
                <ExternalLink className="h-4 w-4 mr-2" /> Directorio de Apps
              </a>
              <a href="/plantillas" className="flex items-center transition-colors text-sm hover:opacity-80" style={{ color: "var(--dark-muted)" }}>
                <ExternalLink className="h-4 w-4 mr-2" /> Plantillas
              </a>
              <a href="/blog" className="flex items-center transition-colors text-sm hover:opacity-80" style={{ color: "var(--dark-muted)" }}>
                <ExternalLink className="h-4 w-4 mr-2" /> Blog
              </a>
              <a href="/compliance-checker" className="flex items-center transition-colors text-sm hover:opacity-80" style={{ color: "var(--dark-muted)" }}>
                <ExternalLink className="h-4 w-4 mr-2" /> Verificador de cumplimiento
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-semibold text-lg" style={{ color: "var(--dark-text)" }}>Legal</h3>
            <nav className="flex flex-col space-y-2">
              <a href="/terminos" className="flex items-center transition-colors text-sm hover:opacity-80" style={{ color: "var(--dark-muted)" }}>
                <ExternalLink className="h-4 w-4 mr-2" /> Términos y Condiciones
              </a>
              <a href="/privacidad" className="flex items-center transition-colors text-sm hover:opacity-80" style={{ color: "var(--dark-muted)" }}>
                <ExternalLink className="h-4 w-4 mr-2" /> Política de Privacidad
              </a>
              <a href="/cookies" className="flex items-center transition-colors text-sm hover:opacity-80" style={{ color: "var(--dark-muted)" }}>
                <ExternalLink className="h-4 w-4 mr-2" /> Política de Cookies
              </a>
            </nav>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8" style={{ borderTop: "1px solid rgba(255,255,255,.10)" }}>
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--dark-text)" }}>Suscríbete a nuestro Newsletter</h3>
            <p className="mb-4 text-sm" style={{ color: "var(--dark-muted)" }}>
              Recibe consejos y novedades sobre el control horario digital para tu empresa
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-2.5 h-4 w-4" style={{ color: "var(--dark-muted)" }} />
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 text-sm"
                  style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.15)", color: "var(--dark-text)" }}
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="text-sm h-10"
                style={{ background: "var(--green)", color: "white" }}
              >
                {isSubmitting ? "Enviando..." : "Suscribirse"}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,.10)" }}>
          <div className="flex items-center space-x-2 text-sm" style={{ color: "var(--dark-muted)" }}>
            <Copyright className="h-4 w-4" />
            <span>FichajeEmpresas.es 2026</span>
          </div>
          <div className="flex items-center space-x-4 text-sm" style={{ color: "var(--dark-muted)" }}>
            <span>Desarrollado con ♥ en España</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
