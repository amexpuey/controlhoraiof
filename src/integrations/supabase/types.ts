export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string
          featured_image: string
          id: string
          published_at: string
          reading_time: number
          related_apps: string[] | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string
          excerpt: string
          featured_image: string
          id?: string
          published_at?: string
          reading_time?: number
          related_apps?: string[] | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          featured_image?: string
          id?: string
          published_at?: string
          reading_time?: number
          related_apps?: string[] | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string | null
          description: string
          features: string[] | null
          free_plan: string | null
          free_trial: string | null
          highlights: string[] | null
          id: string
          img_url: string
          is_top_rated: boolean
          logo_url: string
          platforms: string[] | null
          pricing_billed_annually: boolean | null
          pricing_billing_period: string
          pricing_currency: string
          pricing_description: string | null
          pricing_per_user: boolean | null
          pricing_starting_price: number
          rating: number | null
          slug: string
          title: string
          type: string
          updated_at: string | null
          url: string
          use_case: string | null
          verified: boolean
          votes: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string
          features?: string[] | null
          free_plan?: string | null
          free_trial?: string | null
          highlights?: string[] | null
          id?: string
          img_url?: string
          is_top_rated?: boolean
          logo_url?: string
          platforms?: string[] | null
          pricing_billed_annually?: boolean | null
          pricing_billing_period?: string
          pricing_currency?: string
          pricing_description?: string | null
          pricing_per_user?: boolean | null
          pricing_starting_price?: number
          rating?: number | null
          slug: string
          title?: string
          type?: string
          updated_at?: string | null
          url?: string
          use_case?: string | null
          verified?: boolean
          votes?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string
          features?: string[] | null
          free_plan?: string | null
          free_trial?: string | null
          highlights?: string[] | null
          id?: string
          img_url?: string
          is_top_rated?: boolean
          logo_url?: string
          platforms?: string[] | null
          pricing_billed_annually?: boolean | null
          pricing_billing_period?: string
          pricing_currency?: string
          pricing_description?: string | null
          pricing_per_user?: boolean | null
          pricing_starting_price?: number
          rating?: number | null
          slug?: string
          title?: string
          type?: string
          updated_at?: string | null
          url?: string
          use_case?: string | null
          verified?: boolean
          votes?: number | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          observations: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          observations?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          observations?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_size: string | null
          created_at: string
          email: string
          has_full_access: boolean | null
          id: string
          is_email_verified: boolean | null
          onboarding_status: string
          referral_code: string | null
          referral_count: number | null
          referred_by: string | null
          selected_features: string[] | null
          updated_at: string
        }
        Insert: {
          company_size?: string | null
          created_at?: string
          email: string
          has_full_access?: boolean | null
          id: string
          is_email_verified?: boolean | null
          onboarding_status?: string
          referral_code?: string | null
          referral_count?: number | null
          referred_by?: string | null
          selected_features?: string[] | null
          updated_at?: string
        }
        Update: {
          company_size?: string | null
          created_at?: string
          email?: string
          has_full_access?: boolean | null
          id?: string
          is_email_verified?: boolean | null
          onboarding_status?: string
          referral_code?: string | null
          referral_count?: number | null
          referred_by?: string | null
          selected_features?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_referred_by"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["referral_code"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      set_admin_id: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
