import { supabase } from "@/integrations/supabase/client";

export const uploadImage = async (file: File, bucket: string, path: string) => {
  console.log('Starting image upload:', { bucket, path });
  
  try {
    // First check if file exists at path and remove it
    const { data: existingFile, error: listError } = await supabase.storage
      .from(bucket)
      .list(path.split('/')[0], {
        limit: 1,
        offset: 0,
        search: path.split('/')[1]
      });

    if (listError) {
      console.error('Error checking existing file:', listError);
      throw listError;
    }

    if (existingFile && existingFile.length > 0) {
      console.log('Removing existing file:', path);
      const { error: removeError } = await supabase.storage
        .from(bucket)
        .remove([path]);
      
      if (removeError) {
        console.error('Error removing existing file:', removeError);
        throw removeError;
      }
    }

    // Upload new file
    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: true,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }

    console.log('Upload successful:', data);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    console.log('Generated public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
};