
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
          // Process the data safely
          const processedData = data.map(step => {
            // Create a new object with the expected HelpStep structure
            const helpStep: HelpStep = {
              id: step.id,
              title: step.title,
              description: step.description,
              video_url: step.video_url,
              pdf_url: step.pdf_url,
              step_order: step.step_order,
              category: step.category,
              visible: step.visible,
              estimated_time: step.estimated_time,
              slug: step.slug,
              created_at: step.created_at,
              updated_at: step.updated_at
            };
            
            // Handle the items field specifically
            if (step.items && Array.isArray(step.items)) {
              helpStep.items = step.items;
            } else {
              helpStep.items = [];
            }
            
            return helpStep;
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
