import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Por favor, introduce tu email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email.trim())
        .single();

      if (!profileData) {
        toast({
          title: "Error",
          description: "Email no encontrado. Por favor, completa el proceso de registro primero.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/verify`
        }
      });

      if (error) throw error;

      toast({
        title: "¡Email enviado!",
        description: "Te hemos enviado un enlace mágico a tu correo electrónico.",
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <Mail className="w-12 h-12 mx-auto text-primary-600" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Bienvenido de nuevo
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Introduce tu email para recibir un enlace mágico
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
          
          <Button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar enlace mágico"}
          </Button>
        </form>
      </div>
    </div>
  );
}