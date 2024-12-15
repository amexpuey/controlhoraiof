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

      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data || null;
    },
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 0,
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

      if (error) throw error;
      return data || [];
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Company> }) => {
      if (!id || !isValidUUID(id)) {
        throw new Error('Invalid company ID for update');
      }

      const { data: updatedCompany, error } = await supabase
        .from('companies')
        .update(data)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!updatedCompany) throw new Error('Update failed: No rows modified');

      return updatedCompany;
    },
    onSuccess: (updatedCompany) => {
      queryClient.invalidateQueries(['company', updatedCompany.id]);
      queryClient.invalidateQueries(['companies']);
    },
    onError: (error) => {
      console.error('Update mutation error:', error);
    },
  });
};