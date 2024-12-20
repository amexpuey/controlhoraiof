import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { Article } from "@/types/blog";
import * as z from "zod";

interface ArticleMetaFieldsProps {
  form: UseFormReturn<Article>;
}

export default function ArticleMetaFields({ form }: ArticleMetaFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        rules={{
          required: "Title is required",
          minLength: {
            value: 3,
            message: "Title must be at least 3 characters"
          }
        }}
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
        rules={{
          required: "Meta description is required",
          minLength: {
            value: 150,
            message: "Meta description must be at least 150 characters"
          },
          maxLength: {
            value: 160,
            message: "Meta description must not exceed 160 characters"
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Description (150-160 characters)</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                minLength={150}
                maxLength={160}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 160) {
                    field.onChange(value);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}