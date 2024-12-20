import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { Article } from "@/types/blog";

interface ArticleStatusFieldProps {
  form: UseFormReturn<Article>;
}

export default function ArticleStatusField({ form }: ArticleStatusFieldProps) {
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <select
              {...field}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}