import { useState } from 'react';
import { uploadImage } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

export const useImageUpload = (bucket: string) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File, path: string) => {
    try {
      setIsUploading(true);
      console.log('Starting image upload process:', { file, path, bucket });
      
      if (!file) {
        throw new Error('No file provided');
      }

      const url = await uploadImage(file, bucket, path);
      console.log('Image upload completed successfully:', url);
      toast.success('Image uploaded successfully');
      return url;
    } catch (error: any) {
      console.error('Image upload failed:', error);
      const errorMessage = error.message || 'Unknown error occurred';
      const statusCode = error.statusCode || error.status;
      console.error('Detailed error:', { message: errorMessage, statusCode });
      
      toast.error(`Failed to upload image: ${errorMessage}`);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { handleImageUpload, isUploading };
};