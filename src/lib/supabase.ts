import { supabase } from "@/integrations/supabase/client";

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
    // Check bucket exists and we have permission
    console.log('Checking bucket access for:', bucket);
    const { data: bucketData, error: bucketError } = await supabase
      .storage
      .getBucket(bucket);

    if (bucketError) {
      console.error('Bucket access error:', {
        error: bucketError,
        bucket,
        errorCode: bucketError.code,
        errorMessage: bucketError.message,
        errorDetails: bucketError.details
      });
      throw new Error(`Bucket access error: ${bucketError.message}`);
    }

    console.log('Bucket access verified:', {
      bucket: bucketData,
      permissions: bucketData.public ? 'public' : 'private'
    });

    // Create a copy of the file to prevent the "Body is disturbed or locked" error
    const fileBlob = new Blob([await file.arrayBuffer()], { type: file.type });
    
    // First check if file exists at path and remove it
    console.log('Checking for existing file at path:', path);
    const { data: existingFile, error: listError } = await supabase.storage
      .from(bucket)
      .list(path.split('/')[0], {
        limit: 1,
        offset: 0,
        search: path.split('/')[1]
      });

    if (listError) {
      console.error('Error checking existing file:', {
        error: listError,
        path,
        bucket
      });
      throw listError;
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
        path,
        errorCode: uploadError.code,
        errorMessage: uploadError.message,
        errorDetails: uploadError.details
      });
      throw uploadError;
    }

    console.log('Upload successful:', {
      data,
      bucket,
      path
    });

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    console.log('Generated public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', {
      error,
      bucket,
      path,
      errorCode: error.code,
      errorMessage: error.message,
      errorDetails: error.details,
      stack: error.stack
    });
    throw error;
  }
};