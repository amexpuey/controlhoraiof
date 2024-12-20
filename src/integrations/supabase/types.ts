export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: CompaniesTable;
      profiles: ProfilesTable;
    };
    Views: Record<string, never>;
    Functions: {
      set_admin_id: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

interface CompaniesTable {
  Row: {
    created_at: string | null;
    description: string;
    features: string[] | null;
    highlights: string[] | null;
    id: string;
    img_url: string;
    is_top_rated: boolean;
    logo_url: string;
    pricing_billing_period: string;
    pricing_currency: string;
    pricing_starting_price: number;
    title: string;
    type: string;
    updated_at: string | null;
    url: string;
    verified: boolean;
    votes: number | null;
  };
  Insert: Partial<CompaniesTable['Row']>;
  Update: Partial<CompaniesTable['Row']>;
}

interface ProfilesTable {
  Row: {
    company_size: string | null;
    created_at: string;
    email: string;
    has_full_access: boolean | null;
    id: string;
    is_email_verified: boolean | null;
    onboarding_status: string;
    referral_code: string | null;
    referral_count: number | null;
    referred_by: string | null;
    selected_features: string[] | null;
    updated_at: string;
  };
  Insert: Partial<ProfilesTable['Row']>;
  Update: Partial<ProfilesTable['Row']>;
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;