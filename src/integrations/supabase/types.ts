export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      action_center_logs: {
        Row: {
          action_type: string
          client_email: string | null
          company_name: string | null
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
        }
        Insert: {
          action_type: string
          client_email?: string | null
          company_name?: string | null
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
        }
        Update: {
          action_type?: string
          client_email?: string | null
          company_name?: string | null
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
        }
        Relationships: []
      }
      action_center_settings: {
        Row: {
          description: string | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      ai_assistant_prompts: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
          user_id: string
          version: number | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          user_id: string
          version?: number | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          user_id?: string
          version?: number | null
        }
        Relationships: []
      }
      ai_assistant_rules: {
        Row: {
          actions: Json
          apply_to_threads: boolean | null
          condition: string
          created_at: string | null
          description: string | null
          enabled: boolean | null
          group_id: string | null
          id: string
          is_automated: boolean | null
          name: string
          priority: number | null
          rule_type: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actions: Json
          apply_to_threads?: boolean | null
          condition: string
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          group_id?: string | null
          id?: string
          is_automated?: boolean | null
          name: string
          priority?: number | null
          rule_type?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actions?: Json
          apply_to_threads?: boolean | null
          condition?: string
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          group_id?: string | null
          id?: string
          is_automated?: boolean | null
          name?: string
          priority?: number | null
          rule_type?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_assistant_rules_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "ai_rule_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_draft_suggestions: {
        Row: {
          body: string
          confidence: number | null
          context_emails_count: number | null
          created_at: string | null
          email_id: string
          id: string
          reasoning: string | null
          status: string | null
          subject: string | null
          tone: string | null
          updated_at: string | null
          used_at: string | null
          user_id: string
        }
        Insert: {
          body: string
          confidence?: number | null
          context_emails_count?: number | null
          created_at?: string | null
          email_id: string
          id?: string
          reasoning?: string | null
          status?: string | null
          subject?: string | null
          tone?: string | null
          updated_at?: string | null
          used_at?: string | null
          user_id: string
        }
        Update: {
          body?: string
          confidence?: number | null
          context_emails_count?: number | null
          created_at?: string | null
          email_id?: string
          id?: string
          reasoning?: string | null
          status?: string | null
          subject?: string | null
          tone?: string | null
          updated_at?: string | null
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_draft_suggestions_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "inbound_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_email_drafts: {
        Row: {
          accepted: boolean | null
          body_html: string | null
          body_text: string | null
          created_at: string | null
          edited: boolean | null
          id: string
          inbound_email_id: string | null
          model_used: string | null
          sent_at: string | null
          subject: string | null
          tokens_used: number | null
          tone: string | null
          user_id: string | null
        }
        Insert: {
          accepted?: boolean | null
          body_html?: string | null
          body_text?: string | null
          created_at?: string | null
          edited?: boolean | null
          id?: string
          inbound_email_id?: string | null
          model_used?: string | null
          sent_at?: string | null
          subject?: string | null
          tokens_used?: number | null
          tone?: string | null
          user_id?: string | null
        }
        Update: {
          accepted?: boolean | null
          body_html?: string | null
          body_text?: string | null
          created_at?: string | null
          edited?: boolean | null
          id?: string
          inbound_email_id?: string | null
          model_used?: string | null
          sent_at?: string | null
          subject?: string | null
          tokens_used?: number | null
          tone?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_email_drafts_inbound_email_id_fkey"
            columns: ["inbound_email_id"]
            isOneToOne: false
            referencedRelation: "inbound_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_pending_approvals: {
        Row: {
          confidence: number | null
          created_at: string | null
          decided_at: string | null
          email_id: string
          id: string
          reasoning: string | null
          status: string | null
          suggested_actions: Json
          suggested_rule_id: string | null
          user_id: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string | null
          decided_at?: string | null
          email_id: string
          id?: string
          reasoning?: string | null
          status?: string | null
          suggested_actions: Json
          suggested_rule_id?: string | null
          user_id: string
        }
        Update: {
          confidence?: number | null
          created_at?: string | null
          decided_at?: string | null
          email_id?: string
          id?: string
          reasoning?: string | null
          status?: string | null
          suggested_actions?: Json
          suggested_rule_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_pending_approvals_suggested_rule_id_fkey"
            columns: ["suggested_rule_id"]
            isOneToOne: false
            referencedRelation: "ai_assistant_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_plan_executions: {
        Row: {
          created_at: string
          email_id: string
          executed: boolean
          executed_at: string | null
          id: string
          plan: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email_id: string
          executed?: boolean
          executed_at?: string | null
          id?: string
          plan: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email_id?: string
          executed?: boolean
          executed_at?: string | null
          id?: string
          plan?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_plan_executions_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "inbound_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_rule_executions: {
        Row: {
          actions_taken: Json
          created_at: string | null
          email_id: string
          error_message: string | null
          execution_time_ms: number | null
          id: string
          result: string | null
          rule_id: string | null
          user_id: string
        }
        Insert: {
          actions_taken: Json
          created_at?: string | null
          email_id: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          result?: string | null
          rule_id?: string | null
          user_id: string
        }
        Update: {
          actions_taken?: Json
          created_at?: string | null
          email_id?: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          result?: string | null
          rule_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_rule_executions_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "ai_assistant_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_rule_groups: {
        Row: {
          created_at: string | null
          description: string | null
          enabled: boolean | null
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_rule_test_history: {
        Row: {
          confidence: number | null
          created_at: string | null
          email_from: string | null
          email_id: string
          email_subject: string | null
          executed: boolean | null
          execution_result: string | null
          id: string
          reasoning: string | null
          suggested_rule_id: string | null
          suggested_rule_name: string | null
          tested_at: string | null
          user_id: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string | null
          email_from?: string | null
          email_id: string
          email_subject?: string | null
          executed?: boolean | null
          execution_result?: string | null
          id?: string
          reasoning?: string | null
          suggested_rule_id?: string | null
          suggested_rule_name?: string | null
          tested_at?: string | null
          user_id: string
        }
        Update: {
          confidence?: number | null
          created_at?: string | null
          email_from?: string | null
          email_id?: string
          email_subject?: string | null
          executed?: boolean | null
          execution_result?: string | null
          id?: string
          reasoning?: string | null
          suggested_rule_id?: string | null
          suggested_rule_name?: string | null
          tested_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_rule_test_history_suggested_rule_id_fkey"
            columns: ["suggested_rule_id"]
            isOneToOne: false
            referencedRelation: "ai_assistant_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_rules: {
        Row: {
          actions: Json
          created_at: string
          enabled: boolean
          group_id: string | null
          id: string
          instructions: string
          name: string
          priority: number
          system_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          actions?: Json
          created_at?: string
          enabled?: boolean
          group_id?: string | null
          id?: string
          instructions: string
          name: string
          priority?: number
          system_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          actions?: Json
          created_at?: string
          enabled?: boolean
          group_id?: string | null
          id?: string
          instructions?: string
          name?: string
          priority?: number
          system_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_rules_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "rule_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      alba_conversations: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          session_id: string
          source: string | null
          updated_at: string | null
          user_email: string | null
          user_name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          session_id: string
          source?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          session_id?: string
          source?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      alba_corrections: {
        Row: {
          corrected_content: string
          created_at: string | null
          created_by: string | null
          id: string
          is_positive: boolean | null
          message_id: string | null
          original_content: string
          suggested_links: Json | null
          topics: string[] | null
          user_question: string
        }
        Insert: {
          corrected_content: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_positive?: boolean | null
          message_id?: string | null
          original_content: string
          suggested_links?: Json | null
          topics?: string[] | null
          user_question: string
        }
        Update: {
          corrected_content?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_positive?: boolean | null
          message_id?: string | null
          original_content?: string
          suggested_links?: Json | null
          topics?: string[] | null
          user_question?: string
        }
        Relationships: [
          {
            foreignKeyName: "alba_corrections_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "alba_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      alba_demo_bookings: {
        Row: {
          attendee_email: string
          attendee_name: string | null
          company_name: string | null
          conversation_id: string | null
          created_at: string | null
          end_time: string
          event_id: string
          id: string
          meet_link: string | null
          num_employees: number | null
          observations: string | null
          start_time: string
          status: string | null
        }
        Insert: {
          attendee_email: string
          attendee_name?: string | null
          company_name?: string | null
          conversation_id?: string | null
          created_at?: string | null
          end_time: string
          event_id: string
          id?: string
          meet_link?: string | null
          num_employees?: number | null
          observations?: string | null
          start_time: string
          status?: string | null
        }
        Update: {
          attendee_email?: string
          attendee_name?: string | null
          company_name?: string | null
          conversation_id?: string | null
          created_at?: string | null
          end_time?: string
          event_id?: string
          id?: string
          meet_link?: string | null
          num_employees?: number | null
          observations?: string | null
          start_time?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alba_demo_bookings_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "alba_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      alba_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          latency_ms: number | null
          rating: number | null
          role: string
          sources: Json | null
          tokens_used: number | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          latency_ms?: number | null
          rating?: number | null
          role: string
          sources?: Json | null
          tokens_used?: number | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          latency_ms?: number | null
          rating?: number | null
          role?: string
          sources?: Json | null
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "alba_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "alba_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      app_config: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      authorized_emails: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
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
          author_avatar_url: string | null
          canonical_url: string | null
          category: string
          comparison_type: string | null
          content: string
          content_html: string | null
          content_markdown: string | null
          created_at: string
          excerpt: string
          featured_image: string
          featured_image_alt: string | null
          focus_keyword: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          og_image_url: string | null
          pillar: string | null
          primary_cta_text: string | null
          primary_cta_url: string | null
          published_at: string
          reading_time: number
          related_apps: string[] | null
          related_post_slugs: string[] | null
          related_solution_slugs: string[] | null
          scheduled_at: string | null
          schema_json: Json | null
          secondary_keywords: string[] | null
          show_comparison_cta: boolean | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          author_avatar_url?: string | null
          canonical_url?: string | null
          category: string
          comparison_type?: string | null
          content: string
          content_html?: string | null
          content_markdown?: string | null
          created_at?: string
          excerpt: string
          featured_image: string
          featured_image_alt?: string | null
          focus_keyword?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          pillar?: string | null
          primary_cta_text?: string | null
          primary_cta_url?: string | null
          published_at?: string
          reading_time?: number
          related_apps?: string[] | null
          related_post_slugs?: string[] | null
          related_solution_slugs?: string[] | null
          scheduled_at?: string | null
          schema_json?: Json | null
          secondary_keywords?: string[] | null
          show_comparison_cta?: boolean | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          author_avatar_url?: string | null
          canonical_url?: string | null
          category?: string
          comparison_type?: string | null
          content?: string
          content_html?: string | null
          content_markdown?: string | null
          created_at?: string
          excerpt?: string
          featured_image?: string
          featured_image_alt?: string | null
          focus_keyword?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          pillar?: string | null
          primary_cta_text?: string | null
          primary_cta_url?: string | null
          published_at?: string
          reading_time?: number
          related_apps?: string[] | null
          related_post_slugs?: string[] | null
          related_solution_slugs?: string[] | null
          scheduled_at?: string | null
          schema_json?: Json | null
          secondary_keywords?: string[] | null
          show_comparison_cta?: boolean | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      call_campaigns: {
        Row: {
          cnae_codes: number[] | null
          created_at: string | null
          created_by: string | null
          cta: string | null
          id: string
          metrics: Json | null
          name: string
          pain_point: string | null
          priority: string | null
          sales_cycle: string | null
          sector: string | null
          solution: string | null
          status: string | null
          target_employees_max: number | null
          target_employees_min: number | null
          ticket_level: string | null
          updated_at: string | null
        }
        Insert: {
          cnae_codes?: number[] | null
          created_at?: string | null
          created_by?: string | null
          cta?: string | null
          id?: string
          metrics?: Json | null
          name: string
          pain_point?: string | null
          priority?: string | null
          sales_cycle?: string | null
          sector?: string | null
          solution?: string | null
          status?: string | null
          target_employees_max?: number | null
          target_employees_min?: number | null
          ticket_level?: string | null
          updated_at?: string | null
        }
        Update: {
          cnae_codes?: number[] | null
          created_at?: string | null
          created_by?: string | null
          cta?: string | null
          id?: string
          metrics?: Json | null
          name?: string
          pain_point?: string | null
          priority?: string | null
          sales_cycle?: string | null
          sector?: string | null
          solution?: string | null
          status?: string | null
          target_employees_max?: number | null
          target_employees_min?: number | null
          ticket_level?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      call_companies: {
        Row: {
          campaign_id: string | null
          city: string | null
          contact_name: string | null
          contact_role: string | null
          created_at: string | null
          current_tool_id: string | null
          days_in_stage: number | null
          deal_value: number | null
          email_1: string | null
          email_2: string | null
          employees: number | null
          first_call_date: string | null
          icp_code: string | null
          id: string
          last_call_date: string | null
          name: string
          next_action_at: string | null
          note_2: string | null
          notes: string | null
          owner_user_id: string
          phone: string | null
          phone_2: string | null
          pipeline_id: string | null
          revenue: string | null
          source: string | null
          stage_entered_at: string | null
          stage_id: string | null
          status: string
          tag: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          campaign_id?: string | null
          city?: string | null
          contact_name?: string | null
          contact_role?: string | null
          created_at?: string | null
          current_tool_id?: string | null
          days_in_stage?: number | null
          deal_value?: number | null
          email_1?: string | null
          email_2?: string | null
          employees?: number | null
          first_call_date?: string | null
          icp_code?: string | null
          id?: string
          last_call_date?: string | null
          name: string
          next_action_at?: string | null
          note_2?: string | null
          notes?: string | null
          owner_user_id?: string
          phone?: string | null
          phone_2?: string | null
          pipeline_id?: string | null
          revenue?: string | null
          source?: string | null
          stage_entered_at?: string | null
          stage_id?: string | null
          status?: string
          tag?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          campaign_id?: string | null
          city?: string | null
          contact_name?: string | null
          contact_role?: string | null
          created_at?: string | null
          current_tool_id?: string | null
          days_in_stage?: number | null
          deal_value?: number | null
          email_1?: string | null
          email_2?: string | null
          employees?: number | null
          first_call_date?: string | null
          icp_code?: string | null
          id?: string
          last_call_date?: string | null
          name?: string
          next_action_at?: string | null
          note_2?: string | null
          notes?: string | null
          owner_user_id?: string
          phone?: string | null
          phone_2?: string | null
          pipeline_id?: string | null
          revenue?: string | null
          source?: string | null
          stage_entered_at?: string | null
          stage_id?: string | null
          status?: string
          tag?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "call_companies_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "call_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_companies_current_tool_id_fkey"
            columns: ["current_tool_id"]
            isOneToOne: false
            referencedRelation: "call_tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_companies_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_companies_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "pipeline_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      call_contacts: {
        Row: {
          company_id: string
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          is_primary: boolean | null
          last_name: string | null
          phone: string | null
          role: string | null
          updated_at: string | null
          validated: boolean | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_primary?: boolean | null
          last_name?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          validated?: boolean | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_primary?: boolean | null
          last_name?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          validated?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "call_contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "call_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      call_icp_filters: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          max_employees: number | null
          min_employees: number | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          max_employees?: number | null
          min_employees?: number | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          max_employees?: number | null
          min_employees?: number | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      call_imports: {
        Row: {
          campaign_id: string | null
          created_by: string
          error_details: Json | null
          filename: string
          id: string
          imported_at: string | null
          rows_errors: number | null
          rows_success: number | null
          rows_total: number | null
        }
        Insert: {
          campaign_id?: string | null
          created_by?: string
          error_details?: Json | null
          filename: string
          id?: string
          imported_at?: string | null
          rows_errors?: number | null
          rows_success?: number | null
          rows_total?: number | null
        }
        Update: {
          campaign_id?: string | null
          created_by?: string
          error_details?: Json | null
          filename?: string
          id?: string
          imported_at?: string | null
          rows_errors?: number | null
          rows_success?: number | null
          rows_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "call_imports_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "call_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      call_logs: {
        Row: {
          at: string | null
          company_id: string
          contact_id: string | null
          created_at: string | null
          created_by: string
          duration_sec: number | null
          id: string
          notes: string | null
          outcome: string
        }
        Insert: {
          at?: string | null
          company_id: string
          contact_id?: string | null
          created_at?: string | null
          created_by?: string
          duration_sec?: number | null
          id?: string
          notes?: string | null
          outcome: string
        }
        Update: {
          at?: string | null
          company_id?: string
          contact_id?: string | null
          created_at?: string | null
          created_by?: string
          duration_sec?: number | null
          id?: string
          notes?: string | null
          outcome?: string
        }
        Relationships: [
          {
            foreignKeyName: "call_logs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "call_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_logs_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "call_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      call_pipedrive_sync: {
        Row: {
          company_id: string
          created_at: string | null
          deal_id: number | null
          deal_stage: string | null
          id: string
          last_synced_at: string | null
          org_id: number | null
          person_id: number | null
          sync_error: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          deal_id?: number | null
          deal_stage?: string | null
          id?: string
          last_synced_at?: string | null
          org_id?: number | null
          person_id?: number | null
          sync_error?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          deal_id?: number | null
          deal_stage?: string | null
          id?: string
          last_synced_at?: string | null
          org_id?: number | null
          person_id?: number | null
          sync_error?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "call_pipedrive_sync_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "call_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      call_scripts: {
        Row: {
          content_md: string
          created_at: string | null
          created_by: string
          icp_code: string
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content_md: string
          created_at?: string | null
          created_by?: string
          icp_code: string
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content_md?: string
          created_at?: string | null
          created_by?: string
          icp_code?: string
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      call_tasks: {
        Row: {
          activity_type: string | null
          company_id: string
          completed_at: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string
          due_at: string
          id: string
          notes: string | null
          status: string
          type: string
        }
        Insert: {
          activity_type?: string | null
          company_id: string
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string
          due_at: string
          id?: string
          notes?: string | null
          status?: string
          type: string
        }
        Update: {
          activity_type?: string | null
          company_id?: string
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string
          due_at?: string
          id?: string
          notes?: string | null
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "call_tasks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "call_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "call_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      call_tools: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      campaign_logs: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          id: string
          recipient_id: string | null
          response: string | null
          sent_at: string | null
          status: string | null
          webhook_url: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          recipient_id?: string | null
          response?: string | null
          sent_at?: string | null
          status?: string | null
          webhook_url?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          recipient_id?: string | null
          response?: string | null
          sent_at?: string | null
          status?: string | null
          webhook_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_logs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_logs_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "campaign_recipients"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_playbooks: {
        Row: {
          call_scripts: Json
          campaign_id: string
          checklists: Json
          created_at: string | null
          created_by: string | null
          daily_routine: Json
          decision_tree: Json
          id: string
          kpis: Json
          objections: Json
          updated_at: string | null
        }
        Insert: {
          call_scripts?: Json
          campaign_id: string
          checklists?: Json
          created_at?: string | null
          created_by?: string | null
          daily_routine?: Json
          decision_tree?: Json
          id?: string
          kpis?: Json
          objections?: Json
          updated_at?: string | null
        }
        Update: {
          call_scripts?: Json
          campaign_id?: string
          checklists?: Json
          created_at?: string | null
          created_by?: string | null
          daily_routine?: Json
          decision_tree?: Json
          id?: string
          kpis?: Json
          objections?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_playbooks_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: true
            referencedRelation: "call_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_recipients: {
        Row: {
          annual_revenue: number | null
          campaign_id: string | null
          company: string | null
          created_by: string
          email: string
          error_message: string | null
          first_name: string | null
          id: string
          last_name: string | null
          num_employees: number | null
          phone: string | null
          sent_at: string | null
          sort_order: number | null
          status: string
          website: string | null
        }
        Insert: {
          annual_revenue?: number | null
          campaign_id?: string | null
          company?: string | null
          created_by?: string
          email: string
          error_message?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          num_employees?: number | null
          phone?: string | null
          sent_at?: string | null
          sort_order?: number | null
          status?: string
          website?: string | null
        }
        Update: {
          annual_revenue?: number | null
          campaign_id?: string | null
          company?: string | null
          created_by?: string
          email?: string
          error_message?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          num_employees?: number | null
          phone?: string | null
          sent_at?: string | null
          sort_order?: number | null
          status?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_schedules: {
        Row: {
          batch_size: number
          campaign_id: string
          created_at: string
          created_by: string
          days_of_week: number[]
          id: string
          is_active: boolean
          last_executed_at: string | null
          next_execution_at: string | null
          send_time: string
          timezone: string
          total_sent: number
        }
        Insert: {
          batch_size?: number
          campaign_id: string
          created_at?: string
          created_by: string
          days_of_week?: number[]
          id?: string
          is_active?: boolean
          last_executed_at?: string | null
          next_execution_at?: string | null
          send_time?: string
          timezone?: string
          total_sent?: number
        }
        Update: {
          batch_size?: number
          campaign_id?: string
          created_at?: string
          created_by?: string
          days_of_week?: number[]
          id?: string
          is_active?: boolean
          last_executed_at?: string | null
          next_execution_at?: string | null
          send_time?: string
          timezone?: string
          total_sent?: number
        }
        Relationships: [
          {
            foreignKeyName: "campaign_schedules_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_templates: {
        Row: {
          campaign_type: string
          created_at: string | null
          html_content: string
          id: string
          name: string
          sender: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          campaign_type: string
          created_at?: string | null
          html_content: string
          id?: string
          name: string
          sender: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          campaign_type?: string
          created_at?: string | null
          html_content?: string
          id?: string
          name?: string
          sender?: string
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string
          description: string | null
          hidden: boolean | null
          id: string
          is_sending: boolean | null
          is_test: boolean | null
          name: string
          parent_campaign_id: string | null
          scheduled_send_at: string | null
          sent_at: string | null
          status: string
          template_id: string | null
          timezone: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          hidden?: boolean | null
          id?: string
          is_sending?: boolean | null
          is_test?: boolean | null
          name: string
          parent_campaign_id?: string | null
          scheduled_send_at?: string | null
          sent_at?: string | null
          status?: string
          template_id?: string | null
          timezone?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          hidden?: boolean | null
          id?: string
          is_sending?: boolean | null
          is_test?: boolean | null
          name?: string
          parent_campaign_id?: string | null
          scheduled_send_at?: string | null
          sent_at?: string | null
          status?: string
          template_id?: string | null
          timezone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_parent_campaign_id_fkey"
            columns: ["parent_campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "campaign_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      cold_calling_email_clicks: {
        Row: {
          campaign_id: string | null
          clicked_at: string | null
          company_id: string | null
          email_id: string | null
          id: string
          ip_address: string | null
          url: string
          user_agent: string | null
        }
        Insert: {
          campaign_id?: string | null
          clicked_at?: string | null
          company_id?: string | null
          email_id?: string | null
          id?: string
          ip_address?: string | null
          url: string
          user_agent?: string | null
        }
        Update: {
          campaign_id?: string | null
          clicked_at?: string | null
          company_id?: string | null
          email_id?: string | null
          id?: string
          ip_address?: string | null
          url?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cold_calling_email_clicks_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "call_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cold_calling_email_clicks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "call_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cold_calling_email_clicks_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "cold_calling_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      cold_calling_email_opens: {
        Row: {
          campaign_id: string | null
          company_id: string | null
          email_id: string | null
          id: string
          ip_address: string | null
          opened_at: string | null
          user_agent: string | null
        }
        Insert: {
          campaign_id?: string | null
          company_id?: string | null
          email_id?: string | null
          id?: string
          ip_address?: string | null
          opened_at?: string | null
          user_agent?: string | null
        }
        Update: {
          campaign_id?: string | null
          company_id?: string | null
          email_id?: string | null
          id?: string
          ip_address?: string | null
          opened_at?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cold_calling_email_opens_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "call_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cold_calling_email_opens_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "call_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cold_calling_email_opens_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "cold_calling_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      cold_calling_email_templates: {
        Row: {
          campaign_id: string | null
          category: string
          content: string
          created_at: string | null
          created_by: string | null
          html_content: string | null
          id: string
          name: string
          subject: string
          template_type: string | null
          updated_at: string | null
        }
        Insert: {
          campaign_id?: string | null
          category: string
          content: string
          created_at?: string | null
          created_by?: string | null
          html_content?: string | null
          id?: string
          name: string
          subject: string
          template_type?: string | null
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          created_by?: string | null
          html_content?: string | null
          id?: string
          name?: string
          subject?: string
          template_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cold_calling_email_templates_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "call_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      cold_calling_emails: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          attachments: Json | null
          campaign_id: string | null
          company_id: string | null
          contact_id: string | null
          content_markdown: string
          created_at: string | null
          created_by: string | null
          error_message: string | null
          first_clicked_at: string | null
          first_opened_at: string | null
          from_email: string | null
          html_content: string
          id: string
          resend_email_id: string | null
          sent_at: string | null
          status: string | null
          subject: string
          template_id: string | null
          to_email: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          attachments?: Json | null
          campaign_id?: string | null
          company_id?: string | null
          contact_id?: string | null
          content_markdown: string
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          first_clicked_at?: string | null
          first_opened_at?: string | null
          from_email?: string | null
          html_content: string
          id?: string
          resend_email_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          template_id?: string | null
          to_email: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          attachments?: Json | null
          campaign_id?: string | null
          company_id?: string | null
          contact_id?: string | null
          content_markdown?: string
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          first_clicked_at?: string | null
          first_opened_at?: string | null
          from_email?: string | null
          html_content?: string
          id?: string
          resend_email_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          template_id?: string | null
          to_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "cold_calling_emails_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "call_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cold_calling_emails_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "call_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cold_calling_emails_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "call_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cold_calling_emails_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "cold_calling_email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      cold_email_detections: {
        Row: {
          categories: string[] | null
          confidence: number
          detected_at: string
          email_id: string
          id: string
          is_cold_email: boolean
          reasoning: string | null
          reviewed_at: string | null
          user_feedback: string | null
          user_id: string
        }
        Insert: {
          categories?: string[] | null
          confidence: number
          detected_at?: string
          email_id: string
          id?: string
          is_cold_email?: boolean
          reasoning?: string | null
          reviewed_at?: string | null
          user_feedback?: string | null
          user_id: string
        }
        Update: {
          categories?: string[] | null
          confidence?: number
          detected_at?: string
          email_id?: string
          id?: string
          is_cold_email?: boolean
          reasoning?: string | null
          reviewed_at?: string | null
          user_feedback?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cold_email_detections_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "inbound_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      cold_email_prompts: {
        Row: {
          created_at: string
          examples_cold: string[]
          examples_not_cold: string[]
          id: string
          is_active: boolean
          user_id: string
          version: number
        }
        Insert: {
          created_at?: string
          examples_cold?: string[]
          examples_not_cold?: string[]
          id?: string
          is_active?: boolean
          user_id: string
          version?: number
        }
        Update: {
          created_at?: string
          examples_cold?: string[]
          examples_not_cold?: string[]
          id?: string
          is_active?: boolean
          user_id?: string
          version?: number
        }
        Relationships: []
      }
      cold_email_settings: {
        Row: {
          auto_archive_enabled: boolean
          auto_detect_enabled: boolean
          created_at: string
          id: string
          min_confidence_threshold: number
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_archive_enabled?: boolean
          auto_detect_enabled?: boolean
          created_at?: string
          id?: string
          min_confidence_threshold?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_archive_enabled?: boolean
          auto_detect_enabled?: boolean
          created_at?: string
          id?: string
          min_confidence_threshold?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          company_size_target: string | null
          created_at: string | null
          description: string
          features: string[] | null
          founded_year: number | null
          free_plan: string | null
          free_trial: string | null
          free_trial_days: number | null
          has_absence_management: boolean | null
          has_ai: boolean | null
          has_api: boolean | null
          has_biometric: boolean | null
          has_document_management: boolean | null
          has_employee_portal: boolean | null
          has_free_trial_bool: boolean | null
          has_geofence: boolean | null
          has_geolocation: boolean | null
          has_mobile_app: boolean | null
          has_payroll: boolean | null
          has_performance_eval: boolean | null
          has_project_management: boolean | null
          has_recruitment: boolean | null
          has_remote_work: boolean | null
          has_reports: boolean | null
          has_shift_management: boolean | null
          has_time_tracking: boolean | null
          has_training: boolean | null
          has_whistleblower: boolean | null
          highlights: string[] | null
          hq_country: string | null
          id: string
          img_url: string
          is_free: boolean | null
          is_premium: boolean | null
          is_promoted: boolean | null
          is_top_rated: boolean
          key_differentiator: string | null
          logo_url: string
          long_description: string | null
          meta_description: string | null
          meta_title: string | null
          min_price: number | null
          og_image: string | null
          platforms: string[] | null
          positioning_message: string | null
          price_per_user_month: number | null
          pricing_billed_annually: boolean | null
          pricing_billing_period: string
          pricing_currency: string
          pricing_description: string | null
          pricing_model: string | null
          pricing_per_user: boolean | null
          pricing_starting_price: number
          rank: number | null
          rating: number | null
          redirect_url: string | null
          scrape_date: string | null
          scrape_status: string | null
          screenshot_url: string | null
          slug: string
          social: Json | null
          target_audience: string | null
          thumbnail_url: string | null
          title: string
          type: string
          updated_at: string | null
          url: string
          use_case: string | null
          verified: boolean
          votes: number | null
        }
        Insert: {
          company_size_target?: string | null
          created_at?: string | null
          description?: string
          features?: string[] | null
          founded_year?: number | null
          free_plan?: string | null
          free_trial?: string | null
          free_trial_days?: number | null
          has_absence_management?: boolean | null
          has_ai?: boolean | null
          has_api?: boolean | null
          has_biometric?: boolean | null
          has_document_management?: boolean | null
          has_employee_portal?: boolean | null
          has_free_trial_bool?: boolean | null
          has_geofence?: boolean | null
          has_geolocation?: boolean | null
          has_mobile_app?: boolean | null
          has_payroll?: boolean | null
          has_performance_eval?: boolean | null
          has_project_management?: boolean | null
          has_recruitment?: boolean | null
          has_remote_work?: boolean | null
          has_reports?: boolean | null
          has_shift_management?: boolean | null
          has_time_tracking?: boolean | null
          has_training?: boolean | null
          has_whistleblower?: boolean | null
          highlights?: string[] | null
          hq_country?: string | null
          id?: string
          img_url?: string
          is_free?: boolean | null
          is_premium?: boolean | null
          is_promoted?: boolean | null
          is_top_rated?: boolean
          key_differentiator?: string | null
          logo_url?: string
          long_description?: string | null
          meta_description?: string | null
          meta_title?: string | null
          min_price?: number | null
          og_image?: string | null
          platforms?: string[] | null
          positioning_message?: string | null
          price_per_user_month?: number | null
          pricing_billed_annually?: boolean | null
          pricing_billing_period?: string
          pricing_currency?: string
          pricing_description?: string | null
          pricing_model?: string | null
          pricing_per_user?: boolean | null
          pricing_starting_price?: number
          rank?: number | null
          rating?: number | null
          redirect_url?: string | null
          scrape_date?: string | null
          scrape_status?: string | null
          screenshot_url?: string | null
          slug: string
          social?: Json | null
          target_audience?: string | null
          thumbnail_url?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          url?: string
          use_case?: string | null
          verified?: boolean
          votes?: number | null
        }
        Update: {
          company_size_target?: string | null
          created_at?: string | null
          description?: string
          features?: string[] | null
          founded_year?: number | null
          free_plan?: string | null
          free_trial?: string | null
          free_trial_days?: number | null
          has_absence_management?: boolean | null
          has_ai?: boolean | null
          has_api?: boolean | null
          has_biometric?: boolean | null
          has_document_management?: boolean | null
          has_employee_portal?: boolean | null
          has_free_trial_bool?: boolean | null
          has_geofence?: boolean | null
          has_geolocation?: boolean | null
          has_mobile_app?: boolean | null
          has_payroll?: boolean | null
          has_performance_eval?: boolean | null
          has_project_management?: boolean | null
          has_recruitment?: boolean | null
          has_remote_work?: boolean | null
          has_reports?: boolean | null
          has_shift_management?: boolean | null
          has_time_tracking?: boolean | null
          has_training?: boolean | null
          has_whistleblower?: boolean | null
          highlights?: string[] | null
          hq_country?: string | null
          id?: string
          img_url?: string
          is_free?: boolean | null
          is_premium?: boolean | null
          is_promoted?: boolean | null
          is_top_rated?: boolean
          key_differentiator?: string | null
          logo_url?: string
          long_description?: string | null
          meta_description?: string | null
          meta_title?: string | null
          min_price?: number | null
          og_image?: string | null
          platforms?: string[] | null
          positioning_message?: string | null
          price_per_user_month?: number | null
          pricing_billed_annually?: boolean | null
          pricing_billing_period?: string
          pricing_currency?: string
          pricing_description?: string | null
          pricing_model?: string | null
          pricing_per_user?: boolean | null
          pricing_starting_price?: number
          rank?: number | null
          rating?: number | null
          redirect_url?: string | null
          scrape_date?: string | null
          scrape_status?: string | null
          screenshot_url?: string | null
          slug?: string
          social?: Json | null
          target_audience?: string | null
          thumbnail_url?: string | null
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
      contact_behavior_patterns: {
        Row: {
          contact_id: string
          created_at: string
          frequency: number
          id: string
          last_occurrence: string
          pattern_data: Json
          pattern_type: string
          updated_at: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          frequency?: number
          id?: string
          last_occurrence?: string
          pattern_data?: Json
          pattern_type: string
          updated_at?: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          frequency?: number
          id?: string
          last_occurrence?: string
          pattern_data?: Json
          pattern_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_behavior_patterns_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_behavior_patterns_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "holded_prospect_mapping"
            referencedColumns: ["clipmail_contact_id"]
          },
        ]
      }
      contact_imports: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string
          error_log: Json | null
          failed_imports: number
          filename: string
          id: string
          import_settings: Json
          status: string
          successful_imports: number
          total_rows: number
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string
          error_log?: Json | null
          failed_imports?: number
          filename: string
          id?: string
          import_settings?: Json
          status?: string
          successful_imports?: number
          total_rows?: number
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string
          error_log?: Json | null
          failed_imports?: number
          filename?: string
          id?: string
          import_settings?: Json
          status?: string
          successful_imports?: number
          total_rows?: number
        }
        Relationships: []
      }
      contact_segments: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          filters: Json
          id: string
          is_dynamic: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          filters?: Json
          id?: string
          is_dynamic?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          filters?: Json
          id?: string
          is_dynamic?: boolean
          name?: string
          updated_at?: string
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
      contact_tag_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string
          contact_id: string
          id: string
          tag_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string
          contact_id: string
          id?: string
          tag_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string
          contact_id?: string
          id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_tag_assignments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_tag_assignments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "holded_prospect_mapping"
            referencedColumns: ["clipmail_contact_id"]
          },
          {
            foreignKeyName: "contact_tag_assignments_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "contact_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_tags: {
        Row: {
          color: string
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          annual_revenue: number | null
          city: string | null
          company: string | null
          country: string | null
          created_at: string
          created_by: string
          email: string
          first_name: string | null
          id: string
          import_source: string | null
          job_title: string | null
          last_name: string | null
          lead_type: string | null
          notes: string | null
          num_employees: number | null
          phone: string | null
          source: string | null
          status: string
          updated_at: string
          website: string | null
        }
        Insert: {
          annual_revenue?: number | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          created_by?: string
          email: string
          first_name?: string | null
          id?: string
          import_source?: string | null
          job_title?: string | null
          last_name?: string | null
          lead_type?: string | null
          notes?: string | null
          num_employees?: number | null
          phone?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          annual_revenue?: number | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          created_by?: string
          email?: string
          first_name?: string | null
          id?: string
          import_source?: string | null
          job_title?: string | null
          last_name?: string | null
          lead_type?: string | null
          notes?: string | null
          num_employees?: number | null
          phone?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      daily_email_limits: {
        Row: {
          created_at: string
          created_by: string
          date: string
          emails_sent: number
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          date?: string
          emails_sent?: number
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          date?: string
          emails_sent?: number
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      deal_email_threads: {
        Row: {
          confidence: number | null
          created_at: string | null
          created_by: string | null
          deal_id: string
          email_thread_id: string
          id: string
          link_type: string | null
          primary_contact_email: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string | null
          created_by?: string | null
          deal_id: string
          email_thread_id: string
          id?: string
          link_type?: string | null
          primary_contact_email: string
        }
        Update: {
          confidence?: number | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string
          email_thread_id?: string
          id?: string
          link_type?: string | null
          primary_contact_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_email_threads_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "call_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_transcripts: {
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
      email_accounts: {
        Row: {
          aliases: Json | null
          created_at: string | null
          display_name: string | null
          email: string
          email_visibility: string | null
          id: string
          imap_host: string | null
          imap_password_encrypted: string | null
          imap_port: number | null
          imap_username: string | null
          is_active: boolean | null
          is_default: boolean | null
          last_sync_at: string | null
          last_sync_attempt: string | null
          name: string
          provider: string
          routing_strategy: string | null
          signature_html: string | null
          signature_text: string | null
          smtp_host: string | null
          smtp_password_encrypted: string | null
          smtp_port: number | null
          smtp_username: string | null
          sync_enabled: boolean | null
          sync_error: string | null
          sync_folders: Json | null
          sync_from_date: string | null
          sync_status: string | null
          track_clicks: boolean | null
          track_emails: boolean | null
          track_opens: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          aliases?: Json | null
          created_at?: string | null
          display_name?: string | null
          email: string
          email_visibility?: string | null
          id?: string
          imap_host?: string | null
          imap_password_encrypted?: string | null
          imap_port?: number | null
          imap_username?: string | null
          is_active?: boolean | null
          is_default?: boolean | null
          last_sync_at?: string | null
          last_sync_attempt?: string | null
          name: string
          provider?: string
          routing_strategy?: string | null
          signature_html?: string | null
          signature_text?: string | null
          smtp_host?: string | null
          smtp_password_encrypted?: string | null
          smtp_port?: number | null
          smtp_username?: string | null
          sync_enabled?: boolean | null
          sync_error?: string | null
          sync_folders?: Json | null
          sync_from_date?: string | null
          sync_status?: string | null
          track_clicks?: boolean | null
          track_emails?: boolean | null
          track_opens?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          aliases?: Json | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          email_visibility?: string | null
          id?: string
          imap_host?: string | null
          imap_password_encrypted?: string | null
          imap_port?: number | null
          imap_username?: string | null
          is_active?: boolean | null
          is_default?: boolean | null
          last_sync_at?: string | null
          last_sync_attempt?: string | null
          name?: string
          provider?: string
          routing_strategy?: string | null
          signature_html?: string | null
          signature_text?: string | null
          smtp_host?: string | null
          smtp_password_encrypted?: string | null
          smtp_port?: number | null
          smtp_username?: string | null
          sync_enabled?: boolean | null
          sync_error?: string | null
          sync_folders?: Json | null
          sync_from_date?: string | null
          sync_status?: string | null
          track_clicks?: boolean | null
          track_emails?: boolean | null
          track_opens?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      email_clicks: {
        Row: {
          campaign_id: string | null
          clicked_at: string | null
          created_by: string
          email: string
          id: string
          ip_address: string | null
          lead_id: string | null
          url: string
          user_agent: string | null
        }
        Insert: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_by?: string
          email: string
          id?: string
          ip_address?: string | null
          lead_id?: string | null
          url: string
          user_agent?: string | null
        }
        Update: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_by?: string
          email?: string
          id?: string
          ip_address?: string | null
          lead_id?: string | null
          url?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_clicks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "holded_prospect_mapping"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "email_clicks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_clicks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads_to_process"
            referencedColumns: ["id"]
          },
        ]
      }
      email_label_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          confidence_score: number | null
          email_id: string | null
          id: string
          label_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          confidence_score?: number | null
          email_id?: string | null
          id?: string
          label_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          confidence_score?: number | null
          email_id?: string | null
          id?: string
          label_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_label_assignments_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "inbound_emails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_label_assignments_label_id_fkey"
            columns: ["label_id"]
            isOneToOne: false
            referencedRelation: "email_labels"
            referencedColumns: ["id"]
          },
        ]
      }
      email_labels: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      email_opens: {
        Row: {
          campaign_id: string
          id: string
          ip_address: string | null
          lead_id: string
          opened_at: string | null
          user_agent: string | null
        }
        Insert: {
          campaign_id: string
          id?: string
          ip_address?: string | null
          lead_id: string
          opened_at?: string | null
          user_agent?: string | null
        }
        Update: {
          campaign_id?: string
          id?: string
          ip_address?: string | null
          lead_id?: string
          opened_at?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_opens_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "holded_prospect_mapping"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "email_opens_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_opens_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads_to_process"
            referencedColumns: ["id"]
          },
        ]
      }
      email_rules: {
        Row: {
          actions: Json
          conditions: Json
          created_at: string | null
          description: string | null
          enabled: boolean | null
          id: string
          last_executed_at: string | null
          name: string
          priority: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          actions?: Json
          conditions?: Json
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          last_executed_at?: string | null
          name: string
          priority?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          actions?: Json
          conditions?: Json
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          last_executed_at?: string | null
          name?: string
          priority?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      email_stats: {
        Row: {
          bounced_at: string | null
          campaign_id: string | null
          clicked_at: string | null
          created_by: string
          email: string
          id: string
          opened_at: string | null
          recipient_id: string | null
          sent_at: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          bounced_at?: string | null
          campaign_id?: string | null
          clicked_at?: string | null
          created_by?: string
          email: string
          id?: string
          opened_at?: string | null
          recipient_id?: string | null
          sent_at?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          bounced_at?: string | null
          campaign_id?: string | null
          clicked_at?: string | null
          created_by?: string
          email?: string
          id?: string
          opened_at?: string | null
          recipient_id?: string | null
          sent_at?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_stats_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_stats_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "campaign_recipients"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          html_content: string
          id: string
          name: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          html_content: string
          id?: string
          name: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          html_content?: string
          id?: string
          name?: string
          subject?: string
          updated_at?: string | null
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
      executed_ai_rules: {
        Row: {
          actions_executed: Json
          automated: boolean
          created_at: string
          email_id: string
          id: string
          reason: string | null
          rule_id: string | null
          thread_id: string | null
          user_id: string
        }
        Insert: {
          actions_executed?: Json
          automated?: boolean
          created_at?: string
          email_id: string
          id?: string
          reason?: string | null
          rule_id?: string | null
          thread_id?: string | null
          user_id: string
        }
        Update: {
          actions_executed?: Json
          automated?: boolean
          created_at?: string
          email_id?: string
          id?: string
          reason?: string | null
          rule_id?: string | null
          thread_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "executed_ai_rules_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "ai_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      gmail_tokens: {
        Row: {
          access_token: string
          created_at: string | null
          email: string
          expires_at: string
          id: string
          refresh_token: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          refresh_token: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          refresh_token?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      google_calendar_tokens: {
        Row: {
          access_token: string
          calendar_id: string | null
          created_at: string | null
          demo_duration_minutes: number | null
          email: string
          expires_at: string
          id: string
          refresh_token: string
          slot_gap_minutes: number | null
          updated_at: string | null
          working_hours_end: string | null
          working_hours_start: string | null
        }
        Insert: {
          access_token: string
          calendar_id?: string | null
          created_at?: string | null
          demo_duration_minutes?: number | null
          email: string
          expires_at: string
          id?: string
          refresh_token: string
          slot_gap_minutes?: number | null
          updated_at?: string | null
          working_hours_end?: string | null
          working_hours_start?: string | null
        }
        Update: {
          access_token?: string
          calendar_id?: string | null
          created_at?: string | null
          demo_duration_minutes?: number | null
          email?: string
          expires_at?: string
          id?: string
          refresh_token?: string
          slot_gap_minutes?: number | null
          updated_at?: string | null
          working_hours_end?: string | null
          working_hours_start?: string | null
        }
        Relationships: []
      }
      help_knowledge_base_embeddings: {
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
      holded_contacts: {
        Row: {
          address: string | null
          city: string | null
          company: string | null
          contact_type: string | null
          country: string | null
          created_at: string | null
          custom_fields: Json | null
          email: string | null
          holded_id: string
          id: string
          name: string
          notes: string | null
          phone: string | null
          raw_data: Json | null
          synced_at: string | null
          tax_id: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company?: string | null
          contact_type?: string | null
          country?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          holded_id: string
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          raw_data?: Json | null
          synced_at?: string | null
          tax_id?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company?: string | null
          contact_type?: string | null
          country?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          holded_id?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          raw_data?: Json | null
          synced_at?: string | null
          tax_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      holded_invoices: {
        Row: {
          contact_id: string | null
          contact_name: string | null
          created_at: string | null
          currency: string | null
          date: string | null
          due_date: string | null
          holded_id: string
          id: string
          invoice_number: string | null
          invoice_type: string | null
          is_refund: boolean | null
          notes: string | null
          raw_data: Json | null
          refunded_invoice_id: string | null
          status: string | null
          subtotal: number | null
          synced_at: string | null
          tax: number | null
          total: number | null
          updated_at: string | null
        }
        Insert: {
          contact_id?: string | null
          contact_name?: string | null
          created_at?: string | null
          currency?: string | null
          date?: string | null
          due_date?: string | null
          holded_id: string
          id?: string
          invoice_number?: string | null
          invoice_type?: string | null
          is_refund?: boolean | null
          notes?: string | null
          raw_data?: Json | null
          refunded_invoice_id?: string | null
          status?: string | null
          subtotal?: number | null
          synced_at?: string | null
          tax?: number | null
          total?: number | null
          updated_at?: string | null
        }
        Update: {
          contact_id?: string | null
          contact_name?: string | null
          created_at?: string | null
          currency?: string | null
          date?: string | null
          due_date?: string | null
          holded_id?: string
          id?: string
          invoice_number?: string | null
          invoice_type?: string | null
          is_refund?: boolean | null
          notes?: string | null
          raw_data?: Json | null
          refunded_invoice_id?: string | null
          status?: string | null
          subtotal?: number | null
          synced_at?: string | null
          tax?: number | null
          total?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      holded_sync_log: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          records_failed: number | null
          records_synced: number | null
          status: string
          sync_duration_ms: number | null
          sync_type: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          records_failed?: number | null
          records_synced?: number | null
          status: string
          sync_duration_ms?: number | null
          sync_type: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          records_failed?: number | null
          records_synced?: number | null
          status?: string
          sync_duration_ms?: number | null
          sync_type?: string
        }
        Relationships: []
      }
      hunter_io_usage: {
        Row: {
          created_at: string
          daily_limit: number
          date: string
          id: string
          monthly_limit: number
          searches_used: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_limit?: number
          date?: string
          id?: string
          monthly_limit?: number
          searches_used?: number
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          daily_limit?: number
          date?: string
          id?: string
          monthly_limit?: number
          searches_used?: number
          updated_at?: string
          user_id?: string
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
      inbound_emails: {
        Row: {
          ai_category: string | null
          ai_confidence: number | null
          ai_labels: string[] | null
          ai_processed: boolean | null
          ai_processed_at: string | null
          ai_reasoning: string | null
          ai_rule_id: string | null
          ai_summary: string | null
          archived_at: string | null
          attachments: Json | null
          campaign_id: string | null
          cc: string[] | null
          company_id: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          email_account_id: string | null
          folder: string | null
          from_email: string
          from_name: string | null
          has_ai_draft: boolean | null
          headers: Json | null
          html_body: string | null
          id: string
          importance_score: number | null
          in_reply_to: string | null
          inbox_category: string | null
          is_archived: boolean | null
          is_deleted: boolean | null
          is_processed: boolean | null
          is_read: boolean | null
          is_replied: boolean | null
          is_starred: boolean | null
          message_id: string
          original_email_id: string | null
          processed_at: string | null
          raw_email: string | null
          received_at: string
          replied_at: string | null
          sentiment: string | null
          snoozed_until: string | null
          subject: string | null
          text_body: string | null
          thread_id: string | null
          to_email: string
        }
        Insert: {
          ai_category?: string | null
          ai_confidence?: number | null
          ai_labels?: string[] | null
          ai_processed?: boolean | null
          ai_processed_at?: string | null
          ai_reasoning?: string | null
          ai_rule_id?: string | null
          ai_summary?: string | null
          archived_at?: string | null
          attachments?: Json | null
          campaign_id?: string | null
          cc?: string[] | null
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          email_account_id?: string | null
          folder?: string | null
          from_email: string
          from_name?: string | null
          has_ai_draft?: boolean | null
          headers?: Json | null
          html_body?: string | null
          id?: string
          importance_score?: number | null
          in_reply_to?: string | null
          inbox_category?: string | null
          is_archived?: boolean | null
          is_deleted?: boolean | null
          is_processed?: boolean | null
          is_read?: boolean | null
          is_replied?: boolean | null
          is_starred?: boolean | null
          message_id: string
          original_email_id?: string | null
          processed_at?: string | null
          raw_email?: string | null
          received_at: string
          replied_at?: string | null
          sentiment?: string | null
          snoozed_until?: string | null
          subject?: string | null
          text_body?: string | null
          thread_id?: string | null
          to_email: string
        }
        Update: {
          ai_category?: string | null
          ai_confidence?: number | null
          ai_labels?: string[] | null
          ai_processed?: boolean | null
          ai_processed_at?: string | null
          ai_reasoning?: string | null
          ai_rule_id?: string | null
          ai_summary?: string | null
          archived_at?: string | null
          attachments?: Json | null
          campaign_id?: string | null
          cc?: string[] | null
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          email_account_id?: string | null
          folder?: string | null
          from_email?: string
          from_name?: string | null
          has_ai_draft?: boolean | null
          headers?: Json | null
          html_body?: string | null
          id?: string
          importance_score?: number | null
          in_reply_to?: string | null
          inbox_category?: string | null
          is_archived?: boolean | null
          is_deleted?: boolean | null
          is_processed?: boolean | null
          is_read?: boolean | null
          is_replied?: boolean | null
          is_starred?: boolean | null
          message_id?: string
          original_email_id?: string | null
          processed_at?: string | null
          raw_email?: string | null
          received_at?: string
          replied_at?: string | null
          sentiment?: string | null
          snoozed_until?: string | null
          subject?: string | null
          text_body?: string | null
          thread_id?: string | null
          to_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "inbound_emails_ai_rule_id_fkey"
            columns: ["ai_rule_id"]
            isOneToOne: false
            referencedRelation: "ai_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inbound_emails_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "call_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inbound_emails_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "call_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inbound_emails_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "call_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inbound_emails_email_account_id_fkey"
            columns: ["email_account_id"]
            isOneToOne: false
            referencedRelation: "email_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inbound_emails_original_email_id_fkey"
            columns: ["original_email_id"]
            isOneToOne: false
            referencedRelation: "cold_calling_emails"
            referencedColumns: ["id"]
          },
        ]
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
      knowledge: {
        Row: {
          category: string | null
          content: string
          created_at: string
          id: string
          source_url: string | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          source_url?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          source_url?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      labor_guide_documents: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: number
          metadata: Json | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: never
          metadata?: Json | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: never
          metadata?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          campaign_template_id: string | null
          campaña_activa: string | null
          created_at: string | null
          created_by: string | null
          deal_id: number | null
          email: string
          estado: string | null
          id: string
          is_test: boolean | null
          name: string | null
          next_step: string | null
          num_users: number | null
          onboarding_day_0_sent_at: string | null
          onboarding_day_1_sent_at: string | null
          onboarding_day_14_sent_at: string | null
          onboarding_day_2_sent_at: string | null
          onboarding_day_3_sent_at: string | null
          onboarding_day_30_sent_at: string | null
          onboarding_day_4_sent_at: string | null
          onboarding_day_5_sent_at: string | null
          onboarding_day_6_sent_at: string | null
          onboarding_day_7_sent_at: string | null
          onboarding_day_9_sent_at: string | null
          onboarding_dia_1_servicio_desarrollo_sent_at: string | null
          original_signup_date: string | null
          person_id: number | null
          phone: string | null
          pipeline_id: number | null
          proximo_envio: string | null
          stage_id: number | null
          step_actual: number | null
          tipo_empresa: string | null
          ultimo_envio: string | null
          unsubscribe: boolean | null
          unsubscribe_at: string | null
        }
        Insert: {
          campaign_template_id?: string | null
          campaña_activa?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: number | null
          email: string
          estado?: string | null
          id?: string
          is_test?: boolean | null
          name?: string | null
          next_step?: string | null
          num_users?: number | null
          onboarding_day_0_sent_at?: string | null
          onboarding_day_1_sent_at?: string | null
          onboarding_day_14_sent_at?: string | null
          onboarding_day_2_sent_at?: string | null
          onboarding_day_3_sent_at?: string | null
          onboarding_day_30_sent_at?: string | null
          onboarding_day_4_sent_at?: string | null
          onboarding_day_5_sent_at?: string | null
          onboarding_day_6_sent_at?: string | null
          onboarding_day_7_sent_at?: string | null
          onboarding_day_9_sent_at?: string | null
          onboarding_dia_1_servicio_desarrollo_sent_at?: string | null
          original_signup_date?: string | null
          person_id?: number | null
          phone?: string | null
          pipeline_id?: number | null
          proximo_envio?: string | null
          stage_id?: number | null
          step_actual?: number | null
          tipo_empresa?: string | null
          ultimo_envio?: string | null
          unsubscribe?: boolean | null
          unsubscribe_at?: string | null
        }
        Update: {
          campaign_template_id?: string | null
          campaña_activa?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: number | null
          email?: string
          estado?: string | null
          id?: string
          is_test?: boolean | null
          name?: string | null
          next_step?: string | null
          num_users?: number | null
          onboarding_day_0_sent_at?: string | null
          onboarding_day_1_sent_at?: string | null
          onboarding_day_14_sent_at?: string | null
          onboarding_day_2_sent_at?: string | null
          onboarding_day_3_sent_at?: string | null
          onboarding_day_30_sent_at?: string | null
          onboarding_day_4_sent_at?: string | null
          onboarding_day_5_sent_at?: string | null
          onboarding_day_6_sent_at?: string | null
          onboarding_day_7_sent_at?: string | null
          onboarding_day_9_sent_at?: string | null
          onboarding_dia_1_servicio_desarrollo_sent_at?: string | null
          original_signup_date?: string | null
          person_id?: number | null
          phone?: string | null
          pipeline_id?: number | null
          proximo_envio?: string | null
          stage_id?: number | null
          step_actual?: number | null
          tipo_empresa?: string | null
          ultimo_envio?: string | null
          unsubscribe?: boolean | null
          unsubscribe_at?: string | null
        }
        Relationships: []
      }
      mb_campaign_executions: {
        Row: {
          campaign_id: string | null
          clicked_at: string | null
          created_at: string | null
          created_by: string | null
          email_sent_to: string
          id: string
          opened_at: string | null
          personalized_body: string
          personalized_subject: string
          resend_message_id: string | null
          responded_at: string | null
          response_content: string | null
          sent_at: string | null
          status: string | null
          target_id: string | null
          template_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          created_by?: string | null
          email_sent_to: string
          id?: string
          opened_at?: string | null
          personalized_body: string
          personalized_subject: string
          resend_message_id?: string | null
          responded_at?: string | null
          response_content?: string | null
          sent_at?: string | null
          status?: string | null
          target_id?: string | null
          template_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          created_by?: string | null
          email_sent_to?: string
          id?: string
          opened_at?: string | null
          personalized_body?: string
          personalized_subject?: string
          resend_message_id?: string | null
          responded_at?: string | null
          response_content?: string | null
          sent_at?: string | null
          status?: string | null
          target_id?: string | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mb_campaign_executions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "mb_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mb_campaign_executions_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "holded_prospect_mapping"
            referencedColumns: ["mb_target_id"]
          },
          {
            foreignKeyName: "mb_campaign_executions_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "mb_targets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mb_campaign_executions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "mb_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      mb_campaigns: {
        Row: {
          client_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          status: string | null
          target_tiers: number[] | null
          template_id: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string | null
          target_tiers?: number[] | null
          template_id?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          target_tiers?: number[] | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mb_campaigns_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "mb_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mb_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "mb_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      mb_clients: {
        Row: {
          brand_config: Json | null
          created_at: string | null
          created_by: string | null
          id: string
          industry: string | null
          name: string
        }
        Insert: {
          brand_config?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          industry?: string | null
          name: string
        }
        Update: {
          brand_config?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          industry?: string | null
          name?: string
        }
        Relationships: []
      }
      mb_daily_send_limits: {
        Row: {
          created_at: string | null
          daily_limit: number | null
          date: string
          emails_sent: number | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          daily_limit?: number | null
          date?: string
          emails_sent?: number | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          daily_limit?: number | null
          date?: string
          emails_sent?: number | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      mb_email_clicks: {
        Row: {
          campaign_id: string | null
          clicked_at: string | null
          created_at: string | null
          email_send_id: string | null
          id: string
          ip_address: unknown
          target_id: string | null
          url: string
          user_agent: string | null
        }
        Insert: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          email_send_id?: string | null
          id?: string
          ip_address?: unknown
          target_id?: string | null
          url: string
          user_agent?: string | null
        }
        Update: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          email_send_id?: string | null
          id?: string
          ip_address?: unknown
          target_id?: string | null
          url?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mb_email_clicks_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "mb_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mb_email_clicks_email_send_id_fkey"
            columns: ["email_send_id"]
            isOneToOne: false
            referencedRelation: "mb_email_sends"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mb_email_clicks_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "holded_prospect_mapping"
            referencedColumns: ["mb_target_id"]
          },
          {
            foreignKeyName: "mb_email_clicks_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "mb_targets"
            referencedColumns: ["id"]
          },
        ]
      }
      mb_email_discovery_logs: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          created_by: string | null
          domain: string
          email_found: string | null
          error_message: string | null
          hunter_request_id: string | null
          id: string
          sources: Json | null
          status: string | null
          target_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          created_by?: string | null
          domain: string
          email_found?: string | null
          error_message?: string | null
          hunter_request_id?: string | null
          id?: string
          sources?: Json | null
          status?: string | null
          target_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          created_by?: string | null
          domain?: string
          email_found?: string | null
          error_message?: string | null
          hunter_request_id?: string | null
          id?: string
          sources?: Json | null
          status?: string | null
          target_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mb_email_discovery_logs_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "holded_prospect_mapping"
            referencedColumns: ["mb_target_id"]
          },
          {
            foreignKeyName: "mb_email_discovery_logs_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "mb_targets"
            referencedColumns: ["id"]
          },
        ]
      }
      mb_email_opens: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          email_send_id: string | null
          id: string
          ip_address: unknown
          opened_at: string | null
          target_id: string | null
          user_agent: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          email_send_id?: string | null
          id?: string
          ip_address?: unknown
          opened_at?: string | null
          target_id?: string | null
          user_agent?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          email_send_id?: string | null
          id?: string
          ip_address?: unknown
          opened_at?: string | null
          target_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mb_email_opens_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "mb_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mb_email_opens_email_send_id_fkey"
            columns: ["email_send_id"]
            isOneToOne: false
            referencedRelation: "mb_email_sends"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mb_email_opens_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "holded_prospect_mapping"
            referencedColumns: ["mb_target_id"]
          },
          {
            foreignKeyName: "mb_email_opens_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "mb_targets"
            referencedColumns: ["id"]
          },
        ]
      }
      mb_email_sends: {
        Row: {
          bounced_at: string | null
          campaign_execution_id: string | null
          campaign_id: string | null
          created_at: string | null
          created_by: string | null
          delivered_at: string | null
          email_address: string
          error_message: string | null
          html_content: string
          id: string
          resend_message_id: string | null
          sent_at: string | null
          status: string | null
          subject: string
          target_id: string | null
        }
        Insert: {
          bounced_at?: string | null
          campaign_execution_id?: string | null
          campaign_id?: string | null
          created_at?: string | null
          created_by?: string | null
          delivered_at?: string | null
          email_address: string
          error_message?: string | null
          html_content: string
          id?: string
          resend_message_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          target_id?: string | null
        }
        Update: {
          bounced_at?: string | null
          campaign_execution_id?: string | null
          campaign_id?: string | null
          created_at?: string | null
          created_by?: string | null
          delivered_at?: string | null
          email_address?: string
          error_message?: string | null
          html_content?: string
          id?: string
          resend_message_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          target_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mb_email_sends_campaign_execution_id_fkey"
            columns: ["campaign_execution_id"]
            isOneToOne: false
            referencedRelation: "mb_campaign_executions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mb_email_sends_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "mb_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mb_email_sends_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "holded_prospect_mapping"
            referencedColumns: ["mb_target_id"]
          },
          {
            foreignKeyName: "mb_email_sends_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "mb_targets"
            referencedColumns: ["id"]
          },
        ]
      }
      mb_industry_templates: {
        Row: {
          commission_rate: number | null
          created_at: string | null
          created_by: string | null
          cta_text: string | null
          email_body: string
          id: string
          industry: string
          subject_line: string
          template_name: string
          updated_at: string | null
          value_proposition: string | null
        }
        Insert: {
          commission_rate?: number | null
          created_at?: string | null
          created_by?: string | null
          cta_text?: string | null
          email_body: string
          id?: string
          industry: string
          subject_line: string
          template_name: string
          updated_at?: string | null
          value_proposition?: string | null
        }
        Update: {
          commission_rate?: number | null
          created_at?: string | null
          created_by?: string | null
          cta_text?: string | null
          email_body?: string
          id?: string
          industry?: string
          subject_line?: string
          template_name?: string
          updated_at?: string | null
          value_proposition?: string | null
        }
        Relationships: []
      }
      mb_interactions: {
        Row: {
          campaign_id: string | null
          created_by: string | null
          id: string
          interaction_data: Json | null
          interaction_type: string | null
          occurred_at: string | null
          resend_message_id: string | null
          response_sentiment: string | null
          target_id: string | null
          template_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_by?: string | null
          id?: string
          interaction_data?: Json | null
          interaction_type?: string | null
          occurred_at?: string | null
          resend_message_id?: string | null
          response_sentiment?: string | null
          target_id?: string | null
          template_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_by?: string | null
          id?: string
          interaction_data?: Json | null
          interaction_type?: string | null
          occurred_at?: string | null
          resend_message_id?: string | null
          response_sentiment?: string | null
          target_id?: string | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mb_interactions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "mb_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mb_interactions_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "holded_prospect_mapping"
            referencedColumns: ["mb_target_id"]
          },
          {
            foreignKeyName: "mb_interactions_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "mb_targets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mb_interactions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "mb_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      mb_targets: {
        Row: {
          address: string | null
          audience_type: string | null
          authority_score: number | null
          category: string | null
          city: string | null
          client_id: string | null
          commission_rate: number | null
          company_size: string | null
          contact_email: string | null
          contact_form_url: string | null
          contact_name: string | null
          contact_person: string | null
          contact_status: string | null
          content_suggestions: string | null
          created_at: string | null
          created_by: string | null
          current_status:
            | Database["public"]["Enums"]["target_status_enum"]
            | null
          description: string | null
          discovered_emails: Json | null
          discovery_notes: string | null
          domain: string
          email_confidence: string | null
          email_discovery_status: string | null
          employees: number | null
          funnel_status:
            | Database["public"]["Enums"]["funnel_status_enum"]
            | null
          id: string
          industry: string | null
          last_contact_attempt: string | null
          last_contact_date: string | null
          last_email_discovery: string | null
          linkedin_followers: string | null
          monthly_visits: string | null
          niche_relevance: number | null
          notes: string | null
          organization_type: string | null
          partner_type: Database["public"]["Enums"]["partner_type_enum"] | null
          partnership_type: string | null
          phone: string | null
          relationship_stage: string | null
          response_rate: number | null
          sectors_covered: string[] | null
          site_name: string | null
          status_history: Json | null
          tier: number | null
          timing_recommendations: string | null
          value_proposition: string | null
        }
        Insert: {
          address?: string | null
          audience_type?: string | null
          authority_score?: number | null
          category?: string | null
          city?: string | null
          client_id?: string | null
          commission_rate?: number | null
          company_size?: string | null
          contact_email?: string | null
          contact_form_url?: string | null
          contact_name?: string | null
          contact_person?: string | null
          contact_status?: string | null
          content_suggestions?: string | null
          created_at?: string | null
          created_by?: string | null
          current_status?:
            | Database["public"]["Enums"]["target_status_enum"]
            | null
          description?: string | null
          discovered_emails?: Json | null
          discovery_notes?: string | null
          domain: string
          email_confidence?: string | null
          email_discovery_status?: string | null
          employees?: number | null
          funnel_status?:
            | Database["public"]["Enums"]["funnel_status_enum"]
            | null
          id?: string
          industry?: string | null
          last_contact_attempt?: string | null
          last_contact_date?: string | null
          last_email_discovery?: string | null
          linkedin_followers?: string | null
          monthly_visits?: string | null
          niche_relevance?: number | null
          notes?: string | null
          organization_type?: string | null
          partner_type?: Database["public"]["Enums"]["partner_type_enum"] | null
          partnership_type?: string | null
          phone?: string | null
          relationship_stage?: string | null
          response_rate?: number | null
          sectors_covered?: string[] | null
          site_name?: string | null
          status_history?: Json | null
          tier?: number | null
          timing_recommendations?: string | null
          value_proposition?: string | null
        }
        Update: {
          address?: string | null
          audience_type?: string | null
          authority_score?: number | null
          category?: string | null
          city?: string | null
          client_id?: string | null
          commission_rate?: number | null
          company_size?: string | null
          contact_email?: string | null
          contact_form_url?: string | null
          contact_name?: string | null
          contact_person?: string | null
          contact_status?: string | null
          content_suggestions?: string | null
          created_at?: string | null
          created_by?: string | null
          current_status?:
            | Database["public"]["Enums"]["target_status_enum"]
            | null
          description?: string | null
          discovered_emails?: Json | null
          discovery_notes?: string | null
          domain?: string
          email_confidence?: string | null
          email_discovery_status?: string | null
          employees?: number | null
          funnel_status?:
            | Database["public"]["Enums"]["funnel_status_enum"]
            | null
          id?: string
          industry?: string | null
          last_contact_attempt?: string | null
          last_contact_date?: string | null
          last_email_discovery?: string | null
          linkedin_followers?: string | null
          monthly_visits?: string | null
          niche_relevance?: number | null
          notes?: string | null
          organization_type?: string | null
          partner_type?: Database["public"]["Enums"]["partner_type_enum"] | null
          partnership_type?: string | null
          phone?: string | null
          relationship_stage?: string | null
          response_rate?: number | null
          sectors_covered?: string[] | null
          site_name?: string | null
          status_history?: Json | null
          tier?: number | null
          timing_recommendations?: string | null
          value_proposition?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mb_targets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "mb_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      mb_templates: {
        Row: {
          body_template: string
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          name: string
          subject_template: string
          template_type: string | null
          tier: number | null
          variables_schema: Json | null
        }
        Insert: {
          body_template: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          subject_template: string
          template_type?: string | null
          tier?: number | null
          variables_schema?: Json | null
        }
        Update: {
          body_template?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          subject_template?: string
          template_type?: string | null
          tier?: number | null
          variables_schema?: Json | null
        }
        Relationships: []
      }
      np_calendario_laboral: {
        Row: {
          ccaa_id: number | null
          created_at: string | null
          dias_laborables: number
          dias_naturales: number
          ejercicio: number
          festivos: Json | null
          id: number
          mes: number
        }
        Insert: {
          ccaa_id?: number | null
          created_at?: string | null
          dias_laborables: number
          dias_naturales: number
          ejercicio: number
          festivos?: Json | null
          id?: number
          mes: number
        }
        Update: {
          ccaa_id?: number | null
          created_at?: string | null
          dias_laborables?: number
          dias_naturales?: number
          ejercicio?: number
          festivos?: Json | null
          id?: number
          mes?: number
        }
        Relationships: [
          {
            foreignKeyName: "np_calendario_laboral_ccaa_id_fkey"
            columns: ["ccaa_id"]
            isOneToOne: false
            referencedRelation: "np_comunidades_autonomas"
            referencedColumns: ["id"]
          },
        ]
      }
      np_categorias_profesionales: {
        Row: {
          complemento_destino: number | null
          complemento_especifico: number | null
          convenio_id: number | null
          created_at: string | null
          denominacion: string
          descripcion: string | null
          id: number
          jornada_horas_semanales: number | null
          nivel: string
          pagas_extraordinarias: number | null
          plus_antiguedad_anual: number | null
          salario_base_mensual: number
          vigente: boolean | null
        }
        Insert: {
          complemento_destino?: number | null
          complemento_especifico?: number | null
          convenio_id?: number | null
          created_at?: string | null
          denominacion: string
          descripcion?: string | null
          id?: number
          jornada_horas_semanales?: number | null
          nivel: string
          pagas_extraordinarias?: number | null
          plus_antiguedad_anual?: number | null
          salario_base_mensual: number
          vigente?: boolean | null
        }
        Update: {
          complemento_destino?: number | null
          complemento_especifico?: number | null
          convenio_id?: number | null
          created_at?: string | null
          denominacion?: string
          descripcion?: string | null
          id?: number
          jornada_horas_semanales?: number | null
          nivel?: string
          pagas_extraordinarias?: number | null
          plus_antiguedad_anual?: number | null
          salario_base_mensual?: number
          vigente?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "np_categorias_profesionales_convenio_id_fkey"
            columns: ["convenio_id"]
            isOneToOne: false
            referencedRelation: "np_convenios_colectivos"
            referencedColumns: ["id"]
          },
        ]
      }
      np_comunidades_autonomas: {
        Row: {
          activa: boolean | null
          codigo: string
          created_at: string | null
          id: number
          nombre: string
          nombre_oficial: string | null
          updated_at: string | null
        }
        Insert: {
          activa?: boolean | null
          codigo: string
          created_at?: string | null
          id?: number
          nombre: string
          nombre_oficial?: string | null
          updated_at?: string | null
        }
        Update: {
          activa?: boolean | null
          codigo?: string
          created_at?: string | null
          id?: number
          nombre?: string
          nombre_oficial?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      np_conceptos_nomina: {
        Row: {
          activo: boolean | null
          codigo: string
          created_at: string | null
          descripcion: string
          es_salarial: boolean
          formula_calculo: string | null
          id: number
          tipo: string
          tributa_irpf: boolean
          tributa_por_prorrata: boolean | null
        }
        Insert: {
          activo?: boolean | null
          codigo: string
          created_at?: string | null
          descripcion: string
          es_salarial: boolean
          formula_calculo?: string | null
          id?: number
          tipo: string
          tributa_irpf: boolean
          tributa_por_prorrata?: boolean | null
        }
        Update: {
          activo?: boolean | null
          codigo?: string
          created_at?: string | null
          descripcion?: string
          es_salarial?: boolean
          formula_calculo?: string | null
          id?: number
          tipo?: string
          tributa_irpf?: boolean
          tributa_por_prorrata?: boolean | null
        }
        Relationships: []
      }
      np_convenios_colectivos: {
        Row: {
          activo: boolean | null
          ambito_territorial: string | null
          archivo_convenio: string | null
          boe_publicacion: string | null
          ccaa_id: number | null
          codigo: string
          created_at: string | null
          fecha_firma: string
          id: number
          nombre: string
          sector: string | null
          vigencia_desde: string
          vigencia_hasta: string
        }
        Insert: {
          activo?: boolean | null
          ambito_territorial?: string | null
          archivo_convenio?: string | null
          boe_publicacion?: string | null
          ccaa_id?: number | null
          codigo: string
          created_at?: string | null
          fecha_firma: string
          id?: number
          nombre: string
          sector?: string | null
          vigencia_desde: string
          vigencia_hasta: string
        }
        Update: {
          activo?: boolean | null
          ambito_territorial?: string | null
          archivo_convenio?: string | null
          boe_publicacion?: string | null
          ccaa_id?: number | null
          codigo?: string
          created_at?: string | null
          fecha_firma?: string
          id?: number
          nombre?: string
          sector?: string | null
          vigencia_desde?: string
          vigencia_hasta?: string
        }
        Relationships: [
          {
            foreignKeyName: "np_convenios_colectivos_ccaa_id_fkey"
            columns: ["ccaa_id"]
            isOneToOne: false
            referencedRelation: "np_comunidades_autonomas"
            referencedColumns: ["id"]
          },
        ]
      }
      np_cuentas_bancarias: {
        Row: {
          activa: boolean | null
          banco: string
          bic: string
          created_at: string | null
          empresa_id: number | null
          es_default: boolean | null
          iban: string
          id: number
          saldo_disponible: number | null
          tipo: string
          titular: string
          updated_at: string | null
        }
        Insert: {
          activa?: boolean | null
          banco: string
          bic: string
          created_at?: string | null
          empresa_id?: number | null
          es_default?: boolean | null
          iban: string
          id?: number
          saldo_disponible?: number | null
          tipo: string
          titular: string
          updated_at?: string | null
        }
        Update: {
          activa?: boolean | null
          banco?: string
          bic?: string
          created_at?: string | null
          empresa_id?: number | null
          es_default?: boolean | null
          iban?: string
          id?: number
          saldo_disponible?: number | null
          tipo?: string
          titular?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "np_cuentas_bancarias_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "np_empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      np_empleados: {
        Row: {
          activo: boolean | null
          apellidos: string
          categoria_id: number | null
          ccaa_residencia_id: number | null
          codigo_postal: string | null
          convenio_id: number | null
          created_at: string | null
          discapacidad_empleado: boolean | null
          empresa_id: number | null
          estado_civil: string | null
          familiares_discapacidad: number | null
          fecha_alta: string
          fecha_baja: string | null
          fecha_nacimiento: string | null
          grado_discapacidad: number | null
          grupo_cotizacion: number
          hijos_menores_3: number | null
          iban: string
          id: number
          jornada_tipo: string | null
          municipio_residencia: string | null
          nif: string
          nombre: string
          numero_hijos: number | null
          numero_ss: string
          pension_compensatoria: boolean | null
          porcentaje_jornada: number | null
          tipo_contrato: string
          updated_at: string | null
        }
        Insert: {
          activo?: boolean | null
          apellidos: string
          categoria_id?: number | null
          ccaa_residencia_id?: number | null
          codigo_postal?: string | null
          convenio_id?: number | null
          created_at?: string | null
          discapacidad_empleado?: boolean | null
          empresa_id?: number | null
          estado_civil?: string | null
          familiares_discapacidad?: number | null
          fecha_alta: string
          fecha_baja?: string | null
          fecha_nacimiento?: string | null
          grado_discapacidad?: number | null
          grupo_cotizacion?: number
          hijos_menores_3?: number | null
          iban: string
          id?: number
          jornada_tipo?: string | null
          municipio_residencia?: string | null
          nif: string
          nombre: string
          numero_hijos?: number | null
          numero_ss: string
          pension_compensatoria?: boolean | null
          porcentaje_jornada?: number | null
          tipo_contrato: string
          updated_at?: string | null
        }
        Update: {
          activo?: boolean | null
          apellidos?: string
          categoria_id?: number | null
          ccaa_residencia_id?: number | null
          codigo_postal?: string | null
          convenio_id?: number | null
          created_at?: string | null
          discapacidad_empleado?: boolean | null
          empresa_id?: number | null
          estado_civil?: string | null
          familiares_discapacidad?: number | null
          fecha_alta?: string
          fecha_baja?: string | null
          fecha_nacimiento?: string | null
          grado_discapacidad?: number | null
          grupo_cotizacion?: number
          hijos_menores_3?: number | null
          iban?: string
          id?: number
          jornada_tipo?: string | null
          municipio_residencia?: string | null
          nif?: string
          nombre?: string
          numero_hijos?: number | null
          numero_ss?: string
          pension_compensatoria?: boolean | null
          porcentaje_jornada?: number | null
          tipo_contrato?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "np_empleados_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "np_categorias_profesionales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "np_empleados_ccaa_residencia_id_fkey"
            columns: ["ccaa_residencia_id"]
            isOneToOne: false
            referencedRelation: "np_comunidades_autonomas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "np_empleados_convenio_id_fkey"
            columns: ["convenio_id"]
            isOneToOne: false
            referencedRelation: "np_convenios_colectivos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "np_empleados_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "np_empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      np_empresas: {
        Row: {
          activa: boolean | null
          ccaa_sede_id: number | null
          cif: string
          cnae_principal: string
          codigo_cuenta_cotizacion: string
          convenio_defecto_id: number | null
          created_at: string | null
          dia_pago: number | null
          entidad_bancaria: string | null
          id: number
          numero_patronal: string | null
          razon_social: string
          tarifa_at_ep: number | null
          updated_at: string | null
        }
        Insert: {
          activa?: boolean | null
          ccaa_sede_id?: number | null
          cif: string
          cnae_principal: string
          codigo_cuenta_cotizacion: string
          convenio_defecto_id?: number | null
          created_at?: string | null
          dia_pago?: number | null
          entidad_bancaria?: string | null
          id?: number
          numero_patronal?: string | null
          razon_social: string
          tarifa_at_ep?: number | null
          updated_at?: string | null
        }
        Update: {
          activa?: boolean | null
          ccaa_sede_id?: number | null
          cif?: string
          cnae_principal?: string
          codigo_cuenta_cotizacion?: string
          convenio_defecto_id?: number | null
          created_at?: string | null
          dia_pago?: number | null
          entidad_bancaria?: string | null
          id?: number
          numero_patronal?: string | null
          razon_social?: string
          tarifa_at_ep?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "np_empresas_ccaa_sede_id_fkey"
            columns: ["ccaa_sede_id"]
            isOneToOne: false
            referencedRelation: "np_comunidades_autonomas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "np_empresas_convenio_defecto_id_fkey"
            columns: ["convenio_defecto_id"]
            isOneToOne: false
            referencedRelation: "np_convenios_colectivos"
            referencedColumns: ["id"]
          },
        ]
      }
      np_grupos_cotizacion: {
        Row: {
          base_maxima_mensual: number
          base_minima_mensual: number
          created_at: string | null
          descripcion: string
          ejercicio: number
          grupo: number
          id: number
        }
        Insert: {
          base_maxima_mensual: number
          base_minima_mensual: number
          created_at?: string | null
          descripcion: string
          ejercicio: number
          grupo: number
          id?: number
        }
        Update: {
          base_maxima_mensual?: number
          base_minima_mensual?: number
          created_at?: string | null
          descripcion?: string
          ejercicio?: number
          grupo?: number
          id?: number
        }
        Relationships: []
      }
      np_nomina_conceptos: {
        Row: {
          base_calculo: number | null
          cantidad: number | null
          concepto_id: number | null
          created_at: string | null
          id: number
          importe: number
          nomina_id: number | null
          observaciones: string | null
          precio: number | null
        }
        Insert: {
          base_calculo?: number | null
          cantidad?: number | null
          concepto_id?: number | null
          created_at?: string | null
          id?: number
          importe: number
          nomina_id?: number | null
          observaciones?: string | null
          precio?: number | null
        }
        Update: {
          base_calculo?: number | null
          cantidad?: number | null
          concepto_id?: number | null
          created_at?: string | null
          id?: number
          importe?: number
          nomina_id?: number | null
          observaciones?: string | null
          precio?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "np_nomina_conceptos_concepto_id_fkey"
            columns: ["concepto_id"]
            isOneToOne: false
            referencedRelation: "np_conceptos_nomina"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "np_nomina_conceptos_nomina_id_fkey"
            columns: ["nomina_id"]
            isOneToOne: false
            referencedRelation: "np_nominas"
            referencedColumns: ["id"]
          },
        ]
      }
      np_nominas: {
        Row: {
          base_cotizacion_ss: number
          base_irpf: number
          coste_empresa: number
          created_at: string | null
          dias_trabajados: number
          empleado_id: number | null
          fecha_calculo: string | null
          fecha_pago: string | null
          horas_trabajadas: number | null
          id: number
          liquido_percibir: number
          pagada: boolean | null
          periodo_id: number | null
          total_deducciones: number
          total_percepciones: number
          updated_at: string | null
          validada: boolean | null
        }
        Insert: {
          base_cotizacion_ss?: number
          base_irpf?: number
          coste_empresa?: number
          created_at?: string | null
          dias_trabajados?: number
          empleado_id?: number | null
          fecha_calculo?: string | null
          fecha_pago?: string | null
          horas_trabajadas?: number | null
          id?: number
          liquido_percibir?: number
          pagada?: boolean | null
          periodo_id?: number | null
          total_deducciones?: number
          total_percepciones?: number
          updated_at?: string | null
          validada?: boolean | null
        }
        Update: {
          base_cotizacion_ss?: number
          base_irpf?: number
          coste_empresa?: number
          created_at?: string | null
          dias_trabajados?: number
          empleado_id?: number | null
          fecha_calculo?: string | null
          fecha_pago?: string | null
          horas_trabajadas?: number | null
          id?: number
          liquido_percibir?: number
          pagada?: boolean | null
          periodo_id?: number | null
          total_deducciones?: number
          total_percepciones?: number
          updated_at?: string | null
          validada?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "np_nominas_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "np_empleados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "np_nominas_periodo_id_fkey"
            columns: ["periodo_id"]
            isOneToOne: false
            referencedRelation: "np_periodos_nomina"
            referencedColumns: ["id"]
          },
        ]
      }
      np_pagos_nominas: {
        Row: {
          archivo_sepa: string | null
          cantidad_total: number
          created_at: string | null
          cuenta_destino_id: number | null
          empresa_id: number | null
          estado: string | null
          fecha_confirmacion: string | null
          fecha_envio_banco: string | null
          fichero_siltra: string | null
          id: number
          numero_asiento_pago: string | null
          numero_empleados: number
          periodo_nomina_id: number | null
          referencia_sepa: string | null
          total_cotizaciones_ss: number
          total_retenciones_irpf: number
          updated_at: string | null
        }
        Insert: {
          archivo_sepa?: string | null
          cantidad_total: number
          created_at?: string | null
          cuenta_destino_id?: number | null
          empresa_id?: number | null
          estado?: string | null
          fecha_confirmacion?: string | null
          fecha_envio_banco?: string | null
          fichero_siltra?: string | null
          id?: number
          numero_asiento_pago?: string | null
          numero_empleados: number
          periodo_nomina_id?: number | null
          referencia_sepa?: string | null
          total_cotizaciones_ss?: number
          total_retenciones_irpf?: number
          updated_at?: string | null
        }
        Update: {
          archivo_sepa?: string | null
          cantidad_total?: number
          created_at?: string | null
          cuenta_destino_id?: number | null
          empresa_id?: number | null
          estado?: string | null
          fecha_confirmacion?: string | null
          fecha_envio_banco?: string | null
          fichero_siltra?: string | null
          id?: number
          numero_asiento_pago?: string | null
          numero_empleados?: number
          periodo_nomina_id?: number | null
          referencia_sepa?: string | null
          total_cotizaciones_ss?: number
          total_retenciones_irpf?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "np_pagos_nominas_cuenta_destino_id_fkey"
            columns: ["cuenta_destino_id"]
            isOneToOne: false
            referencedRelation: "np_cuentas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "np_pagos_nominas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "np_empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "np_pagos_nominas_periodo_nomina_id_fkey"
            columns: ["periodo_nomina_id"]
            isOneToOne: false
            referencedRelation: "np_periodos_nomina"
            referencedColumns: ["id"]
          },
        ]
      }
      np_periodos_nomina: {
        Row: {
          ano: number
          created_at: string | null
          empresa_id: number | null
          estado: string | null
          fecha_desde: string
          fecha_hasta: string
          fecha_pago: string
          id: number
          mes: number
          observaciones: string | null
          tipo: string | null
          updated_at: string | null
        }
        Insert: {
          ano: number
          created_at?: string | null
          empresa_id?: number | null
          estado?: string | null
          fecha_desde: string
          fecha_hasta: string
          fecha_pago: string
          id?: number
          mes: number
          observaciones?: string | null
          tipo?: string | null
          updated_at?: string | null
        }
        Update: {
          ano?: number
          created_at?: string | null
          empresa_id?: number | null
          estado?: string | null
          fecha_desde?: string
          fecha_hasta?: string
          fecha_pago?: string
          id?: number
          mes?: number
          observaciones?: string | null
          tipo?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "np_periodos_nomina_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "np_empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      np_provisiones_fondos: {
        Row: {
          autorizado_por: string | null
          cantidad: number
          concepto_codigo: string
          concepto_descripcion: string
          created_at: string | null
          cuenta_contable: string
          cuenta_origen_id: number | null
          empresa_id: number | null
          estado: string | null
          fecha_autorizacion: string | null
          id: number
          justificante_hash: string | null
          justificante_numero: string | null
          motivo_rechazo: string | null
          numero_asiento: string | null
          periodo_nomina_id: number | null
          processed_at: string | null
          requiere_autorizacion: boolean | null
        }
        Insert: {
          autorizado_por?: string | null
          cantidad: number
          concepto_codigo: string
          concepto_descripcion: string
          created_at?: string | null
          cuenta_contable: string
          cuenta_origen_id?: number | null
          empresa_id?: number | null
          estado?: string | null
          fecha_autorizacion?: string | null
          id?: number
          justificante_hash?: string | null
          justificante_numero?: string | null
          motivo_rechazo?: string | null
          numero_asiento?: string | null
          periodo_nomina_id?: number | null
          processed_at?: string | null
          requiere_autorizacion?: boolean | null
        }
        Update: {
          autorizado_por?: string | null
          cantidad?: number
          concepto_codigo?: string
          concepto_descripcion?: string
          created_at?: string | null
          cuenta_contable?: string
          cuenta_origen_id?: number | null
          empresa_id?: number | null
          estado?: string | null
          fecha_autorizacion?: string | null
          id?: number
          justificante_hash?: string | null
          justificante_numero?: string | null
          motivo_rechazo?: string | null
          numero_asiento?: string | null
          periodo_nomina_id?: number | null
          processed_at?: string | null
          requiere_autorizacion?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "np_provisiones_fondos_cuenta_origen_id_fkey"
            columns: ["cuenta_origen_id"]
            isOneToOne: false
            referencedRelation: "np_cuentas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "np_provisiones_fondos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "np_empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "np_provisiones_fondos_periodo_nomina_id_fkey"
            columns: ["periodo_nomina_id"]
            isOneToOne: false
            referencedRelation: "np_periodos_nomina"
            referencedColumns: ["id"]
          },
        ]
      }
      np_salarios_minimos: {
        Row: {
          created_at: string | null
          ejercicio: number
          id: number
          smi_diario: number
          smi_mensual: number
          vigente_desde: string
          vigente_hasta: string | null
        }
        Insert: {
          created_at?: string | null
          ejercicio: number
          id?: number
          smi_diario: number
          smi_mensual: number
          vigente_desde: string
          vigente_hasta?: string | null
        }
        Update: {
          created_at?: string | null
          ejercicio?: number
          id?: number
          smi_diario?: number
          smi_mensual?: number
          vigente_desde?: string
          vigente_hasta?: string | null
        }
        Relationships: []
      }
      np_tipos_cotizacion_ss: {
        Row: {
          base_maxima: number
          base_minima: number
          concepto: string
          created_at: string | null
          ejercicio: number
          id: number
          observaciones: string | null
          tipo_empresa: number
          tipo_trabajador: number
          vigente_desde: string
          vigente_hasta: string | null
        }
        Insert: {
          base_maxima: number
          base_minima: number
          concepto: string
          created_at?: string | null
          ejercicio: number
          id?: number
          observaciones?: string | null
          tipo_empresa: number
          tipo_trabajador: number
          vigente_desde: string
          vigente_hasta?: string | null
        }
        Update: {
          base_maxima?: number
          base_minima?: number
          concepto?: string
          created_at?: string | null
          ejercicio?: number
          id?: number
          observaciones?: string | null
          tipo_empresa?: number
          tipo_trabajador?: number
          vigente_desde?: string
          vigente_hasta?: string | null
        }
        Relationships: []
      }
      np_tramos_irpf_ccaa: {
        Row: {
          ccaa_id: number | null
          created_at: string | null
          ejercicio: number
          id: number
          tipo_agregado: number
          tipo_autonomico: number
          tipo_estatal: number
          tramo_desde: number
          tramo_hasta: number | null
          vigente_desde: string
          vigente_hasta: string | null
        }
        Insert: {
          ccaa_id?: number | null
          created_at?: string | null
          ejercicio: number
          id?: number
          tipo_agregado: number
          tipo_autonomico: number
          tipo_estatal: number
          tramo_desde: number
          tramo_hasta?: number | null
          vigente_desde: string
          vigente_hasta?: string | null
        }
        Update: {
          ccaa_id?: number | null
          created_at?: string | null
          ejercicio?: number
          id?: number
          tipo_agregado?: number
          tipo_autonomico?: number
          tipo_estatal?: number
          tramo_desde?: number
          tramo_hasta?: number | null
          vigente_desde?: string
          vigente_hasta?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "np_tramos_irpf_ccaa_ccaa_id_fkey"
            columns: ["ccaa_id"]
            isOneToOne: false
            referencedRelation: "np_comunidades_autonomas"
            referencedColumns: ["id"]
          },
        ]
      }
      np_transacciones: {
        Row: {
          completed_at: string | null
          created_at: string | null
          cuenta_bancaria_id: number | null
          descripcion: string
          documentos_asociados: Json | null
          empresa_id: number | null
          estado: string | null
          id: number
          importe: number
          metadata: Json | null
          numero_empleados_afectados: number | null
          periodo_nomina_id: number | null
          processed_at: string | null
          referencia_operacion: string
          tipo: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          cuenta_bancaria_id?: number | null
          descripcion: string
          documentos_asociados?: Json | null
          empresa_id?: number | null
          estado?: string | null
          id?: number
          importe: number
          metadata?: Json | null
          numero_empleados_afectados?: number | null
          periodo_nomina_id?: number | null
          processed_at?: string | null
          referencia_operacion: string
          tipo: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          cuenta_bancaria_id?: number | null
          descripcion?: string
          documentos_asociados?: Json | null
          empresa_id?: number | null
          estado?: string | null
          id?: number
          importe?: number
          metadata?: Json | null
          numero_empleados_afectados?: number | null
          periodo_nomina_id?: number | null
          processed_at?: string | null
          referencia_operacion?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "np_transacciones_cuenta_bancaria_id_fkey"
            columns: ["cuenta_bancaria_id"]
            isOneToOne: false
            referencedRelation: "np_cuentas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "np_transacciones_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "np_empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "np_transacciones_periodo_nomina_id_fkey"
            columns: ["periodo_nomina_id"]
            isOneToOne: false
            referencedRelation: "np_periodos_nomina"
            referencedColumns: ["id"]
          },
        ]
      }
      nurturing_sequence_steps: {
        Row: {
          campaign_id: string | null
          completed_at: string | null
          created_at: string
          id: string
          sequence_id: string | null
          status: string | null
          step_order: number
        }
        Insert: {
          campaign_id?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          sequence_id?: string | null
          status?: string | null
          step_order: number
        }
        Update: {
          campaign_id?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          sequence_id?: string | null
          status?: string | null
          step_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "nurturing_sequence_steps_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nurturing_sequence_steps_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "nurturing_sequences"
            referencedColumns: ["id"]
          },
        ]
      }
      nurturing_sequences: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      outbound_emails: {
        Row: {
          bcc_emails: string[] | null
          body: string
          cc_emails: string[] | null
          company_id: string | null
          created_at: string
          created_by: string | null
          email_account_id: string | null
          id: string
          in_reply_to: string | null
          inbound_email_id: string | null
          references: string[] | null
          reply_to_message_id: string | null
          sent_at: string
          signature_used: string | null
          status: string
          subject: string
          thread_id: string | null
          to_email: string
          tracking_enabled: boolean | null
          user_id: string | null
        }
        Insert: {
          bcc_emails?: string[] | null
          body: string
          cc_emails?: string[] | null
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          email_account_id?: string | null
          id?: string
          in_reply_to?: string | null
          inbound_email_id?: string | null
          references?: string[] | null
          reply_to_message_id?: string | null
          sent_at?: string
          signature_used?: string | null
          status?: string
          subject: string
          thread_id?: string | null
          to_email: string
          tracking_enabled?: boolean | null
          user_id?: string | null
        }
        Update: {
          bcc_emails?: string[] | null
          body?: string
          cc_emails?: string[] | null
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          email_account_id?: string | null
          id?: string
          in_reply_to?: string | null
          inbound_email_id?: string | null
          references?: string[] | null
          reply_to_message_id?: string | null
          sent_at?: string
          signature_used?: string | null
          status?: string
          subject?: string
          thread_id?: string | null
          to_email?: string
          tracking_enabled?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outbound_emails_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "call_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outbound_emails_email_account_id_fkey"
            columns: ["email_account_id"]
            isOneToOne: false
            referencedRelation: "email_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outbound_emails_inbound_email_id_fkey"
            columns: ["inbound_email_id"]
            isOneToOne: false
            referencedRelation: "inbound_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_claims: {
        Row: {
          client_email: string | null
          company_name: string | null
          contact_name: string | null
          created_at: string | null
          data_proper_avis: string | null
          data_ultim_avis: string | null
          days_overdue: number | null
          estat: string | null
          exclusion_reason: string | null
          exclusion_until: string | null
          id: string
          import_total: number
          invoice_holded_id: string
          invoice_number: string
          notes: string | null
          num_avisos: number | null
          updated_at: string | null
        }
        Insert: {
          client_email?: string | null
          company_name?: string | null
          contact_name?: string | null
          created_at?: string | null
          data_proper_avis?: string | null
          data_ultim_avis?: string | null
          days_overdue?: number | null
          estat?: string | null
          exclusion_reason?: string | null
          exclusion_until?: string | null
          id?: string
          import_total?: number
          invoice_holded_id: string
          invoice_number: string
          notes?: string | null
          num_avisos?: number | null
          updated_at?: string | null
        }
        Update: {
          client_email?: string | null
          company_name?: string | null
          contact_name?: string | null
          created_at?: string | null
          data_proper_avis?: string | null
          data_ultim_avis?: string | null
          days_overdue?: number | null
          estat?: string | null
          exclusion_reason?: string | null
          exclusion_until?: string | null
          id?: string
          import_total?: number
          invoice_holded_id?: string
          invoice_number?: string
          notes?: string | null
          num_avisos?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pipedrive_cache: {
        Row: {
          cache_key: string
          cached_at: string
          created_at: string | null
          expires_at: string
          id: string
          pipeline_id: number
          pipeline_name: string | null
          stages: Json
          updated_at: string | null
        }
        Insert: {
          cache_key: string
          cached_at?: string
          created_at?: string | null
          expires_at: string
          id?: string
          pipeline_id: number
          pipeline_name?: string | null
          stages?: Json
          updated_at?: string | null
        }
        Update: {
          cache_key?: string
          cached_at?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          pipeline_id?: number
          pipeline_name?: string | null
          stages?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      pipeline_automation_logs: {
        Row: {
          actions_executed: Json | null
          company_id: string | null
          created_by: string
          error_message: string | null
          executed_at: string | null
          id: string
          rule_id: string | null
          status: string
          trigger_data: Json | null
        }
        Insert: {
          actions_executed?: Json | null
          company_id?: string | null
          created_by?: string
          error_message?: string | null
          executed_at?: string | null
          id?: string
          rule_id?: string | null
          status: string
          trigger_data?: Json | null
        }
        Update: {
          actions_executed?: Json | null
          company_id?: string | null
          created_by?: string
          error_message?: string | null
          executed_at?: string | null
          id?: string
          rule_id?: string | null
          status?: string
          trigger_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_automation_logs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "call_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_automation_logs_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "pipeline_automation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_automation_rules: {
        Row: {
          actions: Json
          conditions: Json
          created_at: string | null
          created_by: string
          description: string | null
          execution_count: number | null
          id: string
          is_active: boolean | null
          last_executed_at: string | null
          name: string
          pipeline_id: string | null
          trigger_type: string
          updated_at: string | null
        }
        Insert: {
          actions?: Json
          conditions?: Json
          created_at?: string | null
          created_by?: string
          description?: string | null
          execution_count?: number | null
          id?: string
          is_active?: boolean | null
          last_executed_at?: string | null
          name: string
          pipeline_id?: string | null
          trigger_type: string
          updated_at?: string | null
        }
        Update: {
          actions?: Json
          conditions?: Json
          created_at?: string | null
          created_by?: string
          description?: string | null
          execution_count?: number | null
          id?: string
          is_active?: boolean | null
          last_executed_at?: string | null
          name?: string
          pipeline_id?: string | null
          trigger_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_automation_rules_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipelines"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_stages: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          display_order: number
          id: string
          is_final: boolean | null
          name: string
          pipeline_id: string
          stage_type: string | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order: number
          id?: string
          is_final?: boolean | null
          name: string
          pipeline_id: string
          stage_type?: string | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_final?: boolean | null
          name?: string
          pipeline_id?: string
          stage_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_stages_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipelines"
            referencedColumns: ["id"]
          },
        ]
      }
      pipelines: {
        Row: {
          color: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      plantilla_leads: {
        Row: {
          created_at: string | null
          email: string
          empresa: string | null
          id: number
          nombre: string | null
          plantilla_slug: string
          source: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          empresa?: string | null
          id?: number
          nombre?: string | null
          plantilla_slug: string
          source?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          empresa?: string | null
          id?: number
          nombre?: string | null
          plantilla_slug?: string
          source?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plantilla_leads_plantilla_slug_fkey"
            columns: ["plantilla_slug"]
            isOneToOne: false
            referencedRelation: "site_templates"
            referencedColumns: ["slug"]
          },
        ]
      }
      premium_customers: {
        Row: {
          active_users: number
          churn_date: string | null
          churn_reason: string | null
          city: string | null
          company_name: string
          contact_first_name: string | null
          contact_last_name: string | null
          created_at: string
          created_by: string | null
          customer_type: string | null
          email: string
          expiry_date: string | null
          fixed_annual_price: number | null
          id: string
          is_premium: boolean
          last_payment_date: string | null
          lead_source: string | null
          lifetime_value: number | null
          months_as_customer: number | null
          next_payment_date: string | null
          notes: string | null
          one_time_payment: number | null
          phone: string | null
          price_per_user_monthly: number | null
          pricing_type: string
          renewal_status: string | null
          signup_date: string
          total_annual_revenue: number
          total_payments_received: number | null
          updated_at: string
        }
        Insert: {
          active_users?: number
          churn_date?: string | null
          churn_reason?: string | null
          city?: string | null
          company_name: string
          contact_first_name?: string | null
          contact_last_name?: string | null
          created_at?: string
          created_by?: string | null
          customer_type?: string | null
          email: string
          expiry_date?: string | null
          fixed_annual_price?: number | null
          id?: string
          is_premium?: boolean
          last_payment_date?: string | null
          lead_source?: string | null
          lifetime_value?: number | null
          months_as_customer?: number | null
          next_payment_date?: string | null
          notes?: string | null
          one_time_payment?: number | null
          phone?: string | null
          price_per_user_monthly?: number | null
          pricing_type: string
          renewal_status?: string | null
          signup_date?: string
          total_annual_revenue?: number
          total_payments_received?: number | null
          updated_at?: string
        }
        Update: {
          active_users?: number
          churn_date?: string | null
          churn_reason?: string | null
          city?: string | null
          company_name?: string
          contact_first_name?: string | null
          contact_last_name?: string | null
          created_at?: string
          created_by?: string | null
          customer_type?: string | null
          email?: string
          expiry_date?: string | null
          fixed_annual_price?: number | null
          id?: string
          is_premium?: boolean
          last_payment_date?: string | null
          lead_source?: string | null
          lifetime_value?: number | null
          months_as_customer?: number | null
          next_payment_date?: string | null
          notes?: string | null
          one_time_payment?: number | null
          phone?: string | null
          price_per_user_monthly?: number | null
          pricing_type?: string
          renewal_status?: string | null
          signup_date?: string
          total_annual_revenue?: number
          total_payments_received?: number | null
          updated_at?: string
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
      prospect_campaigns: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          email_campaign_id: string | null
          id: string
          name: string
          original_keyword: string | null
          search_context: Json | null
          status: string
          target_region: string | null
          target_vertical: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          email_campaign_id?: string | null
          id?: string
          name: string
          original_keyword?: string | null
          search_context?: Json | null
          status?: string
          target_region?: string | null
          target_vertical: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          email_campaign_id?: string | null
          id?: string
          name?: string
          original_keyword?: string | null
          search_context?: Json | null
          status?: string
          target_region?: string | null
          target_vertical?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prospect_campaigns_email_campaign_id_fkey"
            columns: ["email_campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      prospect_leads: {
        Row: {
          address: string | null
          business_name: string | null
          business_type: string | null
          campaign_recipient_id: string | null
          campaign_status: string | null
          city: string | null
          contacted_at: string | null
          converted_at: string | null
          created_at: string
          created_by: string
          email: string
          google_maps_url: string | null
          id: string
          last_campaign_sent_at: string | null
          lead_score: number | null
          lead_segment: string | null
          notes: string | null
          phone: string | null
          priority: string | null
          query_id: string
          rating: number | null
          reviews_count: number | null
          source_data: Json | null
          status: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          business_name?: string | null
          business_type?: string | null
          campaign_recipient_id?: string | null
          campaign_status?: string | null
          city?: string | null
          contacted_at?: string | null
          converted_at?: string | null
          created_at?: string
          created_by?: string
          email: string
          google_maps_url?: string | null
          id?: string
          last_campaign_sent_at?: string | null
          lead_score?: number | null
          lead_segment?: string | null
          notes?: string | null
          phone?: string | null
          priority?: string | null
          query_id: string
          rating?: number | null
          reviews_count?: number | null
          source_data?: Json | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string | null
          business_type?: string | null
          campaign_recipient_id?: string | null
          campaign_status?: string | null
          city?: string | null
          contacted_at?: string | null
          converted_at?: string | null
          created_at?: string
          created_by?: string
          email?: string
          google_maps_url?: string | null
          id?: string
          last_campaign_sent_at?: string | null
          lead_score?: number | null
          lead_segment?: string | null
          notes?: string | null
          phone?: string | null
          priority?: string | null
          query_id?: string
          rating?: number | null
          reviews_count?: number | null
          source_data?: Json | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prospect_leads_campaign_recipient_id_fkey"
            columns: ["campaign_recipient_id"]
            isOneToOne: false
            referencedRelation: "campaign_recipients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prospect_leads_query_id_fkey"
            columns: ["query_id"]
            isOneToOne: false
            referencedRelation: "prospect_queries"
            referencedColumns: ["id"]
          },
        ]
      }
      prospect_queries: {
        Row: {
          campaign_id: string | null
          created_at: string
          created_by: string | null
          id: string
          last_execution: string | null
          leads_processed: number
          name: string
          query: string | null
          region_id: string | null
          search_term: string
          source_data: Json | null
          status: string
          total_leads_found: number
          updated_at: string
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          last_execution?: string | null
          leads_processed?: number
          name: string
          query?: string | null
          region_id?: string | null
          search_term: string
          source_data?: Json | null
          status?: string
          total_leads_found?: number
          updated_at?: string
        }
        Update: {
          campaign_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          last_execution?: string | null
          leads_processed?: number
          name?: string
          query?: string | null
          region_id?: string | null
          search_term?: string
          source_data?: Json | null
          status?: string
          total_leads_found?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prospect_queries_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "prospect_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prospect_queries_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "prospect_regions"
            referencedColumns: ["id"]
          },
        ]
      }
      prospect_regions: {
        Row: {
          country: string
          created_at: string
          created_by: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          country?: string
          created_at?: string
          created_by?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      prospect_verticals: {
        Row: {
          created_at: string
          description: string | null
          id: string
          label: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          label: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          label?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      quote_followups: {
        Row: {
          client_email: string | null
          company_name: string | null
          contact_name: string | null
          created_at: string | null
          days_pending: number | null
          estat: string | null
          id: string
          import_total: number
          last_push_at: string | null
          next_push_at: string | null
          notes: string | null
          num_pushes: number | null
          quote_holded_id: string
          quote_number: string
          updated_at: string | null
        }
        Insert: {
          client_email?: string | null
          company_name?: string | null
          contact_name?: string | null
          created_at?: string | null
          days_pending?: number | null
          estat?: string | null
          id?: string
          import_total?: number
          last_push_at?: string | null
          next_push_at?: string | null
          notes?: string | null
          num_pushes?: number | null
          quote_holded_id: string
          quote_number: string
          updated_at?: string | null
        }
        Update: {
          client_email?: string | null
          company_name?: string | null
          contact_name?: string | null
          created_at?: string | null
          days_pending?: number | null
          estat?: string | null
          id?: string
          import_total?: number
          last_push_at?: string | null
          next_push_at?: string | null
          notes?: string | null
          num_pushes?: number | null
          quote_holded_id?: string
          quote_number?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reply_tracking: {
        Row: {
          completed_at: string | null
          created_at: string
          email_id: string
          id: string
          marked_at: string
          notes: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          email_id: string
          id?: string
          marked_at?: string
          notes?: string | null
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          email_id?: string
          id?: string
          marked_at?: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reply_tracking_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "inbound_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmap_categories: {
        Row: {
          created_at: string | null
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      roadmap_changelog: {
        Row: {
          changes: string[]
          created_at: string | null
          date: string
          id: string
          user_id: string | null
          version: string
        }
        Insert: {
          changes: string[]
          created_at?: string | null
          date: string
          id?: string
          user_id?: string | null
          version: string
        }
        Update: {
          changes?: string[]
          created_at?: string | null
          date?: string
          id?: string
          user_id?: string | null
          version?: string
        }
        Relationships: []
      }
      roadmap_features: {
        Row: {
          access: Json
          category: string
          complexity: string
          created_at: string | null
          description: string | null
          estimatedDays: number
          id: string
          name: string
          notes: string | null
          pause_settings: Json | null
          priority: number
          requiresUI: string
          role_behavior: Json | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access: Json
          category: string
          complexity: string
          created_at?: string | null
          description?: string | null
          estimatedDays: number
          id?: string
          name: string
          notes?: string | null
          pause_settings?: Json | null
          priority: number
          requiresUI: string
          role_behavior?: Json | null
          status: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access?: Json
          category?: string
          complexity?: string
          created_at?: string | null
          description?: string | null
          estimatedDays?: number
          id?: string
          name?: string
          notes?: string | null
          pause_settings?: Json | null
          priority?: number
          requiresUI?: string
          role_behavior?: Json | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      rule_groups: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          sort_order: number
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sectors: {
        Row: {
          created_at: string
          description: string | null
          hero_image: string | null
          id: string
          name: string
          relevant_regulations: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          hero_image?: string | null
          id?: string
          name: string
          relevant_regulations?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          hero_image?: string | null
          id?: string
          name?: string
          relevant_regulations?: string | null
          slug?: string
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sender_categories: {
        Row: {
          ai_confidence: number | null
          category: string
          created_at: string | null
          email_count: number | null
          id: string
          last_email_at: string | null
          sender_domain: string | null
          sender_email: string
          subcategory: string | null
          updated_at: string | null
          user_confirmed: boolean | null
          user_id: string | null
        }
        Insert: {
          ai_confidence?: number | null
          category: string
          created_at?: string | null
          email_count?: number | null
          id?: string
          last_email_at?: string | null
          sender_domain?: string | null
          sender_email: string
          subcategory?: string | null
          updated_at?: string | null
          user_confirmed?: boolean | null
          user_id?: string | null
        }
        Update: {
          ai_confidence?: number | null
          category?: string
          created_at?: string | null
          email_count?: number | null
          id?: string
          last_email_at?: string | null
          sender_domain?: string | null
          sender_email?: string
          subcategory?: string | null
          updated_at?: string | null
          user_confirmed?: boolean | null
          user_id?: string | null
        }
        Relationships: []
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
      setup_requests: {
        Row: {
          apellidos: string
          created_at: string | null
          email: string
          holded_draft_id: string | null
          id: string
          implementation_scheduled_at: string | null
          license_amount: number
          nif_cif: string
          nombre: string
          notes: string | null
          num_users: number
          payment_confirmed_at: string | null
          payment_confirmed_by: string | null
          payment_status: string | null
          razon_social: string
          setup_fixed: number | null
          setup_per_user: number
          telefono: string
          total_amount: number
        }
        Insert: {
          apellidos: string
          created_at?: string | null
          email: string
          holded_draft_id?: string | null
          id?: string
          implementation_scheduled_at?: string | null
          license_amount: number
          nif_cif: string
          nombre: string
          notes?: string | null
          num_users: number
          payment_confirmed_at?: string | null
          payment_confirmed_by?: string | null
          payment_status?: string | null
          razon_social: string
          setup_fixed?: number | null
          setup_per_user: number
          telefono: string
          total_amount: number
        }
        Update: {
          apellidos?: string
          created_at?: string | null
          email?: string
          holded_draft_id?: string | null
          id?: string
          implementation_scheduled_at?: string | null
          license_amount?: number
          nif_cif?: string
          nombre?: string
          notes?: string | null
          num_users?: number
          payment_confirmed_at?: string | null
          payment_confirmed_by?: string | null
          payment_status?: string | null
          razon_social?: string
          setup_fixed?: number | null
          setup_per_user?: number
          telefono?: string
          total_amount?: number
        }
        Relationships: []
      }
      site_articles: {
        Row: {
          author: string | null
          author_avatar_url: string | null
          canonical_url: string | null
          category: string
          content: string | null
          content_html: string | null
          content_markdown: string | null
          created_at: string
          excerpt: string | null
          featured_image: string | null
          featured_image_alt: string | null
          focus_keyword: string | null
          id: number
          meta_description: string | null
          meta_title: string | null
          og_image_url: string | null
          primary_cta_text: string | null
          primary_cta_url: string | null
          published_at: string | null
          reading_time: number | null
          related_post_slugs: string[] | null
          schema_json: Json | null
          secondary_keywords: string[] | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          author_avatar_url?: string | null
          canonical_url?: string | null
          category?: string
          content?: string | null
          content_html?: string | null
          content_markdown?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          featured_image_alt?: string | null
          focus_keyword?: string | null
          id?: number
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          primary_cta_text?: string | null
          primary_cta_url?: string | null
          published_at?: string | null
          reading_time?: number | null
          related_post_slugs?: string[] | null
          schema_json?: Json | null
          secondary_keywords?: string[] | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          author_avatar_url?: string | null
          canonical_url?: string | null
          category?: string
          content?: string | null
          content_html?: string | null
          content_markdown?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          featured_image_alt?: string | null
          focus_keyword?: string | null
          id?: number
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          primary_cta_text?: string | null
          primary_cta_url?: string | null
          published_at?: string | null
          reading_time?: number | null
          related_post_slugs?: string[] | null
          schema_json?: Json | null
          secondary_keywords?: string[] | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_templates: {
        Row: {
          category: string | null
          created_at: string | null
          cta_text: string | null
          cta_url: string | null
          description: string | null
          download_count: number | null
          id: number
          inwout_pitch: string | null
          keywords: string[] | null
          pdf_url: string | null
          preview_image_url: string | null
          slug: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          cta_text?: string | null
          cta_url?: string | null
          description?: string | null
          download_count?: number | null
          id?: number
          inwout_pitch?: string | null
          keywords?: string[] | null
          pdf_url?: string | null
          preview_image_url?: string | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          cta_text?: string | null
          cta_url?: string | null
          description?: string | null
          download_count?: number | null
          id?: number
          inwout_pitch?: string | null
          keywords?: string[] | null
          pdf_url?: string | null
          preview_image_url?: string | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      solution_categories: {
        Row: {
          category_id: string
          solution_id: string
        }
        Insert: {
          category_id: string
          solution_id: string
        }
        Update: {
          category_id?: string
          solution_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "solution_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solution_categories_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      solution_sectors: {
        Row: {
          relevance_score: number | null
          sector_id: string
          solution_id: string
        }
        Insert: {
          relevance_score?: number | null
          sector_id: string
          solution_id: string
        }
        Update: {
          relevance_score?: number | null
          sector_id?: string
          solution_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "solution_sectors_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solution_sectors_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      update_config: {
        Row: {
          base_url: string
          config: Json | null
          created_at: string | null
          enabled: boolean | null
          error_threshold: number | null
          last_full_scan: string | null
          last_successful_run: string | null
          max_pages: number | null
          rate_limit_delay_ms: number | null
          source_type: string
          update_frequency_hours: number | null
          updated_at: string | null
        }
        Insert: {
          base_url: string
          config?: Json | null
          created_at?: string | null
          enabled?: boolean | null
          error_threshold?: number | null
          last_full_scan?: string | null
          last_successful_run?: string | null
          max_pages?: number | null
          rate_limit_delay_ms?: number | null
          source_type: string
          update_frequency_hours?: number | null
          updated_at?: string | null
        }
        Update: {
          base_url?: string
          config?: Json | null
          created_at?: string | null
          enabled?: boolean | null
          error_threshold?: number | null
          last_full_scan?: string | null
          last_successful_run?: string | null
          max_pages?: number | null
          rate_limit_delay_ms?: number | null
          source_type?: string
          update_frequency_hours?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      update_history: {
        Row: {
          change_type: string
          changes_detected: Json | null
          created_at: string | null
          embeddings_count: number | null
          error_message: string | null
          id: string
          new_hash: string | null
          old_hash: string | null
          processing_time_ms: number | null
          success: boolean | null
          url_id: string | null
          vector_store_updated: boolean | null
        }
        Insert: {
          change_type: string
          changes_detected?: Json | null
          created_at?: string | null
          embeddings_count?: number | null
          error_message?: string | null
          id?: string
          new_hash?: string | null
          old_hash?: string | null
          processing_time_ms?: number | null
          success?: boolean | null
          url_id?: string | null
          vector_store_updated?: boolean | null
        }
        Update: {
          change_type?: string
          changes_detected?: Json | null
          created_at?: string | null
          embeddings_count?: number | null
          error_message?: string | null
          id?: string
          new_hash?: string | null
          old_hash?: string | null
          processing_time_ms?: number | null
          success?: boolean | null
          url_id?: string | null
          vector_store_updated?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "update_history_url_id_fkey"
            columns: ["url_id"]
            isOneToOne: false
            referencedRelation: "url_tracking"
            referencedColumns: ["id"]
          },
        ]
      }
      url_tracking: {
        Row: {
          content_hash: string | null
          content_size: number | null
          created_at: string | null
          error_count: number | null
          http_status: number | null
          id: string
          last_checked: string | null
          last_modified: string | null
          last_updated: string | null
          metadata: Json | null
          source_type: string
          status: string | null
          title: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          content_hash?: string | null
          content_size?: number | null
          created_at?: string | null
          error_count?: number | null
          http_status?: number | null
          id?: string
          last_checked?: string | null
          last_modified?: string | null
          last_updated?: string | null
          metadata?: Json | null
          source_type: string
          status?: string | null
          title?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          content_hash?: string | null
          content_size?: number | null
          created_at?: string | null
          error_count?: number | null
          http_status?: number | null
          id?: string
          last_checked?: string | null
          last_modified?: string | null
          last_updated?: string | null
          metadata?: Json | null
          source_type?: string
          status?: string | null
          title?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          empresa_id: number | null
          full_name: string | null
          id: string
          onboarding_completed: boolean | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          empresa_id?: number | null
          full_name?: string | null
          id: string
          onboarding_completed?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          empresa_id?: number | null
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      web_content_vectorstore: {
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
    }
    Views: {
      holded_prospect_mapping: {
        Row: {
          clipmail_contact_email: string | null
          clipmail_contact_id: string | null
          contact_status: string | null
          first_name: string | null
          holded_company: string | null
          holded_contact_id: string | null
          holded_email: string | null
          holded_id: string | null
          holded_name: string | null
          last_name: string | null
          lead_email: string | null
          lead_id: string | null
          lead_status: string | null
          mb_domain: string | null
          mb_target_id: string | null
          prospect_email: string | null
          prospect_lead_id: string | null
          prospect_status: string | null
          prospect_type: string | null
        }
        Relationships: []
      }
      holded_quote_conversion: {
        Row: {
          contact_id: string | null
          contact_name: string | null
          conversion_status: string | null
          converted_invoice_id: string | null
          days_since_quote: number | null
          invoice_amount: number | null
          invoice_date: string | null
          invoice_holded_id: string | null
          invoice_number: string | null
          quote_amount: number | null
          quote_date: string | null
          quote_holded_id: string | null
          quote_id: string | null
          quote_number: string | null
          quote_status: string | null
        }
        Relationships: []
      }
      leads_to_process: {
        Row: {
          campaña_activa: string | null
          created_at: string | null
          deal_id: number | null
          email: string | null
          estado: string | null
          id: string | null
          name: string | null
          num_users: number | null
          person_id: number | null
          phone: string | null
          pipeline_id: number | null
          proximo_envio: string | null
          stage_id: number | null
          step_actual: number | null
          tipo_empresa: string | null
          ultimo_envio: string | null
          unsubscribe: boolean | null
        }
        Relationships: []
      }
      onboarding_cron_status: {
        Row: {
          active: boolean | null
          database: string | null
          job_name: string | null
          schedule: string | null
        }
        Insert: {
          active?: boolean | null
          database?: string | null
          job_name?: string | null
          schedule?: string | null
        }
        Update: {
          active?: boolean | null
          database?: string | null
          job_name?: string | null
          schedule?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      assign_admin_role: { Args: { user_email: string }; Returns: boolean }
      bytea_to_text: { Args: { data: string }; Returns: string }
      calculate_customer_arr: { Args: { p_holded_id: string }; Returns: number }
      calculate_customer_ltv: {
        Args: { customer_email: string }
        Returns: number
      }
      calculate_lead_score: {
        Args: { p_rating: number; p_reviews_count: number; p_website: string }
        Returns: number
      }
      calculate_next_onboarding_step: {
        Args: { current_step: number; num_users?: number }
        Returns: {
          days_to_add: number
          next_step: string
        }[]
      }
      check_daily_email_limit: {
        Args: { p_user_id?: string }
        Returns: {
          can_send: boolean
          emails_sent: number
          limit_reached: boolean
        }[]
      }
      check_duplicate_prospect_emails: {
        Args: { p_email: string }
        Returns: {
          campaign_id: string
          campaign_name: string
          campaign_status: string
          lead_id: string
        }[]
      }
      check_quote_in_campaign: {
        Args: { p_campaign_id: string; quote_email: string }
        Returns: boolean
      }
      clean_expired_pipedrive_cache: { Args: never; Returns: undefined }
      cleanup_expired_cache: { Args: never; Returns: undefined }
      create_campaign_from_template: {
        Args: {
          p_custom_name?: string
          p_region?: string
          p_template_id: string
          p_vertical?: string
        }
        Returns: string
      }
      detect_pricing_type: { Args: { p_holded_id: string }; Returns: string }
      determine_lead_segment: { Args: { p_score: number }; Returns: string }
      extract_main_keyword: { Args: { keyword_text: string }; Returns: string }
      extract_region_dynamic: { Args: { search_term: string }; Returns: string }
      generate_campaign_name: {
        Args: { region?: string; template_name: string; vertical?: string }
        Returns: string
      }
      get_action_center_summary: { Args: never; Returns: Json }
      get_active_cold_email_prompt: {
        Args: { p_user_id: string }
        Returns: {
          examples_cold: string[]
          examples_not_cold: string[]
        }[]
      }
      get_all_holded_invoices_recent: {
        Args: never
        Returns: {
          arr: number
          churn_date: string
          churn_reason: string
          company: string
          contact_name: string
          days_until_expiry: number
          email: string
          expiry_date: string
          has_renewal: boolean
          holded_id: string
          invoice_date: string
          invoice_id: string
          invoice_number: string
          lifetime_value: number
          num_employees: number
          premium_customer_id: string
          renewal_status: string
          signup_date: string
          status: string
        }[]
      }
      get_business_metrics: {
        Args: never
        Returns: {
          customers_199_annual: number
          customers_licitacion: number
          customers_partner: number
          customers_per_user: number
          pending_renewals_30_days: number
          pending_renewals_60_days: number
          pending_renewals_90_days: number
          total_arr: number
          total_mrr: number
        }[]
      }
      get_campaign_click_details: {
        Args: { campaign_uuid: string }
        Returns: {
          email: string
          first_name: string
          last_click_at: string
          last_name: string
          most_clicked_url: string
          total_clicks: number
          unique_urls: number
        }[]
      }
      get_campaign_stats:
        | { Args: never; Returns: undefined }
        | {
            Args: { campaign_uuid: string }
            Returns: {
              click_rate: number
              open_rate: number
              total_bounced: number
              total_clicked: number
              total_opened: number
              total_sent: number
              total_unsubscribed: number
            }[]
          }
      get_campaign_stats_public: {
        Args: { campaign_uuid: string }
        Returns: {
          click_rate: number
          open_rate: number
          total_bounced: number
          total_clicked: number
          total_opened: number
          total_sent: number
          total_unsubscribed: number
        }[]
      }
      get_campaign_stats_unified: {
        Args: { campaign_uuid: string }
        Returns: {
          campaign_type: string
          click_rate: number
          open_rate: number
          total_bounced: number
          total_clicked: number
          total_opened: number
          total_sent: number
          total_unsubscribed: number
        }[]
      }
      get_click_conversion_metrics: {
        Args: { days_back?: number }
        Returns: {
          avg_clicks_per_user: number
          click_to_action_rate: number
          clicks_today: number
          most_clicked_url: string
          total_clicks: number
          unique_clickers: number
        }[]
      }
      get_current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_email_history: {
        Args: { email_address: string }
        Returns: {
          campaign_id: string
          campaign_name: string
          clicked_at: string
          opened_at: string
          recipient_id: string
          sent_at: string
          template_name: string
        }[]
      }
      get_engagement_metrics_excluding_unsubscribes: {
        Args: { days_back?: number }
        Returns: {
          avg_clicks_per_user_corrected: number
          click_to_action_rate_corrected: number
          clicks_today_valid: number
          most_clicked_url_valid: string
          total_clicks_unsubscribe: number
          total_clicks_valid: number
          unique_clickers_valid: number
        }[]
      }
      get_holded_business_metrics: {
        Args: never
        Returns: {
          active_clients_count: number
          paid_invoices_amount: number
          paid_invoices_count: number
          pending_invoices_amount: number
          pending_invoices_count: number
          quotes_pending_amount: number
          quotes_pending_count: number
          total_arr: number
          total_invoiced: number
          total_mrr: number
        }[]
      }
      get_holded_customers_with_arr: {
        Args: never
        Returns: {
          arr: number
          company: string
          contact_email: string
          contact_name: string
          contact_phone: string
          days_until_expiry: number
          expiry_date: string
          holded_id: string
          last_invoice_date: string
          last_invoice_number: string
          mrr: number
          num_employees: number
          pricing_type: string
          renewal_status: string
        }[]
      }
      get_holded_monthly_sales: {
        Args: never
        Returns: {
          month: string
          presupuestos: number
          ventas: number
        }[]
      }
      get_holded_renewals_2026: {
        Args: never
        Returns: {
          company: string
          contact_email: string
          contact_name: string
          contact_phone: string
          current_arr: number
          current_employees: number
          days_until_renewal: number
          expiry_date: string
          has_premium_record: boolean
          holded_id: string
          pricing_type: string
          urgency: string
        }[]
      }
      get_hunter_usage: {
        Args: never
        Returns: {
          daily_limit: number
          daily_used: number
          monthly_limit: number
          monthly_used: number
          remaining_month: number
          remaining_today: number
        }[]
      }
      get_invoices_to_claim: {
        Args: { dias_gracia?: number }
        Returns: {
          claim_id: string
          claim_status: string
          company_name: string
          contact_email: string
          contact_id: string
          contact_name: string
          data_proper_avis: string
          days_overdue: number
          due_date: string
          invoice_id: string
          invoice_number: string
          num_avisos: number
          total: number
        }[]
      }
      get_madrid_cron_schedule: { Args: never; Returns: string }
      get_onboarding_performance_metrics: {
        Args: never
        Returns: {
          avg_completion_days: number
          completed_onboarding: number
          completion_rate: number
          dropout_rate_day_0_to_1: number
          dropout_rate_day_1_to_2: number
          leads_stuck_day_0: number
          leads_stuck_day_1: number
          leads_stuck_day_2: number
          total_leads_onboarding: number
        }[]
      }
      get_pending_quotes_with_contacts: {
        Args: never
        Returns: {
          campaign_count: number
          company: string
          contact_email: string
          contact_name: string
          contact_phone: string
          date: string
          days_old: number
          holded_id: string
          holded_status_code: number
          in_campaign: boolean
          invoice_id: string
          invoice_number: string
          status: string
          total: number
          urgency: string
        }[]
      }
      get_quotes_analytics: {
        Args: never
        Returns: {
          accepted_count: number
          accepted_value: number
          conversion_rate_count: number
          conversion_rate_value: number
          deleted_count: number
          deleted_value: number
          draft_avg_days: number
          draft_count: number
          draft_value: number
          medium_count: number
          old_count: number
          recent_count: number
          rejected_count: number
          rejected_value: number
          sent_avg_days: number
          sent_count: number
          sent_value: number
          total_quotes: number
          total_value: number
          very_old_count: number
        }[]
      }
      get_quotes_to_push: {
        Args: { dias_minims?: number }
        Returns: {
          company_name: string
          contact_email: string
          contact_id: string
          contact_name: string
          days_pending: number
          followup_id: string
          followup_status: string
          issue_date: string
          next_push_at: string
          num_pushes: number
          quote_id: string
          quote_number: string
          total: number
        }[]
      }
      get_send_timing_metrics: {
        Args: never
        Returns: {
          avg_open_time_hours: number
          best_send_day: string
          best_send_hour: number
          emails_sent_last_7_days: number[]
          total_emails_sent_this_week: number
          total_emails_sent_today: number
        }[]
      }
      get_unified_email_metrics: {
        Args: {
          p_campaign_id?: string
          p_campaign_type?: string
          p_days_ago?: number
        }
        Returns: {
          bounce_rate: number
          bounced: number
          click_rate: number
          open_rate: number
          total_clicks: number
          total_opens: number
          total_sent: number
          unique_clicks: number
          unique_opens: number
          unsubscribed: number
        }[]
      }
      get_unread_inbound_count: { Args: never; Returns: number }
      get_unsubscribed_emails: {
        Args: { days_back?: number }
        Returns: {
          total_unsubscribed: number
          unsubscribe_rate: number
          unsubscribed_this_week: number
          unsubscribed_today: number
        }[]
      }
      get_urgent_actions: { Args: { limit_count?: number }; Returns: Json }
      get_user_empresa_id: { Args: never; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "http_request"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_delete:
        | {
            Args: { uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { content: string; content_type: string; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_get:
        | {
            Args: { uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { data: Json; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
        SetofOptions: {
          from: "*"
          to: "http_header"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_list_curlopt: {
        Args: never
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_post:
        | {
            Args: { content: string; content_type: string; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { data: Json; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: {
              body: string
              content_type: string
              headers: Json
              url: string
            }
            Returns: Json
          }
      http_put: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_reset_curlopt: { Args: never; Returns: boolean }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      increment_daily_send_count: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      increment_email_count: { Args: { p_user_id?: string }; Returns: boolean }
      insert_campaign_with_recipients: {
        Args: { campaign: Json; contacts: Json[] }
        Returns: string
      }
      log_security_event: {
        Args: {
          p_action: string
          p_details?: Json
          p_resource_id?: string
          p_resource_type: string
        }
        Returns: undefined
      }
      mark_inbound_email_read: {
        Args: { email_id: string }
        Returns: undefined
      }
      match_documents:
        | { Args: never; Returns: undefined }
        | {
            Args: {
              filter?: Json
              match_count?: number
              query_embedding: string
            }
            Returns: {
              content: string
              id: string
              metadata: Json
              similarity: number
            }[]
          }
        | {
            Args: {
              match_count?: number
              match_threshold?: number
              query_embedding: string
            }
            Returns: {
              content: string
              id: string
              metadata: Json
              similarity: number
            }[]
          }
        | {
            Args: {
              match_count?: number
              match_threshold?: number
              query_embedding: string
              table_name?: string
            }
            Returns: {
              category: string
              content: string
              id: number
              last_updated: string
              meta_description: string
              similarity: number
              title: string
              url: string
            }[]
          }
      match_help_documents: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          category: string
          content: string
          id: number
          last_updated: string
          meta_description: string
          similarity: number
          title: string
          url: string
        }[]
      }
      match_labor_guide_documents: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      openai_embedding:
        | { Args: { input: string; model: string }; Returns: string }
        | {
            Args: { api_key: string; input: string; model: string }
            Returns: string
          }
      process_overdue_onboarding_emails: { Args: never; Returns: Json }
      recalculate_all_customer_ltv: { Args: never; Returns: undefined }
      send_tracked_email: {
        Args: {
          p_campaign_id: string
          p_recipient_email: string
          p_recipient_first_name?: string
          p_recipient_id: string
          p_recipient_last_name?: string
          p_template_id: string
        }
        Returns: Json
      }
      set_admin_id: { Args: never; Returns: undefined }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      sync_resend_daily_stats: { Args: never; Returns: undefined }
      text_to_bytea: { Args: { data: string }; Returns: string }
      update_contact_behavior_pattern: {
        Args: {
          p_contact_id: string
          p_pattern_data?: Json
          p_pattern_type: string
        }
        Returns: undefined
      }
      update_hunter_usage: {
        Args: { searches_count?: number }
        Returns: undefined
      }
      update_hunter_usage_with_user: {
        Args: { searches_count?: number; user_uuid: string }
        Returns: undefined
      }
      urlencode:
        | { Args: { data: Json }; Returns: string }
        | {
            Args: { string: string }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.urlencode(string => bytea), public.urlencode(string => varchar). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
        | {
            Args: { string: string }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.urlencode(string => bytea), public.urlencode(string => varchar). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      company_size_type:
        | "1-10"
        | "11-50"
        | "51-200"
        | "201-500"
        | "501-1000"
        | "1000+"
      funnel_status_enum: "cold" | "warm" | "hot" | "client"
      industry_type:
        | "specialized_internet_broadcasting"
        | "it_services"
        | "accounting"
        | "marketing"
        | "construction"
        | "venture_capital"
      partner_type_enum:
        | "media_partnership"
        | "it_services_partnership"
        | "direct_client"
        | "inwout_partner"
      partnership_type_enum:
        | "earned_media"
        | "partnership"
        | "client"
        | "funding"
      target_status_enum:
        | "cold"
        | "contacted"
        | "conversations"
        | "demo_scheduled"
        | "demo_partner_done"
        | "testing_initial"
        | "consolidation"
        | "partner"
        | "client"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      company_size_type: [
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1000+",
      ],
      funnel_status_enum: ["cold", "warm", "hot", "client"],
      industry_type: [
        "specialized_internet_broadcasting",
        "it_services",
        "accounting",
        "marketing",
        "construction",
        "venture_capital",
      ],
      partner_type_enum: [
        "media_partnership",
        "it_services_partnership",
        "direct_client",
        "inwout_partner",
      ],
      partnership_type_enum: [
        "earned_media",
        "partnership",
        "client",
        "funding",
      ],
      target_status_enum: [
        "cold",
        "contacted",
        "conversations",
        "demo_scheduled",
        "demo_partner_done",
        "testing_initial",
        "consolidation",
        "partner",
        "client",
      ],
    },
  },
} as const
