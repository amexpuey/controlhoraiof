import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Company = Database['public']['Tables']['companies']['Row'];

const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const useCompany = (id: string) => {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      console.log('Fetching company with id:', id);
      
      if (!id || !isValidUUID(id)) {
        console.error('Invalid company ID:', id);
        throw new Error('Company ID is required and must be a valid UUID');
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
        console.error('Company not found:', id);
        throw new Error('Company not found');
      }

      console.log('Company data fetched:', data);
      return data;
    },
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 0
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
    },
    refetchOnWindowFocus: true,
    staleTime: 0
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Company> }) => {
      console.log('Starting company update:', { id, data });
      
      if (!id || !isValidUUID(id)) {
        console.error('Invalid company ID for update:', id);
        throw new Error('Company ID is required and must be a valid UUID for update');
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

      if (!updatedCompany) {
        throw new Error('Company not found or update failed');
      }

      console.log('Company updated successfully:', updatedCompany);
      return updatedCompany;
    },
    onSuccess: (updatedCompany) => {
      queryClient.invalidateQueries({ queryKey: ['company', updatedCompany.id] });
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.setQueryData(['company', updatedCompany.id], updatedCompany);
    },
    onError: (error) => {
      console.error('Error in update mutation:', error);
    }
  });
};