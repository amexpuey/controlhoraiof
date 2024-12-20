export interface Article {
  id: string;
  title: string;
  meta_description: string;
  content: string;
  category: string;
  tags: string[];
  featured_image_url: string | null;
  image_alt: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

export interface RelatedArticle {
  id: string;
  article_id: string;
  related_article_id: string;
  created_at: string;
}