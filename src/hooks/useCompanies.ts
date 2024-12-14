import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Company = Database['public']['Tables']['companies']['Row'];

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*');
      
      if (error) {
        console.error('Error fetching companies:', error);
        throw error;
      }

      if (!data) {
        console.warn('No companies found');
        return [];
      }

      return data as Company[];
    }
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Company> }) => {
      console.log('Sending update to Supabase:', { id, data });
      
      // First check if the company exists
      const { data: existingCompany, error: fetchError } = await supabase
        .from('companies')
        .select()
        .eq('id', id)
        .single();
      
      if (fetchError) {
        console.error('Error fetching company:', fetchError);
        if (fetchError.code === 'PGRST116') {
          throw new Error(`Company with id ${id} not found`);
        }
        throw new Error(`Failed to fetch company: ${fetchError.message}`);
      }

      // Proceed with update since we know the company exists
      const { data: updatedData, error: updateError } = await supabase
        .from('companies')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (updateError) {
        console.error('Error updating company:', updateError);
        throw new Error(`Failed to update company: ${updateError.message}`);
      }
      
      if (!updatedData) {
        throw new Error(`Failed to update company with id ${id}`);
      }
      
      return updatedData;
    },
    onSuccess: (updatedCompany) => {
      // Update the cache with the new data
      queryClient.setQueryData(['companies'], (oldData: Company[] | undefined) => {
        if (!oldData) return [updatedCompany];
        return oldData.map(company => 
          company.id === updatedCompany.id ? updatedCompany : company
        );
      });

      // Invalidate the query to ensure data is fresh
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    }
  });
};