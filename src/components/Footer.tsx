
import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('handle-contact-form', {
        body: { email, phone: "", observations: "Newsletter subscription" }
      });

      if (error) throw error;

      toast({
        title: "Suscripción completada",
        description: "Gracias por suscribirte a nuestro newsletter.",
      });
      
      // Reset form
      setEmail("");
    } catch (error) {
      console.error('Error submitting form:', error);
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
    <footer className="bg-gray-100 mt-12 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-medium text-gray-800">Sobre Nosotros</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Directorio para encontrar la mejor solución de registro horario digital para empresas de todos los tamaños.
            </p>
          </div>

          {/* Recursos Section */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-medium text-gray-800">Recursos</h3>
            <Link to="/blog" className="text-sm text-gray-600 hover:text-gray-800">Blog</Link>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Guías</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Preguntas Frecuentes</a>
          </div>

          {/* Empresa Section */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-medium text-gray-800">Empresa</h3>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Contacto</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Política de Privacidad</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Términos de Uso</a>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-medium text-gray-800">Newsletter</h3>
            <p className="text-sm text-gray-600">Recibe novedades sobre control horario</p>
            <form onSubmit={handleSubmit} className="flex mt-1">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Tu email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white border-gray-200 text-gray-800 h-9 text-sm rounded-r-none"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="h-9 rounded-l-none bg-gray-800 hover:bg-gray-700 text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © Control Horario Electronico 2025
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
