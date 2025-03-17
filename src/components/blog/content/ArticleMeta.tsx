
import React from "react";
import { CalendarDays, Clock } from "lucide-react";

interface ArticleMetaProps {
  publishedDate: string;
  readingTime: number;
}

/**
 * Displays the article metadata (publication date and reading time)
 */
export default function ArticleMeta({ publishedDate, readingTime }: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
      {publishedDate && (
        <div className="flex items-center">
          <CalendarDays className="w-4 h-4 mr-1" />
          <span>{publishedDate}</span>
        </div>
      )}
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-1" />
        <span>{readingTime} min de lectura</span>
      </div>
    </div>
  );
}
