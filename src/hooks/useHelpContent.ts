
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

export interface HelpStep {
  id: string;
  title: string;
  description: string;
  video_url?: string | null;
  pdf_url?: string | null;
  step_order: number;
  category: string;
  visible?: boolean;
  items?: string[];
  estimated_time?: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}

export const useHelpContent = (category: string) => {
  const [helpSteps, setHelpSteps] = useState<HelpStep[]>([]);
  const [welcomeVideo, setWelcomeVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHelpContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch the welcome video
        const { data: welcomeData, error: welcomeError } = await supabase
          .from('help_steps')
          .select('*')
          .eq('id', '8cc75e5c-30a4-4eea-b2fe-889d6e9f947a')
          .single();
        
        if (welcomeError) {
          console.error("Error fetching welcome video:", welcomeError);
        } else if (welcomeData && welcomeData.video_url) {
          setWelcomeVideo(welcomeData.video_url);
        }
        
        // Fetch help steps for the specified category
        const { data, error } = await supabase
          .from('help_steps')
          .select('*')
          .eq('category', category)
          .eq('visible', true)
          .order('step_order', { ascending: true });
          
        if (error) {
          console.error("Error fetching help steps:", error);
          setError("No se pudieron cargar los datos. Por favor, inténtalo de nuevo más tarde.");
          toast.error("Error al cargar el contenido de ayuda");
        } else if (data) {
          // Parse items from metadata if necessary
          const processedData = data.map(step => {
            // If there are items that need to be converted from JSON string, do it here
            return {
              ...step,
              items: step.items || []
            };
          });
          
          setHelpSteps(processedData);
        }
      } catch (error) {
        console.error("Error in fetchHelpContent:", error);
        setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.");
        toast.error("Error inesperado al cargar el contenido");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (category) {
      fetchHelpContent();
    }
  }, [category]);

  return {
    helpSteps,
    welcomeVideo,
    isLoading,
    error
  };
};
