import React from "react";
import ReactMarkdown from "react-markdown";
import { formatSpecialArticleBySlug } from "./articleFormatters";
import { cn } from "@/lib/utils";

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
  
  // Check if content looks like HTML (contains HTML tags)
  const containsHtmlTags = /<\/?[a-z][\s\S]*>/i.test(content);
  
  if (containsHtmlTags) {
    // If content contains HTML tags, sanitize it
    // Remove raw HTML tags that might be rendered as text
    const sanitizedContent = content
      .replace(/<h1>/g, "")
      .replace(/<\/h1>/g, "")
      .replace(/<h2>/g, "")
      .replace(/<\/h2>/g, "")
      .replace(/<h3>/g, "")
      .replace(/<\/h3>/g, "")
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "\n\n")
      .replace(/<ul>/g, "")
      .replace(/<\/ul>/g, "")
      .replace(/<li>/g, "- ")
      .replace(/<\/li>/g, "\n")
      .replace(/<strong>/g, "**")
      .replace(/<\/strong>/g, "**");

    // Use ReactMarkdown to render the sanitized content
    return <ReactMarkdown className={cn("prose prose-lg max-w-none")}>{sanitizedContent}</ReactMarkdown>;
  }
  
  // Otherwise use ReactMarkdown for standard articles
  return <ReactMarkdown className={cn("prose prose-lg max-w-none")}>{content}</ReactMarkdown>;
}
