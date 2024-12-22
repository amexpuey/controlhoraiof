import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface AppHeaderProps {
  company: Company;
}

export function AppHeader({ company }: AppHeaderProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('onboarding_status, selected_features')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        setOnboardingCompleted(profile?.onboarding_status === 'completed');
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleBackClick = () => {
    if (onboardingCompleted) {
      navigate("/dashboard");
    } else {
      toast({
        title: "Sesión no encontrada",
        description: "Por favor, complete el proceso de selección de características primero.",
        variant: "destructive",
      });
      navigate("/");
    }
  };

  return (
    <div 
      className="h-[300px] relative bg-cover bg-center"
      style={{ backgroundImage: `url(${company.img_url})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70">
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex items-center gap-6">
            <img
              src={company.logo_url}
              alt={company.title}
              className="w-24 h-24 rounded-xl border-4 border-white shadow-lg"
            />
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">{company.title}</h1>
              <div className="flex items-center gap-2">
                {company.verified && (
                  <span className="bg-blue-500/80 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                    Verificado
                  </span>
                )}
                <span className="bg-purple-500/80 backdrop-blur px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {company.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Breadcrumb className="absolute top-4 left-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink 
              onClick={handleBackClick}
              className="text-white flex items-center gap-2 hover:bg-black/20 px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver al Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}