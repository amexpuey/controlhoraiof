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
    <footer className="bg-gradient-to-b from-amber-50 to-amber-100 mt-20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Slogan Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src="/lovable-uploads/afe2beb8-a0b8-4bb7-8a23-e7ead8320fd4.png"
              alt="Control Horario Logo"
              className="w-24 h-24"
            />
            <p className="text-amber-700 text-sm">
              Control Horario Electronico - Tu solución integral para la gestión del tiempo
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-amber-500" />
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white border-amber-200 text-amber-900 placeholder:text-amber-400 focus:ring-amber-400"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-amber-500" />
                  <Input
                    type="tel"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 bg-white border-amber-200 text-amber-900 placeholder:text-amber-400 focus:ring-amber-400"
                  />
                </div>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-amber-500" />
                <Textarea
                  placeholder="Observaciones"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="pl-10 bg-white border-amber-200 text-amber-900 placeholder:text-amber-400 focus:ring-amber-400"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-white"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-amber-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-amber-700">
            <Copyright className="h-4 w-4" />
            <span>Control Horario Electronico 2025</span>
          </div>
          <a
            href="https://www.app2u.es/es/politica-de-cookies/?_adin=132415900"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-amber-700 hover:text-amber-900 transition-colors"
          >
            <Link className="h-4 w-4" />
            <span>Política de cookies</span>
          </a>
        </div>
      </div>
    </footer>
  );
}