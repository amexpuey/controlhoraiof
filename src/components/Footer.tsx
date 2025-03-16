
import { useState } from "react";
import { Mail, Phone, Send, Copyright, ExternalLink } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

export function Footer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [observations, setObservations] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('handle-contact-form', {
        body: { email, phone, observations, name }
      });

      if (error) throw error;

      toast({
        title: "Formulario enviado",
        description: "Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.",
      });
      
      // Reset form
      setEmail("");
      setName("");
      setPhone("");
      setObservations("");
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      toast({
        title: "Email requerido",
        description: "Por favor, introduce tu dirección de email.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Here you would typically call an API endpoint to subscribe the user
      toast({
        title: "¡Gracias por suscribirte!",
        description: "Te mantendremos informado sobre las últimas novedades.",
      });
      
      // Reset form
      setNewsletterEmail("");
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: "Error",
        description: "Hubo un error al procesar tu suscripción. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto bg-yellow-50 rounded-xl p-8 mb-16 shadow-sm border border-yellow-100">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Suscríbete a nuestro Newsletter</h3>
            <p className="text-yellow-700 text-sm">
              Recibe consejos y novedades sobre el control horario digital en tu empresa
            </p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
            <div className="flex-grow relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-yellow-500" />
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="pl-10 border-yellow-200 focus:ring-yellow-400 bg-white"
              />
            </div>
            <Button 
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Suscribirse <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
                alt="Control Horario Logo"
                className="w-10 h-10"
              />
              <h3 className="text-lg font-semibold text-gray-800">Control Horario Electrónico</h3>
            </div>
            <p className="text-gray-600 text-sm">
              El directorio para encontrar la mejor app de Registro Horario digital, fácil y rápido
            </p>
            <div className="pt-2">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Contáctanos</h4>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
                    <Input
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-blue-400 h-10 text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
                    <Input
                      type="tel"
                      placeholder="Teléfono"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-blue-400 h-10 text-sm"
                    />
                  </div>
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="Mensaje"
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-blue-400 text-sm min-h-[70px]"
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm h-10"
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </form>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col md:items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Enlaces Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center">
                Directorio de Apps <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </Link>
              <Link to="/blog" className="text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center">
                Blog <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </Link>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center">
                Verificador de Cumplimiento <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center">
                Calculadora de Ahorro <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center">
                Módulos de Aprendizaje <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>
            </nav>
          </div>

          {/* Legal Links Column */}
          <div className="flex flex-col md:items-end">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                Política de Cookies
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                Aviso Legal
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <Separator className="bg-gray-200 my-6" />
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-1 mb-2 md:mb-0">
            <Copyright className="h-3.5 w-3.5" />
            <span>Control Horario Electrónico 2025. Todos los derechos reservados.</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
