
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  content_html?: string | null;
  content_markdown?: string | null;
  category: string;
  featured_image: string;
  featured_image_alt?: string | null;
  og_image_url?: string | null;
  published_at: string;
  author: string;
  author_avatar_url?: string | null;
  reading_time: number;
  related_apps: string[];
  meta_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  schema_json?: Record<string, unknown> | null;
  focus_keyword?: string | null;
  secondary_keywords?: string[] | null;
  tags?: string[] | null;
  pillar?: string | null;
  related_solution_slugs?: string[] | null;
  comparison_type?: string | null;
  status?: string;
  scheduled_at?: string | null;
  primary_cta_text?: string | null;
  primary_cta_url?: string | null;
  show_comparison_cta?: boolean;
  related_post_slugs?: string[] | null;
  created_at?: string;
  updated_at?: string;
}
