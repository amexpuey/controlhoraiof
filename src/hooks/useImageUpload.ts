import { useState } from 'react';
import { uploadImage } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

export const useImageUpload = (bucket: string) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File, path: string) => {
    try {
      setIsUploading(true);
      console.log('Uploading image:', { file, path, bucket });
      const url = await uploadImage(file, bucket, path);
      console.log('Image uploaded successfully:', url);
      return url;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(`Error uploading image: ${error.message}`);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { handleImageUpload, isUploading };
};