import { useState } from "react";
import { Mail, Phone, MessageSquare, Copyright, Link } from "lucide-react";
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
    <footer className="bg-gradient-to-b from-yellow-50 to-yellow-100 mt-20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Slogan Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
              alt="Control Horario Logo"
              className="w-24 h-24"
            />
            <p className="text-yellow-700 text-sm">
              Control Horario Electronico - Tu solución integral para la gestión del tiempo
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-yellow-500" />
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white border-yellow-200 text-yellow-900 placeholder:text-yellow-400 focus:ring-yellow-400"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-yellow-500" />
                  <Input
                    type="tel"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 bg-white border-yellow-200 text-yellow-900 placeholder:text-yellow-400 focus:ring-yellow-400"
                  />
                </div>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-yellow-500" />
                <Textarea
                  placeholder="Observaciones"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="pl-10 bg-white border-yellow-200 text-yellow-900 placeholder:text-yellow-400 focus:ring-yellow-400"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-yellow-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-yellow-700">
            <Copyright className="h-4 w-4" />
            <span>Control Horario Electronico 2025</span>
          </div>
          <a
            href="https://www.app2u.es/es/politica-de-cookies/?_adin=132415900"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-yellow-700 hover:text-yellow-900 transition-colors"
          >
            <Link className="h-4 w-4" />
            <span>Política de cookies</span>
          </a>
        </div>
      </div>
    </footer>
  );
}