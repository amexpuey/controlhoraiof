
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MessageSquare, Copyright, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function Footer() {
  const [email, setEmail] = useState("");
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
  
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) return;
    
    try {
      // You can implement this endpoint later
      toast({
        title: "Suscripción realizada",
        description: "Te has suscrito correctamente a nuestra newsletter.",
      });
      setNewsletterEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo completar la suscripción.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-white border-t border-blue-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
                alt="Control Horario Logo"
                className="w-10 h-10 mr-2"
              />
              <h3 className="text-lg font-semibold text-blue-800">Control Horario</h3>
            </div>
            <p className="text-gray-600 mb-4">
              El directorio más completo para encontrar tu solución de control horario adaptada a las necesidades de tu empresa.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Resources */}
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/blog/guias" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Guías
                </Link>
              </li>
              <li>
                <Link to="/blog/calculadora-horas-trabajo" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Calculadora de Horas
                </Link>
              </li>
              <li>
                <Link to="/blog/preguntas-frecuentes" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/blog/compliance-checker" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Verificador de Cumplimiento
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog/sobre-nosotros" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/#contacto" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/blog/politica-privacidad" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/blog/terminos-condiciones" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/blog/politica-cookies" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Suscríbete para recibir novedades sobre fichaje digital y control horario.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
                <Input
                  type="email"
                  placeholder="Tu email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-400"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Suscribirme
              </Button>
            </form>
          </div>
        </div>
        
        {/* Contact Form Section - Only on home page */}
        <div className="border-t border-blue-100 pt-12 pb-8" id="contacto">
          <h3 className="text-2xl font-bold text-blue-800 text-center mb-8">Contáctanos</h3>
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-blue-200 focus:border-blue-400"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
                  <Input
                    type="tel"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 border-blue-200 focus:border-blue-400"
                  />
                </div>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
                <Textarea
                  placeholder="Mensaje"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-400 min-h-[100px]"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-blue-100 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0 text-gray-500 text-sm">
              <Copyright className="h-4 w-4 mr-1" />
              <span>Control Horario Electrónico {new Date().getFullYear()}</span>
            </div>
            <div className="flex space-x-4 text-sm">
              <Link to="/blog/politica-cookies" className="text-gray-500 hover:text-blue-600 transition-colors">
                Política de cookies
              </Link>
              <Link to="/blog/politica-privacidad" className="text-gray-500 hover:text-blue-600 transition-colors">
                Privacidad
              </Link>
              <Link to="/blog/terminos-condiciones" className="text-gray-500 hover:text-blue-600 transition-colors">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
