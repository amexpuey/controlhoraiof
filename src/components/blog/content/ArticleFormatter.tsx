
import React from "react";
import ReactMarkdown from "react-markdown";
import { formatSpecialArticleBySlug } from "./articleFormatters";
import { cn } from "@/lib/utils";
import rehypeRaw from "rehype-raw";
import { Link, ExternalLink } from "lucide-react";

interface ArticleFormatterProps {
  slug: string;
  content: string;
}

/**
 * Enhanced formatter for blog articles that properly handles HTML content
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
    // Process HTML-formatted content
    // Convert HTML headings to proper markdown format for better styling
    let processedContent = content
      // Process headings with proper markdown format
      .replace(/<h1>(.*?)<\/h1>/g, "# $1\n\n")
      .replace(/<h2>(.*?)<\/h2>/g, "## $1\n\n")
      .replace(/<h3>(.*?)<\/h3>/g, "### $1\n\n")
      // Process paragraphs with proper spacing
      .replace(/<p>(.*?)<\/p>/g, "$1\n\n")
      // Process lists
      .replace(/<ul>/g, "")
      .replace(/<\/ul>/g, "")
      .replace(/<li>(.*?)<\/li>/g, "* $1\n")
      // Process formatting
      .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
      .replace(/<em>(.*?)<\/em>/g, "*$1*")
      // Process links - preserve the href attribute
      .replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)");

    // Add extra newlines between numeric section headings for better spacing
    processedContent = processedContent
      .replace(/(\d+\.\d+\s.*?)\n/g, "$1\n\n")
      .replace(/(\d+\.\s.*?)\n/g, "$1\n\n");

    return (
      <div className="article-content">
        <ReactMarkdown 
          className={cn("prose prose-lg md:prose-xl max-w-none")}
          rehypePlugins={[rehypeRaw]}
          components={{
            h2: ({ node, ...props }) => (
              <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 border-b pb-2" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-xl font-bold mt-6 mb-3 text-gray-700" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-6 leading-relaxed" {...props} />
            ),
            a: ({ node, href, ...props }) => (
              <a 
                href={href} 
                className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 font-medium underline decoration-2 underline-offset-2 transition-colors" 
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {props.children}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ),
            ul: ({ node, ...props }) => (
              <ul className="mb-6 ml-6 list-disc space-y-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="mb-6 ml-6 list-decimal space-y-2" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="leading-relaxed" {...props} />
            ),
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>
    );
  }
  
  // For regular markdown content
  return (
    <ReactMarkdown 
      className={cn("prose prose-lg md:prose-xl max-w-none")}
      components={{
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 border-b pb-2" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-bold mt-6 mb-3 text-gray-700" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-6 leading-relaxed" {...props} />
        ),
        a: ({ node, href, ...props }) => (
          <a 
            href={href} 
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 font-medium underline decoration-2 underline-offset-2 transition-colors" 
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {props.children}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ),
        ul: ({ node, ...props }) => (
          <ul className="mb-6 ml-6 list-disc space-y-2" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="mb-6 ml-6 list-decimal space-y-2" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="leading-relaxed" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
