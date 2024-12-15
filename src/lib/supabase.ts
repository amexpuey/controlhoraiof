import { supabase } from "@/integrations/supabase/client";
import { StorageError } from '@supabase/storage-js';

interface ExtendedStorageError extends StorageError {
  code?: string;
  details?: string;
  statusCode?: string | number;
  message: string;
}

export const uploadImage = async (file: File, bucket: string, path: string) => {
  console.log('Starting image upload to Supabase:', { 
    bucket, 
    path,
    fileDetails: {
      name: file.name,
      type: file.type,
      size: file.size
    }
  });
  
  if (!file) {
    throw new Error('No file provided');
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  try {
    // Create a copy of the file to prevent the "Body is disturbed or locked" error
    const fileBlob = new Blob([await file.arrayBuffer()], { type: file.type });
    
    // First check if file exists at path and remove it
    console.log('Checking for existing file at path:', path);
    const { data: existingFile, error: listFileError } = await supabase.storage
      .from(bucket)
      .list(path.split('/')[0], {
        limit: 1,
        offset: 0,
        search: path.split('/')[1]
      });

    if (listFileError) {
      console.error('Error checking existing file:', {
        error: listFileError,
        path,
        bucket
      });
      throw listFileError;
    }

    if (existingFile && existingFile.length > 0) {
      console.log('Removing existing file:', path);
      const { error: removeError } = await supabase.storage
        .from(bucket)
        .remove([path]);
      
      if (removeError) {
        console.error('Error removing existing file:', {
          error: removeError,
          path,
          bucket
        });
        throw removeError;
      }
    }

    // Upload new file
    console.log('Starting file upload to bucket:', {
      bucket,
      path,
      fileType: file.type
    });
    
    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, fileBlob, {
        upsert: true,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Upload error:', {
        error: uploadError,
        bucket,
        path
      });
      throw uploadError;
    }

    console.log('Upload successful:', {
      data,
      bucket,
      path
    });

    // Get public URL and append image optimization parameters
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    // Append image optimization parameters
    const optimizedUrl = `${publicUrl}?auto=format&fit=crop&q=80`;

    console.log('Generated optimized public URL:', optimizedUrl);
    return optimizedUrl;
  } catch (error: any) {
    console.error('Error in uploadImage:', {
      error,
      bucket,
      path,
      message: error.message,
      statusCode: error.statusCode,
      stack: error.stack
    });
    throw error;
  }
};