import React from "react";
import ReactMarkdown from "react-markdown";
import { formatSpecialArticleBySlug } from "./articleFormatters";

interface ArticleFormatterProps {
  slug: string;
  content: string;
}

/**
 * Handles the formatting of article content based on the article slug
 */
export default function ArticleFormatter({ slug, content }: ArticleFormatterProps) {
  // Try to get specially formatted content for specific articles
  const formattedContent = formatSpecialArticleBySlug(slug, content);
  
  // If we have specially formatted content, render it directly
  if (formattedContent) {
    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  }
  
  // Otherwise use ReactMarkdown for standard articles
  return <ReactMarkdown>{content}</ReactMarkdown>;
}
