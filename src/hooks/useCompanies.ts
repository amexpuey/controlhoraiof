import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Company = Database['public']['Tables']['companies']['Row'];

const isValidUUID = (uuid: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);

export const useCompany = (id: string) => {
  return useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      if (!id || !isValidUUID(id)) {
        throw new Error('Invalid or missing company ID');
      }

      console.log('Fetching company with ID:', id);
      
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.error('Company not found with ID:', id);
          throw new Error(`Company not found with ID: ${id}`);
        }
        console.error('Error fetching company:', error);
        throw error;
      }

      console.log('Fetched company data:', data);
      return data;
    },
    retry: false,
    refetchOnWindowFocus: true,
    gcTime: 0,
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
      
      console.log('Fetched companies:', data);
      return data || [];
    },
    refetchOnWindowFocus: true,
    gcTime: 0,
    staleTime: 0
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Company> }) => {
      if (!id || !isValidUUID(id)) {
        throw new Error('Invalid company ID for update');
      }

      console.log('Updating company with data:', { id, data });

      // First verify the company exists
      const { data: existingCompany, error: fetchError } = await supabase
        .from('companies')
        .select()
        .eq('id', id)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          console.error('Company not found with ID:', id);
          throw new Error(`Company not found with ID: ${id}`);
        }
        console.error('Error checking company existence:', fetchError);
        throw fetchError;
      }

      // Proceed with update since we know the company exists
      const { data: updatedCompany, error: updateError } = await supabase
        .from('companies')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        if (updateError.code === 'PGRST116') {
          console.error('Update failed: Company not found with ID:', id);
          throw new Error(`Update failed: Company not found with ID: ${id}`);
        }
        console.error('Error updating company:', updateError);
        throw updateError;
      }

      console.log('Successfully updated company:', updatedCompany);
      return updatedCompany;
    },
    onSuccess: (updatedCompany) => {
      // Invalidate and refetch both queries
      queryClient.invalidateQueries({ queryKey: ['company', updatedCompany.id] });
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      // Force an immediate refetch
      queryClient.refetchQueries({ queryKey: ['company', updatedCompany.id] });
      queryClient.refetchQueries({ queryKey: ['companies'] });
      console.log('Cache invalidated and refetched for updated company');
    },
    onError: (error) => {
      console.error('Update mutation error:', error);
    },
  });
};