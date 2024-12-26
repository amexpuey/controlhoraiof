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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and Slogan Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
              alt="Control Horario Logo"
              className="w-20 h-20"
            />
            <p className="text-yellow-700 text-sm max-w-md">
              Directorio para encontrar la mejor app para el Registro horario digital, fácil y rápido
            </p>
            
            {/* Enlaces de interés */}
            <div className="flex flex-col space-y-2 mt-4">
              <a
                href="https://csv.controlhorarioelectronico.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-yellow-700 hover:text-yellow-900 transition-colors"
              >
                <Link className="h-4 w-4" />
                <span>CSV Control Horario</span>
              </a>
              <a
                href="https://blog.controlhorarioelectronico.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-yellow-700 hover:text-yellow-900 transition-colors"
              >
                <Link className="h-4 w-4" />
                <span>Blog Control Horario</span>
              </a>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-sm mx-auto md:ml-auto">
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
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm h-10"
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
          <span className="text-sm text-yellow-700">
            Política de cookies
          </span>
        </div>
      </div>
    </footer>
  );
}