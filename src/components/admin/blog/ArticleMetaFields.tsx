import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { Article } from "@/types/blog";

interface ArticleMetaFieldsProps {
  form: UseFormReturn<Article>;
}

export default function ArticleMetaFields({ form }: ArticleMetaFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="meta_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Description (150-160 characters)</FormLabel>
            <FormControl>
              <Input {...field} maxLength={160} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}