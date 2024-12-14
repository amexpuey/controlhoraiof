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
      console.log('Updating company data:', data);
      
      // First, verify the company exists
      const { data: existingCompany, error: fetchError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (fetchError) {
        console.error('Error checking company existence:', fetchError);
        throw new Error(`Failed to check company existence: ${fetchError.message}`);
      }

      if (!existingCompany) {
        const notFoundError = new Error(`Company with id ${id} not found`);
        console.error('Company not found:', { id, error: notFoundError });
        throw notFoundError;
      }

      // Proceed with update since we know the company exists
      const { data: updatedData, error: updateError } = await supabase
        .from('companies')
        .update(data)
        .eq('id', id)
        .select()
        .maybeSingle();
      
      if (updateError) {
        console.error('Error updating company:', updateError);
        throw new Error(`Failed to update company: ${updateError.message}`);
      }
      
      if (!updatedData) {
        const updateFailedError = new Error(`Failed to update company with id ${id}`);
        console.error('Update failed:', { id, error: updateFailedError });
        throw updateFailedError;
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