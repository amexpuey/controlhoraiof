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
  const [lastAttempt, setLastAttempt] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if enough time has passed since last attempt (3 seconds minimum)
    const now = Date.now();
    const timeSinceLastAttempt = now - lastAttempt;
    if (timeSinceLastAttempt < 3000) {
      const waitTime = Math.ceil((3000 - timeSinceLastAttempt) / 1000);
      toast({
        title: "Por favor, espere",
        description: `Intente de nuevo en ${waitTime} segundos`,
        variant: "destructive",
      });
      return;
    }

    if (!email) {
      toast({
        title: "Error",
        description: "Por favor, introduce tu email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setLastAttempt(now);

    try {
      // First check if the email exists in profiles using maybeSingle()
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email.trim())
        .maybeSingle();

      if (profileError) {
        throw profileError;
      }

      const redirectUrl = `${window.location.origin}/verify`;
      console.log('Redirect URL:', redirectUrl);

      // Sign in with OTP
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            email: email.trim()
          }
        }
      });

      if (authError) {
        // Handle rate limit error specifically
        if (authError.message.includes('rate_limit')) {
          toast({
            title: "Error",
            description: "Por favor, espere unos segundos antes de intentarlo de nuevo",
            variant: "destructive",
          });
          return;
        }
        throw authError;
      }

      // If no existing profile was found, create one
      if (!profileData) {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              email: email.trim(),
              onboarding_status: 'completed'
            });

          if (insertError) throw insertError;
        }
      }

      toast({
        title: "Accediendo...",
        description: "Por favor, espere un momento.",
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
            Accede a tu cuenta de Control Horario
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
            {isLoading ? "Accediendo..." : "Entrar en Control Horario"}
          </Button>
        </form>
      </div>
    </div>
  );
}