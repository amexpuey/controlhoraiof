import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useReferralStatus = (userId?: string) => {
  return useQuery({
    queryKey: ['referralStatus', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('referral_code, has_full_access, referral_count')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching referral status:', error);
        throw error;
      }

      return data;
    },
    enabled: !!userId
  });
};