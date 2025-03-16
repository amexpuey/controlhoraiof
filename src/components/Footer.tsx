
import { useState } from "react";
import { Mail, Phone, MessageSquare, Copyright } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export function Footer() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [observations, setObservations] = useState("");
  const [isSubmitting, setIsSubmitting] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting("true");
    
    try {
      const { error } = await supabase.functions.invoke('handle-contact-form', {
        body: { email, phone, observations }
      });

      if (error) throw error;

      toast({
        title: "Formulario enviado",
        description: "Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.",
      });
      
      // Reset form
      setEmail("");
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
      setIsSubmitting("");
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      toast({
        title: "Suscripción exitosa",
        description: "Gracias por suscribirte a nuestro newsletter.",
      });
      setNewsletterEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al procesar tu suscripción. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-yellow-50 to-yellow-100 mt-20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand Statement Column */}
          <div className="flex flex-col space-y-4">
            <img
              src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
              alt="Control Horario Logo"
              className="w-20 h-20"
            />
            <h3 className="text-lg font-semibold text-yellow-800">Control Horario Electrónico</h3>
            <p className="text-yellow-700 text-sm">
              El directorio para encontrar la mejor app para el Registro horario digital, fácil y rápido
            </p>
            
            {/* Newsletter Subscription */}
            <div className="mt-6 pt-6 border-t border-yellow-200">
              <h4 className="text-md font-semibold text-yellow-800 mb-2">Suscríbete a nuestro Newsletter</h4>
              <p className="text-sm text-yellow-700 mb-3">
                Recibe consejos y novedades sobre el control horario digital
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-yellow-500" />
                  <Input
                    type="email"
                    placeholder="Tu email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="pl-10 bg-white border-yellow-200 text-yellow-900 placeholder:text-yellow-400 focus:ring-yellow-400 h-10 text-sm"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm h-10"
                >
                  Suscribirse
                </Button>
              </form>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-yellow-800">Enlaces rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/dashboard" className="text-yellow-700 hover:text-yellow-900 text-sm">
                Herramientas
              </Link>
              <Link to="/blog" className="text-yellow-700 hover:text-yellow-900 text-sm">
                Blog
              </Link>
              <a href="#pricing" className="text-yellow-700 hover:text-yellow-900 text-sm">
                Precios
              </a>
              <a href="#contact" className="text-yellow-700 hover:text-yellow-900 text-sm">
                Contacto
              </a>
            </nav>
            
            <h3 className="text-lg font-semibold text-yellow-800 mt-4">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <a href="/terminos" className="text-yellow-700 hover:text-yellow-900 text-sm">
                Términos y condiciones
              </a>
              <a href="/privacidad" className="text-yellow-700 hover:text-yellow-900 text-sm">
                Política de privacidad
              </a>
              <span className="text-yellow-700 text-sm">
                Política de cookies
              </span>
            </nav>
          </div>

          {/* Contact Form Column */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">Contáctanos</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-yellow-500" />
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white border-yellow-200 text-yellow-900 placeholder:text-yellow-400 focus:ring-yellow-400 h-10 text-sm"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-yellow-500" />
                  <Input
                    type="tel"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 bg-white border-yellow-200 text-yellow-900 placeholder:text-yellow-400 focus:ring-yellow-400 h-10 text-sm"
                  />
                </div>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-2.5 h-4 w-4 text-yellow-500" />
                <Textarea
                  placeholder="Observaciones"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="pl-10 bg-white border-yellow-200 text-yellow-900 placeholder:text-yellow-400 focus:ring-yellow-400 text-sm min-h-[70px]"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting === "true"}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm h-10"
              >
                {isSubmitting === "true" ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="pt-6 border-t border-yellow-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-yellow-700">
            <Copyright className="h-4 w-4" />
            <span>© Control Horario Electronico 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
