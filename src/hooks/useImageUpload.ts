import { useState } from 'react';
import { uploadImage } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

export const useImageUpload = (bucket: string) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File, path: string) => {
    try {
      setIsUploading(true);
      console.log('Starting image upload process:', { 
        file: { 
          name: file.name, 
          size: file.size, 
          type: file.type 
        }, 
        path, 
        bucket 
      });
      
      if (!file) {
        throw new Error('No file provided');
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error('File size exceeds 5MB limit');
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('File type not supported. Please use JPG, PNG, GIF or WEBP');
      }

      const url = await uploadImage(file, bucket, path);
      console.log('Image upload completed successfully:', {
        url,
        path,
        bucket
      });
      toast.success('Image uploaded successfully');
      return url;
    } catch (error: any) {
      console.error('Image upload failed:', {
        error,
        file: file?.name,
        path,
        bucket
      });
      const errorMessage = error.message || 'Unknown error occurred';
      const statusCode = error.statusCode || error.status;
      console.error('Detailed error:', { 
        message: errorMessage, 
        statusCode,
        stack: error.stack 
      });
      
      toast.error(`Failed to upload image: ${errorMessage}`);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { handleImageUpload, isUploading };
};