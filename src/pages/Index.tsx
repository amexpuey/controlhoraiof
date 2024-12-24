import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('onboarding_status')
            .eq('id', session.user.id)
            .single();

          if (profile?.onboarding_status === 'completed') {
            navigate('/dashboard');
          } else {
            // Stay on index page for onboarding
            console.log('User needs to complete onboarding');
          }
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        navigate('/dashboard');
      }
    };

    checkSession();
  }, [navigate]);

  return null;
};

export default Index;