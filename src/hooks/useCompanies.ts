import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Company = Database['public']['Tables']['companies']['Row'];

export const useCompany = (id: string) => {
  return useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      console.log('Fetching company with id:', id);
      
      if (!id) {
        throw new Error('Company ID is required');
      }

      // Cast the id to UUID explicitly in the query
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching company:', error);
        throw error;
      }

      if (!data) {
        console.error('No company found with id:', id);
        throw new Error('Company not found');
      }

      console.log('Company data fetched:', data);
      return data as Company;
    },
    retry: 1,
    retryDelay: 1000
  });
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });
      
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
      console.log('Starting company update:', { id, data });
      
      if (!id) {
        throw new Error('Company ID is required for update');
      }

      try {
        // First check if the company exists
        const { data: existingCompany, error: fetchError } = await supabase
          .from('companies')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) {
          console.error('Error checking company existence:', fetchError);
          throw new Error(`Company not found: ${fetchError.message}`);
        }

        if (!existingCompany) {
          throw new Error(`No company found with id ${id}`);
        }

        // Then perform the update
        const { data: updatedData, error: updateError } = await supabase
          .from('companies')
          .update(data)
          .eq('id', id)
          .select('*')
          .single();

        if (updateError) {
          console.error('Error updating company:', updateError);
          throw new Error(`Failed to update company: ${updateError.message}`);
        }

        if (!updatedData) {
          throw new Error(`No company found with id ${id}`);
        }

        console.log('Company updated successfully:', updatedData);
        return updatedData as Company;
      } catch (error) {
        console.error('Error in update operation:', error);
        throw error;
      }
    },
    onSuccess: (updatedCompany) => {
      // Update queries
      queryClient.setQueryData(['company', updatedCompany.id], updatedCompany);
      queryClient.setQueryData(['companies'], (oldData: Company[] | undefined) => {
        if (!oldData) return [updatedCompany];
        return oldData.map(company => 
          company.id === updatedCompany.id ? updatedCompany : company
        );
      });
    }
  });
};