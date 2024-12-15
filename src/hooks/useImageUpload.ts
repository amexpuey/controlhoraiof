import { useState } from 'react';
import { uploadImage } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

type ImageType = 'logo' | 'background';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File, type: ImageType, id: string) => {
    try {
      setIsUploading(true);
      console.log('Starting image upload process:', { 
        file: { 
          name: file.name, 
          size: file.size, 
          type: file.type 
        }, 
        folder: type === 'logo' ? 'logos' : 'backgrounds',
        bucket: 'app_assets'
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

      const folder = type === 'logo' ? 'logos' : 'backgrounds';
      const path = `${folder}/${id}`;
      
      const url = await uploadImage(file, 'app_assets', path);
      console.log('Image upload completed successfully:', {
        url,
        path,
        bucket: 'app_assets'
      });
      toast.success('Image uploaded successfully');
      return url;
    } catch (error: any) {
      console.error('Image upload failed:', {
        error,
        file: file?.name,
        type,
        bucket: 'app_assets'
      });

      // Handle specific bucket-related errors
      if (error.message?.includes('Bucket not found')) {
        toast.error('Storage configuration error. Please contact support.');
        console.error('Bucket not properly configured:', 'app_assets');
      } else {
        const errorMessage = error.message || 'Unknown error occurred';
        toast.error(`Failed to upload image: ${errorMessage}`);
      }

      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { handleImageUpload, isUploading };
};