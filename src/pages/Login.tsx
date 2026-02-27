import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Check if it's admin login
      if (window.location.pathname === "/login") {
        if (!password || (email !== "amexpuey@gmail.com" && email !== "onboarding@inwout.app")) {
          toast({
            title: "Error",
            description: "Invalid credentials",
            variant: "destructive",
          });
          return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) throw error;

        if (data?.user) {
          if (data.user.email !== "amexpuey@gmail.com" && data.user.email !== "onboarding@inwout.app") {
            await supabase.auth.signOut();
            toast({
              title: "Error",
              description: "Unauthorized access",
              variant: "destructive",
            });
            return;
          }

          toast({
            title: "Success",
            description: "Logged in successfully",
          });
          navigate('/admin/companies');
        }
      } else {
        // User login flow
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', email.trim())
          .single();

        if (!profileData) {
          toast({
            title: "Error",
            description: "Email not found. Please complete the onboarding first.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Magic link sent to your email",
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isAdminLogin = window.location.pathname === "/login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <Lock className="w-12 h-12 mx-auto text-primary-600" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {isAdminLogin ? "Admin Login" : "Welcome Back"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isAdminLogin 
              ? "Sign in to manage applications" 
              : "Enter your email to receive a magic link"}
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            {isAdminLogin && (
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading 
              ? "Processing..." 
              : (isAdminLogin ? "Sign in" : "Send Magic Link")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;