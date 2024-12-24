import { useState } from "react";
import { Mail, Phone, MessageSquare, Copyright, Link } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [observations, setObservations] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this data to your backend
    toast({
      title: "Formulario enviado",
      description: "Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.",
    });
    
    // Reset form
    setEmail("");
    setPhone("");
    setObservations("");
  };

  return (
    <footer className="bg-[#1A1F2C] text-white mt-20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Slogan Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src="/lovable-uploads/654278fc-cbcc-4b9d-8b9a-0a7065e56d8d.png"
              alt="Control Horario Logo"
              className="h-12 bg-white p-2 rounded"
            />
            <p className="text-[#8E9196] text-sm">
              Control Horario Electronico - Tu solución integral para la gestión del tiempo
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-[#8E9196]" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-[#221F26] border-[#403E43] text-white placeholder:text-[#8E9196]"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-[#8E9196]" />
                  <Input
                    type="tel"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 bg-[#221F26] border-[#403E43] text-white placeholder:text-[#8E9196]"
                  />
                </div>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-[#8E9196]" />
                <Textarea
                  placeholder="Observaciones"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="pl-10 bg-[#221F26] border-[#403E43] text-white placeholder:text-[#8E9196]"
                />
              </div>
              <Button 
                type="submit"
                className="w-full md:w-auto bg-[#9b87f5] hover:bg-[#8B5CF6] text-white"
              >
                Enviar
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-[#403E43] flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-[#8E9196]">
            <Copyright className="h-4 w-4" />
            <span>Control Horario Electronico 2025</span>
          </div>
          <a
            href="https://www.app2u.es/es/politica-de-cookies/?_adin=132415900"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-[#8E9196] hover:text-white transition-colors"
          >
            <Link className="h-4 w-4" />
            <span>Política de cookies</span>
          </a>
        </div>
      </div>
    </footer>
  );
}