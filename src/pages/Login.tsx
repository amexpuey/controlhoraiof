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
  const [isResetMode, setIsResetMode] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
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
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/verify`,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email",
      });
      setIsResetMode(false);
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send reset instructions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter your email and password",
        variant: "destructive",
      });
      return;
    }

    // Only allow admin email
    if (email.trim() !== "amexpuey@gmail.com") {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        let errorMessage = "Invalid credentials";
        
        try {
          const errorBody = JSON.parse(error.message);
          errorMessage = errorBody.message || errorMessage;
        } catch {
          errorMessage = error.message || errorMessage;
        }
        
        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      if (data?.user) {
        // Verify if the user has the correct email
        if (data.user.email !== "amexpuey@gmail.com") {
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
        navigate('/admin/companies'); // Changed from '/admin/blog' to '/admin/companies'
      }
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = "An unexpected error occurred";
      
      try {
        if (error.body) {
          const errorBody = JSON.parse(error.body);
          errorMessage = errorBody.message || errorMessage;
        }
      } catch {
        errorMessage = error.message || errorMessage;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
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
          <Lock className="w-12 h-12 mx-auto text-primary-600" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {isResetMode ? "Reset Password" : "Admin Login"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isResetMode 
              ? "Enter your email to receive reset instructions" 
              : "Sign in to manage blog articles and companies"}
          </p>
        </div>
        <form onSubmit={isResetMode ? handlePasswordReset : handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            {!isResetMode && (
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading 
              ? (isResetMode ? "Sending..." : "Signing in...") 
              : (isResetMode ? "Send Reset Instructions" : "Sign in")}
          </Button>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsResetMode(!isResetMode)}
              className="text-sm text-primary hover:underline"
            >
              {isResetMode ? "Back to Login" : "Forgot Password?"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;