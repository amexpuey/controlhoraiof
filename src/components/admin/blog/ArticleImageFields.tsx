import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUpload from '@/components/ImageUpload';
import type { UseFormReturn } from "react-hook-form";
import type { Article } from "@/types/blog";

interface ArticleImageFieldsProps {
  form: UseFormReturn<Article>;
  imageUrl: string;
  handleImageSelect: (file: File) => Promise<void>;
}

export default function ArticleImageFields({ form, imageUrl, handleImageSelect }: ArticleImageFieldsProps) {
  return (
    <>
      <ImageUpload
        currentImage={imageUrl || "/placeholder.svg"}
        onImageSelect={handleImageSelect}
        label="Featured Image"
        inputId="featured-image"
      />

      <FormField
        control={form.control}
        name="image_alt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image Alt Text</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}