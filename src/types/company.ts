import type { Database } from '@/integrations/supabase/types';

export type Company = Database['public']['Tables']['companies']['Row'];
export type CompanyFormData = Partial<Company>;
