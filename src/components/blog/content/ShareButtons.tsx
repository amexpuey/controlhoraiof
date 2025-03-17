
import React from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Displays social sharing buttons for the article
 */
export default function ShareButtons() {
  return (
    <div className="border-t border-gray-100 pt-6 mt-8">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">Compartir artículo</h4>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="rounded-full w-9 h-9 p-0">
            <Share2 className="w-4 h-4" />
            <span className="sr-only">Compartir</span>
          </Button>
          {/* Additional share buttons would go here */}
        </div>
      </div>
    </div>
  );
}
