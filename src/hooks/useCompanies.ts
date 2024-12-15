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

      const timestamp = new Date().getTime();
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .limit(1)
        .maybeSingle()
        .returns<Company>()
        .throwOnError();
      
      if (error) {
        console.error('Error fetching company:', error);
        throw error;
      }

      if (!data) {
        console.error('No company found with id:', id);
        throw new Error(`Company not found with id: ${id}`);
      }

      console.log('Company data fetched:', data);
      return data;
    },
    retry: 1,
    retryDelay: 1000
  });
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const timestamp = new Date().getTime();
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false })
        .returns<Company[]>()
        .throwOnError();
      
      if (error) {
        console.error('Error fetching companies:', error);
        throw error;
      }

      if (!data) {
        console.warn('No companies found');
        return [];
      }

      return data;
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

      console.log('Updating company data:', data);

      const timestamp = new Date().getTime();
      const { data: updatedData, error: updateError } = await supabase
        .from('companies')
        .update(data)
        .eq('id', id)
        .select()
        .maybeSingle()
        .returns<Company>()
        .throwOnError();

      if (updateError) {
        console.error('Error updating company:', updateError);
        throw updateError;
      }

      if (!updatedData) {
        throw new Error(`No company found with id ${id}`);
      }

      console.log('Company updated successfully:', updatedData);
      return updatedData;
    },
    onSuccess: (updatedCompany) => {
      // Update queries
      queryClient.setQueryData(['company', updatedCompany.id], updatedCompany);
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    }
  });
};