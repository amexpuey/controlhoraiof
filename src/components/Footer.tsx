
import { useState } from "react";
import { Mail, Phone, MessageSquare, Copyright, Facebook, Twitter, Instagram, Linkedin, ExternalLink, ArrowRight } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 pt-16 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
                alt="Control Horario Logo"
                className="w-10 h-10"
              />
              <h3 className="text-xl font-semibold text-white">Control Horario Electrónico</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              El directorio más completo para encontrar tu solución de control horario. 
              Comparamos y evaluamos las mejores aplicaciones para que elijas 
              la que mejor se adapte a tu empresa.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Guías
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Calculadoras
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Contacto
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Suscríbete</h3>
            <p className="text-sm text-gray-400 mb-3">
              Recibe novedades sobre fichaje digital y control horario
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-yellow-400 h-10 text-sm"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium text-sm h-10"
              >
                {isSubmitting ? "Enviando..." : "Suscribirse"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Copyright className="h-4 w-4" />
            <span>Control Horario Electrónico {new Date().getFullYear()}</span>
          </div>
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
            Política de cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
