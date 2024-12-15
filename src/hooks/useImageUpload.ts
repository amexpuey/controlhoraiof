import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

type ImageType = 'logo' | 'background';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const verifyFileAccess = async (bucket: string, path: string): Promise<boolean> => {
    try {
      console.log('Verifying file access for:', { bucket, path });
      
      // Try to generate a signed URL first
      const { data: signedData, error: signedError } = await supabase
        .storage
        .from(bucket)
        .createSignedUrl(path, 60);

      if (signedError) {
        console.error('Error generating signed URL:', signedError);
        return false;
      }

      console.log('Successfully generated signed URL:', signedData.signedUrl);

      // Try to get the public URL as well
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

      console.log('Public URL generated:', publicUrl);

      return true;
    } catch (error) {
      console.error('Error verifying file access:', error);
      return false;
    }
  };

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
      
      // Create a copy of the file to prevent the "Body is disturbed or locked" error
      const fileBlob = new Blob([await file.arrayBuffer()], { type: file.type });
      
      // First check if file exists at path and remove it
      console.log('Checking for existing file at path:', path);
      const { data: existingFile, error: listFileError } = await supabase.storage
        .from('app_assets')
        .list(path.split('/')[0], {
          limit: 1,
          offset: 0,
          search: path.split('/')[1]
        });

      if (listFileError) {
        console.error('Error checking existing file:', {
          error: listFileError,
          path,
          bucket: 'app_assets'
        });
        throw listFileError;
      }

      if (existingFile && existingFile.length > 0) {
        console.log('Removing existing file:', path);
        const { error: removeError } = await supabase.storage
          .from('app_assets')
          .remove([path]);
        
        if (removeError) {
          console.error('Error removing existing file:', {
            error: removeError,
            path,
            bucket: 'app_assets'
          });
          throw removeError;
        }
      }

      // Upload new file
      console.log('Starting file upload to bucket:', {
        bucket: 'app_assets',
        path,
        fileType: file.type
      });
      
      const { data, error: uploadError } = await supabase.storage
        .from('app_assets')
        .upload(path, fileBlob, {
          upsert: true,
          cacheControl: '3600'
        });

      if (uploadError) {
        console.error('Upload error:', {
          error: uploadError,
          bucket: 'app_assets',
          path
        });
        throw uploadError;
      }

      console.log('Upload successful:', {
        data,
        bucket: 'app_assets',
        path
      });

      // Verify file access after upload
      const isAccessible = await verifyFileAccess('app_assets', path);
      if (!isAccessible) {
        throw new Error('File uploaded but not accessible. Please check storage bucket permissions.');
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('app_assets')
        .getPublicUrl(path);

      console.log('Generated public URL:', publicUrl);
      toast.success('Image uploaded successfully');
      return publicUrl;
    } catch (error: any) {
      console.error('Error in uploadImage:', {
        error,
        message: error.message,
        statusCode: error.statusCode,
        stack: error.stack
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