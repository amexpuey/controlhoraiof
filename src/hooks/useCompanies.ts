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
        .maybeSingle();

      if (error) {
        console.error('Error fetching company:', error);
        throw error;
      }

      if (!data) {
        console.error('Company not found with ID:', id);
        throw new Error(`Company not found with ID: ${id}`);
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
      
      // Sort the data to always show INWOUT first
      const sortedData = (data || []).sort((a, b) => {
        if (a.title === 'INWOUT') return -1;
        if (b.title === 'INWOUT') return 1;
        return 0;
      });
      
      console.log('Fetched companies:', sortedData);
      return sortedData || [];
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

      console.log('Updating company data:', data);
      console.log('Updating company with data:', { id, data });

      // First verify the company exists
      const { data: existingData, error: fetchError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error checking company existence:', fetchError);
        throw fetchError;
      }

      if (!existingData) {
        console.error('Company not found with ID:', id);
        throw new Error(`Company not found with ID: ${id}`);
      }

      // Proceed with update since we know the company exists
      const { data: updatedCompany, error: updateError } = await supabase
        .from('companies')
        .update(data)
        .eq('id', id)
        .select()
        .maybeSingle();

      if (updateError) {
        console.error('Error updating company:', updateError);
        throw updateError;
      }

      if (!updatedCompany) {
        console.error('Update failed: Company not found with ID:', id);
        throw new Error(`Update failed: Company not found with ID: ${id}`);
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