import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Company = Database['public']['Tables']['companies']['Row'];

export const useCompany = (id: string) => {
  return useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      console.log('Fetching company with id:', id);
      const { data, error } = await supabase
        .from('companies')
        .select()
        .eq('id', id)
        .limit(1)
        .single();
      
      if (error) {
        console.error('Error fetching company:', error);
        throw error;
      }

      if (!data) {
        console.warn('No company found with id:', id);
        return null;
      }

      return data as Company;
    },
    retry: false
  });
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select();
      
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

      // Also update the individual company query
      queryClient.setQueryData(['company', updatedCompany.id], updatedCompany);

      // Invalidate queries to ensure data is fresh
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['company', updatedCompany.id] });
    }
  });
};