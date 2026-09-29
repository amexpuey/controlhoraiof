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
          is_public: boolean
          message_id: string | null
          original_content: string
          review_status: Database["public"]["Enums"]["kb_review_status"]
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
          is_public?: boolean
          message_id?: string | null
          original_content: string
          review_status?: Database["public"]["Enums"]["kb_review_status"]
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
          is_public?: boolean
          message_id?: string | null
          original_content?: string
          review_status?: Database["public"]["Enums"]["kb_review_status"]
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
      alba_kb_chunks: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          approved_content_hash: string | null
          category: string | null
          content: string
          created_at: string
          embedding: string | null
          id: string
          priority: number
          review_status: Database["public"]["Enums"]["kb_review_status"]
          source: string
          source_id: string | null
          tags: string[] | null
          title: string
          updated_at: string
          url: string | null
          valid_until: string | null
          visibility: Database["public"]["Enums"]["kb_visibility"]
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          approved_content_hash?: string | null
          category?: string | null
          content: string
          created_at?: string
          embedding?: string | null
          id?: string
          priority?: number
          review_status?: Database["public"]["Enums"]["kb_review_status"]
          source: string
          source_id?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          url?: string | null
          valid_until?: string | null
          visibility?: Database["public"]["Enums"]["kb_visibility"]
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          approved_content_hash?: string | null
          category?: string | null
          content?: string
          created_at?: string
          embedding?: string | null
          id?: string
          priority?: number
          review_status?: Database["public"]["Enums"]["kb_review_status"]
          source?: string
          source_id?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          url?: string | null
          valid_until?: string | null
          visibility?: Database["public"]["Enums"]["kb_visibility"]
        }
        Relationships: []
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
      calendly_bookings: {
        Row: {
          calendly_created_at: string | null
          cancel_reason: string | null
          canceled_at: string | null
          created_at: string
          end_time: string | null
          event_name: string | null
          event_type_uri: string | null
          event_uri: string
          host_email: string | null
          id: string
          invitee_company: string | null
          invitee_email: string | null
          invitee_name: string | null
          invitee_timezone: string | null
          join_url: string | null
          raw: Json | null
          start_time: string
          status: string
          synced_at: string
          updated_at: string
        }
        Insert: {
          calendly_created_at?: string | null
          cancel_reason?: string | null
          canceled_at?: string | null
          created_at?: string
          end_time?: string | null
          event_name?: string | null
          event_type_uri?: string | null
          event_uri: string
          host_email?: string | null
          id?: string
          invitee_company?: string | null
          invitee_email?: string | null
          invitee_name?: string | null
          invitee_timezone?: string | null
          join_url?: string | null
          raw?: Json | null
          start_time: string
          status?: string
          synced_at?: string
          updated_at?: string
        }
        Update: {
          calendly_created_at?: string | null
          cancel_reason?: string | null
          canceled_at?: string | null
          created_at?: string
          end_time?: string | null
          event_name?: string | null
          event_type_uri?: string | null
          event_uri?: string
          host_email?: string | null
          id?: string
          invitee_company?: string | null
          invitee_email?: string | null
          invitee_name?: string | null
          invitee_timezone?: string | null
          join_url?: string | null
          raw?: Json | null
          start_time?: string
          status?: string
          synced_at?: string
          updated_at?: string
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
          {
            foreignKeyName: "campaign_logs_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "v_sendable_recipients"
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
          retry_count: number | null
          sent_at: string | null
          skipped_at: string | null
          skipped_reason: string | null
          sort_order: number | null
          status: string
          unsubscribed_at: string | null
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
          retry_count?: number | null
          sent_at?: string | null
          skipped_at?: string | null
          skipped_reason?: string | null
          sort_order?: number | null
          status?: string
          unsubscribed_at?: string | null
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
          retry_count?: number | null
          sent_at?: string | null
          skipped_at?: string | null
          skipped_reason?: string | null
          sort_order?: number | null
          status?: string
          unsubscribed_at?: string | null
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
      campaign_templates_snapshots: {
        Row: {
          html_content: string
          id: string
          name: string | null
          reason: string
          snapshot_at: string
          template_id: string
        }
        Insert: {
          html_content: string
          id?: string
          name?: string | null
          reason: string
          snapshot_at?: string
          template_id: string
        }
        Update: {
          html_content?: string
          id?: string
          name?: string | null
          reason?: string
          snapshot_at?: string
          template_id?: string
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          category: string | null
          completed_at: string | null
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
          vertical: string | null
        }
        Insert: {
          category?: string | null
          completed_at?: string | null
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
          vertical?: string | null
        }
        Update: {
          category?: string | null
          completed_at?: string | null
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
          vertical?: string | null
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
      contact_canonical_refresh_state: {
        Row: {
          consecutive_failures: number
          created_at: string
          id: boolean
          last_attempt_at: string | null
          last_duration_ms: number | null
          last_error: string | null
          last_refreshed_at: string | null
          last_status: string
          updated_at: string
        }
        Insert: {
          consecutive_failures?: number
          created_at?: string
          id?: boolean
          last_attempt_at?: string | null
          last_duration_ms?: number | null
          last_error?: string | null
          last_refreshed_at?: string | null
          last_status?: string
          updated_at?: string
        }
        Update: {
          consecutive_failures?: number
          created_at?: string
          id?: boolean
          last_attempt_at?: string | null
          last_duration_ms?: number | null
          last_error?: string | null
          last_refreshed_at?: string | null
          last_status?: string
          updated_at?: string
        }
        Relationships: []
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
      email_stats: {
        Row: {
          bounce_class:
            | Database["public"]["Enums"]["delivery_event_class"]
            | null
          bounce_reason: string | null
          bounced_at: string | null
          campaign_id: string | null
          clicked_at: string | null
          complained_at: string | null
          created_by: string
          delivered_at: string | null
          email: string
          id: string
          opened_at: string | null
          recipient_id: string | null
          resend_message_id: string | null
          sent_at: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          bounce_class?:
            | Database["public"]["Enums"]["delivery_event_class"]
            | null
          bounce_reason?: string | null
          bounced_at?: string | null
          campaign_id?: string | null
          clicked_at?: string | null
          complained_at?: string | null
          created_by?: string
          delivered_at?: string | null
          email: string
          id?: string
          opened_at?: string | null
          recipient_id?: string | null
          resend_message_id?: string | null
          sent_at?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          bounce_class?:
            | Database["public"]["Enums"]["delivery_event_class"]
            | null
          bounce_reason?: string | null
          bounced_at?: string | null
          campaign_id?: string | null
          clicked_at?: string | null
          complained_at?: string | null
          created_by?: string
          delivered_at?: string | null
          email?: string
          id?: string
          opened_at?: string | null
          recipient_id?: string | null
          resend_message_id?: string | null
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
          {
            foreignKeyName: "email_stats_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "v_sendable_recipients"
            referencedColumns: ["id"]
          },
        ]
      }
      email_suppressions: {
        Row: {
          active: boolean
          created_at: string
          email: string
          id: string
          metadata: Json
          reason: string | null
          scope: string
          source: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          email: string
          id?: string
          metadata?: Json
          reason?: string | null
          scope?: string
          source?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          email?: string
          id?: string
          metadata?: Json
          reason?: string | null
          scope?: string
          source?: string | null
          updated_at?: string
        }
        Relationships: []
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
      kb_approvers: {
        Row: {
          active: boolean
          added_at: string
          added_by: string | null
          email: string
        }
        Insert: {
          active?: boolean
          added_at?: string
          added_by?: string | null
          email: string
        }
        Update: {
          active?: boolean
          added_at?: string
          added_by?: string | null
          email?: string
        }
        Relationships: []
      }
      knowledge: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          approved_content_hash: string | null
          category: string | null
          content: string
          created_at: string
          id: string
          review_status: Database["public"]["Enums"]["kb_review_status"]
          source_url: string | null
          tags: string[] | null
          title: string
          updated_at: string
          valid_until: string | null
          visibility: Database["public"]["Enums"]["kb_visibility"]
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          approved_content_hash?: string | null
          category?: string | null
          content: string
          created_at?: string
          id?: string
          review_status?: Database["public"]["Enums"]["kb_review_status"]
          source_url?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          valid_until?: string | null
          visibility?: Database["public"]["Enums"]["kb_visibility"]
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          approved_content_hash?: string | null
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          review_status?: Database["public"]["Enums"]["kb_review_status"]
          source_url?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          valid_until?: string | null
          visibility?: Database["public"]["Enums"]["kb_visibility"]
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
      mcp_audit_log: {
        Row: {
          executed_at: string
          id: string
          input_params: Json | null
          result: Json | null
          source: string | null
          tool_name: string
        }
        Insert: {
          executed_at?: string
          id?: string
          input_params?: Json | null
          result?: Json | null
          source?: string | null
          tool_name: string
        }
        Update: {
          executed_at?: string
          id?: string
          input_params?: Json | null
          result?: Json | null
          source?: string | null
          tool_name?: string
        }
        Relationships: []
      }
      onboarding_campaign_mapping: {
        Row: {
          account_type: string
          campaign_id: string
          created_at: string
          day: number
          label: string | null
          updated_at: string
        }
        Insert: {
          account_type: string
          campaign_id: string
          created_at?: string
          day: number
          label?: string | null
          updated_at?: string
        }
        Update: {
          account_type?: string
          campaign_id?: string
          created_at?: string
          day?: number
          label?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      onboarding_contacts: {
        Row: {
          created_at: string | null
          day0_sent_at: string | null
          day1_sent_at: string | null
          day3_sent_at: string | null
          day5_sent_at: string | null
          email: string
          empresa: string | null
          estimate_items: Json | null
          estimate_total: number | null
          holded_estimate_id: string | null
          id: string
          nombre: string | null
          pipedrive_deal_id: number | null
          registration_date: string
          registration_json_path: string | null
          status: string | null
          telefono: string | null
          trabajadores: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day0_sent_at?: string | null
          day1_sent_at?: string | null
          day3_sent_at?: string | null
          day5_sent_at?: string | null
          email: string
          empresa?: string | null
          estimate_items?: Json | null
          estimate_total?: number | null
          holded_estimate_id?: string | null
          id?: string
          nombre?: string | null
          pipedrive_deal_id?: number | null
          registration_date?: string
          registration_json_path?: string | null
          status?: string | null
          telefono?: string | null
          trabajadores?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day0_sent_at?: string | null
          day1_sent_at?: string | null
          day3_sent_at?: string | null
          day5_sent_at?: string | null
          email?: string
          empresa?: string | null
          estimate_items?: Json | null
          estimate_total?: number | null
          holded_estimate_id?: string | null
          id?: string
          nombre?: string | null
          pipedrive_deal_id?: number | null
          registration_date?: string
          registration_json_path?: string | null
          status?: string | null
          telefono?: string | null
          trabajadores?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      onboarding_step_audit: {
        Row: {
          app_name: string | null
          changed_at: string
          client_addr: unknown
          db_user: string | null
          id: string
          is_orphan: boolean
          lead_email: string | null
          lead_id: string
          matched_email_stat_id: string | null
          new_value: string | null
          old_value: string | null
          step_column: string
        }
        Insert: {
          app_name?: string | null
          changed_at?: string
          client_addr?: unknown
          db_user?: string | null
          id?: string
          is_orphan?: boolean
          lead_email?: string | null
          lead_id: string
          matched_email_stat_id?: string | null
          new_value?: string | null
          old_value?: string | null
          step_column: string
        }
        Update: {
          app_name?: string | null
          changed_at?: string
          client_addr?: unknown
          db_user?: string | null
          id?: string
          is_orphan?: boolean
          lead_email?: string | null
          lead_id?: string
          matched_email_stat_id?: string | null
          new_value?: string | null
          old_value?: string | null
          step_column?: string
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
      pipedrive_webhook_errors: {
        Row: {
          created_at: string
          error_message: string | null
          error_stack: string | null
          id: string
          payload: Json | null
          stage: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          error_stack?: string | null
          id?: string
          payload?: Json | null
          stage?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          error_stack?: string | null
          id?: string
          payload?: Json | null
          stage?: string | null
        }
        Relationships: []
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
        Relationships: []
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
            foreignKeyName: "prospect_leads_campaign_recipient_id_fkey"
            columns: ["campaign_recipient_id"]
            isOneToOne: false
            referencedRelation: "v_sendable_recipients"
            referencedColumns: ["id"]
          },
        ]
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
      system_logs: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          details: Json | null
          event_type: string
          id: string
          resolved: boolean | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          details?: Json | null
          event_type: string
          id?: string
          resolved?: boolean | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          resolved?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "system_logs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      system_telemetry: {
        Row: {
          created_at: string
          duration_ms: number | null
          error_message: string | null
          finished_at: string | null
          function_name: string
          id: string
          invocation_id: string | null
          metadata: Json | null
          rows_processed: number | null
          started_at: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          finished_at?: string | null
          function_name: string
          id?: string
          invocation_id?: string | null
          metadata?: Json | null
          rows_processed?: number | null
          started_at?: string
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          finished_at?: string | null
          function_name?: string
          id?: string
          invocation_id?: string | null
          metadata?: Json | null
          rows_processed?: number | null
          started_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
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
      webhook_errors: {
        Row: {
          created_at: string
          error_message: string
          id: string
          payload: Json | null
          resolved: boolean
          source: string
          step: string | null
        }
        Insert: {
          created_at?: string
          error_message: string
          id?: string
          payload?: Json | null
          resolved?: boolean
          source?: string
          step?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string
          id?: string
          payload?: Json | null
          resolved?: boolean
          source?: string
          step?: string | null
        }
        Relationships: []
      }
    }
    Views: {
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
      mv_contact_canonical: {
        Row: {
          business_bucket: string | null
          company: string | null
          contactable_status: string | null
          correlated_sends_count: number | null
          domain_type: string | null
          email: string | null
          email_domain: string | null
          email_valid: boolean | null
          first_name: string | null
          first_sent_at: string | null
          has_soft_bounce: boolean | null
          last_bounced_at: string | null
          last_clicked_at: string | null
          last_complained_at: string | null
          last_delivered_at: string | null
          last_opened_at: string | null
          last_sent_at: string | null
          num_employees: number | null
          origin: string[] | null
          phone: string | null
          sends_count: number | null
          source_count: number | null
          telemetry_coverage: string | null
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
      onboarding_orphan_advances_summary: {
        Row: {
          day: string | null
          orphan_advances: number | null
          orphan_pct: number | null
          step_column: string | null
          total_advances: number | null
        }
        Relationships: []
      }
      v_alba_public_knowledge: {
        Row: {
          approval_current: boolean | null
          category: string | null
          content: string | null
          id: string | null
          source_url: string | null
          title: string | null
        }
        Insert: {
          approval_current?: never
          category?: string | null
          content?: string | null
          id?: string | null
          source_url?: string | null
          title?: string | null
        }
        Update: {
          approval_current?: never
          category?: string | null
          content?: string | null
          id?: string | null
          source_url?: string | null
          title?: string | null
        }
        Relationships: []
      }
      v_contact_canonical: {
        Row: {
          business_bucket: string | null
          company: string | null
          contactable_status: string | null
          correlated_sends_count: number | null
          domain_type: string | null
          email: string | null
          email_domain: string | null
          email_valid: boolean | null
          first_name: string | null
          first_sent_at: string | null
          has_soft_bounce: boolean | null
          last_bounced_at: string | null
          last_clicked_at: string | null
          last_complained_at: string | null
          last_delivered_at: string | null
          last_opened_at: string | null
          last_sent_at: string | null
          num_employees: number | null
          origin: string[] | null
          phone: string | null
          sends_count: number | null
          source_count: number | null
          telemetry_coverage: string | null
        }
        Relationships: []
      }
      v_email_bounces: {
        Row: {
          bounce_class:
            | Database["public"]["Enums"]["delivery_event_class"]
            | null
          bounce_reason: string | null
          bounced_at: string | null
          campaign_id: string | null
          email: string | null
          id: string | null
          recipient_id: string | null
          sent_at: string | null
        }
        Insert: {
          bounce_class?:
            | Database["public"]["Enums"]["delivery_event_class"]
            | null
          bounce_reason?: string | null
          bounced_at?: string | null
          campaign_id?: string | null
          email?: string | null
          id?: string | null
          recipient_id?: string | null
          sent_at?: string | null
        }
        Update: {
          bounce_class?:
            | Database["public"]["Enums"]["delivery_event_class"]
            | null
          bounce_reason?: string | null
          bounced_at?: string | null
          campaign_id?: string | null
          email?: string | null
          id?: string | null
          recipient_id?: string | null
          sent_at?: string | null
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
          {
            foreignKeyName: "email_stats_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "v_sendable_recipients"
            referencedColumns: ["id"]
          },
        ]
      }
      v_knowledge_review_queue: {
        Row: {
          category: string | null
          created_at: string | null
          id: string | null
          review_status: Database["public"]["Enums"]["kb_review_status"] | null
          source_url: string | null
          title: string | null
          updated_at: string | null
          valid_until: string | null
          visibility: Database["public"]["Enums"]["kb_visibility"] | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string | null
          review_status?: Database["public"]["Enums"]["kb_review_status"] | null
          source_url?: string | null
          title?: string | null
          updated_at?: string | null
          valid_until?: string | null
          visibility?: Database["public"]["Enums"]["kb_visibility"] | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string | null
          review_status?: Database["public"]["Enums"]["kb_review_status"] | null
          source_url?: string | null
          title?: string | null
          updated_at?: string | null
          valid_until?: string | null
          visibility?: Database["public"]["Enums"]["kb_visibility"] | null
        }
        Relationships: []
      }
      v_sendable_recipients: {
        Row: {
          annual_revenue: number | null
          campaign_id: string | null
          company: string | null
          created_by: string | null
          email: string | null
          error_message: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          num_employees: number | null
          phone: string | null
          retry_count: number | null
          sent_at: string | null
          sort_order: number | null
          status: string | null
          unsubscribed_at: string | null
          website: string | null
        }
        Insert: {
          annual_revenue?: number | null
          campaign_id?: string | null
          company?: string | null
          created_by?: string | null
          email?: string | null
          error_message?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          num_employees?: number | null
          phone?: string | null
          retry_count?: number | null
          sent_at?: string | null
          sort_order?: number | null
          status?: string | null
          unsubscribed_at?: string | null
          website?: string | null
        }
        Update: {
          annual_revenue?: number | null
          campaign_id?: string | null
          company?: string | null
          created_by?: string | null
          email?: string | null
          error_message?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          num_employees?: number | null
          phone?: string | null
          retry_count?: number | null
          sent_at?: string | null
          sort_order?: number | null
          status?: string | null
          unsubscribed_at?: string | null
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
    }
    Functions: {
      assign_admin_role: { Args: { user_email: string }; Returns: boolean }
      auto_archive_campaigns: { Args: never; Returns: Json }
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
      campaign_health_stats: {
        Args: { p_limit?: number; p_scope?: string }
        Returns: Json
      }
      campaign_health_thresholds: { Args: never; Returns: Json }
      campaigns_all_schedules_stats: {
        Args: { p_domain?: string; p_only_active?: boolean }
        Returns: {
          batch_size: number
          campaign_id: string
          campaign_name: string
          days_of_week: number[]
          is_active: boolean
          is_sending: boolean
          last_executed_at: string
          next_execution_at: string
          pending: number
          schedule_id: string
          send_time: string
          sent_today: number
          sent_total: number
          total_recipients: number
        }[]
      }
      campaigns_explorer_recipients: {
        Args: {
          p_campaign_id: string
          p_dir?: string
          p_limit?: number
          p_offset?: number
          p_search?: string
          p_sort?: string
          p_status?: string
        }
        Returns: {
          bounce_class: string
          bounced_at: string
          campaign_id: string
          clicked_at: string
          company: string
          complained_at: string
          email: string
          error_message: string
          first_name: string
          last_name: string
          opened_at: string
          recipient_id: string
          retry_count: number
          sent_at: string
          skipped_at: string
          skipped_reason: string
          status: string
          total_rows: number
          unsubscribed_at: string
        }[]
      }
      campaigns_explorer_results: {
        Args: {
          p_from?: string
          p_include_archived?: boolean
          p_include_hidden_test_legacy?: boolean
          p_include_hidden_unclassified?: boolean
          p_include_onboarding?: boolean
          p_include_subcampaigns?: boolean
          p_include_tests?: boolean
          p_limit?: number
          p_offset?: number
          p_search?: string
          p_sort?: string
          p_status_visible?: string[]
          p_to?: string
          p_vertical?: string
        }
        Returns: {
          category: string
          completed_at: string
          created_at: string
          family_clicked_unique_persons: number
          family_opened_unique_persons: number
          family_sent_rows: number
          family_sent_unique_persons: number
          has_active_schedule: boolean
          hidden: boolean
          id: string
          is_test: boolean
          n_children: number
          name: string
          next_execution_at: string
          parent_campaign_id: string
          self_clicks_unique: number
          self_opens_unique: number
          self_pending: number
          self_sent: number
          self_total_recipients: number
          sent_at: string
          status: string
          status_visible: string
          total_rows: number
          vertical: string
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
      contacts_explorer: {
        Args: {
          p_activity?: string
          p_business_bucket?: string[]
          p_contactable_status?: string[]
          p_dir?: string
          p_domain_type?: string
          p_limit?: number
          p_offset?: number
          p_origin?: string[]
          p_search?: string
          p_sort?: string
          p_telemetry_coverage?: string[]
        }
        Returns: {
          business_bucket: string
          company: string
          contactable_status: string
          correlated_sends_count: number
          domain_type: string
          email: string
          email_domain: string
          email_valid: boolean
          first_name: string
          first_sent_at: string
          has_soft_bounce: boolean
          last_bounced_at: string
          last_clicked_at: string
          last_complained_at: string
          last_delivered_at: string
          last_opened_at: string
          last_sent_at: string
          num_employees: number
          origin: string[]
          phone: string
          sends_count: number
          source_count: number
          telemetry_coverage: string
          total_count: number
        }[]
      }
      contacts_explorer_freshness: { Args: never; Returns: Json }
      contacts_explorer_stats: {
        Args: {
          p_activity?: string
          p_business_bucket?: string[]
          p_contactable_status?: string[]
          p_domain_type?: string
          p_origin?: string[]
          p_search?: string
          p_telemetry_coverage?: string[]
        }
        Returns: Json
      }
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
      get_campaigns_without_active_schedule: {
        Args: never
        Returns: {
          campaign_id: string
          campaign_name: string
          pending_recipients: number
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
      get_vertical_context: { Args: { _vertical: string }; Returns: Json }
      get_vertical_health: { Args: never; Returns: Json }
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
      increment_download_count: {
        Args: { template_slug: string }
        Returns: undefined
      }
      increment_email_count: { Args: { p_user_id?: string }; Returns: boolean }
      insert_campaign_with_recipients: {
        Args: { campaign: Json; contacts: Json[] }
        Returns: string
      }
      is_staff: { Args: { _uid?: string }; Returns: boolean }
      kb_approve_knowledge: {
        Args: {
          p_expected_content_hash: string
          p_id: string
          p_valid_until?: string
        }
        Returns: {
          approved_at: string | null
          approved_by: string | null
          approved_content_hash: string | null
          category: string | null
          content: string
          created_at: string
          id: string
          review_status: Database["public"]["Enums"]["kb_review_status"]
          source_url: string | null
          tags: string[] | null
          title: string
          updated_at: string
          valid_until: string | null
          visibility: Database["public"]["Enums"]["kb_visibility"]
        }
        SetofOptions: {
          from: "*"
          to: "knowledge"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      kb_content_fingerprint: { Args: { txt: string }; Returns: string }
      kb_current_approver: { Args: never; Returns: string }
      kb_parent_text: {
        Args: { p_content: string; p_title: string }
        Returns: string
      }
      kb_revoke_knowledge: {
        Args: { p_id: string }
        Returns: {
          approved_at: string | null
          approved_by: string | null
          approved_content_hash: string | null
          category: string | null
          content: string
          created_at: string
          id: string
          review_status: Database["public"]["Enums"]["kb_review_status"]
          source_url: string | null
          tags: string[] | null
          title: string
          updated_at: string
          valid_until: string | null
          visibility: Database["public"]["Enums"]["kb_visibility"]
        }
        SetofOptions: {
          from: "*"
          to: "knowledge"
          isOneToOne: true
          isSetofReturn: false
        }
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
      match_alba_kb: {
        Args: {
          match_count?: number
          min_similarity?: number
          query_embedding: string
        }
        Returns: {
          category: string
          content: string
          id: string
          priority: number
          similarity: number
          source: string
          title: string
          url: string
        }[]
      }
      match_alba_kb_public: {
        Args: {
          match_count?: number
          min_similarity?: number
          query_embedding: string
        }
        Returns: {
          approval_current: boolean
          category: string
          content: string
          id: string
          priority: number
          review_status: string
          similarity: number
          source: string
          title: string
          url: string
          valid_until: string
          visibility: string
        }[]
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
      mission_control_business_stats: { Args: never; Returns: Json }
      mission_control_campaigns_stats: { Args: never; Returns: Json }
      mission_control_onboarding_explain: { Args: never; Returns: Json }
      mission_control_onboarding_stats: {
        Args: never
        Returns: {
          commercial_pending_without_route: number
          desynced_apply: number
          onboarding_pending_without_route: number
          preserved_review: number
        }[]
      }
      mission_control_onboarding_steps: {
        Args: never
        Returns: {
          account_type: string
          campaign_id: string
          day: number
          description: string
          label: string
          last_sent: string
          pending: number
          sent: number
        }[]
      }
      openai_embedding:
        | { Args: { input: string; model: string }; Returns: string }
        | {
            Args: { api_key: string; input: string; model: string }
            Returns: string
          }
      process_overdue_onboarding_emails: { Args: never; Returns: Json }
      propagate_onboarding_send: {
        Args: { _day: number; _oc_id: string; _sent_at?: string }
        Returns: Json
      }
      recalculate_all_customer_ltv: { Args: never; Returns: undefined }
      reconcile_prospect_campaign_status: {
        Args: { _prospect_id?: string }
        Returns: number
      }
      refresh_contact_canonical: { Args: never; Returns: undefined }
      search_unified_contacts: {
        Args: {
          p_activity?: string
          p_contactability?: string
          p_email_type?: string
          p_employee_filter?: string
          p_limit?: number
          p_offset?: number
          p_search?: string
          p_sort_by?: string
          p_sort_dir?: string
          p_status?: string
          p_type?: string
        }
        Returns: {
          campaign_category: string
          campaign_id: string
          campaign_name: string
          company: string
          created_at: string
          email: string
          id: string
          last_activity: string
          lead_type: string
          name: string
          num_employees: number
          num_users: number
          phone: string
          source: string
          status: string
          tipo_empresa: string
          total_count: number
          type: string
        }[]
      }
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
      unified_contacts_stats: {
        Args: {
          p_activity?: string
          p_contactability?: string
          p_email_type?: string
          p_employee_filter?: string
          p_search?: string
          p_status?: string
          p_type?: string
        }
        Returns: {
          corporate_emails: number
          customers: number
          imported: number
          leads: number
          prospects: number
          total: number
        }[]
      }
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
      delivery_event_class:
        | "hard_bounce"
        | "soft_bounce"
        | "unknown_bounce"
        | "complaint"
        | "provider_rejection"
        | "technical_failure"
      funnel_status_enum: "cold" | "warm" | "hot" | "client"
      industry_type:
        | "specialized_internet_broadcasting"
        | "it_services"
        | "accounting"
        | "marketing"
        | "construction"
        | "venture_capital"
      kb_review_status: "pending" | "approved" | "rejected" | "stale"
      kb_visibility: "public" | "internal" | "restricted"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      delivery_event_class: [
        "hard_bounce",
        "soft_bounce",
        "unknown_bounce",
        "complaint",
        "provider_rejection",
        "technical_failure",
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
      kb_review_status: ["pending", "approved", "rejected", "stale"],
      kb_visibility: ["public", "internal", "restricted"],
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
