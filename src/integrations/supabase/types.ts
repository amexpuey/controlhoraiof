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
      blog_hyperlinks: {
        Row: {
          author_name: string | null
          author_photo: string | null
          category: string | null
          collection_id: string | null
          created_on: string | null
          embedding: string | null
          featured: boolean | null
          item_id: string
          main_image: string | null
          meta_description: string | null
          metadata: Json | null
          name: string | null
          post_body: string | null
          post_summary: string | null
          slug: string | null
          thumbnail_image: string | null
          url: string | null
        }
        Insert: {
          author_name?: string | null
          author_photo?: string | null
          category?: string | null
          collection_id?: string | null
          created_on?: string | null
          embedding?: string | null
          featured?: boolean | null
          item_id: string
          main_image?: string | null
          meta_description?: string | null
          metadata?: Json | null
          name?: string | null
          post_body?: string | null
          post_summary?: string | null
          slug?: string | null
          thumbnail_image?: string | null
          url?: string | null
        }
        Update: {
          author_name?: string | null
          author_photo?: string | null
          category?: string | null
          collection_id?: string | null
          created_on?: string | null
          embedding?: string | null
          featured?: boolean | null
          item_id?: string
          main_image?: string | null
          meta_description?: string | null
          metadata?: Json | null
          name?: string | null
          post_body?: string | null
          post_summary?: string | null
          slug?: string | null
          thumbnail_image?: string | null
          url?: string | null
        }
        Relationships: []
      }
      blog_hyperlinks_vectorstore: {
        Row: {
          content: string | null
          embedding: string | null
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          metadata?: Json | null
        }
        Relationships: []
      }
      blog_inwout_context: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
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
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      estatuto_embeddings: {
        Row: {
          content: string
          embedding: string
          id: string
          metadata: Json | null
        }
        Insert: {
          content: string
          embedding: string
          id?: string
          metadata?: Json | null
        }
        Update: {
          content?: string
          embedding?: string
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      help_steps: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          estimated_time: string | null
          id: string
          pdf_url: string | null
          slug: string | null
          step_order: number | null
          title: string
          updated_at: string | null
          video_url: string | null
          visible: boolean | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          estimated_time?: string | null
          id?: string
          pdf_url?: string | null
          slug?: string | null
          step_order?: number | null
          title: string
          updated_at?: string | null
          video_url?: string | null
          visible?: boolean | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          estimated_time?: string | null
          id?: string
          pdf_url?: string | null
          slug?: string | null
          step_order?: number | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
          visible?: boolean | null
        }
        Relationships: []
      }
      hyperlinker_inwout: {
        Row: {
          content: string | null
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      inwout_embeddings: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
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
      seo_heist_factorialhr: {
        Row: {
          content: string | null
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      bytea_to_text: {
        Args: {
          data: string
        }
        Returns: string
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      http: {
        Args: {
          request: Database["public"]["CompositeTypes"]["http_request"]
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              url: string
              content_type: string
              body: string
              headers: Json
            }
            Returns: Json
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: string
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      openai_embedding:
        | {
            Args: {
              model: string
              input: string
            }
            Returns: string
          }
        | {
            Args: {
              model: string
              input: string
              api_key: string
            }
            Returns: string
          }
      set_admin_id: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      text_to_bytea: {
        Args: {
          data: string
        }
        Returns: string
      }
      urlencode:
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
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
