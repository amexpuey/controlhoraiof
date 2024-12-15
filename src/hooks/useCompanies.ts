import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Company = Database['public']['Tables']['companies']['Row'];

export const useCompany = (id: string) => {
  return useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      console.log('Fetching company with id:', id);
      
      if (!id || typeof id !== 'string') {
        console.error('Invalid company ID:', id);
        throw new Error('Company ID is required and must be a string');
      }

      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching company:', error);
        throw error;
      }

      if (!data) {
        console.warn('No company found with id:', id);
        return null;
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
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching companies:', error);
        throw error;
      }

      if (!data || data.length === 0) {
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
      
      if (!id || typeof id !== 'string') {
        console.error('Invalid company ID for update:', id);
        throw new Error('Company ID is required and must be a string for update');
      }

      console.log('Updating company data:', data);

      const { data: updatedCompany, error: updateError } = await supabase
        .from('companies')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating company:', updateError);
        throw updateError;
      }

      console.log('Company updated successfully:', updatedCompany);
      return updatedCompany;
    },
    onSuccess: (updatedCompany) => {
      queryClient.setQueryData(['company', updatedCompany.id], updatedCompany);
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    }
  });
};