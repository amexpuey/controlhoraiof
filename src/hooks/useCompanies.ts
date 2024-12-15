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

      const { data, error } = await supabase
        .from('companies')
        .select()
        .eq('id', id)
        .limit(1);
      
      if (error) {
        console.error('Error fetching company:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.error('No company found with id:', id);
        throw new Error(`Company not found with id: ${id}`);
      }

      console.log('Company data fetched:', data[0]);
      return data[0] as Company;
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
        .select()
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
        const { data: checkData, error: checkError } = await supabase
          .from('companies')
          .select()
          .eq('id', id)
          .limit(1);

        if (checkError) {
          console.error('Error checking company existence:', checkError);
          throw new Error(`Failed to verify company: ${checkError.message}`);
        }

        if (!checkData || checkData.length === 0) {
          throw new Error(`Company not found with id ${id}`);
        }

        // If we get here, the company exists, proceed with update
        const { data: updatedData, error: updateError } = await supabase
          .from('companies')
          .update(data)
          .eq('id', id)
          .select();

        if (updateError) {
          console.error('Error updating company:', updateError);
          throw new Error(`Failed to update company: ${updateError.message}`);
        }

        if (!updatedData || updatedData.length === 0) {
          throw new Error(`No company found with id ${id}`);
        }

        console.log('Company updated successfully:', updatedData[0]);
        return updatedData[0] as Company;
      } catch (error) {
        console.error('Error in update operation:', error);
        throw error;
      }
    },
    onSuccess: (updatedCompany) => {
      // Update queries
      queryClient.setQueryData(['company', updatedCompany.id], updatedCompany);
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    }
  });
};