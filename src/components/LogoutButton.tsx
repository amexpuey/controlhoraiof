import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function LogoutButton() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      // Check if admin before logout
      const { data: { session } } = await supabase.auth.getSession();
      const isAdmin = session?.user?.email === "amexpuey@gmail.com";
      
      await supabase.auth.signOut();
      
      // Regular users always go to user login, admin to admin login
      navigate(isAdmin ? '/login' : '/user-login');
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      Cerrar sesión
    </Button>
  );
}