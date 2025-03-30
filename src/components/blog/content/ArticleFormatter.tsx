
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
  
  // Extract the first line as the title and the rest as content
  let title = "";
  let bodyContent = content;

  // Extract the title from the first line - several patterns:
  // 1. If content starts with an h1 tag
  if (content.match(/^<h1>(.*?)<\/h1>/)) {
    const match = content.match(/^<h1>(.*?)<\/h1>/);
    if (match && match[1]) {
      title = match[1];
      bodyContent = content.replace(/^<h1>.*?<\/h1>/, "").trim();
    }
  } 
  // 2. If the first line doesn't have tags but looks like a title (not too long)
  else {
    const lines = content.split(/\n/);
    if (lines.length > 0 && lines[0].length > 0 && lines[0].length < 200 && !lines[0].match(/<\/?[a-z][\s\S]*>/i)) {
      title = lines[0].trim();
      bodyContent = lines.slice(1).join("\n").trim();
    }
  }
  
  if (containsHtmlTags) {
    // Process HTML-formatted content
    let processedContent = bodyContent
      // Process headings with proper markdown format
      .replace(/<h1>(.*?)<\/h1>/g, "# $1\n\n")
      .replace(/<h2>(.*?)<\/h2>/g, "## $1\n\n")
      .replace(/<h3>(.*?)<\/h3>/g, "### $1\n\n")
      // Process paragraphs with proper spacing
      .replace(/<p>(.*?)<\/p>/g, "$1\n\n")
      // Process lists
      .replace(/<ul>/g, "")
      .replace(/<\/ul>/g, "\n")
      .replace(/<li>(.*?)<\/li>/g, "* $1\n")
      // Process formatting
      .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
      .replace(/<em>(.*?)<\/em>/g, "*$1*")
      // Process links - preserve the href attribute
      .replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)");
    
    // Add extra newlines for better spacing
    processedContent = processedContent
      .replace(/(\d+\.\d+\s.*?)\n/g, "$1\n\n")
      .replace(/(\d+\.\s.*?)\n/g, "$1\n\n");

    return (
      <div className="article-content">
        {title && (
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            {title}
          </h1>
        )}
        <ReactMarkdown 
          className={cn("prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:mb-6 prose-p:leading-relaxed prose-li:mb-2")}
          rehypePlugins={[rehypeRaw]}
          components={{
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-bold mt-10 mb-6 text-gray-800 border-b pb-2" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-700" {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4 className="text-xl font-bold mt-6 mb-3 text-gray-700" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-6 leading-relaxed text-lg" {...props} />
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
              <ul className="mb-8 ml-6 list-disc space-y-3" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="mb-8 ml-6 list-decimal space-y-3" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="leading-relaxed text-lg" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6" {...props} />
            ),
            hr: ({ node, ...props }) => (
              <hr className="my-8 border-gray-300" {...props} />
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
    <div className="article-content">
      {title && (
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          {title}
        </h1>
      )}
      <ReactMarkdown 
        className={cn("prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:mb-6 prose-p:leading-relaxed prose-li:mb-2")}
        components={{
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-bold mt-10 mb-6 text-gray-800 border-b pb-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-700" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xl font-bold mt-6 mb-3 text-gray-700" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-6 leading-relaxed text-lg" {...props} />
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
            <ul className="mb-8 ml-6 list-disc space-y-3" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="mb-8 ml-6 list-decimal space-y-3" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed text-lg" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-gray-300" {...props} />
          ),
        }}
      >
        {bodyContent}
      </ReactMarkdown>
    </div>
  );
}
